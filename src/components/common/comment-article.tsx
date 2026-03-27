'use client';

import { useRef, useState } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getInitials } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';

import { Captcha } from '../ui/captcha';
import { ConfirmDialog } from './confirm-dialog';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

export const commentFormSchema = z
    .object({
        nama: z.string().min(2, 'Nama harus diisi'),
        email: z.email('Email tidak valid'),
        komentar: z.string().min(5, 'Komentar minimal 5 karakter'),
        captchaInput: z.string().min(1, 'Captcha harus diisi'),
        captchaExpected: z.string()
    })
    .refine((data) => data.captchaInput.toUpperCase() === data.captchaExpected.toUpperCase(), {
        message: 'Kode captcha yang Anda masukkan salah',
        path: ['captchaInput']
    });

export type CommentFormValues = z.infer<typeof commentFormSchema>;

export type CommentType = {
    id: number | string;
    nama: string;
    waktu: string;
    isi: string;
};

interface CommentSectionProps {
    comments: CommentType[];
    onSubmit: (values: CommentFormValues) => void;
}

const AVATAR_COLORS = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-sky-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-purple-500',
    'bg-fuchsia-500',
    'bg-pink-500',
    'bg-rose-500'
];

const getColorFromName = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
};

export default function CommentSection({ comments, onSubmit }: CommentSectionProps) {
    const captchaRef = useRef<any>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingValues, setPendingValues] = useState<CommentFormValues | null>(null);

    const form = useForm<CommentFormValues>({
        resolver: zodResolver(commentFormSchema),
        defaultValues: { nama: '', email: '', komentar: '', captchaInput: '', captchaExpected: '' }
    });

    const handleFormSubmit = (values: CommentFormValues) => {
        setPendingValues(values);
        setShowConfirm(true);
    };

    const handleConfirmFinal = () => {
        if (pendingValues) {
            onSubmit(pendingValues);

            form.reset();
            captchaRef.current?.refresh();
            toast.success('Komentar berhasil terkirim.', {
                description: 'Komentar berhasil dikirim dan sedang menunggu proses verifikasi'
            });
            setShowConfirm(false);
            setPendingValues(null);
        }
    };

    return (
        <div className='space-y-5'>
            {/* Header Komentar */}
            <div className='flex items-center gap-2 text-2xl font-bold'>
                <span>Komentar</span>
                <span className='bg-primary-100 text-primary-500 rounded-sm px-2 py-0.5 text-sm'>
                    {comments?.length ?? 0}
                </span>
            </div>

            {/* Form Section */}
            <div className='rounded-2xl border bg-white p-5'>
                <h3 className='mb-6 text-xl font-bold'>Tulis Komentar</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className='space-y-6'>
                        <div className='grid grid-cols-1 items-start gap-6 md:grid-cols-2'>
                            <FormField
                                control={form.control}
                                name='nama'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel className='font-semibold text-slate-700'>Nama Lengkap</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Masukkan Nama Lengkap'
                                                {...field}
                                                className='bg-slate-50/50'
                                            />
                                        </FormControl>
                                        <div className='min-h-5'>
                                            <FormMessage className='text-sm' />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem className='space-y-2'>
                                        <FormLabel className='font-semibold text-slate-700'>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Masukkan Email' {...field} className='bg-slate-50/50' />
                                        </FormControl>
                                        <div className='min-h-5'>
                                            {!form.formState.errors.email ? (
                                                <p className='text-sm text-slate-500'>
                                                    Email Anda tidak akan dipublikasikan.
                                                </p>
                                            ) : (
                                                <FormMessage className='text-sm' />
                                            )}
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name='komentar'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='font-semibold text-slate-700'>Komentar</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder='Tuliskan Komentar Anda Disini...'
                                            className='min-h-30 resize-none bg-slate-50/50'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex flex-col gap-2 gap-y-4 sm:flex-row sm:items-start'>
                            <Captcha ref={captchaRef} onVerify={(code) => form.setValue('captchaExpected', code)} />

                            <FormField
                                control={form.control}
                                name='captchaInput'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className='w-full sm:w-45'
                                                placeholder='Masukkan Captcha'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='flex justify-end'>
                            <Button type='submit' className='rounded-full'>
                                Kirim Komentar
                                <ArrowRight className='ml-2 h-4 w-4' />
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

            {/* List Komentar */}
            <div className='mt-12 space-y-8'>
                {comments.map((item) => {
                    const avatarColor = getColorFromName(item.nama);

                    return (
                        <div key={item.id} className='flex items-start gap-4'>
                            <Avatar className={`h-12 w-12 ${avatarColor} text-white shadow-sm`}>
                                <AvatarFallback className='bg-transparent font-bold'>
                                    {getInitials(item.nama)}
                                </AvatarFallback>
                            </Avatar>
                            <div className='flex-1 space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <h4 className='font-bold text-slate-900'>{item.nama}</h4>
                                    <span className='text-sm text-slate-500'>{item.waktu}</span>
                                </div>
                                <p className='text-[15px] leading-relaxed text-slate-700'>{item.isi}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <ConfirmDialog
                isOpen={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleConfirmFinal}
                title='Konfirmasi Komentar'
                description='Komentar anda akan direview terlebih dahulu oleh admin sebelum dipublikasikan.'
            />
        </div>
    );
}
