import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-graphite">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl font-medium tracking-tight text-brand-charcoal md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-brand-graphite/90 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
