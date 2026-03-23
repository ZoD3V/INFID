'use client';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { ExternalLink, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { toast } from 'sonner';

const ContactUs = () => {
    const t = useTranslations('contact');
    const [senderType, setSenderType] = useState('organization');
    const [formData, setFormData] = useState({
        organizationName: '',
        organizationEmail: '',
        subject: '',
        message: '',
        agreeToPrivacy: false
    });

    const handleSubmit = () => {
        // console.log('Form submitted:', { senderType, ...formData });
        toast.success('The form has been successfully sent.');
    };

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <section className='bg-gray-50'>
            <div
                className='relative z-20 h-68 bg-cover bg-center bg-no-repeat pt-8 lg:h-125'
                style={{ backgroundImage: `url('/images/background-about-us.webp')` }}>
                {/* Overlay */}
                <div className='from-primary-500/80 via-primary-500/80 to-primary-500/20 absolute inset-0 bg-linear-to-b' />

                <div className='z-10 container flex h-full items-center justify-center'>
                    <div className='z-10 flex flex-col items-center justify-center gap-4 lg:gap-6'>
                        <div className='inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-3 py-2 backdrop-blur-sm'>
                            <span className='h-2 w-2 animate-pulse rounded-full bg-orange-500'></span>
                            <p className='text-xs font-medium tracking-wide text-white uppercase'>{t('hero.badge')}</p>
                        </div>
                        {/* Title */}
                        <h2 className='text-3xl font-bold tracking-wide text-white md:text-4xl lg:text-5xl'>
                            {t('hero.title')}
                        </h2>
                        <p className='max-w-3xl text-center text-sm text-white md:text-base lg:text-lg'>
                            {t('hero.description')}
                        </p>
                    </div>
                </div>
            </div>
            <div className='relative z-20 container flex w-full flex-col items-start gap-4 py-16 lg:-mt-30 lg:flex-row'>
                {/* Left Section - Contact Info */}
                <div className='w-full rounded-xl border border-slate-200 bg-white p-8 lg:w-[50%]'>
                    <h2 className='mb-8 text-lg font-bold text-gray-800 lg:text-xl'>{t('info.title')}</h2>

                    {/* Email Section */}
                    <div className='mb-8 flex items-start gap-4'>
                        <div className='text-primary-500 bg-primary-50 border-primary-200 flex h-10 w-10 items-center justify-center rounded-xl border p-2 text-sm font-bold'>
                            <Mail className='h-5 w-5 text-teal-600' />
                        </div>
                        <div>
                            <h3 className='text-base font-semibold text-gray-800'>{t('info.email')}</h3>
                            <p className='text-primary-900 text-sm'>info@infid.org</p>
                            <p className='text-primary-900 text-sm'>pengaduan@infid.org</p>
                        </div>
                    </div>

                    {/* Phone Section */}
                    <div className='mb-8 flex items-start gap-4'>
                        <div className='text-primary-500 bg-primary-50 border-primary-200 flex h-10 w-10 items-center justify-center rounded-xl border p-2 text-sm font-bold'>
                            <Phone className='h-5 w-5 text-teal-600' />
                        </div>
                        <div>
                            <h3 className='text-base font-semibold text-gray-800'>{t('info.contact')}</h3>
                            <p className='text-primary-900 text-sm'>{t('info.phone')} : +62 21 781 9734</p>
                            <p className='text-primary-900 text-sm'>Whatsapp : +628119277507</p>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className='mb-8 flex items-start gap-4'>
                        <div className='text-primary-500 bg-primary-50 border-primary-200 flex h-10 w-10 items-center justify-center rounded-xl border p-2 text-sm font-bold'>
                            <MapPin className='h-5 w-5 text-teal-600' />
                        </div>
                        <div>
                            <h3 className='text-base font-semibold text-gray-800'>{t('info.address_title')}</h3>
                            <p className='text-primary-900 text-sm'>Jl. Jatipadang Raya Kav.3 No.105</p>
                            <p className='text-primary-900 text-sm'>Pasar Minggu, Jakarta Selatan,</p>
                            <p className='text-primary-900 text-sm'>12540, Indonesia</p>
                            <Button className='text-primary-900 mt-4 rounded-full bg-slate-100 hover:bg-gray-200'>
                                Direction <ExternalLink className='h-4 w-4' />
                            </Button>
                        </div>
                    </div>

                    {/* Social Media Section */}
                    <div className='border-t border-slate-200 pt-8'>
                        <h3 className='mb-4 text-lg font-bold text-gray-800'>{t('info.follow_us')}</h3>
                        <div className='flex gap-4'>
                            <button className='text-primary-500 bg-transperant border-primary-200 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border p-2 font-bold transition-colors hover:bg-teal-600 hover:text-white'>
                                <FaInstagram className='h-6 w-6' />
                            </button>
                            <button className='text-primary-500 bg-transperant border-primary-200 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border p-2 font-bold transition-colors hover:bg-teal-600 hover:text-white'>
                                <FaLinkedin className='h-6 w-6' />
                            </button>
                            <button className='text-primary-500 bg-transperant border-primary-200 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border p-2 font-bold transition-colors hover:bg-teal-600 hover:text-white'>
                                <FaYoutube className='h-6 w-6' />
                            </button>
                            <button className='text-primary-500 bg-transperant border-primary-200 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border p-2 font-bold transition-colors hover:bg-teal-600 hover:text-white'>
                                <FaFacebook className='h-6 w-6' />
                            </button>
                            <button className='text-primary-500 bg-transperant border-primary-200 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border p-2 font-bold transition-colors hover:bg-teal-600 hover:text-white'>
                                <BsTwitterX className='h-5 w-5' />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Section - Contact Form */}
                <div className='rounded-xl border border-slate-200 bg-white p-8'>
                    <h2 className='mb-8 text-lg font-bold text-gray-800 lg:text-xl'>{t('form.title')}</h2>

                    <div>
                        {/* Switch Button */}
                        <div className='mb-8 flex w-fit gap-2 rounded-full bg-gray-100 p-1'>
                            <button
                                type='button'
                                onClick={() => setSenderType('organization')}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                    senderType === 'organization'
                                        ? 'bg-primary-500 text-white'
                                        : 'text-slate-600 hover:text-slate-800'
                                }`}>
                                {t('form.tab_org')}
                            </button>
                            <button
                                type='button'
                                onClick={() => setSenderType('individual')}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                    senderType === 'individual'
                                        ? 'bg-primary-500 text-white'
                                        : 'text-slate-600 hover:text-slate-800'
                                }`}>
                                {t('form.tab_ind')}
                            </button>
                        </div>

                        {/* Form Fields */}
                        <div className='mb-6 grid gap-6 md:grid-cols-2'>
                            <div>
                                <Label htmlFor='organizationName' className='mb-2 block'>
                                    {senderType === 'organization'
                                        ? t('form.label_name_org')
                                        : t('form.label_name_ind')}
                                </Label>
                                <Input
                                    id='organizationName'
                                    name='organizationName'
                                    value={formData.organizationName}
                                    onChange={handleInputChange}
                                    placeholder={
                                        senderType === 'organization'
                                            ? t('form.placeholder_name_org')
                                            : t('form.placeholder_name_ind')
                                    }
                                />
                            </div>

                            <div>
                                <Label htmlFor='organizationEmail' className='mb-2 block'>
                                    {senderType === 'organization'
                                        ? t('form.label_email_org')
                                        : t('form.label_email_ind')}
                                </Label>
                                <Input
                                    id='organizationEmail'
                                    type='email'
                                    name='organizationEmail'
                                    value={formData.organizationEmail}
                                    onChange={handleInputChange}
                                    placeholder={
                                        senderType === 'organization'
                                            ? t('form.placeholder_email_org')
                                            : t('form.placeholder_email_ind')
                                    }
                                />
                            </div>
                        </div>

                        <div className='mb-6'>
                            <Label htmlFor='subject' className='mb-2 block'>
                                {t('form.label_subject')}
                            </Label>
                            <Input
                                id='subject'
                                name='subject'
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder={t('form.placeholder_subject')}
                            />
                        </div>

                        <div className='mb-6'>
                            <Label htmlFor='message' className='mb-2 block'>
                                {t('form.label_message')}
                            </Label>
                            <Textarea
                                id='message'
                                name='message'
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder={t('form.placeholder_message')}
                                className='min-h-30 resize-none'
                            />
                        </div>

                        {/* Privacy Checkbox */}
                        <div className='mb-6 flex items-center gap-3'>
                            <Checkbox
                                id='agreeToPrivacy'
                                checked={formData.agreeToPrivacy}
                                onCheckedChange={(checked) =>
                                    handleInputChange({
                                        target: {
                                            name: 'agreeToPrivacy',
                                            value: checked,
                                            type: 'checkbox',
                                            checked
                                        }
                                    } as any)
                                }
                            />
                            <Label
                                htmlFor='agreeToPrivacy'
                                className='text-muted-foreground flex-1 text-sm leading-relaxed'>
                                {t('form.privacy_agreement')}
                            </Label>
                        </div>

                        {/* Submit Button */}
                        <Button className='w-full rounded-full' onClick={handleSubmit}>
                            {t('form.button_submit')}
                            <Send className='h-5 w-5 transition-transform group-hover:translate-x-1' />
                        </Button>
                    </div>
                </div>
            </div>
            <iframe
                className='col-span-2 w-full'
                src='https://maps.google.com/maps?width=600&height=400&hl=en&q=Jl.%20Jatipadang%20Raya%20Kav.3%20No.105%2C%20Pasar%20Minggu%2C%20Jakarta%20Selatan%2C%2012540%2C%20Indonesia&t=&z=14&ie=UTF8&iwloc=B&output=embed'
                width='600'
                height='450'
                style={{ border: '0' }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'></iframe>
        </section>
    );
};

export default ContactUs;
