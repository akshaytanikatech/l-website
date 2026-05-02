import { motion, useInView } from "framer-motion";
import { Building2, Cloud, ShieldCheck } from "lucide-react";
import { useRef } from "react";

export function ArchitectureJourney() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.45, once: false });

  return (
    <div
      ref={ref}
      className="grid h-full gap-6 rounded-[38px] border border-navy/10 bg-white/80 p-6 shadow-[0_36px_120px_rgba(5,17,33,0.12)] backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr] lg:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="flex flex-col justify-center"
      >
        <p className="text-xs uppercase tracking-[0.36em] text-gold/90">
          Slide 05 / High Availability
        </p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-[#051121] sm:text-5xl">
          Your Legacy, Never Offline.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-[#051121]/70">
          We create a real-time reflection of your 20-year database. If your local office internet
          or power fails, the &quot;Mirror in the Sky&quot; continues to serve the public, the Justice Clock,
          and your appointments without a second of downtime.
        </p>

        <div className="mt-8 grid gap-4">
          <div className="rounded-[26px] border border-gold/25 bg-gold/10 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">Mirror System</p>
            <p className="mt-3 text-sm leading-7 text-[#051121]/80">
              The office holds the working records. The cloud mirror keeps a synchronized reflection
              ready to continue service instantly.
            </p>
          </div>
          <div className="rounded-[26px] border border-navy/10 bg-white/85 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-[#051121]/50">
              Board Explanation
            </p>
            <p className="mt-3 text-sm leading-7 text-[#051121]/70">
              Think of this like a 24/7 Security Detail for your data. Most websites rely on one
              &quot;brain.&quot; If that brain&apos;s power goes out in the office, the website dies. Our
              architecture uses a Shadow Brain in the cloud. It watches your office records every
              second. If your office goes offline, the Shadow Brain takes over instantly. To the
              public and the Judges, it looks like nothing ever happened. Your 20 years of history
              are never more than a millisecond away.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 26 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative overflow-hidden rounded-[32px] border border-navy/10 bg-[linear-gradient(180deg,rgba(5,17,33,0.98),rgba(10,20,34,1))] p-6 text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,162,39,0.18),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_24%)]" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gold">Resilience diagram</p>
              <p className="mt-2 text-sm text-white/60">
                Local Office Mirror and Cloud Mirror remain in constant reflection.
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
              Zero visible downtime
            </div>
          </div>

          <div className="relative mt-10 flex flex-1 items-center justify-center">
            <div className="grid w-full max-w-[680px] gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div className="rounded-[28px] border border-white/10 bg-white/6 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-gold/25 bg-gold/10 p-3 text-gold">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                      Local Office Mirror
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">On-premise working record</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-white/70">
                  Intake, edits, clerk uploads, and daily registry operations originate here.
                </p>
              </div>

              <div className="relative h-36 md:h-auto md:w-28">
                <div className="beam-link absolute left-1/2 top-1/2 h-[3px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 md:h-full md:w-[3px]" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 1.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                  className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_40px_rgba(201,162,39,0.8)]"
                />
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/6 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-gold/25 bg-gold/10 p-3 text-gold">
                    <Cloud className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                      Cloud Mirror
                    </p>
                    <p className="mt-1 text-sm font-medium text-white">Always-on public continuity</p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-white/70">
                  Serves the public site, the Justice Clock, and appointment flows even if the
                  office goes dark.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "The golden beam represents live replication between both mirrors.",
              "The public experiences continuity while the office restores itself quietly.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-white/10 bg-white/6 px-4 py-4 text-sm text-white/70"
              >
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-gold" />
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
