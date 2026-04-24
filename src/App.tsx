import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Command,
  MoveDown,
  Scale,
  Sparkles,
} from "lucide-react";
import {
  Suspense,
  lazy,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PortalCards } from "@/components/PortalCards";
import { SectionNavigation } from "@/components/SectionNavigation";
import { TextPressure } from "@/components/TextPressure";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

const JusticeClock = lazy(async () => {
  const module = await import("@/components/JusticeClock");
  return { default: module.JusticeClock };
});

const LawyerCockpit = lazy(async () => {
  const module = await import("@/components/LawyerCockpit");
  return { default: module.LawyerCockpit };
});

const ArchitectureJourney = lazy(async () => {
  const module = await import("@/components/ArchitectureJourney");
  return { default: module.ArchitectureJourney };
});

const sections = [
  { id: "vision", label: "Vision" },
  { id: "portal", label: "Portal" },
  { id: "justice-clock", label: "Justice Clock" },
  { id: "management", label: "Management" },
  { id: "architecture", label: "Architecture" },
  { id: "summary", label: "Summary" },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function SectionShell({
  children,
  className,
  sectionRef,
}: {
  children: ReactNode;
  className?: string;
  sectionRef?: (element: HTMLElement | null) => void;
}) {
  return (
    <section
      ref={sectionRef}
      data-scroll-section="true"
      className={`relative h-screen w-screen snap-start overflow-hidden ${className ?? ""}`}
    >
      {children}
    </section>
  );
}

function SlideFallback({ inverse = false }: { inverse?: boolean }) {
  return (
    <div
      className={`flex h-full items-center justify-center ${
        inverse ? "text-white/70" : "text-navy/65"
      }`}
    >
      <div
        className={`rounded-full border px-5 py-3 text-xs uppercase tracking-[0.3em] ${
          inverse ? "border-white/10 bg-white/5" : "border-navy/10 bg-white/75"
        }`}
      >
        Preparing slide
      </div>
    </div>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const activeIndexRef = useRef(0);
  const wheelLockRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [launchComplete, setLaunchComplete] = useState(false);

  const navigateTo = (index: number) => {
    const nextIndex = clamp(index, 0, sections.length - 1);
    const container = containerRef.current;
    const target = sectionRefs.current[nextIndex];
    if (!container || !target) {
      return;
    }

    container.scrollTo({
      top: target.offsetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleScroll = () => {
      const index = Math.round(container.scrollTop / container.clientHeight);
      activeIndexRef.current = index;
      setActiveIndex(index);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement | null;
      const nestedScroller = target?.closest<HTMLElement>("[data-nested-scroll='true']");

      if (nestedScroller) {
        const atTop = nestedScroller.scrollTop <= 0;
        const atBottom =
          nestedScroller.scrollTop + nestedScroller.clientHeight >=
          nestedScroller.scrollHeight - 1;

        if ((event.deltaY < 0 && !atTop) || (event.deltaY > 0 && !atBottom)) {
          return;
        }
      }

      if (Math.abs(event.deltaY) < 20 || wheelLockRef.current) {
        return;
      }

      event.preventDefault();
      wheelLockRef.current = true;
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 850);

      const direction = event.deltaY > 0 ? 1 : -1;
      navigateTo(activeIndexRef.current + direction);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /input|textarea|select/i.test(target.tagName)) {
        return;
      }

      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        navigateTo(activeIndexRef.current + 1);
      }

      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        navigateTo(activeIndexRef.current - 1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        navigateTo(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        navigateTo(sections.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const appointmentSlots = useMemo(
    () => ["29 Apr, 09:30", "29 Apr, 11:00", "30 Apr, 14:15", "30 Apr, 17:00"],
    [],
  );

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-paper text-navy">
      <SectionNavigation
        activeIndex={activeIndex}
        onNavigate={navigateTo}
        sections={sections.map((section) => ({ id: section.id, label: section.label }))}
      />

      <div className="fixed bottom-6 left-6 z-40 hidden items-center gap-3 rounded-full border border-navy/10 bg-white/75 px-4 py-3 text-xs uppercase tracking-[0.24em] text-navy/55 shadow-[0_18px_60px_rgba(11,31,58,0.12)] backdrop-blur-xl lg:flex">
        <Command className="h-4 w-4 text-gold" />
        Use arrow keys or the Up/Down controls to present
      </div>

      <div
        ref={containerRef}
        className="story-container relative h-screen w-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden scroll-smooth"
      >
        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[0] = element;
          }}
          className="bg-navy"
        >
          <div className="architectural-loop" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,162,39,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_20%)]" />
          <div className="relative flex h-full flex-col justify-between px-6 py-7 sm:px-10 lg:px-16 lg:py-10">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/60">
                <Building2 className="h-4 w-4 text-gold" />
                Sterling Equity Chambers
              </div>
              <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/55 lg:inline-flex">
                Premium Scroll Story Prototype
              </div>
            </div>

            <div className="grid flex-1 items-center">
              <div className="max-w-6xl">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55 }}
                  className="mb-6 text-xs uppercase tracking-[0.42em] text-gold/85"
                >
                  Slide 01 / The Vision
                </motion.p>
                <TextPressure
                  text="EQUITY. AUTHORITY. MODERNITY."
                  className="max-w-6xl font-pressure text-[clamp(2.6rem,7vw,7.2rem)] font-semibold uppercase leading-[0.92] tracking-[0.12em]"
                />
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.25 }}
                  className="mt-10 max-w-2xl"
                >
                  <h1 className="font-display text-3xl leading-tight text-white md:text-4xl">
                    Reimagining the Digital Infrastructure for Sterling Equity Chambers.
                  </h1>
                  <p className="mt-5 text-base leading-8 text-white/72">
                    A boardroom-grade presentation layer that proves a premium law firm can feel as
                    authoritative as the courtroom and as modern as a high-performance fintech product.
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/55">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3">
                <Scale className="h-4 w-4 text-gold" />
                Motion-led legal storytelling
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3">
                <MoveDown className="h-4 w-4 text-gold" />
                Variable font response on mouse pressure
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[1] = element;
          }}
          className="bg-paper px-6 py-7 sm:px-10 lg:px-16 lg:py-10"
        >
          <PortalCards
            onBookAppointment={() => setAppointmentOpen(true)}
            scrollContainerRef={containerRef}
          />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[2] = element;
          }}
          className="bg-midnight px-6 py-7 sm:px-10 lg:px-16 lg:py-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,162,39,0.15),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(71,99,153,0.18),transparent_20%)]" />
          <div
            data-nested-scroll="true"
            className="nested-scroll relative h-full overflow-y-auto pr-1 lg:overflow-visible lg:pr-0"
          >
            <Suspense fallback={<SlideFallback inverse />}>
              <JusticeClock />
            </Suspense>
          </div>
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[3] = element;
          }}
          className="bg-paper"
        >
          <Suspense fallback={<SlideFallback />}>
            <LawyerCockpit />
          </Suspense>
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[4] = element;
          }}
          className="section-grid bg-paper px-6 py-7 sm:px-10 lg:px-16 lg:py-10"
        >
          <Suspense fallback={<SlideFallback />}>
            <ArchitectureJourney />
          </Suspense>
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[5] = element;
          }}
          className="story-gradient px-6 py-7 sm:px-10 lg:px-16 lg:py-10"
        >
          <div className="relative flex h-full flex-col justify-between">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.36em] text-gold">
                  Slide 06 / Summary & Contact
                </p>
                <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-navy md:text-6xl">
                  Future-
                  <span className="relative inline-block px-1">
                    Proof
                    <svg
                      className="pointer-events-none absolute -bottom-4 left-0 w-full"
                      viewBox="0 0 220 40"
                      fill="none"
                    >
                      <motion.path
                        d="M 8 24 C 58 38, 118 6, 210 20"
                        stroke="#C9A227"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray="180"
                        initial={{ strokeDashoffset: 180 }}
                        whileInView={{ strokeDashoffset: 0 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 1.1, ease: "easeInOut" }}
                      />
                    </svg>
                  </span>
                  legal infrastructure designed for trust, speed, and institutional prestige.
                </h2>
                <p className="mt-8 max-w-2xl text-base leading-8 text-navy/68">
                  This one-page app is the proof that a React and Vite presentation layer can carry
                  serious legal information architecture without lag. It is a functional prototype,
                  not a brochure.
                </p>
              </div>

              <div className="grid gap-5">
                <Card className="bg-white/82">
                  <CardContent className="p-6">
                    <p className="text-xs uppercase tracking-[0.28em] text-gold">
                      What the board sees
                    </p>
                    <div className="mt-5 grid gap-4">
                      {[
                        "Public portal clarity",
                        "Justice Clock confidence",
                        "Internal security logic",
                        "Resilient data backbone",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-2xl border border-navy/10 bg-paper px-4 py-4 text-sm text-navy">
                          <CheckCircle2 className="h-4 w-4 text-gold" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-navy text-paper">
                  <CardContent className="p-6">
                    <p className="text-xs uppercase tracking-[0.28em] text-paper/45">
                      Contact Layer
                    </p>
                    <p className="mt-4 font-display text-3xl">Partner with the firm on launch readiness.</p>
                    <p className="mt-4 text-sm leading-7 text-paper/72">
                      Position the final product as an institutional platform, not a typical legal website.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button variant="gold" onClick={() => setLaunchComplete(true)}>
                        Launch System
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" onClick={() => setAppointmentOpen(true)}>
                        Book Appointment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid gap-4 pt-8 sm:grid-cols-3">
              {[
                "Presenter note: use the Up/Down keys instead of passive scrolling.",
                "Call out React/Vite/Framer as proof of high-performance UI delivery.",
                "Pause on the Justice Clock. That is where legal stakeholders tend to lean in.",
              ].map((item) => (
                <div key={item} className="rounded-[24px] border border-navy/10 bg-white/70 px-5 py-5 text-sm leading-7 text-navy/72">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </SectionShell>
      </div>

      <Dialog open={appointmentOpen} onOpenChange={setAppointmentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              Prototype booking flow for the public concierge layer. In production this would route
              into scheduling, conflict checks, and intake automation.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-navy/10 bg-white px-4 py-4">
                <p className="text-xs uppercase tracking-[0.22em] text-navy/45">Practice Area</p>
                <p className="mt-3 text-sm text-navy">Commercial Litigation</p>
              </div>
              <div className="rounded-[24px] border border-navy/10 bg-white px-4 py-4">
                <p className="text-xs uppercase tracking-[0.22em] text-navy/45">Response SLA</p>
                <p className="mt-3 text-sm text-navy">Under 30 minutes</p>
              </div>
            </div>

            <div className="rounded-[28px] border border-gold/25 bg-gold/10 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-navy/50">Available consultation slots</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {appointmentSlots.map((slot, index) => (
                  <button
                    key={slot}
                    type="button"
                    className={`rounded-2xl border px-4 py-4 text-left text-sm transition ${
                      index === 1
                        ? "border-gold bg-white text-navy shadow-[0_16px_50px_rgba(201,162,39,0.16)]"
                        : "border-navy/10 bg-white/85 text-navy/70"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="gold" onClick={() => setAppointmentOpen(false)}>
                Confirm Prototype Flow
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {launchComplete ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy/85 px-6 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.92, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl rounded-[36px] border border-gold/35 bg-[linear-gradient(135deg,rgba(11,31,58,0.95),rgba(8,18,33,0.98))] p-8 text-center text-paper shadow-[0_30px_120px_rgba(11,31,58,0.4)]"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/35 bg-gold/10 text-gold">
                <Sparkles className="h-7 w-7" />
              </div>
              <p className="mt-6 text-xs uppercase tracking-[0.34em] text-gold/85">System Ready</p>
              <h3 className="mt-4 font-display text-5xl font-semibold text-white">Thank You</h3>
              <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-paper/72">
                The scroll-story has completed. What remains is turning this presentation layer into
                the firm&apos;s fully deployed digital operating system.
              </p>
              <div className="mt-8 flex justify-center">
                <Button variant="gold" onClick={() => setLaunchComplete(false)}>
                  Return to Experience
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
