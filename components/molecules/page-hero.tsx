interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <div className="mx-auto w-full max-w-[1024px] px-4 pt-10 sm:px-6 sm:pt-14">
      <div className="pb-6 text-center sm:pb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
