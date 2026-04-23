import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { ArrowRight, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

const SubmitButton = ({ label, className }: { label: string; className: string }) => {
    const { pending } = useFormStatus();

    return (
        <Button
            type='submit'
            variant='secondary'
            className={cn('w-full rounded-full transition-all', className)}
            disabled={pending}>
            {pending ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : label}
            {!pending && <ArrowRight className='ml-2 h-4 w-4' />}
        </Button>
    );
};

export default SubmitButton;
