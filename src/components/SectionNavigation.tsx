import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SectionNavigationProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
  sections: Array<{ id: string; label: string }>;
}

export function SectionNavigation({
  activeIndex,
  onNavigate,
  sections,
}: SectionNavigationProps) {
  return (
    <>
      <div className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 md:block">
        <div className="frost flex flex-col gap-3 rounded-full border border-navy/10 px-3 py-4 shadow-[0_24px_80px_rgba(11,31,58,0.18)]">
          {sections.map((section, index) => (
            <button
              key={section.id}
              type="button"
              aria-label={`Go to ${section.label}`}
              onClick={() => onNavigate(index)}
              className="group flex items-center gap-3"
            >
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all duration-300",
                  activeIndex === index
                    ? "bg-gold shadow-[0_0_22px_rgba(201,162,39,0.65)]"
                    : "bg-navy/20 group-hover:bg-navy/45",
                )}
              />
              <span
                className={cn(
                  "max-w-0 overflow-hidden whitespace-nowrap text-xs tracking-[0.28em] text-navy/60 transition-all duration-300 group-hover:max-w-[160px] group-hover:text-navy",
                  activeIndex === index && "max-w-[160px] text-navy",
                )}
              >
                {section.label.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <Button
          aria-label="Navigate to previous slide"
          size="icon"
          variant="outline"
          onClick={() => onNavigate(Math.max(activeIndex - 1, 0))}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Navigate to next slide"
          size="icon"
          variant="gold"
          onClick={() => onNavigate(Math.min(activeIndex + 1, sections.length - 1))}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
