import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Database,
  FileText,
  LayoutDashboard,
  LockKeyhole,
  MessageSquareText,
  Monitor,
  NotebookPen,
  PhoneCall,
  Scale,
  Search,
  ShieldCheck,
  Users2,
  Users,
  Workflow,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import portraitImage from "@/media/attendence/employee_attendence_view_portrait.png";
import slide1 from "@/media/lawyer/slide-1.jpg";
import slide3 from "@/media/lawyer/slide-3.jpg";
import slide8 from "@/media/lawyer/slide-8.jpg";
import slide10 from "@/media/lawyer/slide-10.jpg";
import slide17Hero from "@/media/lawyer/slide-17.jpg";
import slide21Hero from "@/media/lawyer/slide-21.jpg";
import slide24Hero from "@/media/lawyer/slide-24.jpg";
import { cn } from "@/lib/utils";
import iphoneFrame from "../../iphone_placeholder.png";

const slideMeta = [
  {
    id: "wait",
    label: "Please Wait",
    script:
      "Good evening everyone. Thank you for giving us your valuable time and this opportunity. We will begin shortly.",
  },
  {
    id: "title",
    label: "Smarter Legal Workplace",
    script:
      "Good evening everyone. Today we are presenting two connected solutions for Bedi & Associates. First, a legal platform to improve legal operations. Second, an attendance software to improve internal office management. Together, both systems bring clarity, control, transparency, and trust.",
  },
  {
    id: "solutions",
    label: "Two Connected Solutions",
    script:
      "Simple words mein, first system legal work manage karega, second system office work manage karega. Legal platform se legal work smart hoga, attendance software se office work clear hoga.",
  },
  {
    id: "public-website",
    label: "Public Website",
    script:
      "First, let us talk about the public website. Website is the front door of the legal platform. When a user comes here, they should immediately know where to go and what to do. The goal is simple: fast, clean, and easy access. User ko information ke liye idhar-udhar bhatakna nahi chahiye.",
  },
  {
    id: "case-status",
    label: "Case Status Search",
    script:
      "Now inside the public website, one of the most useful features is case status search. Client baar-baar lawyer ko call karta hai: Sir, mera case ka kya hua? Sir, next date kab hai? Sir, bail mili ya nahi? This feature reduces that pressure. Client can search using case title, case number, advocate name, filing number, or judge-wise search. Result clear format mein mil jayega, so lawyer ka time bachega and client ko clarity milegi.",
  },
  {
    id: "justice-clock",
    label: "Justice Clock",
    script:
      "Justice Clock is not just a display. It is a transparency and accountability tool. It shows data like cases filed, cases disposed, pending cases, and performance trends. Matlab numbers sirf dikhane ke liye nahi hain, leadership ko samajhne ke liye hain ki attention kaha chahiye.",
  },
  {
    id: "appointments",
    label: "Appointment Booking",
    script:
      "Next feature is appointment booking. Agar ek lawyer ke paas ek din mein 10 clients aa gaye, toh lawyer bhi sochega: Main lawyer hu ki receptionist? Mujhe kyu itne calls handle karne pad rahe hain? With this system, client can select advocate, purpose, date, time slot, and confirm booking. No unnecessary calls, no WhatsApp confusion, no 'sir bas 5 minute milna tha' pressure.",
  },
  {
    id: "lawyer-dashboard",
    label: "Lawyer Dashboard",
    script:
      "Lawyer dashboard is a personal workspace for advocates. Yahan lawyer assigned cases, hearing dates, documents, notes, and client instructions dekh sakta hai. Legal work mein confidentiality very important hai. Har cheez har kisi ko nahi dikhni chahiye. Simple rule is: right person, right access, nothing extra.",
  },
  {
    id: "admin",
    label: "Admin Dashboard",
    script:
      "Now comes the admin dashboard. Simple Hindi mein bolein toh, yeh chief ka adda hai. But presentation-friendly language mein, this is the control center. Admin can manage users, assign roles, control appointments, update notices, and manage Justice Clock data. This is not for unnecessary micromanagement. This is for visibility, accountability, and better control.",
  },
  {
    id: "attendance-intro",
    label: "Attendance Introduction",
    script:
      "Before we show the attendance software, this transition explains the backend idea. Check-ins, breaks, approvals, and analytics should move through one secure system, so management gets clarity without manual chasing.",
  },
  {
    id: "attendance",
    label: "Attendance Software",
    script:
      "Attendance software ka purpose simple hai. Employee easily clock in kare, break mark kare, day end mein clock out kare. Admin ko clear data mile: kisne kab clock in kiya, kitne hours kaam kiya, break kitna liya, late entry hui ya nahi, overtime hua ya nahi. Yeh surveillance tool nahi hai. It is a support system.",
  },
  {
    id: "reminders",
    label: "Reminders",
    script:
      "Attendance software mein ek aur useful feature hoga: reminders. Employee ya lawyer task add kar sakta hai, due date set kar sakta hai, aur system kitni baar remind kare woh bhi decide kar sakta hai. Senior lawyers expect karte hain ki junior lawyer ko sab kuch yaad rahe. Lekin reality ye hai ki yahan banda girlfriend ka birthday yaad nahi rakhta, aur senior expect karte hain ki 15 case dates, 20 documents, aur 5 client follow-ups yaad rahe. Isiliye reminders rakhe hain. Reminder system memory ka backup hai.",
  },
  {
    id: "benefits",
    label: "Why This Matters",
    script:
      "Attendance important kyu hai? Agar attendance clear nahi hai, salary calculation mein issue aa sakta hai. Work hours clear nahi hain, toh overtime ka confusion ho sakta hai. Month end mein employee Apple kharidne ka soch raha hota hai, salary galat calculate hui toh Apple chhodo, banana bhi expensive lagne lagta hai. Chief ke paas already 100 kaam hote hain. Woh aisa toh nahi sochenge: Rahul recently join hua hai, kahin overtime toh nahi kar raha? Chalo personally check karta hoon. Isiliye system chahiye.",
  },
  {
    id: "final",
    label: "Final Vision",
    script:
      "So to summarize, today we presented two connected solutions. First, the Legal Platform, which improves legal access, case status search, appointments, lawyer workspace, collaboration, and admin control. Second, the Attendance Software, which improves attendance, work hours, breaks, reminders, notifications, and internal management. Together, both systems help Bedi & Associates become more organized, transparent, accountable, and professional. This is not just about software. It is about building a smarter legal workplace. Thank you.",
  },
] as const;

type SlideId = (typeof slideMeta)[number]["id"];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function useSequencedStep(active: boolean, total: number, delayMs: number, loop = false) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) {
      setStep(0);
      return;
    }

    if (reduceMotion) {
      setStep(total - 1);
      return;
    }

    setStep(0);
    let current = 0;
    const timer = window.setInterval(() => {
      current += 1;
      if (current >= total) {
        if (loop) {
          current = 0;
        } else {
          current = total - 1;
          window.clearInterval(timer);
        }
      }

      setStep(current);
    }, delayMs);

    return () => window.clearInterval(timer);
  }, [active, delayMs, loop, reduceMotion, total]);

  return step;
}

function useTypedText(text: string, active: boolean, charactersPerTick = 2) {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!active) {
      setTyped("");
      return;
    }

    if (reduceMotion) {
      setTyped(text);
      return;
    }

    let index = 0;
    setTyped("");
    const timer = window.setInterval(() => {
      index = Math.min(index + charactersPerTick, text.length);
      setTyped(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, 42);

    return () => window.clearInterval(timer);
  }, [active, charactersPerTick, reduceMotion, text]);

  return typed;
}

function useCountUp(target: number, active: boolean, duration = 1400) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    if (reduceMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, reduceMotion, target]);

  return value;
}

function SectionShell({
  children,
  className,
  sectionRef,
  testId,
}: {
  children: ReactNode;
  className?: string;
  sectionRef?: (element: HTMLElement | null) => void;
  testId: string;
}) {
  return (
    <section
      ref={sectionRef}
      data-scroll-section="true"
      data-testid={testId}
      className={cn("relative h-screen w-screen snap-start overflow-hidden", className)}
    >
      {children}
    </section>
  );
}

function StageBackdrop({
  active,
  image,
  overlayClassName,
  children,
}: {
  active: boolean;
  image?: string;
  overlayClassName?: string;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative h-full overflow-hidden bg-[#050403]">
      {image ? (
        <motion.img
          src={image}
          alt=""
          aria-hidden="true"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0.9, scale: 1.06 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.92, scale: 1.03 }}
          transition={{ duration: reduceMotion ? 0 : 1.4, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="library-backdrop absolute inset-0" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,0.95)_0%,rgba(8,7,6,0.86)_42%,rgba(5,4,3,0.72)_100%)]" />
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,162,39,0.12),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(74,43,27,0.24),transparent_28%)]",
          overlayClassName,
        )}
      />
      <div className="absolute inset-0 bg-grain opacity-[0.04] [background-size:10px_10px]" />
      {children}
    </div>
  );
}

function TopPill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[rgba(185,130,69,0.24)] bg-[rgba(17,10,6,0.76)] px-4 py-2 text-[0.72rem] uppercase tracking-[0.24em] text-[#F3E7D3] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SlideHeading({
  kicker,
  title,
  subtitle,
  eyebrow,
  align = "left",
  compact = false,
  size = "hero",
}: {
  kicker: string;
  title: ReactNode;
  subtitle: string;
  eyebrow?: string;
  align?: "left" | "center";
  compact?: boolean;
  size?: "hero" | "standard";
}) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("flex flex-col", alignment)}
    >
      <div className="inline-flex w-max items-center rounded-full border border-[rgba(214,161,92,0.34)] bg-[rgba(214,161,92,0.14)] px-4 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.28em] text-[#FFE6B8] shadow-[0_0_30px_rgba(214,161,92,0.12)]">
        {kicker}
      </div>
      {eyebrow ? <p className="mt-4 text-sm tracking-[0.08em] text-[#F3E7D3]">{eyebrow}</p> : null}
      <h2
        className={cn(
          "mt-5 font-display font-semibold leading-[0.92] text-[#F6E9D6] [text-shadow:0_2px_18px_rgba(0,0,0,0.32)]",
          compact
            ? "max-w-[14ch] text-[clamp(2.7rem,4.4vw,4.75rem)]"
            : size === "standard"
              ? "max-w-[15ch] text-[clamp(2.55rem,4vw,4.4rem)]"
              : "max-w-[12ch] text-[clamp(3rem,5vw,5.35rem)]",
        )}
      >
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[#D8C7B2] sm:text-lg">{subtitle}</p>
    </motion.div>
  );
}

function DemoPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-[rgba(185,130,69,0.3)] bg-[rgba(17,10,6,0.78)] p-5 shadow-[0_32px_110px_rgba(17,10,6,0.42)] backdrop-blur-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

function DemoBadge({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full border border-[rgba(185,130,69,0.22)] bg-[rgba(42,23,16,0.68)] px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-[#F3E7D3]",
        className,
      )}
    >
      {label}
    </span>
  );
}

function CountText({
  target,
  active,
  suffix = "",
}: {
  target: number;
  active: boolean;
  suffix?: string;
}) {
  const value = useCountUp(target, active);
  return <>{`${value}${suffix}`}</>;
}

function useAutoCarousel(
  active: boolean,
  total: number,
  delayMs = 5000,
  firstAdvanceDelayMs = delayMs,
) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      setIndex(0);
      return;
    }

    if (reduceMotion) {
      setIndex(0);
      return;
    }

    setIndex(0);

    const scheduleAdvance = (waitMs: number) => {
      timeoutRef.current = window.setTimeout(() => {
        setIndex((current) => (current + 1) % total);
        scheduleAdvance(delayMs);
      }, waitMs);
    };

    scheduleAdvance(firstAdvanceDelayMs);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [active, delayMs, firstAdvanceDelayMs, reduceMotion, total]);

  useEffect(() => {
    if (!active || total <= 1) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /input|textarea|select/i.test(target.tagName)) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((current) => (current - 1 + total) % total);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((current) => (current + 1) % total);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, total]);

  const goTo = (next: number) => setIndex(((next % total) + total) % total);
  const goPrev = () => setIndex((current) => (current - 1 + total) % total);
  const goNext = () => setIndex((current) => (current + 1) % total);

  return { index, goTo, goPrev, goNext };
}

function StoryControls({
  activeIndex,
  total,
  onPrev,
  onNext,
  onSelect,
}: {
  activeIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-5 flex items-center justify-end">
      <div className="flex min-w-[180px] items-center gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "h-2 rounded-full transition-all",
              index === activeIndex ? "flex-[1.45] bg-[#D6A15C]" : "flex-1 bg-[rgba(214,161,92,0.28)]",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function BrowserChrome({
  children,
  badge,
  className,
}: {
  children: ReactNode;
  badge?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[24px] border border-[rgba(185,130,69,0.18)] bg-[rgba(11,8,6,0.72)] p-4", className)}>
      <div className="flex items-center justify-between gap-4 rounded-[18px] border border-[rgba(185,130,69,0.16)] bg-[rgba(42,23,16,0.5)] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#C96D50]" />
            <span className="h-3 w-3 rounded-full bg-[#D6A15C]" />
            <span className="h-3 w-3 rounded-full bg-[#4ADE80]" />
          </div>
          <p className="text-sm tracking-[0.18em] text-[#F3E7D3]">justice.bediandassociates.in</p>
        </div>
        {badge ? <TopPill className="px-3 py-1.5 text-[0.62rem]">{badge}</TopPill> : null}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function PhoneFrame({
  children,
  label,
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="relative mx-auto h-[552px] w-[292px] shrink-0">
      <div className="absolute left-[15px] top-[52px] h-[466px] w-[262px] rounded-[40px] bg-[#0b0a0e] shadow-[0_30px_90px_rgba(0,0,0,0.42)]" />
      <img
        src={iphoneFrame}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full select-none object-contain"
      />
      <div className="absolute left-[24px] top-[56px] z-10 flex h-[462px] w-[244px] flex-col overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,#171622_0%,#09090f_100%)] p-3">
        {label ? (
          <p className="mb-3 shrink-0 text-center text-[0.62rem] uppercase tracking-[0.22em] text-[#AFA7BC]">
            {label}
          </p>
        ) : null}
        <div className="min-h-0 flex-1 overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#1b1a26_0%,#101018_100%)] p-3">
          {children}
        </div>
      </div>
    </div>
  );
}

function WaitingSlide({ active }: { active: boolean }) {
  const quotes = useMemo(
    () => [
      "Objection, Your Honour… presentation abhi start bhi nahi hui.",
      "Lawyers don't argue. They explain why they are right.",
      "Court mein silence chahiye, presentation mein attention.",
      "Jab baat court mein solve ho sakti hai, toh pyaar se kyun karni?",
    ],
    [],
  );
  const reduceMotion = useReducedMotion();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    if (!active) {
      setQuoteIndex(0);
      return;
    }

    if (reduceMotion) {
      setQuoteIndex(0);
      return;
    }

    const timer = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % quotes.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [active, quotes.length, reduceMotion]);

  return (
    <StageBackdrop active={active} image={slide1}>
      <div className="relative grid h-full px-6 py-8 sm:px-10 lg:grid-cols-[0.88fr_1.12fr] lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <TopPill className="w-max">Bedi & Associates</TopPill>
          <motion.h1
            initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
            animate={active ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.72, delay: 0.12 }}
            className="mt-8 max-w-[11ch] font-display text-[clamp(3.4rem,6vw,6rem)] font-semibold leading-[0.9] text-[#F3E7D3]"
          >
            Please Wait… Court Is Almost In Session
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="mt-6 max-w-xl text-lg leading-8 text-[#D8C7B2]"
          >
            Presentation starting shortly.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={active ? { opacity: 0.86, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.34 }}
            className="mt-8 text-sm tracking-[0.16em] text-[rgba(214,161,92,0.92)]"
          >
            Premium legal-tech demo for Bedi & Associates
          </motion.p>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <DemoPanel className="w-full max-w-[620px] p-6">
            <div className="grid gap-6 md:grid-cols-[0.84fr_1.16fr] md:items-center">
              <div className="rounded-[26px] border border-[rgba(185,130,69,0.18)] bg-[rgba(17,10,6,0.68)] p-5">
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Loading Courtroom</p>
                <div className="relative mt-5 flex h-[250px] items-center justify-center overflow-hidden rounded-[24px] border border-[rgba(185,130,69,0.14)] bg-[radial-gradient(circle_at_top,rgba(214,161,92,0.18),transparent_40%),rgba(42,23,16,0.6)]">
                  <div className="absolute inset-x-8 bottom-7 h-px bg-[linear-gradient(90deg,transparent,rgba(214,161,92,0.6),transparent)]" />
                  <motion.div
                    animate={active ? { rotate: [0, 180, 180, 360] } : {}}
                    transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="relative h-[182px] w-[112px]"
                  >
                    <div className="absolute inset-x-0 top-0 mx-auto h-[74px] w-[74px] overflow-hidden border border-[rgba(214,161,92,0.34)] bg-[rgba(246,233,214,0.06)]"
                      style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                    >
                      <motion.div
                        animate={active ? { height: ["88%", "16%", "88%"] } : {}}
                        transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,#E0B56B_0%,#A7652D_100%)]"
                      />
                    </div>
                    <div className="absolute left-1/2 top-[62px] h-[60px] w-[6px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(246,233,214,0.36),rgba(214,161,92,0.9),rgba(246,233,214,0.18))]" />
                    <motion.div
                      animate={active ? { opacity: [0.18, 0.95, 0.18], scaleY: [0.68, 1.14, 0.68] } : {}}
                      transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="absolute left-1/2 top-[74px] h-[40px] w-[3px] -translate-x-1/2 rounded-full bg-[#E0B56B]"
                    />
                    <div className="absolute inset-x-0 bottom-0 mx-auto h-[74px] w-[74px] overflow-hidden border border-[rgba(214,161,92,0.34)] bg-[rgba(246,233,214,0.06)]"
                      style={{ clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)" }}
                    >
                      <motion.div
                        animate={active ? { height: ["18%", "82%", "18%"] } : {}}
                        transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,#D89A52_0%,#8A4C1C_100%)]"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Warm-up Quote</p>
                <div className="mt-5 min-h-[200px] rounded-[24px] border border-[rgba(185,130,69,0.18)] bg-[rgba(42,23,16,0.56)] p-6">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={quotes[quoteIndex]}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.28 }}
                      className="font-display text-[clamp(1.8rem,2.6vw,2.7rem)] leading-tight text-[#F3E7D3]"
                    >
                      {quotes[quoteIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              {quotes.map((quote, index) => (
                <motion.span
                  key={quote}
                  animate={{ opacity: index === quoteIndex ? 1 : 0.35, scale: index === quoteIndex ? 1 : 0.92 }}
                  className="h-2.5 flex-1 rounded-full bg-[rgba(214,161,92,0.78)]"
                />
              ))}
            </div>
          </DemoPanel>
        </div>
      </div>
    </StageBackdrop>
  );
}

function TitleSlide({ active }: { active: boolean }) {
  return (
    <StageBackdrop active={active} image={slide1}>
      <div className="relative grid h-full gap-10 px-6 py-8 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <SlideHeading
            kicker="Vision"
            eyebrow="Bedi & Associates"
            title="Building a Smarter Legal Workplace"
            subtitle="Legal Platform + Attendance Software for Bedi & Associates"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={active ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.62, delay: 0.16 }}
          className="grid gap-4 md:grid-cols-2"
        >
          <DemoPanel className="p-5">
            <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Legal Platform</p>
            <p className="mt-4 text-2xl font-semibold text-[#F3E7D3]">Client access, case visibility, lawyer workflow.</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {["Public Access", "Case Search", "Appointments", "Lawyer Workspace"].map((item) => (
                <DemoBadge key={item} label={item} />
              ))}
            </div>
          </DemoPanel>
          <DemoPanel className="p-5">
            <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Attendance Software</p>
            <p className="mt-4 text-2xl font-semibold text-[#F3E7D3]">Fair records, reminders, and cleaner office control.</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {["Clock In", "Break Tracking", "Notifications", "Admin Dashboard"].map((item) => (
                <DemoBadge key={item} label={item} />
              ))}
            </div>
          </DemoPanel>
          <DemoPanel className="md:col-span-2 p-5">
            <div className="grid gap-4 md:grid-cols-[0.9fr_auto_0.9fr] md:items-center">
              <div className="rounded-[22px] border border-[rgba(185,130,69,0.18)] bg-[rgba(42,23,16,0.56)] p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-[#D6A15C]">Clarity</p>
                <p className="mt-3 text-base leading-7 text-[#D8C7B2]">
                  Legal operations become easier to search, track, and manage.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="rounded-full border border-[rgba(185,130,69,0.22)] bg-[rgba(17,10,6,0.84)] p-4 text-[#D6A15C]">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
              <div className="rounded-[22px] border border-[rgba(185,130,69,0.18)] bg-[rgba(42,23,16,0.56)] p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-[#D6A15C]">Trust</p>
                <p className="mt-3 text-base leading-7 text-[#D8C7B2]">
                  Internal attendance and reminders become fair, visible, and reliable.
                </p>
              </div>
            </div>
          </DemoPanel>
        </motion.div>
      </div>
    </StageBackdrop>
  );
}

function TwoSolutionsSlide({ active }: { active: boolean }) {
  return (
    <StageBackdrop active={active} image={slide3}>
      <div className="relative flex h-full flex-col justify-center px-6 py-8 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto w-full max-w-[1460px]">
          <SlideHeading
            kicker="Connected Solutions"
            title="Two Systems. One Smarter Workplace."
            subtitle="Legal operations + office operations, connected through smarter systems."
          />

          <div className="relative mt-10 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <DemoPanel className="p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-[rgba(185,130,69,0.26)] bg-[rgba(214,161,92,0.12)] p-3 text-[#D6A15C]">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Legal Platform</p>
                  <p className="mt-1 text-xl font-semibold text-[#F3E7D3]">Smarter legal operations.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Public access", "Case status", "Appointments", "Lawyer workspace", "Admin control"].map((item) => (
                  <div
                    key={item}
                    className="rounded-[18px] border border-[rgba(185,130,69,0.18)] bg-[rgba(42,23,16,0.62)] px-4 py-4 text-sm text-[#F3E7D3]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </DemoPanel>

            <div className="hidden items-center justify-center lg:flex">
              <motion.div
                animate={active ? { scale: [1, 1.04, 1] } : {}}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="rounded-full border border-[rgba(185,130,69,0.26)] bg-[rgba(17,10,6,0.88)] px-6 py-6 text-center shadow-[0_0_70px_rgba(214,161,92,0.12)]"
              >
                <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#D6A15C]">Core Message</p>
                <p className="mt-3 max-w-[12ch] text-xl font-semibold leading-8 text-[#F3E7D3]">
                  Connected through smarter systems.
                </p>
              </motion.div>
            </div>

            <DemoPanel className="p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-[rgba(185,130,69,0.26)] bg-[rgba(214,161,92,0.12)] p-3 text-[#D6A15C]">
                  <Monitor className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Attendance Software</p>
                  <p className="mt-1 text-xl font-semibold text-[#F3E7D3]">Clear office operations.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Clock-in / clock-out", "Break tracking", "Work hours", "Reminders", "Admin dashboard"].map((item) => (
                  <div
                    key={item}
                    className="rounded-[18px] border border-[rgba(185,130,69,0.18)] bg-[rgba(42,23,16,0.62)] px-4 py-4 text-sm text-[#F3E7D3]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </DemoPanel>
          </div>
        </div>
      </div>
    </StageBackdrop>
  );
}

function PublicWebsiteDemoSlide({ active }: { active: boolean }) {
  const quickActions = ["Case Status", "Book Appointment", "Judges", "Judgments", "Notices", "Cause List"];

  return (
    <StageBackdrop active={active} image={slide8}>
      <div className="relative grid h-full gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[0.74fr_1.26fr] lg:items-center lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <SlideHeading
            kicker="Public Website"
            title="The Front Door of the Legal Platform"
            subtitle="Built for fast access, clear navigation, and reduced confusion."
            eyebrow="A proper legal website, not a random card layout."
            compact
          />
          <p className="mt-8 text-sm tracking-[0.08em] text-[rgba(214,161,92,0.92)]">Landscape website feel with real entry points for public users.</p>
        </div>

        <DemoPanel className="p-4">
          <BrowserChrome badge="Public Access">
            <div className="overflow-hidden rounded-[24px] border border-[rgba(185,130,69,0.14)] bg-[linear-gradient(180deg,rgba(250,244,236,0.98)_0%,rgba(243,234,223,0.94)_100%)]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(31,23,17,0.08)] px-5 py-4 text-[#31241B]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2B2F45] text-[#F5D9A3]">
                    <Scale className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#8B5A2B]">Bedi & Associates</p>
                    <p className="mt-1 text-lg font-semibold">Legal Access Portal</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  {["Home", "About Court", "Case Status", "Appointments", "Judgments", "Notices"].map((item) => (
                    <span key={item} className="rounded-full bg-white/72 px-3 py-2 text-[#43322A] shadow-[0_10px_25px_rgba(35,24,16,0.06)]">
                      {item}
                    </span>
                  ))}
                  <span className="rounded-full border border-[#C89B5A] px-3 py-2 font-medium text-[#7C4B29]">EN | HI | MR</span>
                </div>
              </div>

              <div className="grid gap-4 px-5 py-5 xl:grid-cols-[1.12fr_0.88fr]">
                <div className="rounded-[26px] bg-[linear-gradient(135deg,#1B2238_0%,#2A3A60_54%,#5A4327_100%)] p-6 text-white shadow-[0_24px_60px_rgba(27,34,56,0.22)]">
                  <div className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.22em] text-[#F5D9A3]">
                    <Building2 className="h-4 w-4" />
                    Public Entry Point
                  </div>
                  <p className="mt-5 max-w-[14ch] text-[2.55rem] font-semibold leading-[1.02]">
                    Court services, case search, and notices in one landscape portal.
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-[#ECE5DD]">
                    Visitors should immediately feel they are on a real institutional website with clear navigation, bilingual access, and fast search.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      ["Today's Cause List", "04 courts"],
                      ["Case Updates", "Live sync"],
                      ["Online Appointments", "Open slots"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[18px] bg-white/10 px-4 py-4 backdrop-blur-sm">
                        <p className="text-[0.66rem] uppercase tracking-[0.2em] text-[#F5D9A3]">{label}</p>
                        <p className="mt-2 text-base font-medium text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[24px] border border-[rgba(31,23,17,0.08)] bg-white/82 p-5 shadow-[0_18px_48px_rgba(35,24,16,0.07)]">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#8B5A2B]">Quick Access</p>
                      <span className="rounded-full bg-[#F5E6C8] px-3 py-1 text-[0.66rem] uppercase tracking-[0.18em] text-[#7C4B29]">Most used</span>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {quickActions.map((item, index) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, scale: 0.96, y: 10 }}
                          animate={active ? { opacity: 1, scale: 1, y: 0 } : {}}
                          transition={{ duration: 0.32, delay: 0.2 + index * 0.05 }}
                          className="flex items-center justify-between rounded-[18px] border border-[rgba(31,23,17,0.08)] bg-[#F8F2EA] px-4 py-4"
                        >
                          <p className="text-sm font-medium text-[#31241B]">{item}</p>
                          <ChevronRight className="h-4 w-4 text-[#8B5A2B]" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[1fr_0.92fr]">
                    <div className="rounded-[24px] border border-[rgba(31,23,17,0.08)] bg-white/82 p-5 shadow-[0_18px_48px_rgba(35,24,16,0.07)]">
                      <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#8B5A2B]">Case Search Preview</p>
                      <div className="mt-4 rounded-[18px] border border-[rgba(31,23,17,0.08)] bg-[#FCF8F2] px-4 py-3">
                        <div className="flex items-center gap-3 text-[#6C4B31]">
                          <Search className="h-4 w-4" />
                          <span className="text-sm">Search by case number, party name, advocate, judge...</span>
                        </div>
                      </div>
                      <div className="mt-4 grid gap-3">
                        {["Case status without repeated calls", "Judge and bench information", "Orders, notices, and hearing updates"].map((item) => (
                          <div key={item} className="rounded-[16px] bg-[#F8F2EA] px-4 py-3 text-sm text-[#43322A]">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-[rgba(31,23,17,0.08)] bg-[#2B2F45] p-5 text-[#F5ECDD] shadow-[0_18px_48px_rgba(35,24,16,0.16)]">
                      <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#E6BF7C]">Notice Board</p>
                      <div className="mt-4 grid gap-3">
                        {[
                          "Court No. 3 sitting rescheduled to 11:30 AM",
                          "Certified copy counters open till 4:30 PM",
                          "Public holiday circular updated for 17 May",
                        ].map((item) => (
                          <div key={item} className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BrowserChrome>
        </DemoPanel>
      </div>
    </StageBackdrop>
  );
}

function CaseStatusSearchDemoSlide({ active }: { active: boolean }) {
  const incomingMessages = [
    { text: "Could you please share the latest update on my case?", tone: "incoming" as const },
    { text: "When is the next hearing date scheduled?", tone: "incoming" as const },
    { text: "Has the bail application been decided?", tone: "incoming" as const },
    { text: "Was any important direction issued today?", tone: "incoming" as const },
    { text: "Please let me know if any action is required from my side.", tone: "incoming" as const },
    {
      text: "All verified updates will be available on the case status portal.",
      tone: "outgoing" as const,
    },
  ];
  const { index, goPrev, goNext, goTo } = useAutoCarousel(active, 3, 5200, 15000);
  const visibleMessageStep = useSequencedStep(
    active && index === 0,
    incomingMessages.length,
    3000,
    false,
  );
  const visibleIncomingMessages = incomingMessages.slice(
    0,
    Math.min(visibleMessageStep + 1, incomingMessages.length),
  );
  const caseQuery = "Shah Bano case";
  const query = useTypedText(caseQuery, active && index === 1, 2);
  const searchStep = useSequencedStep(active && index === 1, 3, 1100, false);
  const phoneLinkStep = useSequencedStep(active && index === 2, 4, 1200, false);

  return (
    <StageBackdrop active={active} image={slide8}>
      <div className="relative grid h-full gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <SlideHeading
            kicker="Case Status Search"
            title="Fewer Calls. Faster Clarity."
            subtitle="Clients search the case. Lawyers save the repeated update call."
            compact
          />
        </div>

        <DemoPanel className="p-5">
          <AnimatePresence mode="wait">
            {index === 0 ? (
              <motion.div
                key="case-chaos"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
                className="grid gap-5 xl:grid-cols-[0.82fr_1.18fr]"
              >
                <PhoneFrame label="Client Side">
                  <div className="grid gap-2.5">
                    <div className="grid grid-cols-2 gap-1.5">
                      {["WhatsApp", "Calls", "SMS", "Browser"].map((item) => (
                        <div key={item} className="rounded-[13px] bg-white/5 px-2 py-2 text-center text-[0.52rem] uppercase tracking-[0.07em] text-[#CFC6D7]">
                          {item}
                        </div>
                      ))}
                    </div>
                    <AnimatePresence initial={false}>
                      {visibleIncomingMessages.map((message, messageIndex) => (
                        <motion.div
                          key={message.text}
                          initial={{ opacity: 0, y: 14, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className={cn(
                            "rounded-[17px] px-3 py-2.5 text-xs leading-5",
                            message.tone === "incoming"
                              ? "bg-[#0E2D24] text-[#D9F5E9]"
                              : "ml-auto max-w-[86%] bg-[#3B2A18] text-[#FFE6BF]",
                          )}
                          data-testid={`case-status-phone-message-${messageIndex + 1}`}
                        >
                          {message.text}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </PhoneFrame>

                <div className="grid gap-4">
                  <div className="rounded-[24px] border border-[rgba(185,130,69,0.16)] bg-[rgba(11,8,6,0.72)] p-5">
                    <div className="flex items-center gap-3">
                      <MessageSquareText className="h-5 w-5 text-[#D6A15C]" />
                      <div>
                        <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#D6A15C]">Current Reality</p>
                        <p className="mt-2 text-2xl font-semibold text-[#F3E7D3]">Lawyer becomes a 24x7 update helpline.</p>
                      </div>
                    </div>
                    <div className="mt-5 grid gap-3">
                      {[
                        ["09:15 AM", "Client asks for update", "WhatsApp dependency"],
                        ["12:40 PM", "Same status requested again", "No self-service lookup"],
                        ["04:10 PM", "Advocate checks file manually", "Hearing focus breaks"],
                        ["09:30 PM", "Late-night follow-up continues", "Client anxiety increases"],
                      ].map(([time, title, note], timelineIndex) => (
                        <motion.div
                          key={time}
                          initial={{ opacity: 0, x: 14 }}
                          animate={active ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.28, delay: 0.14 + timelineIndex * 0.08 }}
                          className="grid grid-cols-[86px_1fr] gap-3 rounded-[18px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.54)] px-4 py-3"
                        >
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#D6A15C]">{time}</p>
                          <div>
                            <p className="text-sm font-medium text-[#F3E7D3]">{title}</p>
                            <p className="mt-1 text-xs text-[#D8C7B2]">{note}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-5 rounded-[18px] border border-[#D6A15C]/20 bg-[#D6A15C]/10 px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#F3E7D3]">
                        {["Client", "Call / WhatsApp", "Advocate checks file", "Manual reply", "Same query repeats"].map((item, flowIndex) => (
                          <span key={item} className="flex items-center gap-2">
                            <span>{item}</span>
                            {flowIndex < 4 ? <ChevronRight className="h-3.5 w-3.5 text-[#D6A15C]" /> : null}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : index === 1 ? (
              <motion.div
                key="case-solution"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
              >
                <BrowserChrome badge="Case Search">
                  <div className="overflow-hidden rounded-[24px] border border-[rgba(31,23,17,0.08)] bg-[linear-gradient(180deg,rgba(250,244,236,0.98)_0%,rgba(243,234,223,0.94)_100%)] p-5 text-[#31241B]">
                    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                      <div>
                        <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#8B5A2B]">Customer Search</p>
                        <div className="mt-4 grid gap-3">
                          {[
                            ["Phone Number", "+91 98XXXXXX15"],
                            ["Case Number", "SCR 844 / 1985"],
                            ["Direct Case Link", "justice.bedi.in/case/shah-bano"],
                          ].map(([label, value], fieldIndex) => (
                            <div
                              key={label}
                              className={cn(
                                "rounded-[18px] border px-4 py-3",
                                fieldIndex === 1
                                  ? "border-[#C89B5A] bg-[#FFF7E9]"
                                  : "border-[rgba(31,23,17,0.08)] bg-white/84",
                              )}
                            >
                              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[#8B5A2B]">{label}</p>
                              <p className="mt-1 text-sm text-[#31241B]">{fieldIndex === 1 ? query || value : value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 rounded-[18px] bg-[#2B2F45] px-4 py-4 text-center text-sm font-medium text-[#F7E9D1]">
                          {searchStep < 1 ? "Searching verified court records..." : searchStep < 2 ? "Matching party, case number, and citation..." : "View Result"}
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={searchStep >= 2 ? { opacity: 1, y: 0 } : { opacity: 0.45, y: 8 }}
                        className="rounded-[24px] border border-[rgba(31,23,17,0.08)] bg-white/88 p-5 shadow-[0_20px_50px_rgba(35,24,16,0.08)]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#8B5A2B]">Search Result</p>
                          <span className="rounded-full bg-[#DCF5E4] px-3 py-1 text-[0.66rem] uppercase tracking-[0.16em] text-[#236447]">Result Found</span>
                        </div>
                        <div className="mt-4 grid gap-3">
                          {[
                            ["Case", "Mohd. Ahmed Khan vs Shah Bano Begum And Ors"],
                            ["Court", "Supreme Court of India"],
                            ["Judgment Date", "23 April 1985"],
                            ["Citation", "1985 AIR 945 / 1985 SCR (3) 844"],
                            ["Summary", "Divorced Muslim woman's right to maintenance under Section 125 CrPC."],
                          ].map(([label, value]) => (
                            <div key={label} className="grid gap-2 rounded-[18px] border border-[rgba(31,23,17,0.08)] bg-[#FCF8F2] px-4 py-3 md:grid-cols-[170px_1fr]">
                              <p className="text-[0.66rem] uppercase tracking-[0.18em] text-[#8B5A2B]">{label}</p>
                              <p className="text-sm text-[#31241B]">{value}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </BrowserChrome>
              </motion.div>
            ) : (
              <motion.div
                key="case-direct-link"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
                className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]"
              >
                <BrowserChrome badge="Advocate Share">
                  <div className="rounded-[24px] border border-[rgba(31,23,17,0.08)] bg-[linear-gradient(180deg,rgba(250,244,236,0.98)_0%,rgba(243,234,223,0.94)_100%)] p-5 text-[#31241B]">
                    <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
                      <div className="rounded-[22px] border border-[rgba(31,23,17,0.08)] bg-white/84 p-5">
                        <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#8B5A2B]">Case Status Link</p>
                        <p className="mt-3 text-2xl font-semibold leading-tight text-[#31241B]">Share one verified link instead of repeating the same update.</p>
                        <div className="mt-5 rounded-[18px] border border-[#C89B5A] bg-[#FFF7E9] px-4 py-4 text-sm text-[#43322A]">
                          justice.bedi.in/case/mohd-ahmed-khan-vs-shah-bano
                        </div>
                        <motion.div
                          animate={phoneLinkStep >= 1 ? { width: "100%" } : { width: "16%" }}
                          className="mt-4 h-2 rounded-full bg-[linear-gradient(90deg,#D6A15C,#2B2F45)]"
                        />
                      </div>
                      <div className="rounded-[22px] border border-[rgba(31,23,17,0.08)] bg-white/84 p-5">
                        <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#8B5A2B]">Client Receives</p>
                        <div className="mt-4 grid gap-3">
                          {[
                            ["1", "Advocate sends direct case-status link"],
                            ["2", "Client taps the link on phone"],
                            ["3", "Verified case result opens instantly"],
                          ].map(([num, text], stepIndex) => (
                            <div
                              key={text}
                              className={cn(
                                "flex items-center gap-3 rounded-[18px] px-4 py-3 text-sm",
                                phoneLinkStep >= stepIndex ? "bg-[#DCF5E4] text-[#173A2C]" : "bg-[#F8F2EA] text-[#43322A]",
                              )}
                            >
                              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#7C4B29]">{num}</span>
                              {text}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </BrowserChrome>

                <PhoneFrame label="Client Link">
                  <div className="grid gap-3">
                    <div className="rounded-[20px] bg-[#0E2D24] px-4 py-3 text-sm leading-6 text-[#D9F5E9]">
                      Here is your verified case-status link.
                      <div className="mt-3 rounded-[16px] border border-[#9BE7B4]/20 bg-[#102F3A] px-3 py-3 text-xs text-[#BFECD9]">
                        justice.bedi.in/case/shah-bano
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={phoneLinkStep >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                      className="rounded-[20px] border border-[#D6A15C]/24 bg-[#25170D] p-3 text-[#F3E7D3]"
                    >
                      <p className="text-[0.58rem] uppercase tracking-[0.18em] text-[#D6A15C]">Case Opened</p>
                      <p className="mt-2 text-sm font-semibold leading-5">Mohd. Ahmed Khan vs Shah Bano Begum And Ors</p>
                      <div className="mt-3 grid gap-2 text-xs leading-5 text-[#D8C7B2]">
                        <span>Supreme Court of India</span>
                        <span>23 April 1985</span>
                        <span>1985 AIR 945 / 1985 SCR (3) 844</span>
                      </div>
                    </motion.div>
                  </div>
                </PhoneFrame>
              </motion.div>
            )}
          </AnimatePresence>

          <StoryControls activeIndex={index} total={3} onPrev={goPrev} onNext={goNext} onSelect={goTo} />
        </DemoPanel>
      </div>
    </StageBackdrop>
  );
}

function JusticeClockDemoSlide({ active }: { active: boolean }) {
  const { index, goPrev, goNext, goTo } = useAutoCarousel(active, 2, 6500);
  const boardRows = [
    ["Today", "49,615", "37,777", "76%"],
    ["Last Day", "54,130", "35,625", "66%"],
    ["Last Week", "253,143", "175,073", "69%"],
    ["Last Month", "1,857,475", "1,347,553", "73%"],
    ["This Year", "11,358,359", "10,340,387", "91%"],
    ["Last Year", "26,667,928", "25,344,578", "95%"],
  ];
  const journey = ["Filing", "Listing", "Hearing", "Adjournment", "Judgment", "Compliance"];

  return (
    <StageBackdrop active={active} image={slide10}>
      <div className="relative grid h-full gap-8 px-6 py-6 sm:px-10 lg:grid-cols-[0.62fr_1.38fr] lg:items-center lg:px-16 lg:py-8">
        <div className="flex flex-col justify-center">
          <SlideHeading
            kicker="Justice Clock"
            title="Transparency Through Measurable Legal Data"
            subtitle="Numbers that help leadership understand where attention is needed."
            compact
            size="standard"
          />
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {["Cases filed today", "Pending trends visible", "Leadership-ready transparency"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.28, delay: 0.14 + index * 0.06 }}
                className="rounded-[18px] border border-[rgba(185,130,69,0.16)] bg-[rgba(42,23,16,0.56)] px-4 py-3 text-sm text-[#F3E7D3]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <DemoPanel className="p-5">
          <AnimatePresence mode="wait">
            {index === 0 ? (
              <motion.div
                key="clock-current"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
                className="overflow-hidden rounded-[18px] border border-cyan-400/24 bg-[#020917] text-white shadow-[0_24px_90px_rgba(0,0,0,0.38)]"
              >
                <div className="flex items-center justify-between border-b border-cyan-400/14 bg-[#061126] px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2 text-xs text-white/60">justice-clock.district.gov.in/dashboard</span>
                  </div>
                  <span className="text-xs font-medium text-cyan-200">Live board</span>
                </div>
                <div className="grid grid-cols-[64px_1fr_160px] items-center border-b border-cyan-400/18 px-5 py-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/24 bg-cyan-400/8 text-cyan-300">
                    <Scale className="h-5 w-5" />
                  </div>
                  <div className="text-center">
                    <p className="text-[1.42rem] font-semibold uppercase leading-tight tracking-[0.02em] text-cyan-300">Virtual Justice Clock for District</p>
                    <p className="text-[1.42rem] font-semibold uppercase leading-tight tracking-[0.02em] text-cyan-300">Judiciary of India</p>
                    <p className="mt-2 text-[1rem] font-semibold uppercase">Institution, Disposal & Case Clearance Rate</p>
                  </div>
                  <div className="text-right text-sm font-semibold leading-tight">Saturday, 30/05/2026<br />23:25:51</div>
                </div>
                <div className="grid grid-cols-3 gap-3 px-5 py-3">
                  {["All States", "All Districts", "All Establishments"].map((item) => (
                    <div key={item} className="rounded-[8px] border border-cyan-400/28 bg-[#061126] px-4 py-3 text-center text-base font-semibold uppercase">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mx-5 mb-4 overflow-hidden border border-cyan-400/22">
                  <div className="grid grid-cols-[1.05fr_1.28fr_1.02fr_0.44fr] border-b border-cyan-300 bg-[#061126] text-center text-[1.28rem] font-bold uppercase">
                    {["Duration", "Institution", "Disposal", "CCR"].map((heading) => (
                      <div key={heading} className="border-r border-cyan-400/18 px-4 py-3 last:border-r-0">{heading}</div>
                    ))}
                  </div>
                  {boardRows.map((row, rowIndex) => (
                    <motion.div
                      key={row[0]}
                      initial={{ opacity: 0, y: 10 }}
                      animate={active ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.24, delay: rowIndex * 0.05 }}
                      className="grid grid-cols-[1.05fr_1.28fr_1.02fr_0.44fr] border-b border-cyan-400/16 bg-[#071126] text-center text-[1.18rem] last:border-b-0"
                    >
                      {row.map((cell) => (
                        <div key={cell} className="border-r border-cyan-400/16 px-4 py-2.5 last:border-r-0">{cell}</div>
                      ))}
                    </motion.div>
                  ))}
                </div>
                <p className="px-5 pb-3 text-right text-xs font-semibold text-white/90">Last Reviewed and Updated on : 30-05-2026</p>
              </motion.div>
            ) : (
              <motion.div
                key="clock-insights"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
                className="rounded-[24px] border border-cyan-400/20 bg-[#020917] p-5 text-white"
              >
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.34em] text-cyan-300">Justice Clock 2.0: From Numbers to Insights</p>
                    <p className="mt-2 text-2xl font-semibold">Counts show activity. Insights show where justice needs attention.</p>
                  </div>
                  <div className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">Executive demo screen</div>
                </div>
                <div className="mt-5 grid gap-4 xl:grid-cols-[0.82fr_1.05fr_1.13fr]">
                  <div className="rounded-[18px] border border-white/10 bg-white/5 p-4 opacity-78">
                    <p className="text-[0.7rem] uppercase tracking-[0.24em] text-cyan-300">Current View</p>
                    <p className="mt-1 text-sm text-white/60">Raw numbers, limited context</p>
                    <div className="mt-4 grid gap-2">
                      {boardRows.slice(0, 5).map((row) => (
                        <div key={row[0]} className="grid grid-cols-[1fr_0.9fr_0.9fr] rounded-[10px] bg-[#061126] px-3 py-2 text-xs text-white/70">
                          <span>{row[0]}</span><span>{row[1]}</span><span>{row[3]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
                    <p className="text-[0.7rem] uppercase tracking-[0.24em] text-cyan-300">Case Journey</p>
                    <div className="mt-5 grid gap-3">
                      {journey.map((item, itemIndex) => {
                        const warned = [1, 3, 4].includes(itemIndex);
                        return (
                          <div key={item} className="flex items-center gap-3">
                            <div className={cn("flex h-9 w-9 items-center justify-center rounded-full border text-xs", warned ? "border-amber-300/40 bg-amber-300/16 text-amber-200" : "border-cyan-300/30 bg-cyan-300/10 text-cyan-200")}>{itemIndex + 1}</div>
                            <div className="flex-1 rounded-[12px] bg-[#061126] px-3 py-2 text-sm">{item}</div>
                            {warned ? <span className="rounded-full bg-amber-300/14 px-3 py-1 text-xs text-amber-200">{itemIndex === 1 ? "Listing delay" : itemIndex === 3 ? "Repeated adjournments" : "Judgment delay"}</span> : null}
                          </div>
                        );
                      })}
                      <div className="rounded-[14px] border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">Old pending cases are flagged before they disappear into averages.</div>
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        ["Pendency Age Pyramid", [28, 48, 72, 52, 34]],
                        ["Bottleneck Heatmap", [42, 78, 36, 66, 90]],
                        ["Urgency vs Delay Matrix", [20, 58, 74, 46, 86]],
                      ].map(([title, values]) => (
                        <div key={title as string} className="rounded-[16px] border border-white/10 bg-white/5 p-3">
                          <p className="text-xs font-medium text-white/90">{title as string}</p>
                          <div className="mt-4 flex h-24 items-end gap-1.5">
                            {(values as number[]).map((value, valueIndex) => (
                              <div key={valueIndex} className="flex-1 rounded-t bg-[linear-gradient(180deg,#22d3ee,#164e63)]" style={{ height: `${value}%` }} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-4">
                      {["Median case age", "Time to disposal", "Cases older than 5 years", "Listing-to-hearing delay"].map((item) => (
                        <div key={item} className="rounded-[14px] border border-cyan-300/16 bg-cyan-300/8 px-3 py-3 text-xs text-cyan-50">{item}</div>
                      ))}
                    </div>
                    <div className="grid gap-2 sm:grid-cols-5">
                      {["Waiting litigant", "Legal cost", "Uncertainty", "Delayed relief", "Access gap"].map((item) => (
                        <div key={item} className="rounded-[12px] bg-white/5 px-3 py-2 text-xs text-white/70">{item}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-5 rounded-[18px] border border-[#D6A15C]/24 bg-[#D6A15C]/10 px-5 py-4 font-display text-2xl leading-tight text-[#F3E7D3]">
                  Justice is not only how many cases move — it is how timely, fair, and meaningful the movement is.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <StoryControls activeIndex={index} total={2} onPrev={goPrev} onNext={goNext} onSelect={goTo} />
        </DemoPanel>
      </div>
    </StageBackdrop>
  );
}

function AppointmentBookingDemoSlide({ active }: { active: boolean }) {
  const incomingCalls = [
    ["Client Inquiry", "Could we schedule a meeting today at 1:00 PM?", "Let me check the calendar."],
    ["Client Inquiry", "Would 7:00 PM be available for a consultation?", "I will confirm the next available slot."],
  ] as const;
  const { index, goPrev, goNext, goTo } = useAutoCarousel(active, 2, 5000, 9000);
  const visibleCallStep = useSequencedStep(active && index === 0, incomingCalls.length, 3000, false);
  const visibleCalls = incomingCalls.slice(0, Math.min(visibleCallStep + 1, incomingCalls.length));

  return (
    <StageBackdrop active={active} image={slide17Hero}>
      <div className="relative grid h-full gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <SlideHeading
            kicker="Appointment Booking"
            title="Client Booking Without Call Chaos"
            subtitle="Fewer calls. Clearer slots. Better client handling."
            eyebrow="Am I a lawyer or a receptionist?"
            compact
          />
        </div>

        <DemoPanel className="p-5">
          <AnimatePresence mode="wait">
            {index === 0 ? (
              <motion.div
                key="appointment-chaos"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
                className="grid gap-5 xl:grid-cols-[0.82fr_1.18fr]"
              >
                <PhoneFrame label="Incoming Calls">
                  <div className="grid gap-2.5">
                    <AnimatePresence initial={false}>
                      {visibleCalls.map(([name, line, reply], callIndex) => (
                        <motion.div
                          key={line}
                          initial={{ opacity: 0, y: 14, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="rounded-[18px] bg-white/5 p-2.5"
                          data-testid={`appointment-phone-message-${callIndex + 1}`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2E394D] text-[#F6E9D6]">
                              <PhoneCall className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-medium text-[#F4EDF7]">{name}</p>
                              <p className="mt-1 text-xs leading-5 text-[#C7C0D1]">{line}</p>
                            </div>
                          </div>
                          <div className="mt-2.5 ml-auto max-w-[78%] rounded-[14px] bg-[#3B2A18] px-3 py-2 text-xs leading-5 text-[#FFE6BF]">
                            {reply}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </PhoneFrame>

                <div className="rounded-[24px] border border-[rgba(185,130,69,0.16)] bg-[rgba(11,8,6,0.72)] p-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#D6A15C]">Manual Scheduling Problem</p>
                  <div className="mt-5 grid gap-3">
                    {[
                      ["10:00 AM", "Client asks for available time"],
                      ["11:30 AM", "Advocate is in hearing"],
                      ["01:00 PM", "Clerk checks calendar manually"],
                      ["03:15 PM", "Slot already taken"],
                      ["06:00 PM", "Client asks again"],
                    ].map(([time, text], rowIndex) => (
                      <motion.div
                        key={time}
                        initial={{ opacity: 0, x: 14 }}
                        animate={active ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.28, delay: 0.14 + rowIndex * 0.08 }}
                        className="grid grid-cols-[86px_1fr] gap-3 rounded-[18px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.54)] px-4 py-3"
                      >
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#D6A15C]">{time}</p>
                        <p className="text-sm text-[#F3E7D3]">{text}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[18px] border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm text-[#F3E7D3]">Before: calls, diary checks, unclear slots</div>
                    <div className="rounded-[18px] border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-[#F3E7D3]">After: slots, confirmation, reminder</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="appointment-solution"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28 }}
              >
                <BrowserChrome badge="Appointment Form">
                  <div className="overflow-hidden rounded-[24px] border border-[rgba(31,23,17,0.08)] bg-[linear-gradient(180deg,rgba(250,244,236,0.98)_0%,rgba(243,234,223,0.94)_100%)] p-5 text-[#31241B]">
                    <div className="grid gap-4 xl:grid-cols-[0.96fr_1.04fr]">
                      <div className="rounded-[24px] border border-[rgba(31,23,17,0.08)] bg-white/84 p-5 shadow-[0_18px_48px_rgba(35,24,16,0.07)]">
                        <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#8B5A2B]">Book Appointment</p>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {[
                            ["Advocate", "Adv. Rohan Bedi"],
                            ["Purpose", "Case consultation"],
                            ["Date", "22 May 2026"],
                            ["Time", "07:00 PM"],
                            ["Name", "Aman Shaikh"],
                            ["Phone", "+91 98XXXXXX15"],
                          ].map(([label, value]) => (
                            <div key={label} className="rounded-[18px] border border-[rgba(31,23,17,0.08)] bg-[#FCF8F2] px-4 py-4">
                              <p className="text-[0.66rem] uppercase tracking-[0.18em] text-[#8B5A2B]">{label}</p>
                              <p className="mt-2 text-sm text-[#31241B]">{value}</p>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="mt-4 w-full rounded-[18px] bg-[#2B2F45] px-4 py-4 text-sm font-medium text-[#F7E9D1]"
                        >
                          Confirm Appointment
                        </button>
                      </div>

                      <div className="grid gap-4">
                        <div className="rounded-[24px] border border-[rgba(31,23,17,0.08)] bg-white/84 p-5 shadow-[0_18px_48px_rgba(35,24,16,0.07)]">
                          <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#8B5A2B]">Available Slots</p>
                          <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            {["11:30 AM", "01:00 PM", "04:30 PM", "07:00 PM"].map((slot) => (
                              <div key={slot} className={cn("rounded-[18px] border px-4 py-4 text-center text-sm", slot === "07:00 PM" ? "border-[#B98646] bg-[#F7E6C8] text-[#7C4B29]" : "border-[rgba(31,23,17,0.08)] bg-[#FCF8F2] text-[#43322A]")}>
                                {slot}
                              </div>
                            ))}
                          </div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 16, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className="rounded-[24px] border border-[rgba(74,222,128,0.24)] bg-[rgba(74,222,128,0.14)] p-5"
                        >
                          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#236447]">Done</p>
                          <p className="mt-3 text-2xl font-semibold text-[#173A2C]">Your appointment has been set.</p>
                          <p className="mt-3 text-sm leading-7 text-[#24503D]">
                            Client receives date, time, advocate, and confirmation without extra calls.
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </BrowserChrome>
              </motion.div>
            )}
          </AnimatePresence>

          <StoryControls activeIndex={index} total={2} onPrev={goPrev} onNext={goNext} onSelect={goTo} />
        </DemoPanel>
      </div>
    </StageBackdrop>
  );
}

function LawyerDashboardDemoSlide({ active }: { active: boolean }) {
  const securityChips = [
    "Verified login",
    "Role-based access",
    "Confidential documents",
    "Two-factor authentication",
  ];
  const authStep = useSequencedStep(active, 3, 1050, false);
  const dashboardStep = useSequencedStep(active && authStep === 2, 5, 720, false);

  return (
    <StageBackdrop active={active} image={slide17Hero}>
      <div className="relative grid h-full gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <SlideHeading
            kicker="Lawyer Dashboard"
            title="Personal Workspace for Legal Work"
            subtitle="Right person. Right access. Nothing extra."
            compact
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {securityChips.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={active ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.16 + index * 0.05 }}
                className="rounded-[18px] border border-[rgba(185,130,69,0.16)] bg-[rgba(42,23,16,0.62)] px-4 py-3 text-sm text-[#F3E7D3]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <DemoPanel className="p-5">
          {authStep === 0 ? (
            <div className="grid min-h-[560px] gap-5 rounded-[28px] bg-[#f8fafc] p-6 text-slate-900 xl:grid-cols-[0.88fr_1.12fr]">
              <div className="flex flex-col justify-center rounded-[20px] border border-slate-200 bg-white p-8 shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-amber-300">
                  <Scale className="h-6 w-6" />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">Bedi LegalOS</p>
                <p className="mt-3 text-3xl font-semibold">Secure advocate access</p>
                <p className="mt-3 text-sm leading-7 text-slate-500">Sign in to view assigned matters, hearings, documents, evidence, notes, and client updates.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Role verified", "2FA ready", "Matter-level access"].map((item) => (
                    <span key={item} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">{item}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center rounded-[20px] border border-slate-200 bg-white p-6 shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
                <div className="w-full max-w-md rounded-[18px] border border-slate-200 bg-white p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <LockKeyhole className="h-6 w-6" />
                  </div>
                  <p className="mt-5 text-xl font-semibold text-slate-900">Welcome back</p>
                  <p className="mt-1 text-sm text-slate-500">Use your firm account to continue.</p>
                  <div className="mt-6 grid gap-3">
                    {[
                      ["Email", "adv.meera@bediassociates.in"],
                      ["Password", "••••••••••••"],
                    ].map(([label, value], fieldIndex) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, delay: fieldIndex * 0.12 }}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                      >
                        <p className="text-xs font-medium text-slate-500">{label}</p>
                        <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">Two-factor authentication enabled</div>
                  <motion.div
                    initial={{ width: "20%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="mt-5 h-11 rounded-xl bg-slate-900 text-center text-sm font-semibold leading-[2.75rem] text-white"
                  >
                    Sign in
                  </motion.div>
                </div>
              </div>
            </div>
          ) : authStep === 1 ? (
            <div className="flex min-h-[560px] flex-col items-center justify-center gap-6 rounded-[28px] border border-slate-200 bg-[#f8fafc] text-slate-900">
              <motion.div
                animate={active ? { rotate: 360 } : {}}
                transition={{ duration: 1.25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="flex h-20 w-20 items-center justify-center rounded-full border border-slate-200 border-t-slate-900 bg-white shadow-sm"
              >
                <Scale className="h-8 w-8 text-slate-900" />
              </motion.div>
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">Verifying access</p>
                <p className="mt-3 text-2xl font-semibold">Loading case workspace</p>
                <div className="mt-5 h-2 w-72 overflow-hidden rounded-full bg-slate-200">
                  <motion.div animate={{ width: ["20%", "86%", "100%"] }} transition={{ duration: 1.5, ease: "easeInOut" }} className="h-full rounded-full bg-slate-900" />
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white text-slate-900 shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
              <div className="grid min-h-[590px] lg:grid-cols-[190px_1fr]">
                <aside className="bg-slate-950 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400 text-slate-950"><Scale className="h-5 w-5" /></div>
                    <div>
                      <p className="text-sm font-semibold">Bedi LegalOS</p>
                      <p className="text-xs text-slate-400">Advocate</p>
                    </div>
                  </div>
                  <nav className="mt-7 grid gap-1.5 text-sm">
                    {["Dashboard", "Matters", "Hearings", "Clients", "Documents", "Evidence", "Notes", "Settings"].map((item, navIndex) => (
                      <div key={item} className={cn("rounded-lg px-3 py-2", navIndex === 0 ? "bg-white text-slate-950" : "text-slate-300")}>{item}</div>
                    ))}
                  </nav>
                </aside>
                <main className="bg-[#f6f8fb] p-5">
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <div>
                      <p className="text-lg font-semibold">Advocate Dashboard</p>
                      <p className="text-xs text-slate-500">Tuesday, 21 May 2026</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="hidden w-64 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 xl:flex">
                        <Search className="h-4 w-4" /> Search matter, client, document...
                      </div>
                      <BellRing className="h-5 w-5 text-slate-500" />
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">MS</div>
                    </div>
                  </div>

                  <motion.div initial={{ opacity: 0, y: 12 }} animate={dashboardStep >= 0 ? { opacity: 1, y: 0 } : {}} className="mt-4 grid gap-3 sm:grid-cols-4">
                    {[
                      ["Active matters", "42", "8 urgent"],
                      ["Hearings this week", "17", "3 today"],
                      ["Pending filings", "09", "2 due"],
                      ["Client updates due", "14", "5 high priority"],
                    ].map(([label, value, note]) => (
                      <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-xs font-medium text-slate-500">{label}</p>
                        <p className="mt-2 text-2xl font-semibold">{value}</p>
                        <p className="mt-1 text-xs text-amber-700">{note}</p>
                      </div>
                    ))}
                  </motion.div>

                  <div className="mt-4 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={dashboardStep >= 1 ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 8 }} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">Today's hearings</p>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">Live board</span>
                      </div>
                      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                        <div className="grid grid-cols-[1.4fr_1fr_0.55fr_0.7fr] bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
                          <span>Case</span><span>Court / Bench</span><span>Time</span><span>Status</span>
                        </div>
                        {[
                          ["Bedi Infra v. State", "Commercial Bench II", "11:30", "Ready"],
                          ["Rao v. Union", "Court 4", "14:15", "Draft due"],
                          ["Mohan Foods Arb.", "Arbitration", "16:00", "Client call"],
                        ].map((row) => (
                          <div key={row[0]} className="grid grid-cols-[1.4fr_1fr_0.55fr_0.7fr] border-t border-slate-200 px-3 py-2 text-xs">
                            <span className="font-medium">{row[0]}</span><span className="text-slate-500">{row[1]}</span><span>{row[2]}</span><span className="text-emerald-700">{row[3]}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 12 }} animate={dashboardStep >= 2 ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 8 }} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold">Active matter</p>
                          <p className="mt-2 text-lg font-semibold">Bedi Infra v. State of Maharashtra</p>
                          <p className="mt-1 text-xs text-slate-500">Next hearing: 21 May 2026 • Commercial Bench</p>
                        </div>
                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">High</span>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        {[
                          ["Stage", "Reply review"],
                          ["Advocate", "Adv. Meera Shah"],
                          ["Filing", "Due 6 PM"],
                        ].map(([label, value]) => (
                          <div key={label} className="rounded-xl bg-slate-50 p-3">
                            <p className="text-xs text-slate-500">{label}</p>
                            <p className="mt-1 text-sm font-medium">{value}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <motion.div initial={{ opacity: 0, y: 12 }} animate={dashboardStep >= 3 ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 8 }} className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
                      {["Overview", "Updates", "Evidence", "Forensic Images", "Notes", "Checklist"].map((tab, tabIndex) => (
                        <span key={tab} className={cn("rounded-lg px-3 py-1.5 text-xs font-medium", tabIndex === 3 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600")}>{tab}</span>
                      ))}
                    </div>
                    <div className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                      <div>
                        <p className="text-sm font-semibold">Forensic image gallery</p>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {[
                            [slide21Hero, "Binder"],
                            [slide8, "Conference"],
                            [slide1, "Filed papers"],
                          ].map(([src, label]) => (
                            <div key={label} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                              <img src={src} alt={label} className="h-20 w-full object-cover" loading="lazy" />
                              <p className="px-2 py-1.5 text-[0.68rem] text-slate-600">{label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold">Add internal note</p>
                          <span className="text-xs text-slate-500">Adv. Meera • 4:20 PM</span>
                        </div>
                        <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-600">Client confirmed registry copy. Add annexure pagination before senior review.</div>
                        <button type="button" className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white">Save note</button>
                        {dashboardStep >= 4 ? (
                          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                            Note saved to case file
                          </motion.div>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                </main>
              </div>
            </div>
          )}
        </DemoPanel>
      </div>
    </StageBackdrop>
  );
}

function SharedNotesDemoSlide({ active }: { active: boolean }) {
  const noteStep = useSequencedStep(active, 4, 760, false);

  return (
    <StageBackdrop active={active} image={slide17Hero}>
      <div className="relative grid h-full gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <SlideHeading
            kicker="Shared Notes"
            title="One Case. One Shared Workspace."
            subtitle="Clear collaboration across the same matter without scattered chats."
            compact
          />
        </div>

        <DemoPanel className="p-5">
          <div className="relative overflow-hidden rounded-[28px] border border-[rgba(185,130,69,0.16)] bg-[rgba(11,8,6,0.72)] p-5">
            <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
              <div className="rounded-[24px] border border-[rgba(185,130,69,0.14)] bg-[rgba(17,10,6,0.76)] p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Case Room</p>
                    <p className="mt-2 text-2xl font-semibold text-[#F3E7D3]">Bedi Infra v. State of Maharashtra</p>
                  </div>
                  <TopPill className="px-3 py-1.5 text-[0.62rem]">Open Notes</TopPill>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-[0.98fr_1.02fr]">
                  <div className="rounded-[22px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.54)] p-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#D6A15C]">Live Matter Status</p>
                    <div className="mt-4 grid gap-3">
                      {[
                        ["Next hearing", "21 May 2026"],
                        ["Bench", "Commercial Bench II"],
                        ["Current action", "Reply final review"],
                        ["Pending file", "Annexure pagination"],
                      ].map(([label, value]) => (
                        <div key={label} className="grid gap-2 rounded-[18px] border border-[rgba(185,130,69,0.12)] bg-[rgba(17,10,6,0.7)] px-4 py-3 md:grid-cols-[128px_1fr]">
                          <p className="text-[0.66rem] uppercase tracking-[0.16em] text-[#D6A15C]">{label}</p>
                          <p className="text-sm text-[#F3E7D3]">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.54)] p-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#D6A15C]">Case Timeline</p>
                    <div className="mt-4 grid gap-3">
                      {[
                        "Draft reply uploaded at 9:15 AM",
                        "Client confirmation received at 10:05 AM",
                        "Research note linked at 10:28 AM",
                        "Senior review pending before filing",
                      ].map((item) => (
                        <div key={item} className="rounded-[18px] border border-[rgba(185,130,69,0.12)] bg-[rgba(17,10,6,0.7)] px-4 py-3 text-sm text-[#F3E7D3]">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-[rgba(185,130,69,0.14)] bg-[linear-gradient(180deg,rgba(34,23,17,0.86)_0%,rgba(14,11,9,0.92)_100%)] p-5">
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Floating Team Notes</p>
                <div className="mt-4 relative h-[340px]">
                  {[
                    {
                      author: "Adv. Rohan Bedi",
                      top: "8%",
                      left: "4%",
                      rotate: "-6deg",
                      color: "bg-[#F5D58F] text-[#3B2915]",
                      note: "Client confirmed registry copy. Hearing prep continue.",
                    },
                    {
                      author: "Adv. Meera Shah",
                      top: "32%",
                      left: "40%",
                      rotate: "5deg",
                      color: "bg-[#C8E8F2] text-[#173340]",
                      note: "Added maintainability authorities. Review before final argument note.",
                    },
                    {
                      author: "Senior Counsel",
                      top: "62%",
                      left: "16%",
                      rotate: "-3deg",
                      color: "bg-[#E9D4F0] text-[#312038]",
                      note: "Keep relief prayer concise. Lead with maintainability.",
                    },
                  ].map((note, index) => (
                    <motion.div
                      key={note.author}
                      initial={{ opacity: 0, y: 18, rotate: 0 }}
                      animate={active && index <= noteStep ? { opacity: 1, y: 0, rotate: note.rotate } : { opacity: 0.18, y: 12, rotate: 0 }}
                      transition={{ duration: 0.34 }}
                      className={cn("absolute w-[220px] rounded-[22px] p-4 shadow-[0_22px_48px_rgba(0,0,0,0.28)]", note.color)}
                      style={{ top: note.top, left: note.left }}
                    >
                      <p className="text-[0.66rem] uppercase tracking-[0.18em] opacity-70">{note.author}</p>
                      <p className="mt-3 text-sm leading-6">{note.note}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["Team synced", "Case context visible", "Notes attached to matter"].map((item) => (
                <div key={item} className="rounded-[18px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.52)] px-4 py-3 text-sm text-[#F3E7D3]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </DemoPanel>
      </div>
    </StageBackdrop>
  );
}

function AdminDashboardSlide({ active }: { active: boolean }) {
  const readyStep = useSequencedStep(active, 2, 900, false);
  const dashboardReady = readyStep >= 1;

  return (
    <StageBackdrop active={active} image={slide10}>
      <div className="relative grid h-full gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <SlideHeading
            kicker="Admin Dashboard + User Management"
            title="Control Center for Leadership and Administration"
            subtitle="The Chief's control room."
            compact
          />
        </div>

        <DemoPanel className="p-5">
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white text-slate-900 shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
            {!dashboardReady ? (
              <div className="flex min-h-[560px] flex-col items-center justify-center gap-6 bg-[#f8fafc]">
                <motion.div
                  animate={active ? { rotate: 360 } : {}}
                  transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="flex h-20 w-20 items-center justify-center rounded-full border border-slate-200 border-t-slate-900 bg-white"
                >
                  <LayoutDashboard className="h-8 w-8 text-slate-900" />
                </motion.div>
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">Loading Admin Control</p>
                  <p className="mt-3 text-2xl font-semibold">Bringing the operations dashboard online</p>
                </div>
              </div>
            ) : (
              <div className="grid min-h-[590px] lg:grid-cols-[190px_1fr]">
                <aside className="bg-slate-950 p-4 text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400 text-slate-950"><ShieldCheck className="h-5 w-5" /></div>
                    <div>
                      <p className="text-sm font-semibold">Admin Console</p>
                      <p className="text-xs text-slate-400">Operations</p>
                    </div>
                  </div>
                  <nav className="mt-7 grid gap-1.5 text-sm">
                    {["Overview", "Users", "Roles", "Case Services", "Appointments", "Notices", "Attendance", "Reports", "Settings"].map((item, navIndex) => (
                      <div key={item} className={cn("rounded-lg px-3 py-2", navIndex === 0 ? "bg-white text-slate-950" : "text-slate-300")}>{item}</div>
                    ))}
                  </nav>
                </aside>
                <main className="bg-[#f6f8fb] p-5">
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <div>
                      <p className="text-lg font-semibold">Platform Overview</p>
                      <p className="text-xs text-slate-500">Last 7 days • Bedi & Associates</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="hidden w-60 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 xl:flex">
                        <Search className="h-4 w-4" /> Search users, roles, notices...
                      </div>
                      <span className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">May 2026</span>
                      <BellRing className="h-5 w-5 text-slate-500" />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-4">
                    {[
                      ["Active users", "124", "92 online today"],
                      ["Appointments", "18", "5 pending"],
                      ["Notices", "07", "2 drafts"],
                      ["Approvals", "11", "needs review"],
                    ].map(([label, value, note]) => (
                      <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-xs font-medium text-slate-500">{label}</p>
                        <p className="mt-2 text-2xl font-semibold">{value}</p>
                        <p className="mt-1 text-xs text-slate-500">{note}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">User management</p>
                        <button type="button" className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">Add user</button>
                      </div>
                      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
                        <div className="grid grid-cols-[1.35fr_0.75fr_0.7fr_0.85fr_0.5fr] gap-2 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
                          {["User", "Role", "Status", "Last active", "Action"].map((item) => <span key={item}>{item}</span>)}
                        </div>
                        {[
                          ["Meera Shah", "Litigation", "Advocate", "Active", "2 min ago", "Edit"],
                          ["Nikhil Jain", "Registry", "Clerk", "Active", "18 min ago", "Edit"],
                          ["Rohan Bedi", "Leadership", "Admin", "Active", "Now", "Edit"],
                          ["Viewer Desk", "Reception", "Viewer", "Limited", "1 hr ago", "Edit"],
                        ].map((row) => (
                          <div key={row[0]} className="grid grid-cols-[1.35fr_0.75fr_0.7fr_0.85fr_0.5fr] gap-2 border-t border-slate-200 px-3 py-2 text-xs">
                            <span className="text-slate-700"><b className="font-medium">{row[0]}</b><br /><span className="text-slate-400">{row[1]}</span></span>
                            <span className="text-slate-700">{row[2]}</span>
                            <span className={row[3] === "Limited" ? "text-amber-700" : "text-emerald-700"}>{row[3]}</span>
                            <span className="text-slate-700">{row[4]}</span>
                            <span className="font-medium text-blue-700">{row[5]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-sm font-semibold">Role-based access</p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-2">
                          {["Advocate", "Clerk", "Admin", "Viewer"].map((role, roleIndex) => (
                            <div key={role} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                              <p className="text-sm font-medium">{role}</p>
                              <p className="mt-1 text-xs text-slate-500">{["Cases + notes", "Registry + appointments", "Full control", "Read only"][roleIndex]}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <p className="text-sm font-semibold">Activity feed</p>
                        <div className="mt-3 grid gap-2">
                          {["User added: Registry Desk", "Notice published: Holiday circular", "Permission updated: Advocate role", "Appointment approved: Aman Shaikh"].map((item) => (
                            <div key={item} className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600">{item}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Weekly usage analytics</p>
                      <div className="flex gap-2 text-xs">
                        {["Usage", "Appointments", "Case searches"].map((chip, chipIndex) => (
                          <span key={chip} className={cn("rounded-full px-3 py-1", chipIndex === 0 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600")}>{chip}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex h-24 items-end gap-3">
                      {[45, 58, 50, 72, 68, 84, 76].map((value, valueIndex) => (
                        <div key={valueIndex} className="flex-1 rounded-t-lg bg-[linear-gradient(180deg,#2563eb,#93c5fd)]" style={{ height: `${value}%` }} />
                      ))}
                    </div>
                  </div>
                </main>
              </div>
            )}
          </div>
        </DemoPanel>
      </div>
    </StageBackdrop>
  );
}

function AttendanceIntroSlide({ active }: { active: boolean }) {
  const packetStep = useSequencedStep(active, 5, 760, true);
  const backendNodes = [
    ["Check-ins", "Employee clock events"],
    ["Break Logs", "Start and end records"],
    ["Approvals", "Manager review queue"],
    ["Analytics", "Hours and utilization"],
  ];

  return (
    <StageBackdrop active={active} image={slide21Hero}>
      <div className="relative grid h-full gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[0.66fr_1.34fr] lg:items-center lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <SlideHeading
            kicker="Transition"
            title="Introducing Attendance & Time Accountability"
            subtitle="A secure backend flow where check-ins become useful management insight."
            compact
          />
        </div>

        <DemoPanel className="p-5">
          <div className="relative min-h-[560px] overflow-hidden rounded-[28px] border border-[rgba(185,130,69,0.16)] bg-[rgba(5,8,14,0.9)] p-5">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[length:54px_54px]" />
            <div className="relative grid h-full gap-5 xl:grid-cols-[1fr_0.9fr]">
              <div className="rounded-[24px] border border-cyan-300/18 bg-[#061126]/82 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.34em] text-cyan-300">Backend Sync</p>
                    <p className="mt-2 text-2xl font-semibold text-[#F3E7D3]">Attendance events moving through the system</p>
                  </div>
                  <Database className="h-6 w-6 text-cyan-300" />
                </div>
                <div className="relative mt-8 grid gap-4">
                  {backendNodes.map(([title, note], index) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, x: -16 }}
                      animate={active ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.28, delay: index * 0.08 }}
                      className="relative rounded-[18px] border border-cyan-300/16 bg-white/5 px-4 py-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white">{title}</p>
                          <p className="mt-1 text-sm text-white/60">{note}</p>
                        </div>
                        <span className={cn("h-3 w-3 rounded-full", packetStep >= index ? "bg-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.8)]" : "bg-white/20")} />
                      </div>
                    </motion.div>
                  ))}
                  <motion.div
                    animate={active ? { x: ["0%", "92%", "0%"] } : {}}
                    transition={{ duration: 4.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="absolute left-0 top-[46%] h-2 w-16 rounded-full bg-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.8)]"
                  />
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[24px] border border-[rgba(185,130,69,0.16)] bg-[rgba(42,23,16,0.5)] p-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Generated Admin Insight</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Active Today", "38"],
                      ["Pending Approval", "06"],
                      ["Late Entries", "03"],
                      ["Reports Ready", "Daily"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-[18px] border border-white/10 bg-white/5 p-4">
                        <p className="text-[0.66rem] uppercase tracking-[0.18em] text-[#D6A15C]">{label}</p>
                        <p className="mt-2 text-2xl font-semibold text-[#F3E7D3]">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[24px] border border-cyan-300/18 bg-cyan-300/8 p-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.34em] text-cyan-300">Secure Database</p>
                  <div className="mt-5 flex h-40 items-end gap-3">
                    {[42, 68, 54, 82, 74, 90, 63].map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: "18%" }}
                        animate={active ? { height: `${value}%` } : { height: "18%" }}
                        transition={{ duration: 0.5, delay: index * 0.06 }}
                        className="flex-1 rounded-t-[16px] bg-[linear-gradient(180deg,#22d3ee,#164e63)]"
                      />
                    ))}
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {["Sync logs", "Policy rules", "Time analytics"].map((item) => (
                      <div key={item} className="rounded-[14px] bg-white/5 px-3 py-2 text-center text-xs text-white/70">{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoPanel>
      </div>
    </StageBackdrop>
  );
}

function AttendanceSoftwareDemoSlide({ active }: { active: boolean }) {
  const step = useSequencedStep(active, 6, 820, false);
  const timerSnapshots = ["00:12:08", "03:08:42", "03:42:15", "06:24:10", "08:00:00", "08:20:00"] as const;
  const activeTime = timerSnapshots[Math.min(step, timerSnapshots.length - 1)];

  const employeeSteps = [
    "Punch In",
    "Hours Count",
    "Start Break",
    "End Break",
    "Punch Out",
    "Summary",
  ];
  const ledgerRows = [
    ["09:02 AM", "Punch In", "Synced"],
    ["01:08 PM", "Break Started", step >= 2 ? "Logged" : "Waiting"],
    ["01:42 PM", "Work Resumed", step >= 3 ? "Logged" : "Waiting"],
    ["06:14 PM", "Punch Out", step >= 4 ? "Confirmed" : "Pending"],
  ] as const;

  return (
    <StageBackdrop active={active} image={slide21Hero}>
      <div className="relative grid h-full gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[0.52fr_1.48fr] lg:items-center lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <SlideHeading
            kicker="Attendance Software"
            title="Fair Attendance. Clear Records."
            subtitle="Less manual work. Better visibility."
            eyebrow="Breaks are allowed. Confusion is not."
            compact
          />
        </div>

        <DemoPanel className="p-5">
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white text-slate-900 shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
            <div className="grid min-h-[590px] bg-[#f6f8fb] xl:grid-cols-[1.06fr_0.94fr]">
              <div className="p-5">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="text-lg font-semibold">Attendance Control</p>
                    <p className="text-xs text-slate-500">Employee self-service + admin visibility</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">Synced</span>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">RJ</div>
                      <div>
                        <p className="text-lg font-semibold">Rahul Joshi</p>
                        <p className="text-sm text-slate-500">Junior Associate • Office mode</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Active time</p>
                      <p className="text-3xl font-semibold tabular-nums">{activeTime}</p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-4">
                    {["Punch In", "Start Break", "End Break", "Punch Out"].map((action, actionIndex) => (
                      <button
                        key={action}
                        type="button"
                        className={cn(
                          "h-11 rounded-xl border text-sm font-semibold",
                          actionIndex <= step - 1 ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600",
                        )}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
                    <motion.div
                      initial={{ width: "8%" }}
                      animate={active ? { width: `${Math.max(12, ((step + 1) / employeeSteps.length) * 100)}%` } : { width: "8%" }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="h-full rounded-full bg-[linear-gradient(90deg,#2563eb,#22c55e)]"
                    />
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Daily timeline</p>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">Employee-visible</span>
                  </div>
                  <div className="mt-3 grid gap-2">
                    {ledgerRows.map(([time, label, status], rowIndex) => (
                      <div key={label} className="grid grid-cols-[86px_1fr_auto] items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
                        <p className="text-xs font-semibold text-slate-500">{time}</p>
                        <p className="font-medium">{label}</p>
                        <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", rowIndex <= step ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500")}>{status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-l border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold">Admin analytics summary</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Total working hours", step >= 4 ? "8h 20m" : "Live"],
                    ["Break duration", step >= 3 ? "34m" : "Pending"],
                    ["Active time", activeTime],
                    ["Late entry", "No"],
                    ["Overtime", step >= 4 ? "20m" : "-"],
                    ["Attendance status", step >= 4 ? "Complete" : "In progress"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4">
                      <p className="text-xs font-medium text-slate-500">{label}</p>
                      <p className="mt-2 text-xl font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-slate-200 bg-[#f8fafc] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Productivity / utilization</p>
                    <span className="text-xs font-medium text-emerald-700">84%</span>
                  </div>
                  <div className="mt-4 flex h-32 items-end gap-3">
                    {[46, 64, 58, 74, 82, 70].map((value, valueIndex) => (
                      <motion.div
                        key={valueIndex}
                        initial={{ height: "18%" }}
                        animate={active ? { height: `${value}%` } : { height: "18%" }}
                        transition={{ duration: 0.45, delay: valueIndex * 0.06 }}
                        className="flex-1 rounded-t-lg bg-[linear-gradient(180deg,#2563eb,#93c5fd)]"
                      />
                    ))}
                  </div>
                </div>
                {step >= 5 ? (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
                    Day closed. Admin summary updated automatically.
                  </motion.div>
                ) : null}
              </div>
            </div>
          </div>
        </DemoPanel>
      </div>
    </StageBackdrop>
  );
}

function RemindersDemoSlide({ active }: { active: boolean }) {
  const step = useSequencedStep(active, 6, 760, false);
  const taskValues = [
    "Client call back",
    "12 May 2026 • 5:30 PM",
    "Every 2 hours",
    "High",
    "Popup + email",
    "Junior Associate",
  ];

  return (
    <StageBackdrop active={active} image={slide21Hero}>
      <div className="relative grid h-full gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <SlideHeading
            kicker="Reminders + Notifications"
            title="Reminders That Keep Legal Work On Track"
            subtitle="Memory ka backup."
            compact
          />
        </div>

        <DemoPanel className="p-5">
          <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[24px] border border-[rgba(185,130,69,0.16)] bg-[rgba(11,8,6,0.72)] p-4">
              <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Reminder Setup</p>
              <div className="mt-4 grid gap-3">
                {[
                  "Task Name",
                  "Due Date / Time",
                  "Reminder Frequency",
                  "Priority",
                  "Notification Method",
                  "Assigned To",
                ].map((label, index) => (
                  <div
                    key={label}
                    className={cn(
                      "rounded-[18px] border px-4 py-4",
                      index <= step
                        ? "border-[rgba(185,130,69,0.18)] bg-[rgba(42,23,16,0.56)]"
                        : "border-[rgba(185,130,69,0.12)] bg-[rgba(17,10,6,0.72)] opacity-70",
                    )}
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#D6A15C]">{label}</p>
                    <p className="mt-2 text-sm text-[#F3E7D3]">{index <= step ? taskValues[index] : "Waiting..."}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[24px] border border-[rgba(185,130,69,0.16)] bg-[rgba(11,8,6,0.72)] p-4">
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Upcoming Tasks</p>
                <div className="mt-4 grid gap-3">
                  {[
                    "Client call back",
                    "Case file update",
                    "Document submission",
                    "Hearing notes preparation",
                    "Senior update",
                    "Follow-up completion",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      animate={active ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.28, delay: 0.18 + index * 0.06 }}
                      className={cn(
                        "rounded-[18px] border px-4 py-3 text-sm",
                        index === 0 && step >= 5
                          ? "border-[rgba(74,222,128,0.24)] bg-[rgba(74,222,128,0.12)] text-[#F3E7D3]"
                          : "border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.54)] text-[#D8C7B2]",
                      )}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {step >= 5 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="rounded-[24px] border border-[rgba(74,222,128,0.24)] bg-[rgba(74,222,128,0.12)] p-5"
                  >
                    <div className="flex items-center gap-3">
                      <BellRing className="h-5 w-5 text-[#9BE7B4]" />
                      <div>
                        <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[#9BE7B4]">Notification Popup</p>
                        <p className="mt-2 text-base text-[#F3E7D3]">
                          Reminder saved. Client call back due today at 5:30 PM.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </DemoPanel>
      </div>
    </StageBackdrop>
  );
}

function BenefitsSlide({ active }: { active: boolean }) {
  return (
    <StageBackdrop active={active} image={slide21Hero}>
      <div className="relative grid h-full gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[0.58fr_1.42fr] lg:items-center lg:px-16 lg:py-12">
        <div className="flex flex-col justify-center">
          <SlideHeading
            kicker="Why This Matters"
            title="Why Time Accountability Matters"
            subtitle="Better visibility creates fairer recognition, stronger decisions, and less manual work."
            compact
          />
          <div className="mt-7 grid gap-3">
            {[
              "Recognize consistent performers fairly.",
              "Reduce manual follow-ups and month-end confusion.",
              "Plan staffing around real workload patterns.",
            ].map((item) => (
              <div key={item} className="rounded-[18px] border border-[rgba(185,130,69,0.16)] bg-[rgba(42,23,16,0.56)] px-4 py-3 text-sm text-[#F3E7D3]">{item}</div>
            ))}
          </div>
        </div>

        <DemoPanel className="p-5">
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white text-slate-900 shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
            <div className="bg-[#f6f8fb] p-5">
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <div>
                  <p className="text-lg font-semibold">Management Insight Dashboard</p>
                  <p className="text-xs text-slate-500">Attendance, productivity, approvals, and recognition</p>
                </div>
                <span className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">May 2026</span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                {[
                  ["Punctuality", "94%", "+8%"],
                  ["Active hours", "1,248", "this month"],
                  ["Completed days", "96%", "verified"],
                  ["Approval pending", "07", "needs action"],
                ].map(([label, value, note]) => (
                  <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-medium text-slate-500">{label}</p>
                    <p className="mt-2 text-2xl font-semibold">{value}</p>
                    <p className="mt-1 text-xs text-emerald-700">{note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
                <div className="grid gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold">Fair recognition</p>
                    <div className="mt-3 grid gap-2">
                      {[
                        ["Meera Shah", "98% reliability", "Top consistent"],
                        ["Rahul Joshi", "12h overtime", "High contribution"],
                        ["Nikhil Jain", "0 missed approvals", "Process strength"],
                      ].map(([name, value, tag]) => (
                        <div key={name} className="grid grid-cols-[1fr_auto] items-center rounded-xl bg-slate-50 px-3 py-2 text-sm">
                          <div><p className="font-medium">{name}</p><p className="text-xs text-slate-500">{value}</p></div>
                          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium leading-6 text-emerald-800">
                    Everyone's time is recorded clearly, reviewed fairly, and used wisely.
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold">Time allocation</p>
                    <div className="mt-4 grid gap-3">
                      {[
                        ["Client work", 38, "bg-blue-500"],
                        ["Admin work", 24, "bg-amber-500"],
                        ["Breaks", 12, "bg-emerald-500"],
                        ["Meetings", 18, "bg-violet-500"],
                        ["Idle / untracked", 8, "bg-slate-400"],
                      ].map(([label, value, color]) => (
                        <div key={label as string}>
                          <div className="flex justify-between text-xs text-slate-500"><span>{label as string}</span><span>{value as number}%</span></div>
                          <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                            <motion.div initial={{ width: "0%" }} animate={active ? { width: `${value}%` } : { width: "0%" }} transition={{ duration: 0.55 }} className={cn("h-full rounded-full", color as string)} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold">Decision insights</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {["Reduce manual follow-ups", "Identify workload imbalance", "Reward consistency", "Improve planning"].map((item) => (
                        <div key={item} className="rounded-xl bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">{item}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoPanel>
      </div>
    </StageBackdrop>
  );
}

function FinalVisionSlide({ active }: { active: boolean }) {
  return (
    <StageBackdrop active={active} image={slide24Hero}>
      <div className="relative flex h-full flex-col justify-center px-6 py-6 sm:px-10 lg:px-16 lg:py-8">
        <div className="mx-auto w-full max-w-[1040px] text-center">
          <SlideHeading
            kicker="Final Vision"
            eyebrow="Thank You"
            title="Better Systems Help People Serve Justice"
            subtitle="A confident operating layer for legal work, attendance, transparency, and accountability."
            align="center"
            size="standard"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="mx-auto mt-8 max-w-[920px] rounded-[30px] border border-[rgba(185,130,69,0.32)] bg-[rgba(17,10,6,0.82)] px-7 py-7 shadow-[0_30px_100px_rgba(17,10,6,0.44)]"
          >
            <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Final Message</p>
            <p className="mt-4 font-display text-[clamp(1.8rem,2.55vw,2.7rem)] leading-[1.08] text-[#F3E7D3]">
              When justice, time, and technology move together, institutions become more transparent, accountable, and humane.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              {["Legal access", "Lawyer workspace", "Admin control", "Time accountability"].map((item) => (
                <div
                  key={item}
                  className="rounded-[16px] border border-[rgba(185,130,69,0.16)] bg-[rgba(42,23,16,0.54)] px-4 py-3 text-sm text-[#F3E7D3]"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </StageBackdrop>
  );
}

export function LegalWorkplacePresentation() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const activeIndexRef = useRef(0);
  const wheelLockRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    document.title = "Bedi & Associates | Smarter Legal Workplace";
  }, []);

  const navigateTo = (index: number) => {
    const nextIndex = clamp(index, 0, slideMeta.length - 1);
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

    container.scrollTo({ top: 0, behavior: "auto" });
    activeIndexRef.current = 0;
    setActiveIndex(0);

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
      if (Math.abs(event.deltaY) < 20 || wheelLockRef.current) {
        return;
      }

      event.preventDefault();
      wheelLockRef.current = true;
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 720);

      navigateTo(activeIndexRef.current + (event.deltaY > 0 ? 1 : -1));
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
        navigateTo(slideMeta.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentSlide = slideMeta[activeIndex];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#050403]">
      <div className="pointer-events-none absolute left-6 top-6 z-40 hidden xl:block">
        <TopPill className="bg-[rgba(17,10,6,0.86)]">Bedi & Associates</TopPill>
      </div>

      <div className="pointer-events-none absolute right-6 top-6 z-40 hidden xl:block">
        <TopPill className="bg-[rgba(17,10,6,0.86)]">
          <span className="text-[#CDBDA6]">
            {activeIndex === 0 ? "Slide 00" : `Slide ${String(activeIndex).padStart(2, "0")}`}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[rgba(214,161,92,0.7)]" />
          <span className="text-[#FFE6B8]">{currentSlide?.label ?? ""}</span>
        </TopPill>
      </div>

      <div
        ref={containerRef}
        data-testid="legal-main-scroll-story"
        className="story-container relative h-screen w-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden scroll-smooth"
      >
        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[0] = element;
          }}
          testId="legal-demo-slide-wait"
        >
          <WaitingSlide active={activeIndex === 0} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[1] = element;
          }}
          testId="legal-demo-slide-title"
        >
          <TitleSlide active={activeIndex === 1} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[2] = element;
          }}
          testId="legal-demo-slide-solutions"
        >
          <TwoSolutionsSlide active={activeIndex === 2} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[3] = element;
          }}
          testId="legal-demo-slide-public-website"
        >
          <PublicWebsiteDemoSlide active={activeIndex === 3} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[4] = element;
          }}
          testId="legal-demo-slide-case-status"
        >
          <CaseStatusSearchDemoSlide active={activeIndex === 4} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[5] = element;
          }}
          testId="legal-demo-slide-justice-clock"
        >
          <JusticeClockDemoSlide active={activeIndex === 5} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[6] = element;
          }}
          testId="legal-demo-slide-appointments"
        >
          <AppointmentBookingDemoSlide active={activeIndex === 6} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[7] = element;
          }}
          testId="legal-demo-slide-lawyer-dashboard"
        >
          <LawyerDashboardDemoSlide active={activeIndex === 7} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[8] = element;
          }}
          testId="legal-demo-slide-admin"
        >
          <AdminDashboardSlide active={activeIndex === 8} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[9] = element;
          }}
          testId="legal-demo-slide-attendance-intro"
        >
          <AttendanceIntroSlide active={activeIndex === 9} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[10] = element;
          }}
          testId="legal-demo-slide-attendance"
        >
          <AttendanceSoftwareDemoSlide active={activeIndex === 10} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[11] = element;
          }}
          testId="legal-demo-slide-reminders"
        >
          <RemindersDemoSlide active={activeIndex === 11} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[12] = element;
          }}
          testId="legal-demo-slide-benefits"
        >
          <BenefitsSlide active={activeIndex === 12} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[13] = element;
          }}
          testId="legal-demo-slide-final"
        >
          <FinalVisionSlide active={activeIndex === 13} />
        </SectionShell>
      </div>
    </div>
  );
}
