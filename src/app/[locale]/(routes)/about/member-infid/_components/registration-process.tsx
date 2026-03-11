import SectionBadge from '@/components/common/section-badge';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const RegistrationProcess = () => {
    const t = useTranslations('member.registration_process');

    const stepIds = ['01', '02', '03', '04'] as const;

    const processSteps = stepIds.map((id) => ({
        number: id,
        title: t(`steps.${id}.title`),
        description: t(`steps.${id}.description`)
    }));

    return (
        <section className='bg-secondary-100 w-full py-24' id='registration-infid'>
            <div className='container'>
                <div className='grid gap-8 lg:grid-cols-2 lg:gap-12'>
                    {/* Left Column */}
                    <div className='space-y-6'>
                        <SectionBadge textColor='text-primary-500' lineColor='bg-primary-500'>
                            {t('header.badge')}
                        </SectionBadge>

                        <h2 className='mb-4 max-w-3xl text-4xl font-bold text-gray-900 lg:text-5xl'>
                            {t('header.title')}
                        </h2>
                        <p className='mb-6 max-w-2xl text-sm text-slate-600 md:text-base'>{t('header.description')}</p>

                        {/* Help Box */}
                        <div className='bg-primary-900 mt-8 rounded-xl p-8 text-white'>
                            <h3 className='mb-3 text-xl font-semibold'>{t('help_box.title')}</h3>
                            <p className='mb-4 text-teal-100'>{t('help_box.description')}</p>
                            <a
                                href={`mailto:${t('help_box.email')}`}
                                className='group hover:text-secondary-200 inline-flex items-center gap-2 font-medium text-yellow-300 transition-colors'>
                                {t('help_box.email')}
                                <ArrowRight className='size-4' />
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Timeline */}
                    <div className='relative'>
                        {/* Timeline Line */}
                        <div className='bg-primary-200 absolute top-0 bottom-0 left-4 hidden w-px sm:block md:left-6'></div>

                        {/* Timeline Cards */}
                        <div className='space-y-6'>
                            {processSteps.map((step, index) => (
                                <div key={index} className='relative pl-0 sm:pl-16'>
                                    {/* Timeline Dot */}
                                    <div className='bg-primary-500 absolute top-8 left-0 z-10 hidden h-6 w-6 items-center justify-center rounded-full border-4 border-white shadow sm:left-3 sm:flex'>
                                        {/* <div className='h-2 w-2 rounded-full bg-white'></div> */}
                                    </div>

                                    {/* Card */}
                                    <div className='group border-primary-200 rounded-xl border bg-white p-4 transition-all duration-300 md:p-8'>
                                        <div className='mb-5 flex items-center gap-4'>
                                            <div className='shrink-0'>
                                                <span className='bg-primary-50 text-primary-500 0 border-primary-200 inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 text-base font-bold transition-colors'>
                                                    {step.number}
                                                </span>
                                            </div>
                                            <h3 className='group-hover:text-primary-500 text-base font-bold text-gray-900 transition-colors md:text-lg'>
                                                {step.title}
                                            </h3>
                                        </div>
                                        <p className='text-sm leading-relaxed text-gray-600 md:text-base'>
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegistrationProcess;
