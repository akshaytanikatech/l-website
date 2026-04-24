import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  LockKeyhole,
  Shield,
  UserRoundCog,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    id: "rbac-login",
    title: "Step 1: RBAC Login",
    headline: "Secure Logic begins with identity orchestration.",
    description:
      "Role-based access controls isolate partners, associates, clerks, and admin teams before any matter data is rendered.",
    tier: "Permission Tier: Identity Gate",
    icon: LockKeyhole,
  },
  {
    id: "lawyer-dashboard",
    title: "Step 2: Lawyer Dashboard",
    headline: "The Lawyer's Cockpit prioritizes today's hearings first.",
    description:
      "Time-sensitive hearings, matter timelines, and filings are elevated in one glance so counsel can act before the registry clock moves.",
    tier: "Permission Tier: Counsel Workspace",
    icon: BriefcaseBusiness,
  },
  {
    id: "admin-assignment",
    title: "Step 3: Admin Control Panel",
    headline: "Assignment logic turns policy into operational consistency.",
    description:
      "Admins can route matters by expertise, availability, and conflict checks without exposing sensitive case data outside approved roles.",
    tier: "Permission Tier: Governance Layer",
    icon: UserRoundCog,
  },
] as const;

export function LawyerCockpit() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    const stepCards = Array.from(
      scroller.querySelectorAll<HTMLElement>("[data-step-card='true']"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const nextIndex = Number(
              (entry.target as HTMLElement).dataset.stepIndex ?? "0",
            );
            setActiveIndex(nextIndex);
          }
        });
      },
      {
        root: scroller,
        threshold: 0.55,
      },
    );

    stepCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const ActiveIcon = steps[activeIndex].icon;

  return (
    <div className="grid h-full overflow-hidden lg:grid-cols-[0.92fr_1.08fr]">
      <div className="story-gradient relative overflow-hidden px-6 py-8 lg:px-10 lg:py-12">
        <div className="absolute inset-0 noise opacity-40" />
        <div className="relative flex h-full flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.36em] text-gold">
              Slide 04 / Internal Management
            </p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
              The Lawyer&apos;s Cockpit.
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-navy/68">
              A private operating surface for counsel, clerks, and firm leadership.
            </p>
          </div>

          <motion.div
            key={steps[activeIndex].id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-[32px] border border-navy/10 bg-white/85 p-6 shadow-[0_24px_90px_rgba(11,31,58,0.14)]"
          >
            <div className="flex items-center gap-3 text-gold">
              <div className="rounded-2xl border border-gold/35 bg-gold/10 p-3">
                <ActiveIcon className="h-5 w-5" />
              </div>
              <span className="text-xs uppercase tracking-[0.28em] text-navy/55">
                {steps[activeIndex].tier}
              </span>
            </div>
            <h3 className="mt-5 font-display text-3xl font-semibold text-navy">
              {steps[activeIndex].headline}
            </h3>
            <p className="mt-4 text-sm leading-7 text-navy/72">
              {steps[activeIndex].description}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Matter Security", "Permission Tiers", "Audit Trail"].map((item, index) => (
                <div key={item} className="rounded-2xl border border-navy/10 bg-paper p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-navy/45">
                    Layer 0{index + 1}
                  </p>
                  <p className="mt-3 text-sm font-medium text-navy">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="hidden items-center gap-3 rounded-full border border-navy/10 bg-white/75 px-4 py-3 text-sm text-navy/70 lg:inline-flex">
            <Shield className="h-4 w-4 text-gold" />
            Scroll the right panel to advance the permission story without breaking the 100vh slide.
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        data-nested-scroll="true"
        className="nested-scroll h-full overflow-y-auto bg-[#edf1f5] px-4 py-6 sm:px-6 lg:px-8"
      >
        <div className="space-y-6">
          <Card
            data-step-card="true"
            data-step-index="0"
            className="min-h-[calc(100vh-3rem)] rounded-[34px] border border-navy/10 bg-white"
          >
            <CardContent className="flex h-full flex-col justify-center p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-gold">{steps[0].title}</p>
              <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[28px] bg-navy p-6 text-paper">
                  <p className="text-xs uppercase tracking-[0.24em] text-paper/45">RBAC Gateway</p>
                  <h3 className="mt-4 font-display text-3xl">Identity before interface.</h3>
                  <p className="mt-4 text-sm leading-7 text-paper/70">
                    Every session is scored by role, practice area, and conflict restrictions before the dashboard loads.
                  </p>
                </div>
                <div className="rounded-[28px] border border-navy/10 bg-paper p-6">
                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-navy/10 bg-white px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-navy/50">Email</p>
                      <p className="mt-2 text-sm text-navy">partner@sterlingequity.legal</p>
                    </div>
                    <div className="rounded-2xl border border-navy/10 bg-white px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-navy/50">Password</p>
                      <p className="mt-2 text-sm text-navy">••••••••••••</p>
                    </div>
                    <div className="grid gap-3 md:grid-cols-3">
                      {["Partner", "Associate", "Clerk"].map((role, roleIndex) => (
                        <div
                          key={role}
                          className={`rounded-2xl border px-4 py-4 text-sm ${
                            roleIndex === 0
                              ? "border-gold bg-gold/10 text-navy"
                              : "border-navy/10 bg-white text-navy/70"
                          }`}
                        >
                          {role}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            data-step-card="true"
            data-step-index="1"
            className="min-h-[calc(100vh-3rem)] rounded-[34px] border border-navy/10 bg-white"
          >
            <CardContent className="flex h-full flex-col justify-center p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-gold">{steps[1].title}</p>
              <div className="mt-6 grid gap-6">
                <div className="grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
                  <div className="rounded-[28px] bg-white p-6 shadow-[0_24px_80px_rgba(11,31,58,0.1)]">
                    <p className="text-xs uppercase tracking-[0.22em] text-navy/45">Today&apos;s Hearings</p>
                    <div className="mt-5 space-y-4">
                      {[
                        ["10:30", "Alpha Holdings vs. Registrar", "Court Hall 3"],
                        ["12:15", "Insolvency Appeal 114", "Hybrid Bench"],
                        ["15:00", "Mediation Review", "Private Chamber"],
                      ].map(([time, matter, venue]) => (
                        <div key={matter} className="rounded-2xl border border-navy/10 bg-paper p-4">
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-lg font-semibold text-navy">{time}</p>
                            <span className="rounded-full bg-navy/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-navy/55">
                              {venue}
                            </span>
                          </div>
                          <p className="mt-3 text-sm text-navy">{matter}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-[28px] bg-navy p-6 text-paper">
                      <p className="text-xs uppercase tracking-[0.22em] text-paper/45">Matter Timeline</p>
                      <div className="mt-5 grid gap-3 md:grid-cols-3">
                        {["Draft complete", "Reply filed", "Hearing listed"].map((item, index) => (
                          <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-paper/45">0{index + 1}</p>
                            <p className="mt-3 text-sm text-paper">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[28px] border border-navy/10 bg-paper p-6">
                      <p className="text-xs uppercase tracking-[0.22em] text-navy/45">Priority alerts</p>
                      <div className="mt-4 space-y-3">
                        {[
                          "Registry reminder due in 42 minutes",
                          "Junior counsel assigned to hearing 3",
                          "Certified copy dispatch approved",
                        ].map((item) => (
                          <div key={item} className="rounded-2xl border border-navy/10 bg-white px-4 py-4 text-sm text-navy/72">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            data-step-card="true"
            data-step-index="2"
            className="min-h-[calc(100vh-3rem)] rounded-[34px] border border-navy/10 bg-white"
          >
            <CardContent className="flex h-full flex-col justify-center p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-gold">{steps[2].title}</p>
              <div className="mt-6 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
                <div className="rounded-[28px] bg-navy p-6 text-paper">
                  <p className="text-xs uppercase tracking-[0.22em] text-paper/45">Assignment Logic</p>
                  <div className="mt-5 space-y-4">
                    {[
                      ["Practice match", "Commercial Litigation"],
                      ["Availability score", "0.86"],
                      ["Conflict check", "Clean"],
                      ["Seniority route", "Partner approval"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                        <span className="text-sm text-paper/70">{label}</span>
                        <span className="text-sm font-semibold text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-[28px] border border-navy/10 bg-paper p-6">
                    <p className="text-xs uppercase tracking-[0.22em] text-navy/45">Assignment Board</p>
                    <div className="mt-5 grid gap-3">
                      {[
                        "Commercial matter routed to Partner A",
                        "Tax matter routed to Specialist Bench Team",
                        "Urgent filing escalated to registry desk",
                      ].map((item) => (
                        <div key={item} className="rounded-2xl border border-gold/25 bg-white px-4 py-4 text-sm text-navy">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[28px] border border-navy/10 bg-white p-6">
                    <p className="text-xs uppercase tracking-[0.22em] text-navy/45">Governance Rules</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {[
                        "Conflict Firewall",
                        "Partner Override",
                        "Audit Logging",
                        "Load Balancing",
                      ].map((pill) => (
                        <span
                          key={pill}
                          className="rounded-full border border-navy/10 bg-paper px-4 py-3 text-sm text-navy/70"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
