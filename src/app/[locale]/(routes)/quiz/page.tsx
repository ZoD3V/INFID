'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/i18n/navigation';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { cn } from '@/lib/utils';

import { CheckCircle2, ChevronLeft, Loader2, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export default function QuizPage() {
    const t = useTranslations('quiz');
    const router = useRouter();

    // --- API & Core States ---
    const [quizData, setQuizData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- User Flow States ---
    const [userName, setUserName] = useState('');
    const [isNameDialogOpen, setIsNameDialogOpen] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<number, number[]>>({});
    const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

    // --- Feedback & Review States ---
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [showScorePage, setShowScorePage] = useState(false);
    const [finalScore, setFinalScore] = useState(0);

    // 1. Fetch Data
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await apiRequest.get<any>(API_ENDPOINTS.quiz);
                setQuizData(res.data);

                const mockQuestions = t.raw('questions');
                if (mockQuestions) {
                    setQuizData({ title: t('ui.label'), questions: mockQuestions });
                }
            } catch (error) {
                console.error('Error loading quiz:', error);
                toast.error('Failed load quiz.');
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [t]);

    const questions = quizData?.questions || [];
    const currentQuestion = questions[currentIndex];

    // 2. Logic: Toggle Answer
    const toggleAnswer = (qId: number, optId: number) => {
        if (isReviewMode) return; // Kunci jawaban mode review
        setUserAnswers((prev) => ({
            ...prev,
            [qId]: [optId] // Single choice logic
        }));
    };

    // 3. Logic: Calculate Score
    const calculateScore = () => {
        let total = 0;
        questions.forEach((q: any) => {
            const selected = userAnswers[q.id] || [];
            const correctIds = q.options.filter((o: any) => o.is_correct).map((o: any) => o.id);

            const isCorrect = selected.length === correctIds.length && selected.every((id) => correctIds.includes(id));

            if (isCorrect) total += q.weight || 0;
        });
        return total;
    };

    // 4. Logic: Submit
    const handleSubmit = async () => {
        setIsSubmitting(true);
        const score = calculateScore();
        setFinalScore(score);

        try {
            const res = await apiRequest.post(API_ENDPOINTS.quiz, {
                name: userName,
                score,
                followed_quiz: quizData?.title
            });
            setIsSubmitDialogOpen(false);
            setShowScorePage(true);
            toast.success(res.message ?? 'Quiz respondent successfully added');
        } catch (error) {
            toast.error('Failed sent answer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helper: UI
    const getOptionLabel = (index: number) => String.fromCharCode(65 + index);
    const canContinue = currentQuestion && userAnswers[currentQuestion.id]?.length > 0;

    const BlueHeader = ({ children }: { children?: React.ReactNode }) => (
        <div className='bg-primary-500 flex h-35 w-full items-center justify-center overflow-x-auto border-b px-3'>
            {children}
        </div>
    );

    // --- Render States ---

    if (loading)
        return (
            <section className='min-h-screen bg-slate-50'>
                <BlueHeader />
                <div className='flex h-[calc(100vh-140px)] flex-col items-center justify-center gap-3 text-gray-400'>
                    <Loader2 className='text-primary-500 h-10 w-10 animate-spin' />
                    <p>{t('ui.loading')}</p>
                </div>
            </section>
        );

    if (showScorePage)
        return (
            <section className='min-h-screen bg-slate-50'>
                <BlueHeader />
                <div className='flex flex-col items-center justify-center px-4 py-12'>
                    <div className='flex w-full max-w-md flex-col gap-6 rounded-3xl bg-white p-8 text-center shadow'>
                        <div className='mx-auto rounded-full bg-green-100 p-4 text-green-600'>
                            <CheckCircle2 size={48} />
                        </div>
                        <h2 className='text-2xl font-bold'>{t('score.status')}</h2>
                        <div className='rounded-2xl border bg-slate-50 py-6'>
                            <span className='text-xs font-bold tracking-tighter text-gray-400 uppercase'>
                                {t('score.title')}
                            </span>
                            <div className='text-primary-500 text-6xl font-black'>{finalScore}</div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Button
                                className='rounded-full'
                                onClick={() => {
                                    setShowScorePage(false);
                                    setIsReviewMode(true);
                                    setCurrentIndex(0);
                                }}>
                                {t('score.button_feedback')}
                            </Button>
                            <Button variant='ghost' className='rounded-full' onClick={() => router.push('/')}>
                                {t('score.button_beranda')}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        );

    if (!currentQuestion)
        return (
            <section className='min-h-screen bg-slate-50'>
                <BlueHeader />
                <div className='flex h-[calc(100vh-140px)] items-center justify-center'>{t('ui.empty')}</div>
            </section>
        );

    return (
        <section className='min-h-screen w-full bg-slate-50 pb-20'>
            {/* Name Dialog */}
            <Dialog open={isNameDialogOpen}>
                <DialogContent className='[&>button]:hidden' onPointerDownOutside={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>{t('dialog.name_title')}</DialogTitle>
                        <DialogDescription>{t('dialog.name_description')}</DialogDescription>
                    </DialogHeader>
                    <Input
                        placeholder={t('dialog.placeholder_name')}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <DialogFooter>
                        <Button
                            className='w-full rounded-full'
                            disabled={!userName.trim()}
                            onClick={() => setIsNameDialogOpen(false)}>
                            Mulai Kuis
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <BlueHeader>
                <div className='flex min-w-max gap-2 pt-16'>
                    {questions.map((_: any, i: any) => (
                        <div
                            key={i}
                            className={cn(
                                'flex h-10 w-9 items-center justify-center rounded-sm font-semibold transition-all',
                                i <= currentIndex
                                    ? 'bg-secondary-200 text-white'
                                    : 'border-secondary-200 text-secondary-200 border'
                            )}>
                            {i + 1}
                        </div>
                    ))}
                </div>
            </BlueHeader>

            <div className='flex min-h-[calc(100vh-220px)] items-center justify-center px-4 py-6'>
                <div className='relative flex w-full max-w-2xl flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm'>
                    {isReviewMode && (
                        <div className='absolute top-0 left-0 w-full bg-amber-50 py-1 text-center text-[10px] font-bold text-amber-600 uppercase'>
                            {t('review_mode.title')}
                        </div>
                    )}

                    <div className='flex items-center justify-between'>
                        <span className='text-primary-500 text-xs font-bold'>{t('ui.label')}</span>
                        <span className='text-xs text-gray-400'>
                            {t('ui.progress', { current: currentIndex + 1, total: questions.length })}
                        </span>
                    </div>

                    <h3 className='text-lg font-semibold'>{currentQuestion.question}</h3>

                    <div className='flex flex-col gap-3'>
                        {currentQuestion.options.map((opt: any, i: number) => {
                            const isUserSelected = userAnswers[currentQuestion.id]?.includes(opt.id);
                            const isCorrect = opt.is_correct;

                            // Dynamic Styling
                            let cardStyle = 'border-gray-200';
                            let iconStyle = 'text-primary-500 border';

                            if (isReviewMode) {
                                if (isCorrect) {
                                    cardStyle = 'border-green-500 bg-green-50';
                                    iconStyle = 'bg-green-500 text-white border-green-500';
                                } else if (isUserSelected && !isCorrect) {
                                    cardStyle = 'border-red-500 bg-red-50';
                                    iconStyle = 'bg-red-500 text-white border-red-500';
                                }
                            } else if (isUserSelected) {
                                cardStyle = 'border-primary-500 bg-slate-50';
                                iconStyle = 'bg-primary-500 text-white border-primary-500';
                            }

                            return (
                                <div
                                    key={opt.id}
                                    onClick={() => toggleAnswer(currentQuestion.id, opt.id)}
                                    className={cn(
                                        'flex items-center rounded-full border p-1 transition-all',
                                        !isReviewMode && 'cursor-pointer',
                                        cardStyle
                                    )}>
                                    <div
                                        className={cn(
                                            'mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                                            iconStyle
                                        )}>
                                        {isReviewMode && isCorrect ? (
                                            <CheckCircle2 size={16} />
                                        ) : isReviewMode && isUserSelected && !isCorrect ? (
                                            <XCircle size={16} />
                                        ) : (
                                            getOptionLabel(i)
                                        )}
                                    </div>
                                    <span className='text-sm font-medium'>{opt.option}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className='fixed bottom-0 left-0 flex w-full items-center justify-end gap-4 border-t bg-white px-4 py-3 shadow-lg md:px-8'>
                <div className='flex items-center gap-3'>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
                            else if (!isReviewMode) setIsSubmitDialogOpen(true);
                            else router.push('/');
                        }}
                        disabled={!isReviewMode && !canContinue}
                        className='rounded-full px-10'>
                        {isReviewMode && currentIndex === questions.length - 1
                            ? 'Selesai'
                            : currentIndex === questions.length - 1
                              ? t('ui.submit')
                              : t('ui.continue')}
                    </Button>
                    <button
                        onClick={() => setCurrentIndex(currentIndex - 1)}
                        disabled={currentIndex === 0}
                        className='border-secondary-200 hover:bg-secondary-200 group cursor-pointer rounded-full border p-2 transition-colors disabled:opacity-30'>
                        <ChevronLeft className='text-secondary-200 h-6 w-6 group-hover:text-white' />
                    </button>
                </div>
            </div>

            <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle> {t('dialog.title')}</DialogTitle>
                        <DialogDescription className='pt-2'>{t('dialog.description')}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className='gap-2'>
                        <Button variant='outline' onClick={() => setIsSubmitDialogOpen(false)}>
                            {t('dialog.edit')}
                        </Button>
                        <Button onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className='animate-spin' /> : t('dialog.submit')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}
