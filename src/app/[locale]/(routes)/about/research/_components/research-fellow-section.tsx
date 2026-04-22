"use client";
import PageHeader from "@/components/common/background-section";
import EmptyState from "@/components/common/empty-state";
import { SectionHeader } from "@/components/common/section-header";
import { Research } from "@/types/research";

import ProfileCard from "./profile-card";
import { useLocale, useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { LTPeople, Publication } from "@/types/leadership-timeline";
import OptimizedImage from "@/components/common/optimized-image";
import { formatArticleDate } from "@/lib/utils";
import { Eye, MessageSquare } from "lucide-react";
import { apiRequest } from "@/lib/api-request";
import { API_ENDPOINTS } from "@/lib/api-endpoints";
import AttachmentList from "@/components/common/article-attachment-list";
import { dummyAttachments } from "../contants/data";

const ResearchFellowSection = ({
  initialData,
}: {
  initialData: Research[];
}) => {
  const t = useTranslations("research-fellow.fellow_section");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedPerson, setSelectedPerson] = useState<LTPeople | null>(null);
  const locale = useLocale();

  const handlePersonClick = async (person: Research): Promise<void> => {
    const res = await apiRequest.get<LTPeople>(
      `${API_ENDPOINTS.people}/${person.id}`,
    );
    if (res.status_code == 200) {
      setSelectedPerson(res.data);
    } else {
      setSelectedPerson(null);
    }

    setDialogOpen(true);
  };

  return (
    <section className="w-full bg-gray-50">
      <PageHeader
        title={t("header.title")}
        backgroundImage="/images/background-about-us.webp"
        breadcrumbs={[
          { label: t("header.breadcrumb.home"), href: "/" },
          { label: t("header.breadcrumb.about"), href: "/" },
          { label: t("header.breadcrumb.active"), active: true },
        ]}
      />
      <div className="relative container py-24">
        <SectionHeader
          badge={t("content.badge")}
          badgeProps={{
            textColor: "text-slate-500",
            lineColor: "bg-primary-400",
          }}
          title={t("content.title")}
          description={t("content.description")}
          titleClassName="text-primary-900"
          descriptionClassName="text-primary-700 max-w-3xl"
          className="mb-0"
        />

        {initialData.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 py-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {initialData.map((profile, index) => (
              <ProfileCard
                key={profile.id || index}
                name={profile.name}
                title={profile.name}
                image={profile.image ?? ""}
                onItemClick={() => handlePersonClick(profile)}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
            {selectedPerson && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-start font-bold text-gray-900">
                    Research Fellow
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>

                <div className="mt-4 flex flex-col items-center gap-6 md:flex-row md:items-start">
                  <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-xl border bg-slate-100">
                    <OptimizedImage
                      src={selectedPerson.image ?? ""}
                      alt={selectedPerson.name}
                      fill
                      sizes="100%"
                      placeholderType="square"
                    />
                  </div>
                  <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedPerson.name}
                    </h3>
                    <p className="text-primary-500 text-sm font-medium">
                      {selectedPerson.occupation}
                    </p>

                    <AttachmentList
                      // attachments={selectedPerson?.attachments ?? []}
                      attachments={dummyAttachments}
                    />
                  </div>
                </div>
              </>
            )}

            {selectedPerson?.publications &&
              selectedPerson.publications.length > 0 && (
                <div className="mt-8 flex flex-col">
                  <h4 className="mb-4 border-t pt-6 text-lg font-bold text-gray-900">
                    {locale === "id"
                      ? "Publikasi Terbaru"
                      : "Latest Publications"}
                  </h4>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {selectedPerson.publications.map(
                      (pub: Publication, index) => {
                        const translation =
                          pub?.translations?.find(
                            (t) => t.language === locale,
                          ) ||
                          pub?.translations?.find((t) => t.language === "id") ||
                          pub?.translations?.[0];
                        return (
                          <div
                            key={index}
                            className="group flex cursor-pointer gap-4"
                          >
                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-slate-100">
                              <img
                                src={pub?.cover ?? ""}
                                alt={translation.title}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "/images/placeholder-square.png";
                                }}
                                className="h-full w-full object-cover transition-transform group-hover:scale-110"
                              />
                            </div>

                            <div className="flex flex-col justify-between py-1">
                              <div>
                                <div className="text-secondary-200 flex items-center gap-2 text-[10px] font-semibold tracking-wider uppercase">
                                  {selectedPerson.occupation}
                                  <span className="text-slate-300">•</span>
                                  <span className="font-normal text-slate-500">
                                    {pub.created_at
                                      ? formatArticleDate(pub.created_at)
                                      : "No Date"}
                                  </span>
                                </div>
                                <h5 className="group-hover:text-primary-500 mt-1 line-clamp-2 text-sm leading-snug font-bold text-slate-900">
                                  {translation.title}
                                </h5>
                              </div>

                              <div className="mt-2 flex items-center gap-4 text-[11px] text-slate-400">
                                <div className="flex items-center gap-1">
                                  <Eye size={14} />
                                  {pub?.views ?? 0}{" "}
                                  {locale === "id" ? "Dilihat" : "Views"}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageSquare size={14} />
                                  {pub?.comments.length ?? 0}{" "}
                                  {locale === "id" ? "Komentar" : "Comments"}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ResearchFellowSection;
