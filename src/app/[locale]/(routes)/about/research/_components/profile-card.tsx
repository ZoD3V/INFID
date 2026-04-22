import OptimizedImage from "@/components/common/optimized-image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

type ProfileCardProps = {
  name: string;
  title: string;
  image: string;
  onItemClick: () => void;
};

export default function ProfileCard({
  name,
  title,
  image,
  onItemClick,
}: ProfileCardProps) {
  const b = useTranslations("button");

  return (
    <div className="overflow-hidden cursor-pointer hover:shadow transition-shadow rounded-lg border border-slate-200 bg-white p-3">
      {/* Image */}
      <div className="relative aspect-square w-full rounded-lg">
        <OptimizedImage src={image} alt={name} fill placeholderType="square" />
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
        <p className="mt-1 text-sm leading-snug text-gray-600">{title}</p>
      </div>
      <button
        onClick={onItemClick}
        className="group mt-6 inline-flex cursor-pointer items-center gap-2 border-b border-slate-900 pb-2 text-sm font-semibold lg:mt-8"
      >
        {b("bioDescription")}
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}
