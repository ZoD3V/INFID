'use server';

export async function subscribeAction(formData: FormData) {
    const email = formData.get('email');

    const API_KEY = process.env.NEXT_MAILCHIMP_API_KEY;
    const LIST_ID = process.env.NEXT_MAILCHIMP_LIST_ID;
    const DATACENTER = process.env.NEXT_MAILCHIMP_DATACENTER;

    try {
        const response = await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`user:${API_KEY}`).toString('base64')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email_address: email, status: 'subscribed' })
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.detail || 'Failed to subscribe. Please check your email and try again.'
            };
        }

        return { success: true };
    } catch (err: any) {
        console.error('Mailchimp Server Error:', err);
        return {
            success: false,
            error: 'Internal server error. Please try again later.'
        };
    }
}
