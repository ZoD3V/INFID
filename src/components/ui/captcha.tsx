'use client';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

import { RotateCw } from 'lucide-react';

export const Captcha = forwardRef(({ onVerify }: { onVerify: (code: string) => void }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [code, setCode] = useState('');

    const generateCaptcha = () => {
        const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < 4; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCode(result);
        onVerify(result);
        drawCaptcha(result);
    };

    const drawCaptcha = (text: string) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Reset canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#e2e8f0';
        for (let i = 0; i < canvas.width; i += 10) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += 10) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }

        ctx.font = 'italic bold 20px Arial';
        ctx.fillStyle = '#ef4444';
        ctx.textBaseline = 'bottom';

        const space = canvas.width / (text.length + 1);
        text.split('').forEach((char, i) => {
            ctx.save();
            ctx.translate(space * (i + 1), canvas.height / 2);
            ctx.rotate((Math.random() - 0.5) * 0.4);
            ctx.fillText(char, -10, 10);
            ctx.restore();
        });

        ctx.strokeStyle = '#fca5a5';
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }
    };

    useImperativeHandle(ref, () => ({
        refresh: generateCaptcha
    }));

    useEffect(() => {
        generateCaptcha();
    }, []);

    return (
        <div className='flex items-center gap-1'>
            <div className='relative overflow-hidden rounded-md border bg-slate-50/50'>
                <canvas ref={canvasRef} width={120} height={30} className='block' />
            </div>
            <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={generateCaptcha}
                className='text-slate-500 hover:text-slate-800'>
                <RotateCw className='h-5 w-5' />
            </Button>
        </div>
    );
});

Captcha.displayName = 'Captcha';
