import { Button } from '@/components/ui/button';

import { ArrowRight, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

const SubmitButton = ({ label }: { label: string }) => {
    const { pending } = useFormStatus();

    return (
        <Button type='submit' variant='secondary' className='w-full rounded-full transition-all' disabled={pending}>
            {pending ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : label}
            {!pending && <ArrowRight className='ml-2 h-4 w-4' />}
        </Button>
    );
};

export default SubmitButton;
