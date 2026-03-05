import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
}

export const ConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Konfirmasi',
    description = 'Apakah Anda yakin ingin melanjutkan?',
    confirmText = 'Kirim komentar',
    cancelText = 'Batal'
}: ConfirmDialogProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className='rounded-2xl border-none'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-xl font-bold'>{title}</AlertDialogTitle>
                    <AlertDialogDescription className='text-base text-slate-600'>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='mt-4'>
                    <AlertDialogCancel className='rounded-full' onClick={onClose}>
                        {cancelText}
                    </AlertDialogCancel>
                    <AlertDialogAction className='rounded-full' onClick={onConfirm}>
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
