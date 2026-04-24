import { motion, useScroll, useTransform } from "framer-motion";
import {
  BellRing,
  CalendarCheck2,
  ChevronRight,
  Gavel,
  Search,
  ShieldCheck,
} from "lucide-react";
import { type RefObject, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PortalCardsProps {
  onBookAppointment: () => void;
  scrollContainerRef: RefObject<HTMLDivElement>;
}

const portalCards = [
  {
    id: "appointments",
    title: "Smart Appointments",
    subtitle: "Real-time booking UI",
    eyebrow: "Public Portal",
    icon: CalendarCheck2,
    accent: "from-gold/30 via-white to-white",
  },
  {
    id: "tracker",
    title: "Case Tracker",
    subtitle: "Public-safe status visibility",
    eyebrow: "Trust Layer",
    icon: Search,
    accent: "from-navy/10 via-white to-white",
  },
  {
    id: "judges",
    title: "Judges Directory",
    subtitle: "Filterable profile cards",
    eyebrow: "Decision Support",
    icon: Gavel,
    accent: "from-gold/20 via-white to-white",
  },
  {
    id: "notice-board",
    title: "Notice Board",
    subtitle: "Urgent legal updates",
    eyebrow: "Live Operations",
    icon: BellRing,
    accent: "from-navy/10 via-white to-white",
  },
] as const;

function PortalCard({
  index,
  scrollYProgress,
  onBookAppointment,
}: {
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  onBookAppointment: () => void;
}) {
  const card = portalCards[index];
  const Icon = card.icon;
  const y = useTransform(scrollYProgress, [0, 1], [200 + index * 90, index * 18]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1 - index * 0.035]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -7 : 7, index * 1.6 - 2.2],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.18, 1], [0, 0.9, 1]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        y,
        scale,
        rotate,
        opacity,
        zIndex: portalCards.length - index,
      }}
    >
      <Card className="h-full overflow-hidden rounded-[34px] border border-navy/8 bg-gradient-to-br shadow-[0_32px_120px_rgba(11,31,58,0.2)]">
        <CardContent className="flex h-full flex-col justify-between gap-5 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.34em] text-navy/45">
                {card.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold text-navy">
                {card.title}
              </h3>
              <p className="mt-2 max-w-md text-sm text-navy/65">{card.subtitle}</p>
            </div>
            <div className="rounded-2xl border border-gold/40 bg-gold/10 p-3 text-gold">
              <Icon className="h-5 w-5" />
            </div>
          </div>

          {card.id === "appointments" && (
            <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
              <div className="rounded-[26px] border border-gold/30 bg-paper/85 p-5">
                <div className="flex items-center justify-between text-sm text-navy/70">
                  <span>Available slots</span>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-700">
                    Live sync
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  {["09:30", "11:00", "14:15", "16:30", "17:00", "18:15"].map((slot, slotIndex) => (
                    <div
                      key={slot}
                      className={cn(
                        "rounded-2xl border px-3 py-4 text-center transition",
                        slotIndex === 2
                          ? "border-gold bg-gold/10 text-navy"
                          : "border-navy/10 bg-white text-navy/75",
                      )}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-[26px] border border-navy/10 bg-navy p-5 text-paper">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-paper/55">
                    Concierge Booking
                  </p>
                  <p className="mt-4 text-2xl font-semibold">Priority client intake</p>
                  <p className="mt-2 text-sm text-paper/70">
                    Route the request to the correct practice team in under 30 seconds.
                  </p>
                </div>
                <Button variant="gold" className="mt-5 self-start" onClick={onBookAppointment}>
                  Book Appointment
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {card.id === "tracker" && (
            <div className="rounded-[26px] border border-navy/10 bg-white/85 p-5">
              <label className="text-xs uppercase tracking-[0.28em] text-navy/45">
                Search case number
              </label>
              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-navy/10 bg-paper px-4 py-4">
                <Search className="h-4 w-4 text-navy/40" />
                <span className="text-sm text-navy/55">SEC/2026/0418</span>
                <span className="ml-auto rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-navy">
                  Public-safe
                </span>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {[
                  ["Current status", "Listed for Mention"],
                  ["Court hall", "Court Hall 3"],
                  ["Next event", "29 Apr, 10:30 IST"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-navy/10 bg-paper p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-navy/45">{label}</p>
                    <p className="mt-3 text-sm font-semibold text-navy">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {card.id === "judges" && (
            <div className="grid gap-4">
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-navy/55">
                {["Civil", "Tax", "Corporate", "Constitutional"].map((tag, tagIndex) => (
                  <span
                    key={tag}
                    className={cn(
                      "rounded-full border px-3 py-2",
                      tagIndex === 2
                        ? "border-gold bg-gold/10 text-navy"
                        : "border-navy/10 bg-white/85",
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ["Justice A. Raman", "Commercial Bench", "98% hearing punctuality"],
                  ["Justice L. Sen", "Tax Division", "Gold-border featured profile"],
                ].map(([name, role, detail]) => (
                  <div
                    key={name}
                    className="rounded-[26px] border border-gold/35 bg-white/85 p-5 shadow-[0_12px_40px_rgba(201,162,39,0.08)]"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display text-xl font-semibold text-navy">{name}</p>
                        <p className="mt-1 text-sm text-navy/60">{role}</p>
                      </div>
                      <ShieldCheck className="h-5 w-5 text-gold" />
                    </div>
                    <p className="mt-5 text-sm text-navy/70">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {card.id === "notice-board" && (
            <div className="overflow-hidden rounded-[26px] border border-navy/10 bg-white/85 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-navy/45">Urgent legal updates</p>
              <div className="mt-4 overflow-hidden rounded-2xl bg-navy py-4 text-paper">
                <div className="flex w-[200%] gap-8 animate-marquee whitespace-nowrap text-sm">
                  {[
                    "Court Hall 2 shifted to hybrid mode",
                    "Registry closes 17:30 IST on Friday",
                    "Arbitration filing window extended",
                    "Urgent listing protocol active",
                    "Certified copies delivery in 24 hours",
                  ]
                    .concat([
                      "Court Hall 2 shifted to hybrid mode",
                      "Registry closes 17:30 IST on Friday",
                      "Arbitration filing window extended",
                      "Urgent listing protocol active",
                      "Certified copies delivery in 24 hours",
                    ])
                    .map((item, itemIndex) => (
                      <span key={`${item}-${itemIndex}`} className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-gold" />
                        {item}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function PortalCards({
  onBookAppointment,
  scrollContainerRef,
}: PortalCardsProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className="relative grid h-full items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-5">
        <p className="text-xs uppercase tracking-[0.36em] text-gold">
          Slide 02 / The Public Portal
        </p>
        <h2 className="font-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
          Public-facing trust tools, presented as a premium legal concierge.
        </h2>
        <p className="max-w-xl text-base leading-7 text-navy/65">
          Each interface block resolves a real bottleneck: appointment intake, matter visibility,
          decision-maker discovery, and time-sensitive notices. The stack compresses four public
          workflows into one elegant narrative.
        </p>
      </div>

      <div className="relative mx-auto h-[560px] w-full max-w-[720px]">
        {portalCards.map((card, index) => (
          <PortalCard
            key={card.id}
            index={index}
            scrollYProgress={scrollYProgress}
            onBookAppointment={onBookAppointment}
          />
        ))}
      </div>
    </div>
  );
}
