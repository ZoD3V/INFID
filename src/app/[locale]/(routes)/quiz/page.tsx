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

import { ArrowRight, CheckCircle2, ChevronLeft, Inbox, Loader2, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

const STORAGE_KEY = 'quiz_dialog_status';

export default function QuizPage() {
    const t = useTranslations('quiz');
    const router = useRouter();

    // --- Core States ---
    const [quizData, setQuizData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Flow States ---
    const [userName, setUserName] = useState('');
    const [isNameDialogOpen, setIsNameDialogOpen] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Perbaikan Tipe Data: Menggunakan number untuk single choice
    const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
    const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, boolean>>({});

    // --- Feedback & Review States ---
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [showScorePage, setShowScorePage] = useState(false);
    const [finalScore, setFinalScore] = useState(0);

    // 1. Fetch Data
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await apiRequest.get<any>(API_ENDPOINTS.quiz);
                if (res.data && res.data.questions && res.data.questions.length > 0) {
                    setQuizData(res.data);
                } else {
                    const mockQuestions = t.raw('questions');
                    if (mockQuestions && mockQuestions.length > 0) {
                        setQuizData({
                            title: t('ui.label'),
                            questions: mockQuestions
                        });
                    } else {
                        setQuizData(null);
                    }
                }
            } catch (error) {
                toast.error('Failed load quiz.');
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, []);

    const questions = quizData?.questions || [];
    const currentQuestion = questions[currentIndex];

    // 2. Logic: Handle Choice (Lock Instantly)
    const handleChoice = (qId: number, optId: number) => {
        if (answeredQuestions[qId] || isReviewMode) return;

        setUserAnswers((prev) => ({ ...prev, [qId]: optId }));
        setAnsweredQuestions((prev) => ({ ...prev, [qId]: true }));
    };

    // 3. Logic: Submit
    const handleSubmit = async () => {
        setIsSubmitting(true);
        let total = 0;
        questions.forEach((q: any) => {
            const selected = userAnswers[q.id];
            const correctOpt = q.options.find((o: any) => o.is_correct);
            if (selected === correctOpt?.id) total += q.weight || 10;
        });
        setFinalScore(total);

        try {
            await apiRequest.post(API_ENDPOINTS.quiz, {
                name: userName,
                score: total,
                followed_quiz: quizData?.title
            });
            setShowScorePage(true);
        } catch (error) {
            toast.error('Failed sent answer.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else if (!isReviewMode) {
            handleSubmit();
        } else {
            router.push('/');
        }
    };

    // Helper UI
    const getOptionLabel = (index: number) => String.fromCharCode(65 + index);
    const canContinue = isReviewMode || answeredQuestions[currentQuestion?.id];

    // --- RENDER STATES ---

    if (loading) return <LoaderState t={t} />;
    if (!quizData || questions.length === 0) {
        return (
            <section className='min-h-screen bg-slate-50'>
                <div className='bg-primary-500 h-35 w-full' />
                <div className='flex h-[calc(100vh-140px)] flex-col items-center justify-center px-4 text-center'>
                    <div className='mb-4 rounded-full bg-slate-100 p-6 text-slate-400'>
                        <Inbox size={48} />
                    </div>
                    <h2 className='text-xl font-bold text-slate-900'>{t('ui.empty_title') || 'Kuis Belum Tersedia'}</h2>
                    <p className='mt-2 max-w-xs text-slate-500'>
                        {t('ui.empty_description') ||
                            'Saat ini belum ada pertanyaan untuk kuis ini. Silakan kembali lagi nanti.'}
                    </p>
                    <Button variant='outline' className='mt-8 rounded-full' onClick={() => router.push('/')}>
                        {t('score.button_beranda')}
                    </Button>
                </div>
            </section>
        );
    }

    if (showScorePage)
        return (
            <ScoreState
                t={t}
                score={finalScore}
                onReview={() => {
                    setShowScorePage(false);
                    setIsReviewMode(true);
                    setCurrentIndex(0);
                }}
                onHome={() => router.push('/')}
            />
        );

    return (
        <section className='min-h-screen w-full bg-slate-50 pb-20'>
            {/* Name Dialog */}
            <Dialog open={isNameDialogOpen}>
                <DialogContent className='[&>button]:hidden' onPointerDownOutside={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>{t('dialog.name_description')}</DialogTitle>
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
                            {t('dialog.name_title')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className='bg-primary-500 flex h-35 w-full items-center justify-center border-b px-3'>
                <div className='no-scrollbar flex max-w-full gap-2 overflow-x-auto overflow-y-hidden px-4 pt-16 pb-2'>
                    {questions.map((_: any, i: number) => (
                        <div
                            key={i}
                            onClick={() => isReviewMode && setCurrentIndex(i)}
                            className={cn(
                                'flex h-10 w-9 shrink-0 items-center justify-center rounded-sm font-semibold transition-all',
                                isReviewMode ? 'cursor-pointer' : 'cursor-default',
                                i === currentIndex
                                    ? 'bg-secondary-200 scale-110 text-white shadow-lg'
                                    : i < currentIndex
                                      ? 'bg-secondary-200 text-white'
                                      : 'border-secondary-200 text-secondary-200 border'
                            )}>
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex min-h-[calc(100vh-220px)] items-center justify-center px-4 py-6'>
                <div className='relative flex w-full max-w-2xl flex-col gap-4 overflow-hidden rounded-xl border bg-white p-6 shadow-sm'>
                    {isReviewMode && (
                        <div className='absolute top-0 left-0 w-full bg-amber-50 py-1 text-center text-[10px] font-bold tracking-widest text-amber-600 uppercase'>
                            {t('review_mode.title')}
                        </div>
                    )}

                    <div className='flex items-center justify-between'>
                        <span className='text-primary-500 text-xs font-bold uppercase'>{quizData?.title}</span>
                        <span className='text-xs text-gray-400'>
                            {currentIndex + 1} / {questions.length}
                        </span>
                    </div>

                    <h3 className='text-lg font-bold text-slate-900'>{currentQuestion?.question}</h3>

                    <div className='flex flex-col gap-3'>
                        {currentQuestion?.options.map((opt: any, i: number) => {
                            const isSelected = userAnswers[currentQuestion.id] === opt.id;
                            const isCorrect = opt.is_correct;
                            const isAnswered = answeredQuestions[currentQuestion.id] || isReviewMode;

                            let cardStyle = 'border-slate-200 hover:border-primary-500';
                            let iconStyle = 'text-primary-500 border';

                            if (isAnswered) {
                                if (isCorrect) {
                                    cardStyle = 'border-green-500 bg-green-50';
                                    iconStyle = 'bg-green-500 text-white border-green-500';
                                } else if (isSelected && !isCorrect) {
                                    cardStyle = 'border-red-500 bg-red-50';
                                    iconStyle = 'bg-red-500 text-white border-red-500';
                                } else {
                                    cardStyle = 'border-slate-100 opacity-60';
                                }
                            }

                            return (
                                <div
                                    key={opt.id}
                                    onClick={() => handleChoice(currentQuestion.id, opt.id)}
                                    className={cn(
                                        'flex items-center rounded-full border-2 p-1 transition-all',
                                        isAnswered ? 'cursor-default' : 'cursor-pointer',
                                        cardStyle
                                    )}>
                                    <div
                                        className={cn(
                                            'mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                                            iconStyle
                                        )}>
                                        {isAnswered && isCorrect ? (
                                            <CheckCircle2 size={18} />
                                        ) : isAnswered && isSelected && !isCorrect ? (
                                            <XCircle size={18} />
                                        ) : (
                                            getOptionLabel(i)
                                        )}
                                    </div>
                                    <span className='text-sm font-semibold'>{opt.option}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className='fixed bottom-0 left-0 flex w-full items-center justify-center border-t bg-white px-4 py-4 shadow-lg'>
                <div className='flex w-full max-w-2xl items-center gap-4'>
                    {/* Tombol Back hanya muncul di Review Mode */}
                    {isReviewMode && (
                        <Button
                            variant='outline'
                            className='h-12 w-12 shrink-0 rounded-full p-0'
                            onClick={() => setCurrentIndex((prev) => prev - 1)}
                            disabled={currentIndex === 0}>
                            <ChevronLeft size={24} />
                        </Button>
                    )}

                    <Button
                        onClick={handleNext}
                        disabled={!canContinue || isSubmitting}
                        className='h-12 flex-1 rounded-full text-base font-bold'>
                        {isSubmitting ? (
                            <Loader2 className='mr-2 animate-spin' />
                        ) : isReviewMode && currentIndex === questions.length - 1 ? (
                            'Selesai Review'
                        ) : currentIndex === questions.length - 1 ? (
                            t('ui.submit')
                        ) : (
                            t('ui.continue')
                        )}
                        {!isSubmitting && <ArrowRight className='ml-2 h-5 w-5' />}
                    </Button>
                </div>
            </div>
        </section>
    );
}

// --- Internal UI Components ---

function LoaderState({ t }: any) {
    return (
        <section className='min-h-screen bg-slate-50'>
            <div className='bg-primary-500 h-35 w-full' />
            <div className='flex h-[calc(100vh-140px)] flex-col items-center justify-center gap-3 text-gray-400'>
                <Loader2 className='text-primary-500 h-10 w-10 animate-spin' />
                <p>{t('ui.loading')}</p>
            </div>
        </section>
    );
}

function ScoreState({ t, score, onReview, onHome }: any) {
    const getGrade = (s: number) => {
        if (s >= 80) return { label: 'Sangat Paham', color: 'text-green-600' };
        if (s >= 60) return { label: 'Paham', color: 'text-teal-600' };
        return { label: 'Perlu Belajar Lagi', color: 'text-amber-600' };
    };
    const grade = getGrade(score);

    return (
        <section className='min-h-screen bg-slate-50'>
            <div className='bg-primary-500 h-35 w-full' />
            <div className='flex flex-col items-center justify-center px-4 py-12'>
                <div className='flex w-full max-w-md flex-col gap-6 rounded-3xl bg-white p-8 text-center shadow'>
                    <div className='mx-auto rounded-full bg-green-100 p-4 text-green-600'>
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className='text-2xl font-bold'>{t('score.status')}</h2>
                    <div className='rounded-2xl border bg-slate-50 py-6'>
                        <span className='text-xs font-bold tracking-widest text-gray-400 uppercase'>
                            {t('score.title')}
                        </span>
                        <div className='text-primary-500 text-6xl font-black'>{score}</div>
                        <div className={cn('mt-2 text-lg font-bold', grade.color)}>{grade.label}</div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Button className='h-12 rounded-full font-bold' onClick={onReview}>
                            Review Jawaban
                        </Button>
                        <Button variant='ghost' className='rounded-full' onClick={onHome}>
                            {t('score.button_beranda')}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
