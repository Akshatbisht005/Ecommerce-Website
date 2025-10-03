interface PlaceholderProps {
  title: string;
  description?: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-muted-foreground">
          {description ??
            "This page is ready to be filled in. Tell us what you want to see here and we'll build it out."}
        </p>
      </div>
    </section>
  );
}
