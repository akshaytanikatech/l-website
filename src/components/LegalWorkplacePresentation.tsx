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
    id: "shared-notes",
    label: "Shared Notes",
    script:
      "Kabhi-kabhi ek case par multiple lawyers kaam karte hain. Ek document check karta hai, dusra argument prepare karta hai, teesra research karta hai. Agar sab notes WhatsApp, email, diary, aur random files mein rahenge, toh confusion pakka hai. Shared notes se team alag-alag jagah se kaam kare, phir bhi case information ek jagah connected rahegi.",
  },
  {
    id: "admin",
    label: "Admin Dashboard",
    script:
      "Now comes the admin dashboard. Simple Hindi mein bolein toh, yeh chief ka adda hai. But presentation-friendly language mein, this is the control center. Admin can manage users, assign roles, control appointments, update notices, and manage Justice Clock data. This is not for unnecessary micromanagement. This is for visibility, accountability, and better control.",
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
    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous story"
          onClick={onPrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(185,130,69,0.22)] bg-[rgba(17,10,6,0.82)] text-[#F3E7D3] transition hover:border-[rgba(214,161,92,0.4)] hover:text-[#FFE6B8]"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next story"
          onClick={onNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(185,130,69,0.22)] bg-[rgba(17,10,6,0.82)] text-[#F3E7D3] transition hover:border-[rgba(214,161,92,0.4)] hover:text-[#FFE6B8]"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to story ${index + 1}`}
            onClick={() => onSelect(index)}
            className={cn(
              "h-2.5 rounded-full transition-all",
              index === activeIndex ? "w-8 bg-[#D6A15C]" : "w-2.5 bg-[rgba(214,161,92,0.36)]",
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
    <div className="mx-auto w-full max-w-[290px] rounded-[38px] border border-[rgba(255,255,255,0.08)] bg-[#0c0b10] p-2.5 shadow-[0_26px_90px_rgba(0,0,0,0.38)]">
      <div className="rounded-[31px] border border-[rgba(214,161,92,0.16)] bg-[linear-gradient(180deg,#15141c_0%,#09080d_100%)] p-3">
        <div className="mx-auto mb-3 h-1.5 w-20 rounded-full bg-[rgba(255,255,255,0.14)]" />
        {label ? <p className="mb-3 text-center text-[0.66rem] uppercase tracking-[0.26em] text-[#AFA7BC]">{label}</p> : null}
        <div className="rounded-[24px] bg-[linear-gradient(180deg,#1b1a26_0%,#101018_100%)] p-3">
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
                          <div key={item} className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6">
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
    { text: "Sir, mera case ka kya hua?", tone: "incoming" as const },
    { text: "Sir, next date kab hai?", tone: "incoming" as const },
    { text: "Sir, bail mili ya nahi?", tone: "incoming" as const },
    { text: "Sir, judge saab mood mein the kya?", tone: "incoming" as const },
    { text: "Sir, main tension loon ya ghar jaake so jaun?", tone: "incoming" as const },
    {
      text: "Raat ke 2 baje hai, so jao bhai. Agla update website pe mil jayega.",
      tone: "outgoing" as const,
    },
  ];
  const { index, goPrev, goNext, goTo } = useAutoCarousel(active, 2, 5000, 15000);
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
                  <div className="grid gap-3">
                    <div className="grid grid-cols-4 gap-2">
                      {["WhatsApp", "Calls", "SMS", "Browser"].map((item) => (
                        <div key={item} className="rounded-[18px] bg-white/6 px-2 py-3 text-center text-[0.62rem] uppercase tracking-[0.16em] text-[#CFC6D7]">
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
                            "rounded-[22px] px-4 py-3 text-sm leading-6",
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
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {[
                        "Same update request repeated all day",
                        "Client depends on calls instead of a system",
                        "Lawyer loses focus before hearings",
                        "Late-night messaging still continues",
                      ].map((item) => (
                        <div key={item} className="rounded-[18px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.54)] px-4 py-4 text-sm text-[#F3E7D3]">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
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
                        <div className="mt-4 flex items-center gap-3 rounded-[18px] border border-[rgba(31,23,17,0.08)] bg-white/84 px-4 py-4">
                          <Search className="h-4 w-4 text-[#8B5A2B]" />
                          <span className="text-sm">{query || "Shah Bano case"}</span>
                          <span className="ml-auto rounded-full bg-[#F5E6C8] px-3 py-1 text-[0.66rem] uppercase tracking-[0.16em] text-[#7C4B29]">Search</span>
                        </div>
                        <div className="mt-4 grid gap-3">
                          {["Search by case title", "Search by party name", "Search by advocate", "Search by case number"].map((item) => (
                            <div key={item} className="rounded-[16px] bg-[#F8F2EA] px-4 py-3 text-sm text-[#43322A]">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[24px] border border-[rgba(31,23,17,0.08)] bg-white/88 p-5 shadow-[0_20px_50px_rgba(35,24,16,0.08)]">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#8B5A2B]">Search Result</p>
                          <span className="rounded-full bg-[#DCF5E4] px-3 py-1 text-[0.66rem] uppercase tracking-[0.16em] text-[#236447]">Result Found</span>
                        </div>
                        <div className="mt-4 grid gap-3">
                          {[
                            ["Case Title", "Mohd. Ahmed Khan v. Shah Bano Begum"],
                            ["Court", "Supreme Court of India"],
                            ["Judgment Date", "23 April 1985"],
                            ["Citation", "1985 AIR 945"],
                            ["Issue", "Maintenance rights under Section 125 CrPC"],
                            ["Outcome", "Maintenance allowed for Shah Bano Begum"],
                          ].map(([label, value]) => (
                            <div key={label} className="grid gap-2 rounded-[18px] border border-[rgba(31,23,17,0.08)] bg-[#FCF8F2] px-4 py-3 md:grid-cols-[170px_1fr]">
                              <p className="text-[0.66rem] uppercase tracking-[0.18em] text-[#8B5A2B]">{label}</p>
                              <p className="text-sm text-[#31241B]">{value}</p>
                            </div>
                          ))}
                        </div>
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

function JusticeClockDemoSlide({ active }: { active: boolean }) {
  const headlineCards = [
    { label: "Institution", value: 412 },
    { label: "Disposal", value: 376 },
    { label: "CCR", value: 91, suffix: "%" },
    { label: "Listed Today", value: 267 },
  ];

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
          <div className="overflow-hidden rounded-[28px] border border-[rgba(227,207,170,0.2)] bg-[linear-gradient(180deg,#E7D7BE_0%,#D8C3A2_100%)] shadow-[0_24px_70px_rgba(16,8,4,0.25)]">
            <div className="border-b border-[rgba(59,34,20,0.14)] bg-[linear-gradient(90deg,#631A1A_0%,#892B1B_38%,#27385D_100%)] px-6 py-5 text-[#FFF4E5]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#F3CD8E]">JUSTICE CLOCK</p>
                  <p className="mt-2 text-2xl font-semibold">Supreme Court / Bombay Board Style Display</p>
                </div>
                <div className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm tracking-[0.18em] text-[#FDE8C0]">
                  न्याय घड़ी
                </div>
              </div>
            </div>

            <div className="grid gap-4 p-5 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="grid gap-4 sm:grid-cols-2">
                {headlineCards.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={active ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.34, delay: 0.14 + index * 0.06 }}
                    className="rounded-[22px] border border-[rgba(59,34,20,0.12)] bg-[rgba(255,248,238,0.84)] p-4 text-[#332418]"
                  >
                    <p className="text-[0.66rem] uppercase tracking-[0.2em] text-[#7C4B29]">{item.label}</p>
                    <p className="mt-3 text-[2rem] font-semibold text-[#1F2440]">
                      <CountText target={item.value} active={active} suffix={item.suffix ?? ""} />
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-[#1D6C4A]">
                      <span className="live-dot" />
                      Live board sync
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-[24px] border border-[rgba(59,34,20,0.12)] bg-[rgba(255,248,238,0.92)] p-4 text-[#332418]">
                <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr] gap-2 border-b border-[rgba(59,34,20,0.12)] px-3 pb-3">
                  {["Board", "Institution", "Disposal", "CCR"].map((item) => (
                    <p key={item} className="text-[0.66rem] uppercase tracking-[0.2em] text-[#7C4B29]">
                      {item}
                    </p>
                  ))}
                </div>
                <div className="mt-2 grid gap-2">
                  {[
                    ["Supreme Court", 128, 116, "91%"],
                    ["Bombay High Court", 412, 376, "91%"],
                    ["City Civil Court", 286, 244, "85%"],
                    ["Sessions Matters", 94, 82, "87%"],
                    ["Commercial Benches", 63, 58, "92%"],
                  ].map(([label, institution, disposal, ccr], index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={active ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.28, delay: 0.36 + index * 0.06 }}
                      className="grid grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr] gap-2 rounded-[16px] border border-[rgba(59,34,20,0.08)] bg-[#FCF7EF] px-3 py-3"
                    >
                      <p className="text-sm font-medium text-[#31241B]">{label}</p>
                      <p className="text-sm text-[#1F2440]">{institution}</p>
                      <p className="text-sm text-[#1F2440]">{disposal}</p>
                      <p className="text-sm text-[#1D6C4A]">{ccr}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[18px] border border-[rgba(59,34,20,0.08)] bg-[#FCF7EF] px-4 py-3">
                    <p className="text-[0.66rem] uppercase tracking-[0.18em] text-[#7C4B29]">Age-wise Pendency</p>
                    <div className="mt-3 grid gap-2 text-sm text-[#31241B]">
                      <div className="flex justify-between gap-3"><span>0-1 year</span><span>384</span></div>
                      <div className="flex justify-between gap-3"><span>1-3 years</span><span>671</span></div>
                      <div className="flex justify-between gap-3"><span>3+ years</span><span>383</span></div>
                    </div>
                  </div>
                  <div className="rounded-[18px] border border-[rgba(59,34,20,0.08)] bg-[#FCF7EF] px-4 py-3">
                    <p className="text-[0.66rem] uppercase tracking-[0.18em] text-[#7C4B29]">Today's Board</p>
                    <div className="mt-3 grid gap-2 text-sm text-[#31241B]">
                      <div className="flex justify-between gap-3"><span>Listed matters</span><span>267</span></div>
                      <div className="flex justify-between gap-3"><span>Urgent mentions</span><span>19</span></div>
                      <div className="flex justify-between gap-3"><span>Orders uploaded</span><span>52</span></div>
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

function AppointmentBookingDemoSlide({ active }: { active: boolean }) {
  const incomingCalls = [
    ["Annoying Client", "Sir aaj 1 baje milte hai?", "OK!"],
    ["Annoying Client", "Sir loose motion ho raha hai 7 baje milte hai?", "Acha okay!"],
    ["Time taking client", "Sir bas 2 min baat karna tha?", "Ohh! achaa"],
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
                  <div className="grid gap-3">
                    <AnimatePresence initial={false}>
                      {visibleCalls.map(([name, line, reply], callIndex) => (
                        <motion.div
                          key={line}
                          initial={{ opacity: 0, y: 14, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="rounded-[22px] bg-white/6 p-3"
                          data-testid={`appointment-phone-message-${callIndex + 1}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2E394D] text-[#F6E9D6]">
                              <PhoneCall className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#F4EDF7]">{name}</p>
                              <p className="mt-1 text-sm text-[#C7C0D1]">{line}</p>
                            </div>
                          </div>
                          <div className="mt-3 ml-auto max-w-[75%] rounded-[18px] bg-[#3B2A18] px-3 py-2 text-sm text-[#FFE6BF]">
                            {reply}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </PhoneFrame>

                <div className="rounded-[24px] border border-[rgba(185,130,69,0.16)] bg-[rgba(11,8,6,0.72)] p-5">
                  <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#D6A15C]">Manual Scheduling Problem</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      "Calls keep changing time slots",
                      "Lawyer attention gets interrupted",
                      "No shared view for the team",
                      "Client still feels uncertain",
                    ].map((item) => (
                      <div key={item} className="rounded-[18px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.54)] px-4 py-4 text-sm text-[#F3E7D3]">
                        {item}
                      </div>
                    ))}
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
          <div className="grid gap-4 xl:grid-cols-[1.02fr_0.98fr]">
            <div className="rounded-[26px] border border-[rgba(185,130,69,0.16)] bg-[rgba(11,8,6,0.72)] p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Open Case Workspace</p>
                  <p className="mt-2 text-2xl font-semibold text-[#F3E7D3]">Bedi Infra v. State of Maharashtra</p>
                  <p className="mt-2 text-sm text-[#D8C7B2]">Next hearing: 21 May 2026 • Commercial Bench • Reply filing due</p>
                </div>
                <ShieldCheck className="h-5 w-5 text-[#D6A15C]" />
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[22px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.56)] p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#D6A15C]">Case Summary</p>
                  <div className="mt-4 grid gap-3">
                    {[
                      ["Lead advocate", "Adv. Meera Shah"],
                      ["Client", "Bedi Infra Projects"],
                      ["Stage", "Reply ready for review"],
                      ["Action", "Finalize annexures before 6 PM"],
                    ].map(([label, value]) => (
                      <div key={label} className="grid gap-2 rounded-[18px] border border-[rgba(185,130,69,0.12)] bg-[rgba(17,10,6,0.7)] px-4 py-3 md:grid-cols-[130px_1fr]">
                        <p className="text-[0.66rem] uppercase tracking-[0.16em] text-[#D6A15C]">{label}</p>
                        <p className="text-sm text-[#F3E7D3]">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[22px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.56)] p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#D6A15C]">Live Case Images</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      [slide17Hero, "Court exterior", "sm:col-span-2", "aspect-[16/10] object-center"],
                      [slide21Hero, "Evidence binder", "", "aspect-[4/3] object-[center_28%]"],
                      [slide8, "Client conference", "", "aspect-[4/3] object-center"],
                      [slide1, "Filed papers", "", "aspect-[4/3] object-[center_22%]"],
                    ].map(([src, label, cardClassName, imageClassName]) => (
                      <div
                        key={label}
                        className={cn(
                          "group overflow-hidden rounded-[18px] border border-[rgba(185,130,69,0.12)] bg-[rgba(17,10,6,0.72)]",
                          cardClassName,
                        )}
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={src}
                            alt={label}
                            className={cn(
                              "w-full object-cover transition duration-500 group-hover:scale-[1.03]",
                              imageClassName,
                            )}
                            loading="lazy"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(17,10,6,0.02)_0%,rgba(17,10,6,0.1)_48%,rgba(17,10,6,0.82)_100%)]" />
                          <p className="absolute bottom-0 left-0 right-0 px-3 py-2 text-sm text-[#F3E7D3]">
                            {label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[24px] border border-[rgba(185,130,69,0.16)] bg-[rgba(11,8,6,0.72)] p-4">
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Assigned Matters</p>
                <div className="mt-4 grid gap-3">
                  {[
                    ["Bedi Infra v. State", "Reply filing due"],
                    ["Ananya Rao v. Union", "Compilation review"],
                    ["Mohan Foods Arbitration", "Hearing prep"],
                  ].map(([title, status]) => (
                    <div key={title} className="flex items-center justify-between rounded-[18px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.54)] px-4 py-4">
                      <p className="text-sm text-[#F3E7D3]">{title}</p>
                      <p className="text-[0.72rem] uppercase tracking-[0.16em] text-[#D6A15C]">{status}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-[rgba(185,130,69,0.16)] bg-[rgba(11,8,6,0.72)] p-4">
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Workspace Tools</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {["Timeline", "Documents", "Notes", "Client instructions", "Secure uploads", "Hearing checklist"].map((item) => (
                    <div key={item} className="rounded-[18px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.54)] px-4 py-3 text-sm text-[#F3E7D3]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
  const { index, goPrev, goNext, goTo } = useAutoCarousel(active && dashboardReady, 4, 5000);

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
          <div className="overflow-hidden rounded-[28px] border border-[rgba(185,130,69,0.16)] bg-[rgba(9,8,10,0.84)]">
            {!dashboardReady ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center gap-6">
                <motion.div
                  animate={active ? { rotate: 360 } : {}}
                  transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(214,161,92,0.3)] border-t-[#F5D58F] bg-[rgba(255,255,255,0.04)]"
                >
                  <LayoutDashboard className="h-8 w-8 text-[#F5D58F]" />
                </motion.div>
                <div className="text-center">
                  <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Loading Admin Control</p>
                  <p className="mt-3 text-2xl font-semibold text-[#F3E7D3]">Bringing the control room online...</p>
                </div>
              </div>
            ) : (
              <div className="grid min-h-[520px] lg:grid-cols-[92px_1fr]">
                <div className="border-r border-[rgba(185,130,69,0.14)] bg-[rgba(18,14,12,0.92)] px-4 py-5">
                  <div className="flex flex-col items-center gap-4">
                    {[LayoutDashboard, Users2, Scale, BellRing].map((Icon, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-2xl border text-[#F3E7D3]",
                          idx === index
                            ? "border-[rgba(214,161,92,0.4)] bg-[rgba(214,161,92,0.18)] text-[#FFE6B8]"
                            : "border-[rgba(185,130,69,0.14)] bg-[rgba(255,255,255,0.04)]",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5">
                  <AnimatePresence mode="wait">
                    {index === 0 ? (
                      <motion.div
                        key="admin-analytics"
                        initial={{ opacity: 0, x: 22 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -22 }}
                        transition={{ duration: 0.25 }}
                        className="grid gap-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#D6A15C]">Analytics</p>
                            <p className="mt-2 text-2xl font-semibold text-[#F3E7D3]">Live platform overview</p>
                          </div>
                          <TopPill className="px-3 py-1.5 text-[0.62rem]">Dashboard</TopPill>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                          {[
                            ["Active users", "124"],
                            ["Appointments today", "18"],
                            ["Notices published", "07"],
                            ["Justice Clock sync", "Healthy"],
                          ].map(([label, value]) => (
                            <div key={label} className="rounded-[22px] border border-[rgba(185,130,69,0.14)] bg-[rgba(255,255,255,0.04)] p-4">
                              <p className="text-[0.66rem] uppercase tracking-[0.18em] text-[#D6A15C]">{label}</p>
                              <p className="mt-3 text-2xl font-semibold text-[#F3E7D3]">{value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="grid gap-4 xl:grid-cols-[1.02fr_0.98fr]">
                          <div className="rounded-[24px] border border-[rgba(185,130,69,0.14)] bg-[rgba(255,255,255,0.04)] p-5">
                            <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#D6A15C]">Usage curve</p>
                            <div className="mt-5 flex h-44 items-end gap-3">
                              {[38, 54, 43, 68, 72, 61, 88].map((value, idx) => (
                                <div key={idx} className="flex-1 rounded-t-[18px] bg-[linear-gradient(180deg,#D6A15C_0%,#744A2A_100%)]" style={{ height: `${value}%` }} />
                              ))}
                            </div>
                          </div>
                          <div className="rounded-[24px] border border-[rgba(185,130,69,0.14)] bg-[rgba(255,255,255,0.04)] p-5">
                            <p className="text-[0.72rem] uppercase tracking-[0.26em] text-[#D6A15C]">Recent admin actions</p>
                            <div className="mt-4 grid gap-3">
                              {[
                                "User access updated for registry desk",
                                "Notice published for holiday circular",
                                "Justice Clock pushed to public screen",
                              ].map((item) => (
                                <div key={item} className="rounded-[18px] bg-[rgba(255,255,255,0.05)] px-4 py-3 text-sm text-[#F3E7D3]">
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}

                    {index === 1 ? (
                      <motion.div
                        key="admin-team"
                        initial={{ opacity: 0, x: 22 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -22 }}
                        transition={{ duration: 0.25 }}
                        className="grid gap-4"
                      >
                        <div>
                          <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#D6A15C]">Team Management</p>
                          <p className="mt-2 text-2xl font-semibold text-[#F3E7D3]">Names, phones, attendance, roles, and access</p>
                        </div>
                        <div className="overflow-hidden rounded-[24px] border border-[rgba(185,130,69,0.14)] bg-[rgba(255,255,255,0.04)]">
                          <div className="grid grid-cols-[1.2fr_1fr_0.8fr_0.9fr_0.9fr_1fr] gap-2 border-b border-[rgba(185,130,69,0.14)] px-4 py-3">
                            {["Name", "Phone", "Attendance", "Performance", "Designation", "Access"].map((item) => (
                              <p key={item} className="text-[0.66rem] uppercase tracking-[0.16em] text-[#D6A15C]">{item}</p>
                            ))}
                          </div>
                          <div className="grid gap-2 p-3">
                            {[
                              ["Rohan Bedi", "+91 98XXXXXX21", "92%", "A", "Admin", "Full"],
                              ["Meera Shah", "+91 97XXXXXX13", "95%", "A+", "Lawyer", "Cases only"],
                              ["Nikhil Jain", "+91 99XXXXXX44", "88%", "B+", "Support", "Limited"],
                              ["Registry Desk", "+91 96XXXXXX80", "90%", "A", "Operations", "Appointments"],
                            ].map((row) => (
                              <div key={row[0]} className="grid grid-cols-[1.2fr_1fr_0.8fr_0.9fr_0.9fr_1fr] gap-2 rounded-[18px] bg-[rgba(255,255,255,0.05)] px-4 py-3 text-sm text-[#F3E7D3]">
                                {row.map((cell) => (
                                  <span key={cell}>{cell}</span>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : null}

                    {index === 2 ? (
                      <motion.div
                        key="admin-clock"
                        initial={{ opacity: 0, x: 22 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -22 }}
                        transition={{ duration: 0.25 }}
                        className="grid gap-4 xl:grid-cols-[0.96fr_1.04fr]"
                      >
                        <div className="rounded-[24px] border border-[rgba(185,130,69,0.14)] bg-[rgba(255,255,255,0.04)] p-5">
                          <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#D6A15C]">Justice Clock Control</p>
                          <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            {[
                              ["Cases Filed", "412"],
                              ["Cases Disposed", "376"],
                              ["CCR", "91%"],
                              ["Listed Today", "267"],
                            ].map(([label, value]) => (
                              <div key={label} className="rounded-[18px] bg-[rgba(255,255,255,0.05)] px-4 py-4">
                                <p className="text-[0.66rem] uppercase tracking-[0.16em] text-[#D6A15C]">{label}</p>
                                <p className="mt-2 text-sm text-[#F3E7D3]">{value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-[24px] border border-[rgba(185,130,69,0.14)] bg-[rgba(255,255,255,0.04)] p-5">
                          <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#D6A15C]">Publish Update</p>
                          <div className="mt-4 rounded-[20px] bg-[rgba(255,255,255,0.05)] p-4 text-sm leading-7 text-[#F3E7D3]">
                            Review the revised institution and disposal numbers, then push the updated board to the public lobby screen and website.
                          </div>
                          <button type="button" className="mt-4 rounded-[18px] bg-[#D6A15C] px-4 py-3 text-sm font-medium text-[#2E1809]">
                            Update Justice Clock
                          </button>
                        </div>
                      </motion.div>
                    ) : null}

                    {index === 3 ? (
                      <motion.div
                        key="admin-notices"
                        initial={{ opacity: 0, x: 22 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -22 }}
                        transition={{ duration: 0.25 }}
                        className="grid gap-4"
                      >
                        <div>
                          <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[#D6A15C]">Notice Management</p>
                          <p className="mt-2 text-2xl font-semibold text-[#F3E7D3]">Create, manage, and publish realistic legal notices</p>
                        </div>
                        <div className="grid gap-4 xl:grid-cols-3">
                          {[
                            ["Public Holiday Notice", "Court and filing counters will remain closed on 17 May 2026 for Buddha Purnima."],
                            ["Cause List Update", "Court No. 4 matters listed after 2 PM due to revised board timing."],
                            ["Registry Advisory", "Certified copy requests filed after 4 PM will be processed on the next working day."],
                          ].map(([title, body]) => (
                            <div key={title} className="rounded-[24px] border border-[rgba(185,130,69,0.14)] bg-[rgba(255,255,255,0.05)] p-5">
                              <p className="text-lg font-semibold text-[#F3E7D3]">{title}</p>
                              <p className="mt-3 text-sm leading-7 text-[#D8C7B2]">{body}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <StoryControls activeIndex={index} total={4} onPrev={goPrev} onNext={goNext} onSelect={goTo} />
                </div>
              </div>
            )}
          </div>
        </DemoPanel>
      </div>
    </StageBackdrop>
  );
}

function AttendanceSoftwareDemoSlide({ active }: { active: boolean }) {
  const step = useSequencedStep(active, 5, 920, false);
  const timerSnapshots = ["00:12:08", "03:08:42", "03:42:15", "06:24:10", "08:00:00"] as const;
  const activeTime = timerSnapshots[Math.min(step, timerSnapshots.length - 1)];

  const employeeSteps = [
    "Clock In",
    "Break",
    "Resume",
    "Clock Out",
  ];
  const ledgerRows = [
    ["09:02 AM", "Clock In", "Synced"],
    ["01:08 PM", "Break Started", step >= 1 ? "Logged" : "Waiting"],
    ["01:42 PM", "Work Resumed", step >= 2 ? "Logged" : "Waiting"],
    ["06:14 PM", "Clock Out", step >= 3 ? "Confirmed" : "Pending"],
  ] as const;
  const syncProgress = clamp((step + 1) / employeeSteps.length, 0.25, 1);

  return (
    <StageBackdrop active={active} image={slide21Hero}>
      <div className="relative grid h-full gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:px-16 lg:py-12">
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
          <div className="grid gap-4 xl:grid-cols-[0.98fr_1.02fr]">
            <div className="rounded-[24px] border border-[rgba(185,130,69,0.16)] bg-[rgba(11,8,6,0.72)] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Employee Flow</p>
                  <p className="mt-2 text-sm text-[#D8C7B2]">Clock in, mark break, resume, and close the day.</p>
                </div>
                <Clock3 className="h-5 w-5 text-[#D6A15C]" />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {employeeSteps.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    animate={active ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.12 + index * 0.06 }}
                    className={cn(
                      "rounded-[18px] border px-4 py-4 text-sm",
                      index <= step
                        ? "border-[rgba(74,222,128,0.24)] bg-[rgba(74,222,128,0.12)] text-[#F3E7D3]"
                        : "border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.52)] text-[#D8C7B2]",
                    )}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 rounded-[22px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.56)] p-4">
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#D6A15C]">Active Time</p>
                <p className="mt-3 text-4xl font-semibold text-[#F3E7D3] tabular-nums">{activeTime}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[rgba(185,130,69,0.12)]">
                  <motion.div
                    initial={{ width: "10%" }}
                    animate={active ? { width: `${Math.max(12, ((step + 1) / timerSnapshots.length) * 100)}%` } : { width: "10%" }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="h-full rounded-full bg-[linear-gradient(90deg,#9BE7B4_0%,#D6A15C_100%)]"
                  />
                </div>
              </div>

              <div className="mt-4 rounded-[22px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.56)] p-3">
                <img
                  src={portraitImage}
                  alt="Attendance workflow preview"
                  className="h-44 w-full rounded-[18px] object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="rounded-[24px] border border-[rgba(185,130,69,0.16)] bg-[rgba(11,8,6,0.72)] p-4">
              <div className="rounded-[22px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.56)] p-4">
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Admin Dashboard</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Total Hours", step >= 3 ? "8h 00m" : "Live"],
                    ["Breaks Taken", step >= 1 ? "1 logged" : "Pending"],
                    ["Late Entry", step >= 0 ? "No" : "Waiting"],
                    ["Overtime", step >= 3 ? "0h 20m" : "—"],
                    ["Daily Summary", step >= 3 ? "Ready" : "Building"],
                    ["Attendance Trends", step >= 3 ? "Synced" : "Updating"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-[18px] border border-[rgba(185,130,69,0.14)] bg-[rgba(17,10,6,0.76)] px-4 py-4"
                    >
                      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#D6A15C]">{label}</p>
                      <p className="mt-2 text-sm text-[#F3E7D3]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-[22px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.56)] p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                  <div className="grid gap-3 md:w-[220px] md:shrink-0">
                    <div className="overflow-hidden rounded-[18px] border border-[rgba(185,130,69,0.14)] bg-[rgba(17,10,6,0.76)]">
                      <img
                        src={portraitImage}
                        alt="Attendance dashboard preview"
                        className="h-44 w-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <div className="rounded-[18px] border border-[rgba(185,130,69,0.14)] bg-[rgba(17,10,6,0.76)] p-3">
                      <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#D6A15C]">Session Summary</p>
                      <div className="mt-3 grid gap-2.5 text-sm text-[#F3E7D3]">
                        <div className="flex items-center justify-between gap-3 rounded-[14px] bg-[rgba(42,23,16,0.5)] px-3 py-2.5">
                          <span>Current mode</span>
                          <span className="text-[#D8C7B2]">Office</span>
                        </div>
                        <div className="flex items-center justify-between gap-3 rounded-[14px] bg-[rgba(42,23,16,0.5)] px-3 py-2.5">
                          <span>Sync status</span>
                          <span className="text-[#9BE7B4]">Healthy</span>
                        </div>
                        <div className="flex items-center justify-between gap-3 rounded-[14px] bg-[rgba(42,23,16,0.5)] px-3 py-2.5">
                          <span>Break policy</span>
                          <span className="text-[#D8C7B2]">Clear</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid flex-1 gap-3">
                    <div className="rounded-[18px] border border-[rgba(185,130,69,0.14)] bg-[rgba(17,10,6,0.76)] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#D6A15C]">Daily Ledger</p>
                        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#9BE7B4]">Employee-visible</p>
                      </div>
                      <div className="mt-4 grid gap-3">
                        {ledgerRows.map(([time, label, status], index) => (
                          <div
                            key={label}
                            className="grid grid-cols-[80px_1fr_auto] items-center gap-3 rounded-[16px] border border-[rgba(185,130,69,0.12)] bg-[rgba(42,23,16,0.5)] px-3 py-3"
                          >
                            <p className="text-[0.68rem] uppercase tracking-[0.16em] text-[#D6A15C]">{time}</p>
                            <p className="text-sm text-[#F3E7D3]">{label}</p>
                            <p className={cn("text-[0.72rem]", index <= step ? "text-[#9BE7B4]" : "text-[#D8C7B2]")}>
                              {status}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[18px] border border-[rgba(185,130,69,0.14)] bg-[rgba(17,10,6,0.76)] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#D6A15C]">Attendance Sync</p>
                        <p className="text-sm text-[#F3E7D3]">{Math.round(syncProgress * 100)}%</p>
                      </div>
                      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[rgba(185,130,69,0.12)]">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={active ? { width: `${Math.round(syncProgress * 100)}%` } : { width: "0%" }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="h-full rounded-full bg-[linear-gradient(90deg,#9BE7B4_0%,#D6A15C_100%)]"
                        />
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {["Fair attendance", "Clear hours", "Less manual work"].map((item) => (
                          <DemoBadge key={item} label={item} />
                        ))}
                      </div>
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
  const cards = [
    "Fair Attendance",
    "Overtime Clarity",
    "Less Manual Work",
    "Better Employee Trust",
    "Better Management Control",
    "Timely Follow-ups",
    "Clear Accountability",
  ];

  return (
    <StageBackdrop active={active} image={slide21Hero}>
      <div className="relative flex h-full flex-col justify-center px-6 py-8 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto w-full max-w-[1460px]">
          <SlideHeading
            kicker="Benefits / Why This Matters"
            title="Clear Systems Prevent Expensive Confusion"
            subtitle="Attendance, salary, overtime, and follow-ups work better when the records are clear."
            compact
          />

          <div className="mt-10 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <DemoPanel className="p-5">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {cards.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    animate={active ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.28, delay: 0.12 + index * 0.05 }}
                    className="rounded-[20px] border border-[rgba(185,130,69,0.16)] bg-[rgba(42,23,16,0.58)] px-4 py-4 text-sm text-[#F3E7D3]"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </DemoPanel>

            <DemoPanel className="p-5">
              <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Salary + Time Visibility</p>
              <div className="mt-5 grid gap-3">
                {[
                  ["Salary calculation", "Depends on correct work-hour records"],
                  ["Overtime record", "Visible without manual follow-up"],
                  ["Late entry visibility", "Clear for payroll review"],
                  ["Break clarity", "Fair for both employee and leadership"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-2 rounded-[18px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.54)] px-4 py-4 md:grid-cols-[180px_1fr]"
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#D6A15C]">{label}</p>
                    <p className="text-sm text-[#F3E7D3]">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[22px] border border-[rgba(185,130,69,0.16)] bg-[rgba(11,8,6,0.72)] p-4">
                <p className="text-sm leading-7 text-[#D8C7B2]">
                  The chief already has 100 tasks. The system handles the overtime visibility before
                  it becomes a month-end surprise.
                </p>
              </div>
            </DemoPanel>
          </div>
        </div>
      </div>
    </StageBackdrop>
  );
}

function FinalVisionSlide({ active }: { active: boolean }) {
  return (
    <StageBackdrop active={active} image={slide24Hero}>
      <div className="relative flex h-full flex-col justify-center px-6 py-6 sm:px-10 lg:px-16 lg:py-8">
        <div className="mx-auto w-full max-w-[1180px] text-center">
          <SlideHeading
            kicker="Final Vision"
            eyebrow="Thank You"
            title="This Is Not Just About Software"
            subtitle="It is about building a smarter legal workplace."
            align="center"
            size="standard"
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <DemoPanel className="p-6 text-left">
              <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Legal Platform</p>
              <div className="mt-5 grid gap-3">
                {[
                  "Legal work becomes smarter",
                  "Case access improves",
                  "Lawyer workspace improves",
                  "Admin control improves",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[18px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.54)] px-4 py-4 text-sm text-[#F3E7D3]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </DemoPanel>

            <DemoPanel className="p-6 text-left">
              <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Attendance Software</p>
              <div className="mt-5 grid gap-3">
                {[
                  "Office work becomes clearer",
                  "Attendance becomes fair",
                  "Reminders reduce missed tasks",
                  "Management gets visibility",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[18px] border border-[rgba(185,130,69,0.14)] bg-[rgba(42,23,16,0.54)] px-4 py-4 text-sm text-[#F3E7D3]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </DemoPanel>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={active ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.36 }}
            className="mx-auto mt-8 max-w-[920px] rounded-[30px] border border-[rgba(185,130,69,0.32)] bg-[rgba(17,10,6,0.82)] px-6 py-5 shadow-[0_30px_100px_rgba(17,10,6,0.44)]"
          >
            <p className="text-[0.72rem] uppercase tracking-[0.34em] text-[#D6A15C]">Final Message</p>
            <p className="mt-4 font-display text-[clamp(1.8rem,2.55vw,2.7rem)] leading-[1.08] text-[#F3E7D3]">
              Building a smarter legal workplace for clients, lawyers, leadership, and employees.
            </p>
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
          <span className="text-[#CDBDA6]">{`Slide ${String(activeIndex + 1).padStart(2, "0")}`}</span>
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
          testId="legal-demo-slide-shared-notes"
        >
          <SharedNotesDemoSlide active={activeIndex === 8} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[9] = element;
          }}
          testId="legal-demo-slide-admin"
        >
          <AdminDashboardSlide active={activeIndex === 9} />
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
