'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/i18n/navigation';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/api-endpoints';
import { apiRequest } from '@/lib/api-request';
import { cn } from '@/lib/utils';
import { AnsweredStatus, MultilanguageText, QuizData, UserAnswers } from '@/types/quiz';

import axios from 'axios';
import { ArrowRight, CheckCircle2, ChevronLeft, Inbox, Loader2, XCircle } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';

export default function QuizPage() {
    const t = useTranslations('quiz');
    const router = useRouter();
    const locale = useLocale();

    // --- Core States ---
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Flow States ---
    const [userName, setUserName] = useState('');
    const [isNameDialogOpen, setIsNameDialogOpen] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
    const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredStatus>({});

    // --- Feedback & Review States ---
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [showScorePage, setShowScorePage] = useState(false);
    const [finalScore, setFinalScore] = useState(0);

    // Helper Multilanguage
    const getTranslation = (dataArray: MultilanguageText[]) => {
        return (
            dataArray?.find((item) => item.language === locale)?.text ||
            dataArray?.find((item) => item.language === 'id')?.text ||
            dataArray?.[0]?.text ||
            ''
        );
    };

    // 1. Fetch Data
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.quiz}`);
                const actualData = res.data.data;
                if (res.status == 200) {
                    setQuizData(actualData);
                } else {
                    setQuizData(null);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [t]);

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
            if (selected === correctOpt?.id) total += q.weight || 0;
        });
        setFinalScore(total);

        try {
            await apiRequest.post(API_ENDPOINTS.quiz, {
                name: userName,
                score: total,
                followed_quiz: getTranslation(quizData?.title as any)
            });
            setShowScorePage(true);
        } catch (error) {
            toast.error('Failed to send answers.');
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
        return <EmptyState t={t} router={router} />;
    }

    if (showScorePage) {
        const matchedFeedback = quizData.feedbacks
            ? [...quizData.feedbacks].sort((a, b) => b.min_score - a.min_score).find((f) => finalScore >= f.min_score)
            : null;

        return (
            <ScoreState
                t={t}
                score={finalScore}
                narrative={getTranslation(matchedFeedback?.narrative as any)}
                onReview={() => {
                    setShowScorePage(false);
                    setIsReviewMode(true);
                    setCurrentIndex(0);
                }}
                onHome={() => router.push('/')}
            />
        );
    }

    return (
        <section className='min-h-screen w-full bg-slate-50 pb-20'>
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

            {/* Header: Fixed Horizontal Scroll Only */}
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
                                      ? 'bg-secondary-200/50 text-white'
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
                        <span className='text-primary-500 text-xs font-bold uppercase'>
                            {getTranslation(quizData.title as any)}
                        </span>
                        <span className='text-xs text-gray-400'>
                            {currentIndex + 1} / {questions.length}
                        </span>
                    </div>

                    <h3 className='text-lg font-bold text-slate-900'>
                        {getTranslation(currentQuestion?.question as any)}
                    </h3>

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
                                        'flex items-center rounded-xl border-2 p-1 transition-all',
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
                                    <span className='text-sm font-semibold'>{getTranslation(opt.option as any)}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className='fixed bottom-0 left-0 flex w-full items-center justify-center border-t bg-white px-4 py-4 shadow-lg'>
                <div className='flex w-full max-w-2xl items-center gap-4'>
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
                        className='h-12 flex-1 rounded-full text-base font-bold transition-all'>
                        {isSubmitting ? (
                            <Loader2 className='mr-2 animate-spin' />
                        ) : isReviewMode && currentIndex === questions.length - 1 ? (
                            t('ui.review')
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

// --- Sub-components for Clean Code ---

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

function EmptyState({ t, router }: any) {
    return (
        <section className='min-h-screen bg-slate-50'>
            <div className='bg-primary-500 h-35 w-full' />
            <div className='flex h-[calc(100vh-140px)] flex-col items-center justify-center px-4 text-center'>
                <div className='mb-4 rounded-full bg-slate-100 p-6 text-slate-400'>
                    <Inbox size={48} />
                </div>
                <h2 className='text-xl font-bold text-slate-900'>{t('ui.empty_title') || 'Kuis Belum Tersedia'}</h2>
                <p className='mt-2 max-w-xs text-slate-500'>{t('ui.empty_description')}</p>
                <Button variant='outline' className='mt-8 rounded-full px-8' onClick={() => router.push('/')}>
                    {t('score.button_beranda')}
                </Button>
            </div>
        </section>
    );
}

function ScoreState({ t, score, narrative, onReview, onHome }: any) {
    return (
        <section className='min-h-screen bg-slate-50'>
            <div className='bg-primary-500 h-35 w-full' />
            <div className='flex flex-col items-center justify-center px-4 py-12'>
                <div className='flex w-full max-w-md flex-col gap-6 rounded-3xl border bg-white p-8 text-center shadow'>
                    <div className='mx-auto rounded-full bg-green-100 p-4 text-green-600'>
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className='text-2xl font-bold'>{t('score.status')}</h2>
                    <div className='rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50 px-4 py-6'>
                        <span className='text-xs font-bold tracking-widest text-gray-400 uppercase'>
                            {t('score.title')}
                        </span>
                        <div className='text-primary-500 my-2 text-7xl font-black'>{score}</div>
                        <p className='mt-2 leading-relaxed font-bold text-teal-600'>{narrative}</p>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Button className='h-12 rounded-full text-base font-bold' onClick={onReview}>
                            {t('review_mode.title')}
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
