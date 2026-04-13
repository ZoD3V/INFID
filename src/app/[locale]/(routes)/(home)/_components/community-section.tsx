import React from "react";

import Image from "next/image";

import SectionBadge from "@/components/common/section-badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

import { useTranslations } from "next-intl";

const CommunitySection = () => {
  const t = useTranslations("cta");

  return (
    <div className="from-primary-500 static -bottom-60 left-1/2 z-30 container w-full items-center justify-center bg-linear-to-t from-50% to-transparent to-50% lg:absolute lg:flex lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:bg-transparent lg:bg-none">
      <div className="bg-secondary-100 relative overflow-hidden rounded-xl border">
        <Image
          src="/images/decoration-program-2.png"
          alt="decoration"
          width={90}
          height={90}
          className="absolute -bottom-5 left-100 hidden h-auto w-auto rotate-120 xl:block"
        />
        <Image
          src="/images/decoration-footer-1.png"
          alt="decoration"
          width={120}
          height={120}
          className="absolute top-0 left-50 hidden h-auto w-auto xl:block"
        />
        {/* Content */}
        <div className="grid grid-cols-1 p-5 md:grid-cols-2 md:p-12">
          <div className="mb-6 w-full">
            <SectionBadge
              textColor="text-primary-500"
              lineColor="bg-primary-500"
            >
              {t("badge")}
            </SectionBadge>
            <h1 className="text-primary-500 max-w-40 text-4xl font-bold tracking-tight uppercase lg:text-5xl">
              {/* MARI
                            <br />
                            BERGERAK */}
              {t("title")}
            </h1>
          </div>

          <div className="flex w-full items-start justify-between gap-4 md:gap-8">
            <div className="flex-1 space-y-6">
              <p className="text-base leading-relaxed text-gray-700">
                {t("description")}
              </p>

              <div className="flex gap-4">
                {/* <Button className='w-full rounded-full'> {t('buttons.register')}</Button> */}
                <Link href="/contact-us">
                  <Button
                    variant="outline"
                    className="border-primary-500 w-fit rounded-full transition-all 
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                  >
                    {t("buttons.contact")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySection;
