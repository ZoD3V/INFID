'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

import { QUIZ_QUESTIONS } from './constant/quiz';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function QuizPage() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<number, number[]>>({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const questions = QUIZ_QUESTIONS;
    const currentQuestion = questions[currentIndex];

    const handleSubmit = () => {
        toast.success('Quiz berhasil terkirim.');
        setIsDialogOpen(false);
        setTimeout(() => {
            router.push('/');
        }, 1500);
    };

    const getOptionLabel = (index: number) => String.fromCharCode(65 + index);

    const isSelected = (qId: number, optId: number) => {
        return userAnswers[qId]?.includes(optId);
    };

    const toggleAnswer = (qId: number, optId: number, type: number, max: number) => {
        const currentSelected = userAnswers[qId] || [];

        if (type === 1) {
            // Multiple Choice
            if (currentSelected.includes(optId)) {
                setUserAnswers({ ...userAnswers, [qId]: currentSelected.filter((id) => id !== optId) });
            } else if (currentSelected.length < max) {
                setUserAnswers({ ...userAnswers, [qId]: [...currentSelected, optId] });
            }
        } else {
            // Single Choice
            setUserAnswers({ ...userAnswers, [qId]: [optId] });
        }
    };

    const next = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setIsDialogOpen(true);
        }
    };

    const back = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const isLastStep = currentIndex === questions.length - 1;
    const canContinue = userAnswers[currentQuestion.pertanyaan_id]?.length > 0;

    if (!questions.length) {
        return (
            <div className='flex h-screen flex-col items-center justify-center gap-3 text-gray-500'>
                <Loader2 className='text-primary h-12 w-12 animate-spin' />
                <span className='font-medium'>Memuat Pertanyaan...</span>
            </div>
        );
    }

    return (
        <section className='min-h-screen w-full bg-slate-50 pb-20'>
            {/* Stepper / Progress Bar */}
            <div className='bg-primary-500 flex h-35 w-full items-center justify-center overflow-x-auto border-b px-3'>
                <div className='flex min-w-max items-center justify-start gap-2 pt-16 md:justify-center'>
                    {questions.map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                'flex h-10 w-9 items-center justify-center rounded-sm text-base font-semibold transition-colors',
                                i <= currentIndex
                                    ? 'bg-secondary-200 text-white'
                                    : 'border-secondary-200 text-secondary-200 border'
                            )}>
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>

            {/* Question Card */}
            <div className='flex items-center justify-center p-4 lg:mt-12'>
                <div className='flex w-full max-w-2xl flex-col gap-4 rounded-xl border bg-white p-6 shadow'>
                    <div className='flex items-center justify-between'>
                        <span>KUIS</span>

                        <span className='text-xs font-medium text-gray-400'>
                            {currentIndex + 1} dari {questions.length}
                        </span>
                    </div>

                    <h3 className='text-lg leading-snug font-semibold text-gray-800'>{currentQuestion.pertanyaan}</h3>

                    <div className='flex flex-col gap-3'>
                        {currentQuestion.options.map((opt, i) => {
                            const active = isSelected(currentQuestion.pertanyaan_id, opt.pilihan_id);
                            return (
                                <div
                                    key={opt.pilihan_id}
                                    onClick={() =>
                                        toggleAnswer(
                                            currentQuestion.pertanyaan_id,
                                            opt.pilihan_id,
                                            currentQuestion.type,
                                            currentQuestion.maksimal_pilihan
                                        )
                                    }
                                    className={cn(
                                        'hover:border-primary-400 flex w-full cursor-pointer items-center rounded-full border p-1 transition-all',
                                        active ? 'border-primary-500 bg-slate-50' : 'border-gray-200 bg-white'
                                    )}>
                                    <div
                                        className={cn(
                                            'mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                                            active ? 'bg-primary-500 text-white' : 'text-primary-500 border bg-white'
                                        )}>
                                        {getOptionLabel(i)}
                                    </div>
                                    <span className={cn('primary-500 text-sm font-medium')}>{opt.pilihan}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* {currentQuestion.catatan && (
                        <div className='mt-2 border-t pt-3 text-xs text-gray-400 italic'>
                            Catatan: {currentQuestion.catatan}
                        </div>
                    )} */}
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className='fixed bottom-0 left-0 flex w-full items-center justify-end gap-5 border-t bg-white px-4 py-3 shadow-lg md:px-8'>
                <div className='flex items-center gap-4'>
                    <button
                        onClick={back}
                        disabled={currentIndex === 0}
                        className='border-secondary-200 hover:bg-secondary-200 group cursor-pointer rounded-full border p-2 transition-colors disabled:opacity-30'>
                        <ChevronLeft className='text-secondary-200 h-6 w-6 group-hover:text-white' />
                    </button>
                    {/* <button
                        onClick={next}
                        disabled={isLastStep}
                        className='border-secondary-200 hover:bg-secondary-200 group cursor-pointer rounded-full border p-2 transition-colors disabled:opacity-30'>
                        <ChevronRight className='text-secondary-200 h-6 w-6 group-hover:text-white' />
                    </button> */}
                </div>

                <Button onClick={next} variant='secondary' disabled={!canContinue} className='rounded-full'>
                    {isLastStep ? 'Kirim Jawaban' : 'Lanjutkan'}
                </Button>
            </div>

            {/* shadcn/ui Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Kirim Jawaban</DialogTitle>
                        <DialogDescription className='pt-2'>
                            Kamu bisa mengisi kuisioner ini hanya satu kali, saat ini kamu masih bisa mengubah jawaban
                            jika dirasa masih ada yang belum sesuai.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className='mt-4 flex gap-2 sm:justify-end'>
                        <Button variant='outline' onClick={() => setIsDialogOpen(false)} className='rounded-full'>
                            Ubah Jawaban
                        </Button>
                        <Button onClick={handleSubmit} className='rounded-full'>
                            Kirim Jawaban
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}
