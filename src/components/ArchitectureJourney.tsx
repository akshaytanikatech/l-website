import { motion, useInView } from "framer-motion";
import { Cloud, Database, Lock, MonitorSmartphone, Server, Shield } from "lucide-react";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const connectorPaths: Array<{ path: string; delay: number }> = [
  { path: "M 540 300 C 540 250, 540 220, 540 180", delay: 0.4 },
  { path: "M 540 300 C 500 290, 460 290, 410 290", delay: 0.55 },
  { path: "M 540 300 C 590 300, 650 300, 700 300", delay: 0.7 },
  { path: "M 540 300 C 540 350, 540 390, 540 440", delay: 0.85 },
];

export function ArchitectureJourney() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });

  return (
    <div ref={ref} className="grid h-full gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="flex flex-col justify-center">
        <p className="text-xs uppercase tracking-[0.36em] text-gold">
          Slide 05 / The Data Backbone
        </p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
          High availability, even when the local office stack drops offline.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-navy/68">
          The public site serves from the cloud sync layer and secure database replica. Local office
          interruptions do not erase public uptime, internal auditability, or downstream client access.
        </p>

        <div className="mt-8 grid gap-4">
          {[
            "Public portal remains online from the cloud edge.",
            "Office sync jobs replay safely when the local server reconnects.",
            "Secure PostgreSQL stays the system of record for public and private experiences.",
          ].map((item) => (
            <div key={item} className="rounded-[24px] border border-navy/10 bg-white/70 px-5 py-4 text-sm text-navy/75 shadow-[0_18px_60px_rgba(11,31,58,0.08)]">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="relative w-full max-w-[920px] rounded-[36px] border border-navy/10 bg-white/72 p-4 shadow-[0_32px_120px_rgba(11,31,58,0.14)] backdrop-blur-xl">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top_left,rgba(201,162,39,0.14),transparent_28%),linear-gradient(135deg,rgba(11,31,58,0.04),rgba(255,255,255,0.92))]">
            <svg
              viewBox="0 0 1000 620"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="journeyPath" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0B1F3A" stopOpacity="0.35" />
                  <stop offset="50%" stopColor="#C9A227" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#0B1F3A" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <motion.path
                d="M 120 300 C 200 300, 240 175, 348 175 S 490 250, 540 300 S 720 320, 860 240"
                fill="none"
                stroke="url(#journeyPath)"
                strokeWidth="9"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.35 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {connectorPaths.map(({ path, delay }) => (
                <motion.path
                  key={path}
                  d={path}
                  fill="none"
                  stroke="#C9A227"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 0.95 } : undefined}
                  transition={{ duration: 0.8, delay, ease: "easeInOut" }}
                />
              ))}
            </svg>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="absolute left-[7%] top-[42%] w-40 -translate-y-1/2 rounded-[24px] border border-navy/10 bg-white/90 p-4 shadow-[0_18px_60px_rgba(11,31,58,0.08)]"
            >
              <div className="flex items-center gap-3 text-navy">
                <Server className="h-5 w-5 text-gold" />
                <p className="text-sm font-semibold">Local Office Server</p>
              </div>
              <p className="mt-3 text-xs leading-6 text-navy/60">Registry uploads, scans, and clerk-side intake.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="absolute left-[28%] top-[18%] w-40 -translate-y-1/2 rounded-[24px] border border-navy/10 bg-white/90 p-4 shadow-[0_18px_60px_rgba(11,31,58,0.08)]"
            >
              <div className="flex items-center gap-3 text-navy">
                <Cloud className="h-5 w-5 text-gold" />
                <p className="text-sm font-semibold">Cloud Sync Layer</p>
              </div>
              <p className="mt-3 text-xs leading-6 text-navy/60">Queues reconcile deltas and serve the public edge.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1.5, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="absolute left-1/2 top-[48%] w-40 -translate-x-1/2 -translate-y-1/2 rounded-[26px] border border-gold/45 bg-navy p-5 text-paper shadow-[0_24px_120px_rgba(201,162,39,0.28)]"
            >
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-gold" />
                <p className="text-sm font-semibold">Secure PostgreSQL</p>
              </div>
              <p className="mt-3 text-xs leading-6 text-paper/70">System of record with replica-safe reads for public traffic.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.45, delay: 0.9 }}
              className="absolute left-[76%] top-[30%] w-40 -translate-y-1/2 rounded-[24px] border border-navy/10 bg-white/90 p-4 shadow-[0_18px_60px_rgba(11,31,58,0.08)]"
            >
              <div className="flex items-center gap-3 text-navy">
                <MonitorSmartphone className="h-5 w-5 text-gold" />
                <p className="text-sm font-semibold">End User</p>
              </div>
              <p className="mt-3 text-xs leading-6 text-navy/60">Citizens, clients, and counsel see a resilient public portal.</p>
            </motion.div>

            {[
              {
                label: "Security",
                icon: Shield,
                className: "left-1/2 top-[13%] -translate-x-1/2",
              },
              {
                label: "Auth",
                icon: Lock,
                className: "left-[34%] top-[43%] -translate-y-1/2",
              },
              {
                label: "API",
                icon: Cloud,
                className: "left-[68%] top-[45%] -translate-y-1/2",
              },
              {
                label: "UI",
                icon: MonitorSmartphone,
                className: "left-1/2 top-[76%] -translate-x-1/2 -translate-y-1/2",
              },
            ].map((node, index) => {
              const Icon = node.icon;

              return (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : undefined}
                  transition={{ duration: 0.35, delay: 0.8 + index * 0.1 }}
                  className={`absolute rounded-full border border-gold/35 bg-white/95 px-4 py-3 text-xs uppercase tracking-[0.24em] text-navy shadow-[0_12px_50px_rgba(11,31,58,0.12)] ${node.className}`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-gold" />
                    {node.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Card className="border-navy/10 bg-white/80 shadow-none">
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-gold">Failover Logic</p>
                <p className="mt-3 text-sm leading-7 text-navy/72">
                  If the office server goes dark, the cloud-synced public portal continues serving previously replicated records and intake flows.
                </p>
              </CardContent>
            </Card>
            <Card className="border-navy/10 bg-white/80 shadow-none">
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-gold">Operational Benefit</p>
                <p className="mt-3 text-sm leading-7 text-navy/72">
                  Stakeholders experience continuity. Internal teams regain sync later without exposing the outage to the public-facing experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
