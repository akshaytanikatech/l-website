import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  LayoutDashboard,
  LockKeyhole,
  Monitor,
  Search,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AttendancePresentation } from "@/components/AttendancePresentation";
import { Button } from "@/components/ui/button";
import landscapeVideo from "@/media/attendence/employee_attendence_view_landscape.mp4";
import portraitImage from "@/media/attendence/employee_attendence_view_portrait.png";
import slide1 from "./media/lawyer/slide-1.jpg";
import slide21 from "./media/lawyer/slide-2-1.jpg";
import slide22 from "./media/lawyer/slide-2-2.jpg";
import slide23 from "./media/lawyer/slide-2-3.jpg";
import slide3 from "./media/lawyer/slide-3.jpg";
import slide4 from "./media/lawyer/slide-4.jpg";
import slide5 from "./media/lawyer/slide-5.jpg";
import slide6 from "./media/lawyer/slide-6.jpg";
import slide71 from "./media/lawyer/slide-7-1.jpg";
import slide72 from "./media/lawyer/slide-7-2.jpg";
import slide8 from "./media/lawyer/slide-8.jpg";
import slide9 from "./media/lawyer/slide-9.jpg";
import slide10 from "./media/lawyer/slide-10.jpg";
import slide11 from "./media/lawyer/slide-11.jpg";
import slide12 from "./media/lawyer/slide-12.jpg";

const sections = [
  { id: "foundation", label: "Foundation" },
  { id: "authority", label: "Authority" },
  { id: "legal-platform", label: "Legal Platform" },
  { id: "public-website", label: "Public Website" },
  { id: "homepage-actions", label: "Homepage Actions" },
  { id: "case-status", label: "Case Status Search" },
  { id: "justice-clock", label: "Justice Clock" },
  { id: "appointment-booking", label: "Appointment Booking" },
  { id: "judges-information", label: "Judges Information" },
  { id: "lawyer-dashboard", label: "Lawyer Dashboard" },
  { id: "lawyer-security", label: "Lawyer Login & Security" },
  { id: "assigned-cases", label: "Assigned Cases & Documents" },
  { id: "pulseflow", label: "PulseFlow" },
] as const;

type AppRoute = "/" | "/attendence";

type AppointmentCalendarDate = {
  day: string;
  muted?: boolean;
  selected?: boolean;
};

type JusticeClockInstitutionRow = {
  id: string;
  label: string;
  labelHi: string;
  institution: number;
  disposal: number;
  ccr: number;
};

type JusticeClockAgewiseRow = {
  id: string;
  label: string;
  labelHi: string;
  pendency: number;
  listedToday: number;
};

const slideOneScript = `Good morning everyone. Thank you for giving us the opportunity to present today. [Small pause]

Today, we are not presenting two separate software ideas. We are presenting one connected vision for Bedi & Associates. The vision is simple: to make legal work and office work more organized, transparent, and efficient through digital systems. [Speak slowly]

In the spirit of The India Way, this proposal is not only about adding technology. It is about building stronger, more adaptable legal and office systems for the future. Simple words mein, technology should support the institution, not make the work more complicated.`;

const slideTwoScript = `The first part of our presentation is about a Legal Platform. This platform is designed for smarter court and legal operations. It helps lawyers, admins, and users access important legal information faster, manage cases better, and improve transparency.

After that, we will move to the second part: Cross-Platform Attendance Software for Bedi & Associates.

This is important because, currently, the firm does not have a proper HR management system. So attendance, employee records, breaks, and work-hour visibility can become difficult if everything is handled manually.

Overall idea simple hai: first, we improve legal operations. Then, we improve internal office operations. Together, both systems help the firm work in a more professional, structured, and transparent way.`;

const slideThreeScript = `Let me begin with the legal platform. Iska main purpose hai to create a smarter and more organized digital system for legal operations. [Small pause]

In a legal environment, time, accuracy, confidentiality, and accountability are very important. Lawyers need quick access to case details. Admin teams need proper control. Clients and citizens need transparency. And the institution needs a system that reduces confusion and delays.

This platform is designed around three main areas: public website access, lawyer dashboard, and admin dashboard. [Speak slowly]

As the larger discussion around Why Bharat Matters reminds us, Indian institutions need systems designed for Indian scale, Indian complexity, and Indian users. So the goal is not just to make a website.

The goal is to create faster access, better transparency, and smoother legal operations. [Pause and look at audience]`;

const slideFourScript = `First, let us talk about the public website. The public website works like the main entrance of the legal system. Matlab, when someone comes to the website, they should quickly understand where to go and what to do. [Small pause]

When someone visits the website, they should not feel confused. They should immediately know where to search, what service to use, and how to access the information they need.

The website can include important sections like Home, About Court, Judges, Case Status, Appointments, Judgments, Notices, Lawyer Login, and Admin Login. It can also include a language change option for English, Hindi, and Marathi, so users can choose the language they are comfortable with. This gives the website a formal and professional legal-sector feel.

The platform should also feel connected to Indian legal and institutional realities, not like a copied template. This connects naturally with the broader idea in India that is Bharat.

For example, if a client or citizen wants to check case status, they should not have to call multiple people or visit the office again and again. They can simply go to the website and use the case status option.

If someone wants to see judges' information, sitting judges, bench details, or court assignments, they can access it in a structured way. If someone wants to book an appointment, they can do it directly through the website.

So, the website becomes one official platform for important legal access. Yeh system confusion kam karega and will make access easier. [Pause and look at audience]`;

const slideFiveScript = `On the homepage, the platform should highlight the services that people use most often. [Small pause]

These quick action buttons can include Check Case Status, Book Appointment, View Judges, View Cause List, Search Judgments, and Lawyer Login.

These buttons are useful because legal users are usually busy. Lawyers, clients, and admin staff do not have time to search through many pages. With one click, they can reach the exact service they need.

This improves convenience and also builds confidence in the platform. It gives a clear impression that the firm or institution is organized, modern, and service-focused. [Emphasize this line]`;

const slideSixScript = `Now, one of the most important parts of the legal platform is case status search. In legal work, case tracking is very important. [Speak slowly]

A person should be able to search a case using different details, such as case number, party name, advocate name, filing number, or judge-wise search.

This is useful because everyone may not have the same information. A lawyer may search by case number. A client may remember only the party name. An admin person may use the filing number.

Sometimes, information may need to be checked judge-wise.

Once the search is done, the system should show important case details, like current case status, next hearing date, assigned court, relevant orders, and complete case timeline. [Small pause]

This helps lawyers and clients understand where the matter currently stands. Instead of depending on manual follow-ups, everyone can see the updated position clearly. This improves transparency and saves time. Simple words mein, people get clarity without unnecessary back-and-forth. [Pause and look at audience]`;

const slideSevenScript = `Another important feature is the Justice Clock. The Justice Clock is not just a display screen. It is a transparency and accountability tool. [Speak slowly]

It can show updated Justice Clock details in English and Hindi, such as Institution, Disposal and Case Clearance Rate, Agewise Pendency, and Listed Today. Of course, this information can be updated by the admin whenever required.

This idea also connects with the larger spirit reflected in landmark judgments: legal systems must remain transparent, accessible, accountable, and worthy of public trust.

When people can see real data, they understand that the system is active, measurable, and improving.

For leadership and administration, the Justice Clock is also useful because it helps identify pressure points. [Small pause]

Matlab, it does not only show numbers. It helps leadership understand where attention is needed. [Pause and look at audience]`;

const slideEightScript = `Next, we have appointment booking. In a legal office or court-related environment, appointments can become confusing if they are handled manually. [Small pause]

People may come without proper scheduling. Staff may not know who is coming, when they are coming, or what the purpose of the visit is. This can create crowding, waiting time, and communication gaps.

Through this platform, users can book appointments online. Appointment types may include registry visit, document verification, lawyer consultation, or administrative inquiry.

The user can select the date, time slot, purpose of visit, and contact details. After that, the system can confirm the booking and even send reminders.

This makes the process more organized and helps the admin team manage visitors properly. For a legal firm like Bedi & Associates, this feature can make client handling more professional and structured. [Emphasize this line]`;

const slideNineScript = `Now, let us talk about judges' information. The platform can include a proper section where users can view judge names, sitting list, court assignments, bench details, and public profiles where available. [Small pause]

This is important because, in the legal sector, information about the bench and court assignment must be presented with clarity and respect.

The tone of this section should be official and dignified. It should help lawyers and users know which judge is sitting, what the bench details are, and how court assignments are structured.

This improves transparency while maintaining the dignity of the institution. [Speak slowly]`;

const slideTenScript = `Now we move from the public website to the lawyer dashboard. This is where the platform becomes especially useful for legal professionals. [Small pause]

A lawyer's work involves many details: case numbers, hearing dates, documents, evidence, notes, client instructions, and updates.

If these things are spread across emails, messages, physical files, and manual notes, it becomes difficult to manage everything properly.

The lawyer dashboard gives each lawyer a personal digital workspace. After secure login, the lawyer can see only the cases assigned to them. This keeps the system private, organized, and role-based. [Emphasize this line]

Simple words mein, each lawyer gets one clean place to manage their legal work.`;

const slideElevenScript = `Since legal work involves sensitive information, security is very important. [Speak slowly]

Lawyers can log in using their email ID or enrollment ID, along with a password. The system can also include two-factor authentication for extra protection. [Two-factor authentication means one extra verification step after password.]

Once the lawyer logs in, the platform verifies their role and shows only the information they are allowed to access.

This helps prevent unauthorized access. In legal work, confidentiality is extremely important. So the system must protect case information, client details, documents, and internal notes.

Yeh point important hai: the right person should get the right access, and nothing more. [Pause and look at audience]`;

const slideTwelveScript = `Inside the dashboard, lawyers can view their assigned cases in a clean list. Each case can show the case title, case number, current status, next hearing date, and uploaded documents or images. [Small pause]

The uploaded material may include scanned documents, evidence photos, site images, or supporting records.

With the growing importance of electronic records under the Bharatiya Sakshya Adhiniyam, 2023, secure handling of digital case material becomes even more important.

This is very practical because lawyers often need to review documents quickly before a hearing or client meeting.

Instead of searching through multiple folders or physical files, the lawyer can open the case and see all relevant material in one place. This saves time and improves preparation. [Emphasize this line]`;

const legalPlatformKeywords = [
  "Time",
  "Accuracy",
  "Confidentiality",
  "Accountability",
] as const;

const legalPlatformAreas = [
  "Public Website Access",
  "Lawyer Dashboard",
  "Admin Dashboard",
] as const;

const publicWebsiteActions = [
  "Case Status",
  "Appointments",
  "Judges",
  "Judgments",
  "Notices",
  "Lawyer Login",
] as const;

const homepageQuickActions = [
  "Check Case Status",
  "Book Appointment",
  "View Judges",
  "View Cause List",
  "Search Judgments",
  "Lawyer Login",
] as const;

const caseSearchTypes = [
  "Case Number",
  "Party Name",
  "Advocate Name",
  "Filing Number",
  "Judge-wise",
] as const;

const caseStatusResultDetails = [
  { label: "Current Status", value: "Active matter" },
  { label: "Next Hearing", value: "03 Jun 2026" },
  { label: "Assigned Court", value: "Bench 02" },
  { label: "Orders", value: "Digitally available" },
  { label: "Case Timeline", value: "Chronology visible" },
] as const;

const appointmentTypes = [
  "Registry Visit",
  "Document Verification",
  "Lawyer Consultation",
  "Administrative Inquiry",
] as const;

const appointmentWeekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const appointmentCalendarDates: AppointmentCalendarDate[] = [
  { day: "12", muted: true },
  { day: "13", muted: true },
  { day: "14", selected: true },
  { day: "15" },
  { day: "16" },
  { day: "17" },
  { day: "18" },
  { day: "19" },
  { day: "20" },
  { day: "21" },
  { day: "22" },
  { day: "23" },
  { day: "24" },
  { day: "25" },
] as const;

const appointmentTimeSlots = [
  { label: "10:30 AM", active: false },
  { label: "12:00 PM", active: true },
  { label: "03:15 PM", active: false },
] as const;

const judgesDirectoryItems = [
  "Judge Names",
  "Sitting List",
  "Court Assignments",
  "Bench Details",
  "Public Profiles",
] as const;

const lawyerDashboardCaseRows = [
  "Assigned Cases",
  "Hearing Dates",
  "Documents",
  "Evidence",
  "Notes",
  "Updates",
] as const;

const securityLayers = [
  "Email / Enrollment ID",
  "Password",
  "Two-Factor Verification",
  "Role Verification",
  "Restricted Case Access",
] as const;

const caseMaterialTiles = [
  "Scanned Documents",
  "Evidence Photos",
  "Site Images",
  "Supporting Records",
  "Court Orders",
] as const;

const justiceClockFilters = [
  { en: "All States", hi: "सभी राज्य" },
  { en: "All Districts", hi: "सभी जिले" },
  { en: "All Establishments", hi: "सभी प्रतिष्ठान" },
] as const;

const justiceClockTableOneRowsBase: JusticeClockInstitutionRow[] = [
  { id: "today", label: "Today", labelHi: "आज", institution: 283, disposal: 56, ccr: 20 },
  {
    id: "last-day",
    label: "Last Day",
    labelHi: "पिछला दिन",
    institution: 42706,
    disposal: 16481,
    ccr: 39,
  },
  {
    id: "last-week",
    label: "Last Week",
    labelHi: "पिछला सप्ताह",
    institution: 388052,
    disposal: 254701,
    ccr: 66,
  },
  {
    id: "last-month",
    label: "Last Month",
    labelHi: "पिछला महीना",
    institution: 1778023,
    disposal: 1301726,
    ccr: 73,
  },
  {
    id: "this-year",
    label: "This Year",
    labelHi: "इस वर्ष",
    institution: 8995956,
    disposal: 7856803,
    ccr: 87,
  },
  {
    id: "last-year",
    label: "Last Year",
    labelHi: "पिछला वर्ष",
    institution: 26767586,
    disposal: 25457102,
    ccr: 95,
  },
] as const;

const justiceClockTableTwoRowsBase: JusticeClockAgewiseRow[] = [
  { id: "0-1", label: "0–1", labelHi: "0–1", pendency: 15282177, listedToday: 314821 },
  { id: "2-3", label: "2–3", labelHi: "2–3", pendency: 12474656, listedToday: 207038 },
  { id: "4-5", label: "4–5", labelHi: "4–5", pendency: 7242704, listedToday: 120183 },
  { id: "6-10", label: "6–10", labelHi: "6–10", pendency: 8777147, listedToday: 161182 },
  { id: "11-20", label: "11–20", labelHi: "11–20", pendency: 4263939, listedToday: 81408 },
  { id: "21-30", label: "21–30", labelHi: "21–30", pendency: 579968, listedToday: 13232 },
  { id: "above-30", label: "Above 30", labelHi: "30 से अधिक", pendency: 73309, listedToday: 2228 },
  { id: "total", label: "Total", labelHi: "कुल", pendency: 48693900, listedToday: 900092 },
] as const;

const legalProposalCards = [
  {
    id: "legal-platform",
    category: "SYSTEM 01",
    title: "Legal Platform",
    description:
      "Smarter case access, dashboards, appointments, documents, and admin control.",
    image: slide21,
    alt: "Legal operations workspace with digital case tools and law books",
  },
  {
    id: "attendance-software",
    category: "SYSTEM 02",
    title: "Attendance Software",
    description:
      "Fair, cross-platform attendance visibility for employees and leadership.",
    image: slide22,
    alt: "Professional office operations environment representing attendance visibility",
  },
  {
    id: "common-outcome",
    category: "OUTCOME",
    title: "Common Outcome",
    description: "Better control, better clarity, and better trust.",
    image: slide23,
    alt: "Leadership and accountability image representing trust and institutional control",
  },
] as const;

const proposalCardListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.56,
    },
  },
};

const proposalCardVariants = {
  hidden: { opacity: 0, y: 42, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideThreeKeywordListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.75,
    },
  },
};

const slideThreeKeywordVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideThreePanelListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.6,
    },
  },
};

const slideThreePanelVariants = {
  hidden: { opacity: 0, x: 36 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideFourActionListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.9,
    },
  },
};

const slideFourActionVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideFiveActionListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.75,
    },
  },
};

const slideFiveActionVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideSixChipListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 1.02,
    },
  },
};

const slideSixChipVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideEightPillListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.72,
    },
  },
};

const slideEightPillVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideNineRowListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.75,
    },
  },
};

const slideNineRowVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideTenPanelListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.72,
    },
  },
};

const slideTenPanelVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideElevenLayerListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.72,
    },
  },
};

const slideElevenLayerVariants = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.46, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideTwelveTileListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.88,
    },
  },
};

const slideTwelveTileVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const justiceClockFilterListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.16,
    },
  },
};

const justiceClockFilterVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const justiceClockRowListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.14,
    },
  },
};

const justiceClockRowVariants = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatIndianNumber(value: number) {
  return value.toLocaleString("en-IN");
}

function formatJusticeClockTime(value: Date) {
  return value.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function PracticeScriptOverlay({
  script,
  visible,
  testId,
}: {
  script: string;
  visible: boolean;
  testId: string;
}) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:bottom-6"
        >
          <div
            data-testid={testId}
            className="pointer-events-auto relative w-[90vw] max-w-[1120px] overflow-hidden rounded-[22px] border border-[rgba(185,130,69,0.55)] bg-[rgba(17,10,6,0.82)] shadow-[0_26px_90px_rgba(74,43,27,0.46),0_0_0_1px_rgba(214,161,92,0.08)] backdrop-blur-2xl lg:w-[70vw]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,161,92,0.15),transparent_28%)]" />
            <div className="relative border-b border-[#B98245]/18 px-4 py-3 sm:px-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#D6A15C]">
                  Speaker Script
                </p>
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[rgba(243,231,211,0.54)]">
                  Hold Shift
                </p>
              </div>
            </div>
            <div className="nested-scroll relative max-h-[24vh] overflow-y-auto px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
              <p
                data-testid={`${testId}-content`}
                className="whitespace-pre-line font-sans text-sm leading-6 text-[#D8C7B2] sm:text-[0.95rem]"
              >
                {script}
              </p>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
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

function FoundationSlide({ showScript }: { showScript: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.55, once: false });
  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={ref}
      data-testid="legal-slide-1"
      data-nested-scroll="true"
      className="nested-scroll relative h-full overflow-y-auto"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050403_0%,#11100E_52%,#1A0F0A_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,130,69,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(74,43,27,0.2),transparent_26%)]" />
      {!imageError ? (
        <motion.img
          src={slide1}
          alt="Premium legal workplace scene for Bedi & Associates"
          data-testid="legal-slide-1-image"
          initial={{ scale: 1.08 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.8, ease: "easeOut" }}
          onError={() => setImageError(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,0.96)_0%,rgba(17,16,14,0.88)_36%,rgba(42,23,16,0.54)_68%,rgba(5,4,3,0.22)_100%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_44%,rgba(5,4,3,0.26)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_24%,rgba(243,231,211,0.06),transparent_20%),radial-gradient(circle_at_82%_78%,rgba(185,130,69,0.12),transparent_20%)]" />
      <div className="absolute inset-0 bg-grain opacity-[0.06] [background-size:10px_10px]" />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 24, -12, 0], y: [0, -20, 10, 0], scale: [1, 1.06, 0.98, 1] }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute right-[10%] top-[14%] h-40 w-40 rounded-full bg-[#D6A15C]/14 blur-[110px] sm:h-56 sm:w-56"
      />

      <div className="relative min-h-full px-6 py-6 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto flex min-h-full max-w-[1480px] flex-col justify-between">
          <div className="flex flex-1 items-end py-4 sm:py-8 lg:py-10">
            <div className="max-w-4xl">
              <div className="pt-4 sm:pt-8">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  data-testid="legal-slide-1-brand"
                  className="inline-flex items-center rounded-full border border-[rgba(185,130,69,0.32)] bg-[rgba(17,16,14,0.58)] px-4 py-2 text-[0.7rem] uppercase tracking-[0.34em] text-[rgba(243,231,211,0.9)] shadow-[0_10px_28px_rgba(5,4,3,0.24)] backdrop-blur-xl"
                >
                  Bedi & Associates
                </motion.p>

                <div className="mt-7 flex items-start gap-5 sm:gap-6">
                  <motion.span
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={inView ? { opacity: 1, scaleY: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.28 }}
                    className="mt-1 h-20 w-px shrink-0 origin-bottom bg-[linear-gradient(180deg,#D6A15C_0%,rgba(185,130,69,0.12)_100%)] sm:h-24"
                  />

                  <div>
                    <motion.h1
                      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
                      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                      transition={{ duration: 0.9, delay: 0.35 }}
                      className="max-w-[12ch] font-display text-[clamp(3rem,5.8vw,6rem)] font-semibold leading-[0.92] text-[#F3E7D3]"
                    >
                      Building a Smarter Legal Workplace
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 18 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.85, delay: 0.6 }}
                      className="mt-5 max-w-2xl text-base leading-8 text-[#BFAE99] sm:text-lg"
                    >
                      Legal operations + internal office systems, connected through clarity,
                      accountability, and trust.
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 0.82, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.9 }}
            data-testid="legal-slide-1-footer"
            className="max-w-xl pb-2 text-xs uppercase tracking-[0.32em] text-[rgba(214,161,92,0.92)]"
          >
            Legal Platform • Attendance Software • Institutional Efficiency
          </motion.p>

          <PracticeScriptOverlay
            script={slideOneScript}
            visible={showScript}
            testId="speaker-script-1"
          />
        </div>
      </div>
    </div>
  );
}

function AuthorityHallSlide({ showScript }: { showScript: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.4, once: false });

  return (
    <div
      ref={ref}
      data-testid="legal-slide-2"
      data-nested-scroll="true"
      className="nested-scroll relative h-full overflow-y-auto"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050403_0%,#11100E_48%,#1D120C_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,130,69,0.14),transparent_20%),radial-gradient(circle_at_center,rgba(74,43,27,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(74,43,27,0.22),transparent_28%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(243,231,211,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(243,231,211,0.04)_1px,transparent_1px)] [background-size:120px_120px]" />
      <div className="absolute inset-0 bg-grain opacity-[0.05] [background-size:12px_12px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_44%,rgba(5,4,3,0.3)_100%)]" />
      <div className="absolute left-1/2 top-[36%] h-52 w-52 -translate-x-1/2 rounded-full bg-[#B98245]/10 blur-[150px]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="relative min-h-full px-6 py-6 sm:px-10 lg:px-16 lg:py-12"
      >
        <div className="mx-auto flex min-h-full max-w-[1480px] flex-col">
          <div className="max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.75 }}
              className="font-display text-[clamp(2.6rem,4.4vw,4.9rem)] font-semibold leading-[0.94] text-[#F3E7D3]"
            >
              One Proposal. Two Systems. One Direction.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.72, delay: 0.18 }}
              className="mt-4 max-w-2xl text-base leading-8 text-[#BFAE99] sm:text-lg"
            >
              First, legal operations. Then, internal office operations.
            </motion.p>
          </div>

          <div className="relative mt-12 flex-1 lg:mt-16">
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.45, ease: "easeOut" }}
              className="beam-link absolute left-[15%] right-[15%] top-[10.4rem] hidden h-px origin-left rounded-full bg-[linear-gradient(90deg,rgba(214,161,92,0),rgba(185,130,69,0.65),rgba(214,161,92,0))] lg:block"
            />
            <motion.div
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.45, ease: "easeOut" }}
              className="beam-link absolute left-1/2 top-24 bottom-20 hidden w-px -translate-x-1/2 origin-top rounded-full bg-[linear-gradient(180deg,rgba(214,161,92,0),rgba(185,130,69,0.68),rgba(214,161,92,0))] md:block lg:hidden"
            />
            <motion.div
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.45, ease: "easeOut" }}
              className="beam-link absolute left-1/2 top-20 bottom-16 w-px -translate-x-1/2 origin-top rounded-full bg-[linear-gradient(180deg,rgba(214,161,92,0),rgba(185,130,69,0.62),rgba(214,161,92,0))] md:hidden"
            />

            <motion.div
              variants={proposalCardListVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {legalProposalCards.map((card, index) => (
                <ProposalCard
                  key={card.id}
                  card={card}
                  inView={inView}
                  isFeatured={index === 1}
                  className={[
                    index === 1
                      ? "lg:min-h-[34rem] lg:shadow-[0_38px_130px_rgba(42,23,16,0.48)]"
                      : "lg:min-h-[31.5rem]",
                    index === 2 ? "md:col-span-2 lg:col-span-1 md:max-w-[560px] md:justify-self-center" : "",
                  ].join(" ")}
                />
              ))}
            </motion.div>

            {["left-[34%]", "left-[67%]"].map((leftClassName, index) => (
              <motion.span
                key={leftClassName}
                aria-hidden="true"
                animate={inView ? { opacity: [0.35, 0.8, 0.35], scale: [1, 1.16, 1] } : {}}
                transition={{
                  duration: 2.4,
                  delay: 1 + index * 0.14,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className={`absolute top-[10.05rem] hidden h-3 w-3 -translate-x-1/2 rounded-full border border-[#D6A15C]/45 bg-[#B98245]/65 shadow-[0_0_18px_rgba(185,130,69,0.3)] lg:block ${leftClassName}`}
              />
            ))}

            <PracticeScriptOverlay
              script={slideTwoScript}
              visible={showScript}
              testId="speaker-script-2"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProposalCard({
  card,
  inView,
  isFeatured = false,
  className,
}: {
  card: (typeof legalProposalCards)[number];
  inView: boolean;
  isFeatured?: boolean;
  className?: string;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      variants={proposalCardVariants}
      whileHover={{ y: -8 }}
      data-testid={`proposal-card-${card.id}`}
      className={`group relative overflow-hidden rounded-[32px] border border-[#B98245]/18 bg-[linear-gradient(180deg,rgba(42,23,16,0.52),rgba(17,16,14,0.76))] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:p-5 ${className ?? ""}`}
    >
      <div className="absolute inset-0 rounded-[inherit] border border-white/[0.04]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,161,92,0.09),transparent_24%)]" />

      <motion.div
        animate={isFeatured && inView ? { y: [0, -4, 0] } : { y: 0 }}
        transition={isFeatured ? { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" } : undefined}
        className="relative h-full"
      >
        <div className="relative overflow-hidden rounded-[26px] border border-[#D6A15C]/16 bg-[linear-gradient(180deg,rgba(74,43,27,0.6),rgba(17,16,14,0.94))]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,161,92,0.12),transparent_24%)]" />
          {!imageError ? (
            <motion.img
              src={card.image}
              alt={card.alt}
              loading="lazy"
              initial={{ scale: 1.08 }}
              animate={inView ? { scale: 1 } : {}}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              onError={() => setImageError(true)}
              className="aspect-[16/10] w-full object-cover"
            />
          ) : (
            <div className="aspect-[16/10] w-full bg-[linear-gradient(135deg,#2A1710_0%,#11100E_45%,#4A2B1B_100%)]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,0.06)_0%,rgba(5,4,3,0.62)_100%)]" />
          {imageError ? (
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[#F3E7D3]/72">
                Image placeholder
              </p>
            </div>
          ) : null}
        </div>

        <div className="relative mt-5">
          <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#D6A15C]">
            {card.category}
          </p>
          <h3 className="mt-3 font-display text-[1.9rem] leading-tight text-[#F3E7D3]">
            {card.title}
          </h3>
          <p className="mt-3 max-w-[30ch] text-sm leading-7 text-[#BFAE99]">
            {card.description}
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}

function LegalPlatformIntroSlide({ showScript }: { showScript: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.45, once: false });
  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={ref}
      data-testid="legal-slide-3"
      data-nested-scroll="true"
      className="nested-scroll relative h-full overflow-y-auto"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050403_0%,#11100E_48%,#1D120C_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,130,69,0.15),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(74,43,27,0.18),transparent_26%)]" />
      {!imageError ? (
        <motion.img
          src={slide3}
          alt="Legal technology workspace for smarter legal operations"
          data-testid="legal-slide-3-image"
          initial={{ scale: 1.07 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.7, ease: "easeOut" }}
          onError={() => setImageError(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,0.96)_0%,rgba(17,16,14,0.9)_34%,rgba(42,23,16,0.58)_68%,rgba(5,4,3,0.3)_100%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,4,3,0.26)_100%)]" />
      <div className="absolute inset-0 bg-grain opacity-[0.05] [background-size:10px_10px]" />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -18, 0], opacity: [0.14, 0.24, 0.14] }}
        transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute right-[11%] top-[24%] h-[22rem] w-20 rounded-full bg-[#D6A15C]/18 blur-[85px]"
      />

      <div className="relative min-h-full px-6 py-6 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto flex min-h-full max-w-[1480px] flex-col justify-between">
          <div className="grid flex-1 items-center gap-10 py-4 sm:py-8 lg:grid-cols-[0.92fr_0.78fr] lg:gap-14 lg:py-10">
            <div className="max-w-4xl">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="text-[0.74rem] uppercase tracking-[0.34em] text-[#D6A15C]"
              >
                LEGAL PLATFORM
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.22 }}
                data-testid="legal-slide-3-kicker"
                className="mt-5 text-sm tracking-[0.08em] text-[rgba(243,231,211,0.8)]"
              >
                Part 1: Legal Platform
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="mt-6 max-w-[12ch] font-display text-[clamp(3rem,5.4vw,5.7rem)] font-semibold leading-[0.92] text-[#F3E7D3]"
              >
                Smarter Legal Operations
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="mt-5 max-w-2xl text-base leading-8 text-[#BFAE99] sm:text-lg"
              >
                A structured digital system for faster access, better transparency, and smoother
                legal workflows.
              </motion.p>

              <motion.div
                variants={slideThreeKeywordListVariants}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="mt-8 flex flex-wrap gap-3"
              >
                {legalPlatformKeywords.map((keyword) => (
                  <motion.div
                    key={keyword}
                    variants={slideThreeKeywordVariants}
                    data-testid={`legal-slide-3-keyword-${keyword.toLowerCase()}`}
                    className="rounded-full border border-[#B98245]/22 bg-[rgba(42,23,16,0.44)] px-4 py-2 text-sm uppercase tracking-[0.18em] text-[rgba(243,231,211,0.9)] backdrop-blur-xl"
                  >
                    {keyword}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="relative lg:pl-8">
              <div className="absolute inset-y-8 right-0 hidden w-24 rounded-full bg-[#D6A15C]/10 blur-[90px] lg:block" />
              <motion.div
                variants={slideThreePanelListVariants}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="relative ml-auto flex w-full max-w-[31rem] flex-col gap-4"
              >
                {legalPlatformAreas.map((area, index) => (
                  <motion.div
                    key={area}
                    variants={slideThreePanelVariants}
                    data-testid={`legal-slide-3-panel-${index + 1}`}
                    className="flex items-center gap-4 rounded-[24px] border border-[#B98245]/18 bg-[rgba(17,10,6,0.54)] px-5 py-4 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl"
                  >
                    <motion.span
                      aria-hidden="true"
                      animate={inView ? { scale: [0, 1, 1], opacity: [0, 1, 0.86] } : {}}
                      transition={{
                        duration: 0.55,
                        delay: 0.74 + index * 0.14,
                        ease: "easeOut",
                      }}
                      className="h-2.5 w-2.5 rounded-full bg-[#D6A15C] shadow-[0_0_16px_rgba(214,161,92,0.45)]"
                    />
                    <p className="text-sm uppercase tracking-[0.22em] text-[rgba(243,231,211,0.9)] sm:text-[0.95rem]">
                      {area}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 0.84, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.05 }}
            data-testid="legal-slide-3-footer"
            className="max-w-xl pb-2 text-xs uppercase tracking-[0.32em] text-[rgba(214,161,92,0.9)]"
          >
            Public Website • Lawyer Dashboard • Admin Dashboard
          </motion.p>

          <PracticeScriptOverlay
            script={slideThreeScript}
            visible={showScript}
            testId="speaker-script-3"
          />
        </div>
      </div>
    </div>
  );
}

function PublicWebsiteSlide({ showScript }: { showScript: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.42, once: false });
  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={ref}
      data-testid="legal-slide-4"
      data-nested-scroll="true"
      className="nested-scroll relative h-full overflow-y-auto"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050403_0%,#11100E_50%,#20120C_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,130,69,0.13),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(74,43,27,0.22),transparent_30%)]" />
      {!imageError ? (
        <motion.img
          src={slide4}
          alt="Public legal portal environment on a desk"
          data-testid="legal-slide-4-image"
          initial={{ scale: 1.06 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeOut" }}
          onError={() => setImageError(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,0.95)_0%,rgba(17,16,14,0.88)_36%,rgba(42,23,16,0.54)_68%,rgba(5,4,3,0.34)_100%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,4,3,0.24)_100%)]" />
      <div className="absolute inset-0 bg-grain opacity-[0.05] [background-size:10px_10px]" />
      <div className="absolute right-[16%] top-[34%] h-56 w-56 rounded-full bg-[#B98245]/10 blur-[125px]" />

      <div className="relative min-h-full px-6 py-6 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto grid min-h-full max-w-[1480px] items-center gap-10 py-4 sm:py-8 lg:grid-cols-[0.88fr_0.94fr] lg:gap-12 lg:py-10">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-[0.74rem] uppercase tracking-[0.34em] text-[#D6A15C]"
            >
              PUBLIC ACCESS
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.22 }}
              data-testid="legal-slide-4-kicker"
              className="mt-5 text-sm tracking-[0.08em] text-[rgba(243,231,211,0.8)]"
            >
              Public Website
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.85, delay: 0.28 }}
              className="mt-6 max-w-[12ch] font-display text-[clamp(3rem,5.1vw,5.5rem)] font-semibold leading-[0.92] text-[#F3E7D3]"
            >
              The Front Door of the Legal System
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.5 }}
              className="mt-5 max-w-2xl text-base leading-8 text-[#BFAE99] sm:text-lg"
            >
              Clear access for clients, citizens, lawyers, and staff.
            </motion.p>

            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.72, delay: 0.68 }}
              data-testid="legal-slide-4-core-idea"
              className="mt-8 max-w-2xl border-l border-[#B98245]/45 pl-4 text-base leading-8 text-[rgba(243,231,211,0.86)]"
            >
              Users should quickly know where to search, what service to use, and how to access
              information.
            </motion.blockquote>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 42, scale: 0.96 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            data-testid="legal-slide-4-mockup"
            className="relative w-full max-w-[41rem] justify-self-end overflow-hidden rounded-[28px] border border-[#B98245]/35 bg-[linear-gradient(180deg,rgba(17,10,6,0.82),rgba(42,23,16,0.72))] p-4 shadow-[0_34px_110px_rgba(42,23,16,0.46)] backdrop-blur-2xl sm:p-5"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,161,92,0.1),transparent_28%)]" />
            <div className="relative">
              <div className="flex items-center justify-between gap-4 rounded-[22px] border border-white/5 bg-[rgba(17,16,14,0.46)] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#D6A15C]/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#B98245]/55" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F3E7D3]/18" />
                </div>
                <div className="flex gap-2">
                  <span className="h-2 w-14 rounded-full bg-[#F3E7D3]/10" />
                  <span className="h-2 w-10 rounded-full bg-[#F3E7D3]/8" />
                  <span className="h-2 w-12 rounded-full bg-[#F3E7D3]/8" />
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-[22px] border border-[#B98245]/18 bg-[rgba(17,16,14,0.5)] p-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: "100%" } : {}}
                  transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
                  data-testid="public-website-search-bar"
                  className="search-shimmer h-14 overflow-hidden rounded-[18px] border border-[#B98245]/18 bg-[linear-gradient(90deg,rgba(42,23,16,0.82),rgba(17,10,6,0.56))] px-4"
                >
                  <div className="flex h-full items-center gap-3">
                    <Search className="h-4 w-4 shrink-0 text-[#D6A15C]" />
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.45, delay: 1.02, ease: "easeOut" }}
                      data-testid="public-website-search-copy"
                      className="truncate text-sm text-[rgba(243,231,211,0.82)]"
                    >
                      Search case status, judgments, or notices
                    </motion.span>
                    <motion.span
                      aria-hidden="true"
                      animate={inView ? { opacity: [0.35, 1, 0.35] } : {}}
                      transition={{
                        duration: 1.3,
                        delay: 1.12,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="ml-auto h-5 w-px shrink-0 bg-[rgba(243,231,211,0.42)]"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div
                variants={slideFourActionListVariants}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="mt-5 grid gap-3 sm:grid-cols-2"
              >
                {publicWebsiteActions.map((action) => {
                  const actionId = action.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <motion.div
                      key={action}
                      variants={slideFourActionVariants}
                      data-testid={`public-website-action-${actionId}`}
                      className="flex items-center gap-3 rounded-full border border-[#B98245]/18 bg-[rgba(42,23,16,0.45)] px-4 py-3 text-sm text-[#F3E7D3] shadow-[inset_0_1px_0_rgba(243,231,211,0.04)] backdrop-blur-xl"
                    >
                      <span className="h-2 w-2 rounded-full bg-[#D6A15C]/88" />
                      {action}
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 1.25 }}
                data-testid="public-website-language-line"
                className="mt-5 text-xs uppercase tracking-[0.3em] text-[rgba(214,161,92,0.88)]"
              >
                English • Hindi • Marathi
              </motion.p>
            </div>
          </motion.div>
        </div>

        <PracticeScriptOverlay
          script={slideFourScript}
          visible={showScript}
          testId="speaker-script-4"
        />
      </div>
    </div>
  );
}

function HomepageQuickActionsSlide({ showScript }: { showScript: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.42, once: false });
  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={ref}
      data-testid="legal-slide-5"
      data-nested-scroll="true"
      className="nested-scroll relative h-full overflow-y-auto"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050403_0%,#11100E_52%,#1F110B_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,130,69,0.14),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(74,43,27,0.18),transparent_28%)]" />
      {!imageError ? (
        <motion.img
          src={slide5}
          alt="Homepage quick actions atmosphere for public legal access"
          data-testid="legal-slide-5-image"
          initial={{ scale: 1.06 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeOut" }}
          onError={() => setImageError(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,0.94)_0%,rgba(17,10,6,0.84)_44%,rgba(5,4,3,0.58)_100%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_44%,rgba(5,4,3,0.28)_100%)]" />
      <div className="absolute inset-0 bg-grain opacity-[0.05] [background-size:10px_10px]" />
      <div className="absolute right-[16%] top-[35%] h-56 w-56 rounded-full bg-[#D6A15C]/10 blur-[140px]" />

      <div className="relative min-h-full px-6 py-6 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto grid min-h-full max-w-[1480px] items-center gap-10 py-4 sm:py-8 lg:grid-cols-[0.82fr_1fr] lg:gap-14 lg:py-10">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-[0.74rem] uppercase tracking-[0.34em] text-[#D6A15C]"
            >
              PUBLIC WEBSITE
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.22 }}
              data-testid="legal-slide-5-kicker"
              className="mt-5 text-sm tracking-[0.08em] text-[rgba(243,231,211,0.84)]"
            >
              Homepage Quick Actions
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.85, delay: 0.28 }}
              className="mt-6 max-w-[11ch] font-display text-[clamp(3rem,5.2vw,5.5rem)] font-semibold leading-[0.92] text-[#F3E7D3] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]"
            >
              One click to the right legal service.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.48 }}
              className="mt-5 max-w-2xl text-base leading-8 text-[#D8C7B2] sm:text-lg"
            >
              Busy legal users should not search through many pages.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 0.86, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 1.1 }}
              data-testid="legal-slide-5-footer"
              className="mt-8 text-sm tracking-[0.08em] text-[rgba(214,161,92,0.9)]"
            >
              Convenience builds confidence.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 44, scale: 0.96 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            data-testid="legal-slide-5-panel"
            className="relative w-full max-w-[43rem] justify-self-end overflow-hidden rounded-[34px] border border-[rgba(185,130,69,0.35)] bg-[linear-gradient(180deg,rgba(17,10,6,0.84),rgba(42,23,16,0.76))] p-5 shadow-[0_34px_110px_rgba(42,23,16,0.48)] backdrop-blur-2xl sm:p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,161,92,0.14),transparent_28%)]" />
            <motion.div
              aria-hidden="true"
              initial={{ x: "-130%", opacity: 0 }}
              animate={inView ? { x: "130%", opacity: [0, 0.45, 0] } : {}}
              transition={{ duration: 1.1, delay: 1.05, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-y-6 w-24 bg-[linear-gradient(90deg,transparent,rgba(214,161,92,0.24),transparent)] blur-lg"
            />
            <div className="relative">
              <div className="flex items-center justify-between gap-4 border-b border-[rgba(214,161,92,0.16)] pb-4">
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[#D6A15C]">
                    Most Used Services
                  </p>
                  <p className="mt-2 text-sm text-[#D8C7B2]">
                    Public access should feel immediate and structured.
                  </p>
                </div>
                <div className="rounded-full border border-[rgba(214,161,92,0.24)] bg-[rgba(42,23,16,0.68)] px-4 py-2 text-[0.7rem] uppercase tracking-[0.3em] text-[rgba(243,231,211,0.84)]">
                  Priority Paths
                </div>
              </div>

              <motion.div
                variants={slideFiveActionListVariants}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="mt-5 grid gap-3 sm:grid-cols-2"
              >
                {homepageQuickActions.map((action) => {
                  const actionId = action.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <motion.div
                      key={action}
                      variants={slideFiveActionVariants}
                      whileHover={{ y: -4 }}
                      data-testid={`homepage-quick-action-${actionId}`}
                      className="flex items-center gap-3 rounded-[22px] border border-[rgba(214,161,92,0.48)] bg-[rgba(42,23,16,0.78)] px-4 py-4 text-sm text-[#F3E7D3] shadow-[0_18px_40px_rgba(5,4,3,0.2)] transition-colors hover:border-[rgba(214,161,92,0.7)] hover:shadow-[0_0_28px_rgba(214,161,92,0.12)] sm:text-[0.95rem]"
                    >
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#D6A15C]" />
                      {action}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <PracticeScriptOverlay
          script={slideFiveScript}
          visible={showScript}
          testId="speaker-script-5"
        />
      </div>
    </div>
  );
}

function CaseStatusSearchSlide({ showScript }: { showScript: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.42, once: false });
  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={ref}
      data-testid="legal-slide-6"
      data-nested-scroll="true"
      className="nested-scroll relative h-full overflow-y-auto"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050403_0%,#11100E_50%,#20120C_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,130,69,0.12),transparent_22%),radial-gradient(circle_at_72%_44%,rgba(214,161,92,0.12),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(74,43,27,0.2),transparent_28%)]" />
      {!imageError ? (
        <motion.img
          src={slide6}
          alt="Case status search environment with legal monitoring surfaces"
          data-testid="legal-slide-6-image"
          initial={{ scale: 1.06 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeOut" }}
          onError={() => setImageError(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,0.95)_0%,rgba(17,10,6,0.9)_38%,rgba(42,23,16,0.62)_74%,rgba(5,4,3,0.38)_100%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,4,3,0.28)_100%)]" />
      <div className="absolute inset-0 bg-grain opacity-[0.05] [background-size:10px_10px]" />
      <div className="absolute right-[18%] top-[34%] h-56 w-56 rounded-full bg-[#D6A15C]/10 blur-[135px]" />

      <div className="relative min-h-full px-6 py-6 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto grid min-h-full max-w-[1480px] items-center gap-10 py-4 sm:py-8 lg:grid-cols-[0.76fr_1.04fr] lg:gap-14 lg:py-10">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-[0.74rem] uppercase tracking-[0.34em] text-[#D6A15C]"
            >
              CASE TRACKING
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.22 }}
              data-testid="legal-slide-6-kicker"
              className="mt-5 text-sm tracking-[0.08em] text-[rgba(243,231,211,0.84)]"
            >
              Case Status Search
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.85, delay: 0.28 }}
              className="mt-6 max-w-[11ch] font-display text-[clamp(3rem,5.2vw,5.5rem)] font-semibold leading-[0.92] text-[#F3E7D3] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]"
            >
              Clarity without unnecessary follow-ups.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.48 }}
              className="mt-5 max-w-2xl text-base leading-8 text-[#D8C7B2] sm:text-lg"
            >
              Search by case number, party name, advocate name, filing number, or judge-wise
              search.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            data-testid="legal-slide-6-module"
            className="relative w-full max-w-[48rem] justify-self-end overflow-hidden rounded-[34px] border border-[rgba(185,130,69,0.32)] bg-[linear-gradient(180deg,rgba(17,10,6,0.86),rgba(42,23,16,0.78))] p-5 shadow-[0_36px_120px_rgba(42,23,16,0.52)] backdrop-blur-2xl sm:p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,161,92,0.14),transparent_28%)]" />
            <div className="relative">
              <div className="rounded-[24px] border border-[rgba(214,161,92,0.18)] bg-[rgba(17,16,14,0.54)] p-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: "100%" } : {}}
                  transition={{ duration: 0.7, delay: 0.75, ease: "easeOut" }}
                  data-testid="legal-slide-6-search-bar"
                  className="search-shimmer h-16 overflow-hidden rounded-[18px] border border-[rgba(214,161,92,0.2)] bg-[linear-gradient(90deg,rgba(42,23,16,0.82),rgba(17,10,6,0.64))] px-5"
                >
                  <div className="flex h-full items-center gap-3">
                    <Search className="h-4 w-4 shrink-0 text-[#D6A15C]" />
                    <span className="truncate text-sm text-[#F3E7D3] sm:text-[0.95rem]">
                      Search by case number, party, advocate, filing, or judge.
                    </span>
                    <motion.span
                      aria-hidden="true"
                      animate={inView ? { opacity: [0.3, 1, 0.3] } : {}}
                      transition={{
                        duration: 1.2,
                        delay: 1.02,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="ml-auto h-5 w-px shrink-0 bg-[rgba(243,231,211,0.5)]"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div
                variants={slideSixChipListVariants}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="mt-4 flex flex-wrap gap-2"
              >
                {caseSearchTypes.map((searchType) => (
                  <motion.div
                    key={searchType}
                    variants={slideSixChipVariants}
                    data-testid={`case-search-chip-${searchType.toLowerCase().replace(/\s+/g, "-")}`}
                    className="rounded-full border border-[rgba(214,161,92,0.22)] bg-[rgba(42,23,16,0.54)] px-4 py-2 text-sm text-[#F3E7D3]"
                  >
                    {searchType}
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-6 grid gap-5 lg:grid-cols-[132px_1fr]">
                <motion.div
                  data-testid="legal-slide-6-timeline"
                  className="relative rounded-[26px] border border-[rgba(214,161,92,0.14)] bg-[rgba(17,16,14,0.42)] px-5 py-5"
                >
                  <motion.span
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.7, delay: 1.15, ease: "easeOut" }}
                    className="absolute bottom-6 left-8 top-6 w-px origin-top bg-[linear-gradient(180deg,rgba(214,161,92,0.24),rgba(214,161,92,0.82),rgba(214,161,92,0.22))]"
                  />
                  <div className="relative flex flex-col gap-8">
                    {["Search", "Status", "Hearing", "Orders"].map((step, index) => (
                      <div key={step} className="flex items-center gap-3">
                        <motion.span
                          animate={inView ? { scale: [0, 1, 1] } : {}}
                          transition={{ duration: 0.42, delay: 1.16 + index * 0.12, ease: "easeOut" }}
                          className="h-3 w-3 shrink-0 rounded-full border border-[rgba(214,161,92,0.6)] bg-[#D6A15C] shadow-[0_0_12px_rgba(214,161,92,0.34)]"
                        />
                        <p className="text-sm text-[#D8C7B2]">{step}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  data-testid="legal-slide-6-result-card"
                  className="rounded-[28px] border border-[rgba(214,161,92,0.18)] bg-[rgba(17,16,14,0.5)] p-5 shadow-[0_24px_72px_rgba(5,4,3,0.24)]"
                >
                  <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[#D6A15C]">
                    Result Overview
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {caseStatusResultDetails.map((detail, index) => (
                      <div
                        key={detail.label}
                        className={`rounded-[22px] border border-[rgba(214,161,92,0.14)] bg-[rgba(42,23,16,0.48)] px-4 py-4 ${
                          index === caseStatusResultDetails.length - 1 ? "sm:col-span-2" : ""
                        }`}
                      >
                        <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[rgba(214,161,92,0.9)]">
                          {detail.label}
                        </p>
                        <p className="mt-3 text-sm text-[#F3E7D3] sm:text-[0.95rem]">
                          {detail.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <PracticeScriptOverlay
          script={slideSixScript}
          visible={showScript}
          testId="speaker-script-6"
        />
      </div>
    </div>
  );
}

function JusticeClockMetric({
  value,
  testId,
  highlighted,
  delta,
}: {
  value: string;
  testId: string;
  highlighted: boolean;
  delta?: number;
}) {
  return (
    <div data-testid={testId} className="flex items-center justify-end gap-2 text-white">
      <motion.span
        animate={
          highlighted
            ? {
                scale: [1, 1.04, 1],
                color: ["#FFFFFF", "#22D3EE", "#FFFFFF"],
                textShadow: [
                  "0 0 0 rgba(34,211,238,0)",
                  "0 0 20px rgba(34,211,238,0.45)",
                  "0 0 0 rgba(34,211,238,0)",
                ],
                backgroundColor: [
                  "rgba(34,211,238,0)",
                  "rgba(34,211,238,0.08)",
                  "rgba(34,211,238,0)",
                ],
              }
            : {
                scale: 1,
                color: "#FFFFFF",
                textShadow: "0 0 0 rgba(34,211,238,0)",
                backgroundColor: "rgba(34,211,238,0)",
              }
        }
        transition={{ duration: 0.82, ease: "easeOut" }}
        className="rounded-lg px-2 py-1 text-right font-medium tracking-[0.02em] text-white"
      >
        {value}
      </motion.span>
      {delta ? (
        <motion.span
          initial={{ opacity: 0, scale: 0.82, y: 4 }}
          animate={
            highlighted
              ? { opacity: [0, 1, 0], scale: [0.82, 1, 0.94], y: [4, 0, -2] }
              : { opacity: 0, scale: 0.82, y: 4 }
          }
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="rounded-full border border-[rgba(34,211,238,0.48)] bg-[rgba(34,211,238,0.1)] px-2 py-1 text-[0.65rem] font-medium text-[#22D3EE]"
        >
          +{delta}
        </motion.span>
      ) : null}
    </div>
  );
}

function JusticeClockSlide({
  showScript,
  active,
}: {
  showScript: boolean;
  active: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.4, once: false });
  const [imageError, setImageError] = useState(false);
  const [activeTable, setActiveTable] = useState<0 | 1>(0);
  const [tableOneRows, setTableOneRows] = useState(() =>
    justiceClockTableOneRowsBase.map((row) => ({ ...row }))
  );
  const [tableTwoRows, setTableTwoRows] = useState(() =>
    justiceClockTableTwoRowsBase.map((row) => ({ ...row }))
  );
  const [updatedCells, setUpdatedCells] = useState<string[]>([]);
  const [updatedDeltas, setUpdatedDeltas] = useState<Record<string, number>>({});
  const [dashboardNow, setDashboardNow] = useState(() => new Date());

  useEffect(() => {
    if (!active) {
      return;
    }

    setActiveTable(0);
    setUpdatedCells([]);
    setUpdatedDeltas({});
    setTableOneRows(justiceClockTableOneRowsBase.map((row) => ({ ...row })));
    setTableTwoRows(justiceClockTableTwoRowsBase.map((row) => ({ ...row })));
    setDashboardNow(new Date());
  }, [active]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveTable((current) => (current === 0 ? 1 : 0));
    }, 7000);

    return () => window.clearInterval(interval);
  }, [active]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const interval = window.setInterval(() => {
      setDashboardNow(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, [active]);

  useEffect(() => {
    if (!active) {
      return;
    }

    setUpdatedCells([]);
    setUpdatedDeltas({});

    const timeout = window.setTimeout(() => {
      if (activeTable === 0) {
        setTableOneRows((rows) =>
          rows.map((row) => {
            if (row.id === "last-day") {
              return { ...row, institution: row.institution + 12, disposal: row.disposal + 5 };
            }

            if (row.id === "today") {
              return { ...row, disposal: row.disposal + 4 };
            }

            return row;
          })
        );
        setUpdatedCells([
          "table-one-last-day-institution",
          "table-one-last-day-disposal",
          "table-one-today-disposal",
        ]);
        setUpdatedDeltas({
          "table-one-last-day-institution": 12,
          "table-one-last-day-disposal": 5,
          "table-one-today-disposal": 4,
        });
      } else {
        setTableTwoRows((rows) =>
          rows.map((row) => {
            if (row.id === "0-1") {
              return { ...row, listedToday: row.listedToday + 3 };
            }

            if (row.id === "6-10") {
              return { ...row, listedToday: row.listedToday + 2 };
            }

            if (row.id === "total") {
              return { ...row, listedToday: row.listedToday + 5 };
            }

            return row;
          })
        );
        setUpdatedCells([
          "table-two-0-1-listed-today",
          "table-two-6-10-listed-today",
          "table-two-total-listed-today",
        ]);
        setUpdatedDeltas({
          "table-two-0-1-listed-today": 3,
          "table-two-6-10-listed-today": 2,
          "table-two-total-listed-today": 5,
        });
      }
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [active, activeTable]);

  const activeJusticeBackground = activeTable === 0 ? slide71 : slide72;
  const justiceClockModeHindi = activeTable === 1;

  return (
    <div
      ref={ref}
      data-testid="legal-slide-7"
      data-nested-scroll="true"
      className="nested-scroll relative h-full overflow-y-auto"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050403_0%,#020814_42%,#11100E_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(185,130,69,0.14),transparent_26%)]" />
      {!imageError ? (
        <AnimatePresence mode="wait">
          <motion.img
            key={activeJusticeBackground}
            src={activeJusticeBackground}
            alt="Justice Clock dashboard atmosphere"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={inView ? { opacity: 0.22, scale: 1 } : {}}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            onError={() => setImageError(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      ) : null}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,8,20,0.88)_0%,rgba(5,4,3,0.8)_100%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_36%,rgba(2,8,20,0.46)_100%)]" />
      <div className="absolute inset-0 bg-grain opacity-[0.04] [background-size:12px_12px]" />

      <div className="relative min-h-full px-6 py-6 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto flex min-h-full max-w-[1520px] flex-col gap-8 py-4 sm:py-8 lg:gap-10 lg:py-10">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.75 }}
            className="max-w-4xl"
          >
            <p className="text-[0.74rem] uppercase tracking-[0.34em] text-[#D6A15C]">
              TRANSPARENCY TOOL
            </p>
            <p className="mt-5 text-sm tracking-[0.08em] text-[rgba(243,231,211,0.84)]">
              Justice Clock
            </p>
            <h2 className="mt-6 max-w-[11ch] font-display text-[clamp(3rem,5.1vw,5.4rem)] font-semibold leading-[0.92] text-[#F3E7D3] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
              Transparency that leadership can measure.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#D8C7B2] sm:text-lg">
              Not just numbers — a clear view of where attention is needed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            data-testid="justice-clock-panel"
            className="relative flex-1 overflow-hidden rounded-[38px] border border-[rgba(34,211,238,0.45)] bg-[rgba(2,8,20,0.95)] shadow-[0_0_40px_rgba(34,211,238,0.08),0_0_32px_rgba(185,130,69,0.12),0_38px_120px_rgba(2,8,20,0.55)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(185,130,69,0.12),transparent_28%)]" />
            <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] [background-size:90px_90px]" />
            <div className="relative flex h-full flex-col px-5 py-5 sm:px-6 sm:py-6">
              <div className="flex flex-col gap-4 border-b border-[rgba(34,211,238,0.22)] pb-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(34,211,238,0.28)] bg-[rgba(4,13,30,0.82)] px-4 py-2 text-[0.72rem] uppercase tracking-[0.3em] text-[#D8C7B2]">
                    <motion.span
                      animate={inView ? { opacity: [0.45, 1, 0.45], scale: [1, 1.16, 1] } : {}}
                      transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      className="h-2.5 w-2.5 rounded-full bg-[#22D3EE] shadow-[0_0_12px_rgba(34,211,238,0.42)]"
                    />
                    Live rotating display
                  </span>
                  {[
                    "01 Institution / Disposal / CCR",
                    "02 Agewise Pendency / Listed Today",
                  ].map((indicator, index) => (
                    <div
                      key={indicator}
                      data-testid={`justice-clock-indicator-${index + 1}`}
                      className={`rounded-full border px-4 py-2 text-[0.72rem] uppercase tracking-[0.3em] ${
                        activeTable === index
                          ? "border-[rgba(214,161,92,0.65)] bg-[rgba(214,161,92,0.1)] text-[#F3E7D3]"
                          : "border-[rgba(34,211,238,0.24)] bg-[rgba(4,13,30,0.72)] text-[#D8C7B2]"
                      }`}
                    >
                      {indicator}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="rounded-full border border-[rgba(34,211,238,0.26)] bg-[rgba(4,13,30,0.82)] px-4 py-2 text-sm text-[#F3E7D3]">
                    {formatJusticeClockTime(dashboardNow)}
                  </div>
                  <div className="inline-flex overflow-hidden rounded-full border border-[rgba(34,211,238,0.3)] bg-[rgba(4,13,30,0.82)]">
                    <span
                      className={`px-4 py-2 text-sm ${
                        !justiceClockModeHindi
                          ? "bg-[rgba(34,211,238,0.18)] text-white"
                          : "text-[#D8C7B2]"
                      }`}
                    >
                      English
                    </span>
                    <span
                      className={`border-l border-[rgba(34,211,238,0.24)] px-4 py-2 text-sm ${
                        justiceClockModeHindi
                          ? "bg-[rgba(214,161,92,0.12)] text-white"
                          : "text-[#D8C7B2]"
                      }`}
                    >
                      हिंदी
                    </span>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`justice-table-${activeTable}`}
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-1 flex-col"
                >
                  <motion.div
                    variants={justiceClockFilterListVariants}
                    initial="hidden"
                    animate="show"
                    className="mt-5 grid gap-3 lg:grid-cols-3"
                  >
                    {justiceClockFilters.map((filter, index) => (
                      <motion.div
                        key={filter.en}
                        variants={justiceClockFilterVariants}
                        className={`rounded-[20px] border px-4 py-4 ${
                          index === 0
                            ? "border-[rgba(214,161,92,0.65)] bg-[rgba(4,13,30,0.82)]"
                            : "border-[rgba(34,211,238,0.38)] bg-[rgba(4,13,30,0.82)]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm text-white">{filter.en}</p>
                            <p className="mt-2 text-xs tracking-[0.06em] text-[#D8C7B2]">
                              {filter.hi}
                            </p>
                          </div>
                          <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-[#22D3EE]" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="relative mt-5 flex-1 overflow-hidden rounded-[26px] border border-[rgba(34,211,238,0.22)] bg-[rgba(4,13,30,0.78)]">
                    <motion.div
                      aria-hidden="true"
                      initial={{ x: "-20%", opacity: 0 }}
                      animate={{ x: "120%", opacity: [0, 0.2, 0] }}
                      transition={{ duration: 1.15, delay: 0.85, ease: "easeInOut" }}
                      className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.2),transparent)] blur-md"
                    />
                    <div className="flex h-full flex-col px-4 py-4 sm:px-5">
                      <div className="border-b border-[rgba(34,211,238,0.75)] pb-4">
                        <h3
                          data-testid="justice-clock-table-title"
                          className="text-xl text-white sm:text-[1.45rem]"
                        >
                          {activeTable === 0
                            ? "Institution, Disposal & Case Clearance Rate"
                            : "Agewise Pendency & Listed Today"}
                        </h3>
                        <p className="mt-2 text-sm text-[#D8C7B2]">
                          {activeTable === 0
                            ? "संस्था, निपटान और केस क्लियरेंस दर"
                            : "आयु-वार लंबित मामले और आज सूचीबद्ध"}
                        </p>
                      </div>

                      {activeTable === 0 ? (
                        <div className="mt-4 flex-1 overflow-auto">
                          <table className="min-w-full border-separate border-spacing-0 text-left">
                            <thead>
                              <tr className="border-b border-[rgba(34,211,238,0.34)]">
                                {["Duration", "Institution", "Disposal", "CCR"].map((column) => (
                                  <th
                                    key={column}
                                    className="border-b border-[rgba(34,211,238,0.34)] px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[#F3E7D3]"
                                  >
                                    {column}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <motion.tbody
                              variants={justiceClockRowListVariants}
                              initial="hidden"
                              animate="show"
                            >
                              {tableOneRows.map((row) => (
                                <motion.tr
                                  key={row.id}
                                  variants={justiceClockRowVariants}
                                  className="odd:bg-[rgba(34,211,238,0.03)]"
                                >
                                  <td className="border-b border-[rgba(34,211,238,0.24)] px-4 py-4 text-[#F3E7D3]">
                                    <p className="text-sm text-white">{row.label}</p>
                                    <p className="mt-1 text-xs text-[#D8C7B2]">{row.labelHi}</p>
                                  </td>
                                  <td className="border-b border-[rgba(34,211,238,0.24)] px-4 py-4 text-right">
                                    <JusticeClockMetric
                                      testId={`justice-table-one-${row.id}-institution`}
                                      value={formatIndianNumber(row.institution)}
                                      highlighted={updatedCells.includes(`table-one-${row.id}-institution`)}
                                      delta={updatedDeltas[`table-one-${row.id}-institution`]}
                                    />
                                  </td>
                                  <td className="border-b border-[rgba(34,211,238,0.24)] px-4 py-4 text-right">
                                    <JusticeClockMetric
                                      testId={`justice-table-one-${row.id}-disposal`}
                                      value={formatIndianNumber(row.disposal)}
                                      highlighted={updatedCells.includes(`table-one-${row.id}-disposal`)}
                                      delta={updatedDeltas[`table-one-${row.id}-disposal`]}
                                    />
                                  </td>
                                  <td className="border-b border-[rgba(34,211,238,0.24)] px-4 py-4 text-right">
                                    <JusticeClockMetric
                                      testId={`justice-table-one-${row.id}-ccr`}
                                      value={`${row.ccr}%`}
                                      highlighted={updatedCells.includes(`table-one-${row.id}-ccr`)}
                                      delta={updatedDeltas[`table-one-${row.id}-ccr`]}
                                    />
                                  </td>
                                </motion.tr>
                              ))}
                            </motion.tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="mt-4 flex-1 overflow-auto">
                          <table className="min-w-full border-separate border-spacing-0 text-left">
                            <thead>
                              <tr className="border-b border-[rgba(34,211,238,0.34)]">
                                {["Age Years", "Pendency", "Listed Today"].map((column) => (
                                  <th
                                    key={column}
                                    className="border-b border-[rgba(34,211,238,0.34)] px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[#F3E7D3]"
                                  >
                                    {column}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <motion.tbody
                              variants={justiceClockRowListVariants}
                              initial="hidden"
                              animate="show"
                            >
                              {tableTwoRows.map((row) => (
                                <motion.tr
                                  key={row.id}
                                  variants={justiceClockRowVariants}
                                  className="odd:bg-[rgba(34,211,238,0.03)]"
                                >
                                  <td className="border-b border-[rgba(34,211,238,0.24)] px-4 py-4 text-[#F3E7D3]">
                                    <p className="text-sm text-white">{row.label}</p>
                                    <p className="mt-1 text-xs text-[#D8C7B2]">{row.labelHi}</p>
                                  </td>
                                  <td className="border-b border-[rgba(34,211,238,0.24)] px-4 py-4 text-right">
                                    <JusticeClockMetric
                                      testId={`justice-table-two-${row.id}-pendency`}
                                      value={formatIndianNumber(row.pendency)}
                                      highlighted={updatedCells.includes(`table-two-${row.id}-pendency`)}
                                      delta={updatedDeltas[`table-two-${row.id}-pendency`]}
                                    />
                                  </td>
                                  <td className="border-b border-[rgba(34,211,238,0.24)] px-4 py-4 text-right">
                                    <JusticeClockMetric
                                      testId={`justice-table-two-${row.id}-listed-today`}
                                      value={formatIndianNumber(row.listedToday)}
                                      highlighted={updatedCells.includes(`table-two-${row.id}-listed-today`)}
                                      delta={updatedDeltas[`table-two-${row.id}-listed-today`]}
                                    />
                                  </td>
                                </motion.tr>
                              ))}
                            </motion.tbody>
                          </table>
                        </div>
                      )}

                      <p className="mt-4 text-sm text-[rgba(216,199,178,0.92)]">
                        Data helps identify pressure points.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          <PracticeScriptOverlay
            script={slideSevenScript}
            visible={showScript}
            testId="speaker-script-7"
          />
        </div>
      </div>
    </div>
  );
}

function AppointmentBookingSlide({ showScript }: { showScript: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.42, once: false });
  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={ref}
      data-testid="legal-slide-8"
      data-nested-scroll="true"
      className="nested-scroll relative h-full overflow-y-auto"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050403_0%,#11100E_52%,#1F110B_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,130,69,0.12),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(74,43,27,0.22),transparent_30%)]" />
      {!imageError ? (
        <motion.img
          src={slide8}
          alt="Appointment booking atmosphere for legal scheduling"
          data-testid="legal-slide-8-image"
          initial={{ scale: 1.06 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeOut" }}
          onError={() => setImageError(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,0.95)_0%,rgba(17,10,6,0.88)_40%,rgba(42,23,16,0.56)_72%,rgba(5,4,3,0.34)_100%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,4,3,0.28)_100%)]" />
      <div className="absolute inset-0 bg-grain opacity-[0.05] [background-size:10px_10px]" />
      <div className="absolute right-[14%] top-[34%] h-56 w-56 rounded-full bg-[#D6A15C]/10 blur-[135px]" />

      <div className="relative min-h-full px-6 py-6 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto grid min-h-full max-w-[1480px] items-center gap-10 py-4 sm:py-8 lg:grid-cols-[0.78fr_1fr] lg:gap-14 lg:py-10">
          <div className="max-w-3xl rounded-[32px] bg-[linear-gradient(180deg,rgba(5,4,3,0.52),rgba(17,10,6,0.24))] px-0 py-0 lg:pr-10">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-[0.74rem] uppercase tracking-[0.34em] text-[#D6A15C]"
            >
              CLIENT ACCESS
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.22 }}
              data-testid="legal-slide-8-kicker"
              className="mt-5 text-sm tracking-[0.08em] text-[rgba(243,231,211,0.84)]"
            >
              Appointment Booking
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.85, delay: 0.28 }}
              className="mt-6 max-w-[11ch] font-display text-[clamp(3rem,5.2vw,5.4rem)] font-semibold leading-[0.92] text-[#F3E7D3] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]"
            >
              Structured visits. Better client handling.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.48 }}
              className="mt-5 max-w-2xl text-base leading-8 text-[#D8C7B2] sm:text-lg"
            >
              Online scheduling reduces waiting, crowding, and communication gaps.
            </motion.p>

            <motion.div
              variants={slideEightPillListVariants}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {appointmentTypes.map((appointmentType) => (
                <motion.div
                  key={appointmentType}
                  variants={slideEightPillVariants}
                  data-testid={`appointment-type-${appointmentType.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-full border border-[rgba(214,161,92,0.28)] bg-[rgba(42,23,16,0.58)] px-4 py-3 text-sm text-[#F3E7D3] shadow-[0_16px_36px_rgba(5,4,3,0.16)]"
                >
                  {appointmentType}
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 42, scale: 0.96 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            data-testid="legal-slide-8-booking"
            className="relative w-full max-w-[43rem] justify-self-end overflow-hidden rounded-[34px] border border-[rgba(185,130,69,0.34)] bg-[linear-gradient(180deg,rgba(17,10,6,0.84),rgba(42,23,16,0.76))] p-5 shadow-[0_34px_110px_rgba(42,23,16,0.48)] backdrop-blur-2xl sm:p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,161,92,0.14),transparent_28%)]" />
            <div className="relative">
              <div className="flex items-center justify-between gap-4 border-b border-[rgba(214,161,92,0.16)] pb-4">
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[#D6A15C]">
                    Visit Calendar
                  </p>
                  <p className="mt-2 text-sm text-[#D8C7B2]">May 2026 • Client scheduling window</p>
                </div>
                <div className="rounded-2xl border border-[rgba(214,161,92,0.24)] bg-[rgba(42,23,16,0.68)] p-3 text-[#D6A15C]">
                  <CalendarDays className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-5 rounded-[28px] border border-[rgba(214,161,92,0.18)] bg-[rgba(17,16,14,0.5)] p-4">
                <div className="grid grid-cols-7 gap-2 text-center">
                  {appointmentWeekdays.map((weekday) => (
                    <p key={weekday} className="text-[0.7rem] uppercase tracking-[0.2em] text-[#BFAE99]">
                      {weekday}
                    </p>
                  ))}
                  {appointmentCalendarDates.map((date) => (
                    <motion.div
                      key={date.day}
                      initial={date.selected ? { scale: 0.8, opacity: 0 } : false}
                      animate={
                        date.selected && inView
                          ? {
                              scale: 1,
                              opacity: 1,
                              boxShadow: [
                                "0 0 0 rgba(214,161,92,0)",
                                "0 0 24px rgba(214,161,92,0.2)",
                                "0 0 0 rgba(214,161,92,0)",
                              ],
                            }
                          : { scale: 1, opacity: 1 }
                      }
                      transition={{ duration: 0.45, delay: 0.85 }}
                      data-testid={date.selected ? "appointment-selected-date" : undefined}
                      className={`rounded-[18px] border px-2 py-3 text-sm ${
                        date.selected
                          ? "border-[rgba(214,161,92,0.7)] bg-[rgba(214,161,92,0.18)] text-[#F3E7D3]"
                          : date.muted
                            ? "border-[rgba(214,161,92,0.1)] bg-[rgba(42,23,16,0.3)] text-[#BFAE99]"
                            : "border-[rgba(214,161,92,0.16)] bg-[rgba(42,23,16,0.48)] text-[#D8C7B2]"
                      }`}
                    >
                      {date.day}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {appointmentTimeSlots.map((slot, index) => (
                  <motion.div
                    key={slot.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.42, delay: 1 + index * 0.08 }}
                    data-testid={slot.active ? "appointment-selected-slot" : undefined}
                    className={`rounded-[22px] border px-4 py-4 text-center ${
                      slot.active
                        ? "border-[rgba(214,161,92,0.72)] bg-[rgba(214,161,92,0.18)] text-[#F3E7D3]"
                        : "border-[rgba(214,161,92,0.18)] bg-[rgba(42,23,16,0.5)] text-[#D8C7B2]"
                    }`}
                  >
                    <p className="text-[0.7rem] uppercase tracking-[0.24em] text-[#BFAE99]">
                      Time Slot
                    </p>
                    <p className="mt-3 text-sm">{slot.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["Date", "14 May 2026"],
                  ["Purpose", "Lawyer Consultation"],
                  ["Time Slot", "12:00 PM"],
                  ["Contact Details", "Client contact confirmed"],
                  ["Reminder", "Email + SMS enabled"],
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className={`rounded-[22px] border border-[rgba(214,161,92,0.16)] bg-[rgba(17,16,14,0.5)] px-4 py-4 ${
                      index === 4 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#D6A15C]">
                      {label}
                    </p>
                    <p className="mt-3 text-sm text-[#F3E7D3]">{value}</p>
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 1.2 }}
                className="mt-5 flex flex-col gap-3 rounded-[24px] border border-[rgba(214,161,92,0.2)] bg-[rgba(42,23,16,0.56)] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.38, delay: 1.2, ease: "easeOut" }}
                    className="rounded-full border border-[rgba(214,161,92,0.3)] bg-[rgba(214,161,92,0.14)] p-2 text-[#D6A15C]"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-[#F3E7D3]">Booking confirmed</p>
                    <p className="mt-1 text-xs text-[#BFAE99]">
                      Structured arrival window saved for the admin desk.
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={inView ? { opacity: [0.72, 1, 0.72] } : {}}
                  transition={{
                    duration: 1.8,
                    delay: 1.35,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,161,92,0.26)] bg-[rgba(17,16,14,0.58)] px-4 py-2 text-sm text-[#F3E7D3]"
                >
                  <BellRing className="h-4 w-4 text-[#D6A15C]" />
                  Reminder Active
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <PracticeScriptOverlay
          script={slideEightScript}
          visible={showScript}
          testId="speaker-script-8"
        />
      </div>
    </div>
  );
}

function JudgesInformationSlide({ showScript }: { showScript: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.42, once: false });
  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={ref}
      data-testid="legal-slide-9"
      data-nested-scroll="true"
      className="nested-scroll relative h-full overflow-y-auto"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050403_0%,#11100E_52%,#1F110B_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,130,69,0.14),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(74,43,27,0.2),transparent_28%)]" />
      {!imageError ? (
        <motion.img
          src={slide9}
          alt="Judges information atmosphere for an official court information board"
          data-testid="legal-slide-9-image"
          initial={{ scale: 1.06 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeOut" }}
          onError={() => setImageError(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,0.94)_0%,rgba(17,10,6,0.82)_46%,rgba(5,4,3,0.62)_100%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_44%,rgba(5,4,3,0.28)_100%)]" />
      <div className="absolute inset-0 bg-grain opacity-[0.05] [background-size:10px_10px]" />
      <div className="absolute right-[14%] top-[34%] h-56 w-56 rounded-full bg-[#D6A15C]/10 blur-[138px]" />

      <div className="relative min-h-full px-6 py-6 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto grid min-h-full max-w-[1480px] items-center gap-10 py-4 sm:py-8 lg:grid-cols-[0.78fr_1fr] lg:gap-14 lg:py-10">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-[0.74rem] uppercase tracking-[0.34em] text-[#D6A15C]"
            >
              COURT INFORMATION
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.22 }}
              data-testid="legal-slide-9-kicker"
              className="mt-5 text-sm tracking-[0.08em] text-[#F3E7D3]"
            >
              Judges Information
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.85, delay: 0.28 }}
              className="mt-6 max-w-[11ch] font-display text-[clamp(3rem,5.1vw,5.45rem)] font-semibold leading-[0.92] text-[#F3E7D3] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]"
            >
              Clarity with institutional dignity.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.48 }}
              className="mt-5 max-w-2xl text-base leading-8 text-[#D8C7B2] sm:text-lg"
            >
              Bench details, sitting lists, court assignments, and public profiles presented
              respectfully.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 0.86, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 1.1 }}
              data-testid="legal-slide-9-footer"
              className="mt-8 text-sm tracking-[0.08em] text-[rgba(214,161,92,0.92)]"
            >
              Transparency should never reduce dignity.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 44, scale: 0.96 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            data-testid="legal-slide-9-directory"
            className="relative w-full max-w-[43rem] justify-self-end overflow-hidden rounded-[34px] border border-[rgba(185,130,69,0.36)] bg-[linear-gradient(180deg,rgba(17,10,6,0.86),rgba(42,23,16,0.78))] p-5 shadow-[0_34px_110px_rgba(42,23,16,0.46)] backdrop-blur-2xl sm:p-6"
          >
            <motion.div
              aria-hidden="true"
              initial={{ y: "-115%", opacity: 0 }}
              animate={inView ? { y: "125%", opacity: [0, 0.32, 0] } : {}}
              transition={{ duration: 1.25, delay: 1.02, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-x-6 h-20 bg-[linear-gradient(180deg,transparent,rgba(214,161,92,0.18),transparent)] blur-xl"
            />
            <div className="relative">
              <div className="flex items-center justify-between gap-4 border-b border-[rgba(214,161,92,0.16)] pb-4">
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[#D6A15C]">
                    Official Bench Directory
                  </p>
                  <p className="mt-2 text-sm text-[#D8C7B2]">
                    Public-facing structure with formal presentation standards.
                  </p>
                </div>
                <div className="rounded-full border border-[rgba(214,161,92,0.22)] bg-[rgba(42,23,16,0.68)] px-4 py-2 text-[0.7rem] uppercase tracking-[0.28em] text-[#F3E7D3]">
                  Court Board
                </div>
              </div>

              <motion.div
                variants={slideNineRowListVariants}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="mt-5 flex flex-col gap-3"
              >
                {judgesDirectoryItems.map((item, index) => (
                  <motion.div
                    key={item}
                    variants={slideNineRowVariants}
                    data-testid={`judges-directory-row-${index + 1}`}
                    className="flex items-center gap-4 rounded-[24px] border border-[rgba(214,161,92,0.22)] bg-[rgba(42,23,16,0.62)] px-4 py-4"
                  >
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#D6A15C]" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-[#F3E7D3] sm:text-[0.95rem]">{item}</p>
                      <div className="mt-3 flex gap-2">
                        <span className="h-2 w-24 max-w-[32%] rounded-full bg-[rgba(243,231,211,0.2)]" />
                        <span className="h-2 w-32 max-w-[38%] rounded-full bg-[rgba(216,199,178,0.14)]" />
                        <span className="h-2 w-16 max-w-[18%] rounded-full bg-[rgba(214,161,92,0.18)]" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <PracticeScriptOverlay
          script={slideNineScript}
          visible={showScript}
          testId="speaker-script-9"
        />
      </div>
    </div>
  );
}

function LawyerDashboardSlide({ showScript }: { showScript: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.42, once: false });
  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={ref}
      data-testid="legal-slide-10"
      data-nested-scroll="true"
      className="nested-scroll relative h-full overflow-y-auto"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050403_0%,#11100E_50%,#20120C_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,130,69,0.12),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(74,43,27,0.22),transparent_30%)]" />
      {!imageError ? (
        <motion.img
          src={slide10}
          alt="Lawyer dashboard workspace atmosphere"
          data-testid="legal-slide-10-image"
          initial={{ scale: 1.06 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeOut" }}
          onError={() => setImageError(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,0.95)_0%,rgba(17,10,6,0.88)_40%,rgba(42,23,16,0.58)_76%,rgba(5,4,3,0.36)_100%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(5,4,3,0.28)_100%)]" />
      <div className="absolute inset-0 bg-grain opacity-[0.05] [background-size:10px_10px]" />
      <div className="absolute right-[14%] top-[34%] h-56 w-56 rounded-full bg-[#D6A15C]/10 blur-[140px]" />

      <div className="relative min-h-full px-6 py-6 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto grid min-h-full max-w-[1480px] items-center gap-10 py-4 sm:py-8 lg:grid-cols-[0.76fr_1.04fr] lg:gap-14 lg:py-10">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-[0.74rem] uppercase tracking-[0.34em] text-[#D6A15C]"
            >
              LAWYER WORKSPACE
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.22 }}
              data-testid="legal-slide-10-kicker"
              className="mt-5 text-sm tracking-[0.08em] text-[#F3E7D3]"
            >
              Lawyer Dashboard
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.85, delay: 0.28 }}
              className="mt-6 max-w-[11ch] font-display text-[clamp(3rem,5.1vw,5.45rem)] font-semibold leading-[0.92] text-[#F3E7D3] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]"
            >
              One clean workspace for legal professionals.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.48 }}
              className="mt-5 max-w-2xl text-base leading-8 text-[#D8C7B2] sm:text-lg"
            >
              Assigned cases, hearing dates, documents, evidence, notes, and updates in one secure
              place.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 0.86, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 1.1 }}
              data-testid="legal-slide-10-footer"
              className="mt-8 text-sm tracking-[0.08em] text-[rgba(214,161,92,0.92)]"
            >
              Private. Organized. Role-based.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 42, scale: 0.96 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            data-testid="lawyer-dashboard-shell"
            className="relative w-full max-w-[45rem] justify-self-end overflow-hidden rounded-[28px] border border-[rgba(185,130,69,0.45)] bg-[rgba(17,10,6,0.78)] p-5 shadow-[0_34px_110px_rgba(42,23,16,0.48)] backdrop-blur-2xl sm:p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,161,92,0.14),transparent_28%)]" />
            <div className="relative">
              <div className="flex items-center justify-between gap-4 border-b border-[rgba(214,161,92,0.16)] pb-4">
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[#D6A15C]">
                    Assigned Matters
                  </p>
                  <p className="mt-2 text-sm text-[#D8C7B2]">
                    Secure personal workspace after role-based login.
                  </p>
                </div>
                <div className="rounded-full border border-[rgba(214,161,92,0.24)] bg-[rgba(42,23,16,0.68)] px-4 py-2 text-[0.7rem] uppercase tracking-[0.28em] text-[#F3E7D3]">
                  Role View
                </div>
              </div>

              <motion.div
                variants={slideTenPanelListVariants}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="mt-5 grid gap-4 lg:grid-cols-[1.14fr_0.86fr]"
              >
                <motion.div
                  variants={slideTenPanelVariants}
                  data-testid="lawyer-dashboard-panel-assigned-cases"
                  className="rounded-[24px] border border-[rgba(214,161,92,0.18)] bg-[rgba(42,23,16,0.56)] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#D6A15C]">
                      Assigned Cases
                    </p>
                    <span className="rounded-full border border-[rgba(214,161,92,0.2)] px-3 py-1 text-[0.68rem] text-[#F3E7D3]">
                      08 active
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col gap-3">
                    {["Case Title", "Next Hearing", "Client Instruction"].map((row, index) => (
                      <motion.div
                        key={row}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.35, delay: 0.96 + index * 0.08 }}
                        className="rounded-[18px] border border-[rgba(214,161,92,0.14)] bg-[rgba(17,16,14,0.42)] px-4 py-3"
                      >
                        <p className="text-sm text-[#F3E7D3]">{row}</p>
                        <div className="mt-3 flex gap-2">
                          <span className="h-2 w-24 rounded-full bg-[rgba(243,231,211,0.2)]" />
                          <span className="h-2 w-16 rounded-full bg-[rgba(216,199,178,0.14)]" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className="grid gap-4">
                  <motion.div
                    variants={slideTenPanelVariants}
                    data-testid="lawyer-dashboard-panel-hearing-dates"
                    className="rounded-[24px] border border-[rgba(214,161,92,0.18)] bg-[rgba(42,23,16,0.56)] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Clock3 className="h-4 w-4 text-[#D6A15C]" />
                      <p className="text-sm text-[#F3E7D3]">Hearing Dates</p>
                    </div>
                    <div className="mt-4 flex flex-col gap-3">
                      <span className="h-2 w-28 rounded-full bg-[rgba(243,231,211,0.2)]" />
                      <span className="h-2 w-20 rounded-full bg-[rgba(214,161,92,0.18)]" />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={slideTenPanelVariants}
                    data-testid="lawyer-dashboard-panel-documents"
                    className="rounded-[24px] border border-[rgba(214,161,92,0.18)] bg-[rgba(42,23,16,0.56)] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-[#D6A15C]" />
                      <p className="text-sm text-[#F3E7D3]">Documents</p>
                    </div>
                    <div className="mt-4 grid gap-2">
                      <span className="h-2 w-full rounded-full bg-[rgba(243,231,211,0.18)]" />
                      <span className="h-2 w-3/4 rounded-full bg-[rgba(216,199,178,0.14)]" />
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  variants={slideTenPanelVariants}
                  data-testid="lawyer-dashboard-panel-notes"
                  className="rounded-[24px] border border-[rgba(214,161,92,0.18)] bg-[rgba(42,23,16,0.56)] p-4"
                >
                  <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#D6A15C]">Notes</p>
                  <div className="mt-4 grid gap-2">
                    <span className="h-2 w-full rounded-full bg-[rgba(243,231,211,0.18)]" />
                    <span className="h-2 w-5/6 rounded-full bg-[rgba(243,231,211,0.18)]" />
                    <span className="h-2 w-3/4 rounded-full bg-[rgba(216,199,178,0.14)]" />
                  </div>
                </motion.div>

                <motion.div
                  variants={slideTenPanelVariants}
                  animate={inView ? { y: [0, -4, 0] } : { y: 0 }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  data-testid="lawyer-dashboard-panel-evidence-updates"
                  className="rounded-[24px] border border-[rgba(214,161,92,0.18)] bg-[rgba(42,23,16,0.56)] p-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#D6A15C]">
                        Evidence
                      </p>
                      <div className="mt-4 grid gap-2">
                        <span className="h-2 w-4/5 rounded-full bg-[rgba(243,231,211,0.18)]" />
                        <span className="h-2 w-3/5 rounded-full bg-[rgba(216,199,178,0.14)]" />
                      </div>
                    </div>
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#D6A15C]">
                        Updates
                      </p>
                      <div className="mt-4 grid gap-2">
                        <span className="h-2 w-4/5 rounded-full bg-[rgba(243,231,211,0.18)]" />
                        <span className="h-2 w-3/5 rounded-full bg-[rgba(214,161,92,0.16)]" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={slideTenPanelVariants}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="mt-5 rounded-[24px] border border-[rgba(214,161,92,0.18)] bg-[rgba(17,16,14,0.48)] px-4 py-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#D6A15C]">
                    Timeline Strip
                  </p>
                  <p className="text-xs text-[#BFAE99]">Secure matter chronology</p>
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.68, delay: 1.0, ease: "easeOut" }}
                  className="mt-4 h-px origin-left bg-[linear-gradient(90deg,rgba(214,161,92,0.2),rgba(214,161,92,0.82),rgba(214,161,92,0.2))]"
                />
                <div className="mt-4 flex items-center justify-between">
                  {lawyerDashboardCaseRows.map((area, index) => (
                    <motion.div
                      key={area}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 1.06 + index * 0.06 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-[#D6A15C]" />
                      <span className="text-[0.62rem] uppercase tracking-[0.14em] text-[#D8C7B2]">
                        {area}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <PracticeScriptOverlay
          script={slideTenScript}
          visible={showScript}
          testId="speaker-script-10"
        />
      </div>
    </div>
  );
}

function LawyerSecuritySlide({ showScript }: { showScript: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.42, once: false });
  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={ref}
      data-testid="legal-slide-11"
      data-nested-scroll="true"
      className="nested-scroll relative h-full overflow-y-auto"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050403_0%,#11100E_52%,#1F110B_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,130,69,0.14),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(74,43,27,0.22),transparent_30%)]" />
      {!imageError ? (
        <motion.img
          src={slide11}
          alt="Lawyer login and security atmosphere"
          data-testid="legal-slide-11-image"
          initial={{ scale: 1.06 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeOut" }}
          onError={() => setImageError(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,0.95)_0%,rgba(17,10,6,0.86)_40%,rgba(42,23,16,0.58)_76%,rgba(5,4,3,0.38)_100%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(5,4,3,0.28)_100%)]" />
      <div className="absolute inset-0 bg-grain opacity-[0.05] [background-size:10px_10px]" />
      <div className="absolute right-[16%] top-[35%] h-60 w-60 rounded-full bg-[#D6A15C]/10 blur-[145px]" />

      <div className="relative min-h-full px-6 py-6 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto grid min-h-full max-w-[1480px] items-center gap-10 py-4 sm:py-8 lg:grid-cols-[0.76fr_1.04fr] lg:gap-14 lg:py-10">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-[0.74rem] uppercase tracking-[0.34em] text-[#D6A15C]"
            >
              CONFIDENTIAL ACCESS
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.22 }}
              data-testid="legal-slide-11-kicker"
              className="mt-5 text-sm tracking-[0.08em] text-[#F3E7D3]"
            >
              Lawyer Login & Security
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.85, delay: 0.28 }}
              className="mt-6 max-w-[11ch] font-display text-[clamp(3rem,5.1vw,5.4rem)] font-semibold leading-[0.92] text-[#F3E7D3] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]"
            >
              Right person. Right access. Nothing more.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.48 }}
              className="mt-5 max-w-2xl text-base leading-8 text-[#D8C7B2] sm:text-lg"
            >
              Secure login, two-factor verification, and role-based permissions protect sensitive
              legal information.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 0.86, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 1.1 }}
              data-testid="legal-slide-11-footer"
              className="mt-8 text-sm tracking-[0.08em] text-[rgba(214,161,92,0.92)]"
            >
              Confidentiality is not optional in legal work.
            </motion.p>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 42, scale: 0.96 }}
              animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.78, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              data-testid="lawyer-security-shell"
              className="relative w-full max-w-[42rem] justify-self-end overflow-hidden rounded-[34px] border border-[rgba(185,130,69,0.36)] bg-[linear-gradient(180deg,rgba(17,10,6,0.84),rgba(42,23,16,0.76))] p-5 shadow-[0_34px_110px_rgba(42,23,16,0.48)] backdrop-blur-2xl sm:p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,161,92,0.12),transparent_28%)]" />
              <div className="relative">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.82, rotate: -4 }}
                    animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    data-testid="lawyer-security-lock"
                    className="relative mx-auto flex h-36 w-36 shrink-0 items-center justify-center lg:mx-0"
                  >
                    <div className="absolute inset-0 rounded-full border border-[rgba(214,161,92,0.24)]" />
                    <div className="absolute inset-[16px] rounded-full border border-[rgba(214,161,92,0.18)]" />
                    <div className="absolute inset-[28px] rounded-full border border-[rgba(214,161,92,0.12)]" />
                    <div className="absolute inset-[22px] rounded-full bg-[radial-gradient(circle,rgba(214,161,92,0.14),transparent_70%)] blur-xl" />
                    <div className="relative rounded-[28px] border border-[rgba(214,161,92,0.3)] bg-[rgba(42,23,16,0.72)] p-4 text-[#D6A15C] shadow-[0_0_28px_rgba(214,161,92,0.1)]">
                      <ShieldCheck className="h-12 w-12" />
                    </div>
                  </motion.div>

                  <div className="relative flex-1">
                    <motion.span
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.9, delay: 0.65, ease: "easeOut" }}
                      className="absolute bottom-6 left-4 top-6 hidden w-px origin-top bg-[linear-gradient(180deg,rgba(214,161,92,0.16),rgba(214,161,92,0.88),rgba(214,161,92,0.2))] sm:block"
                    />
                    <motion.div
                      variants={slideElevenLayerListVariants}
                      initial="hidden"
                      animate={inView ? "show" : "hidden"}
                      className="flex flex-col gap-3 sm:pl-8"
                    >
                      {securityLayers.map((layer, index) => (
                        <motion.div
                          key={layer}
                          variants={slideElevenLayerVariants}
                          data-testid={`security-step-${index + 1}`}
                          className={`relative flex items-center gap-4 rounded-[24px] border px-4 py-4 ${
                            index === securityLayers.length - 1
                              ? "border-[rgba(214,161,92,0.42)] bg-[rgba(42,23,16,0.72)]"
                              : "border-[rgba(214,161,92,0.22)] bg-[rgba(42,23,16,0.6)]"
                          }`}
                        >
                          <span className="absolute -left-[30px] hidden h-3 w-3 rounded-full border border-[rgba(214,161,92,0.6)] bg-[#D6A15C] shadow-[0_0_14px_rgba(214,161,92,0.34)] sm:block" />
                          <div className="rounded-full border border-[rgba(214,161,92,0.24)] bg-[rgba(17,16,14,0.5)] px-3 py-2 text-[0.72rem] uppercase tracking-[0.22em] text-[#D6A15C]">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <p className="text-sm text-[#F3E7D3] sm:text-[0.95rem]">{layer}</p>
                          {index === securityLayers.length - 1 ? (
                            <motion.div
                              animate={inView ? { boxShadow: ["0 0 0 rgba(214,161,92,0)", "0 0 22px rgba(214,161,92,0.22)", "0 0 0 rgba(214,161,92,0)"] } : {}}
                              transition={{ duration: 1.1, delay: 1.35, ease: "easeInOut" }}
                              className="ml-auto rounded-full border border-[rgba(214,161,92,0.28)] bg-[rgba(214,161,92,0.12)] p-2 text-[#D6A15C]"
                            >
                              <LockKeyhole className="h-4 w-4" />
                            </motion.div>
                          ) : null}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <PracticeScriptOverlay
          script={slideElevenScript}
          visible={showScript}
          testId="speaker-script-11"
        />
      </div>
    </div>
  );
}

function AssignedCasesDocumentsSlide({ showScript }: { showScript: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.42, once: false });
  const [imageError, setImageError] = useState(false);

  return (
    <div
      ref={ref}
      data-testid="legal-slide-12"
      data-nested-scroll="true"
      className="nested-scroll relative h-full overflow-y-auto"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#050403_0%,#11100E_52%,#1F110B_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,130,69,0.12),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(74,43,27,0.24),transparent_30%)]" />
      {!imageError ? (
        <motion.img
          src={slide12}
          alt="Assigned case documents atmosphere"
          data-testid="legal-slide-12-image"
          initial={{ scale: 1.06 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 1.6, ease: "easeOut" }}
          onError={() => setImageError(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,0.95)_0%,rgba(17,10,6,0.86)_40%,rgba(42,23,16,0.58)_76%,rgba(5,4,3,0.38)_100%)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(5,4,3,0.28)_100%)]" />
      <div className="absolute inset-0 bg-grain opacity-[0.05] [background-size:10px_10px]" />
      <div className="absolute right-[16%] top-[35%] h-60 w-60 rounded-full bg-[#D6A15C]/10 blur-[145px]" />

      <div className="relative min-h-full px-6 py-6 sm:px-10 lg:px-16 lg:py-12">
        <div className="mx-auto grid min-h-full max-w-[1480px] items-center gap-10 py-4 sm:py-8 lg:grid-cols-[0.74fr_1.06fr] lg:gap-14 lg:py-10">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="text-[0.74rem] uppercase tracking-[0.34em] text-[#D6A15C]"
            >
              CASE MATERIAL
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.22 }}
              data-testid="legal-slide-12-kicker"
              className="mt-5 text-sm tracking-[0.08em] text-[#F3E7D3]"
            >
              Assigned Cases & Documents
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.85, delay: 0.28 }}
              className="mt-6 max-w-[11ch] font-display text-[clamp(3rem,5.1vw,5.4rem)] font-semibold leading-[0.92] text-[#F3E7D3] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]"
            >
              All relevant material in one place.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.48 }}
              className="mt-5 max-w-2xl text-base leading-8 text-[#D8C7B2] sm:text-lg"
            >
              Case title, number, status, next hearing, documents, images, evidence, and
              supporting records.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 0.86, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 1.1 }}
              data-testid="legal-slide-12-footer"
              className="mt-8 text-sm tracking-[0.08em] text-[rgba(214,161,92,0.92)]"
            >
              Faster preparation before hearings and client meetings.
            </motion.p>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              data-testid="case-material-shell"
              className="relative mx-auto h-[36rem] w-full max-w-[46rem] lg:h-[38rem]"
            >
              <div className="absolute left-1/2 top-1/2 hidden h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(214,161,92,0.16)] lg:block" />
              <div className="absolute left-1/2 top-1/2 hidden h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(214,161,92,0.12)] lg:block" />
              <motion.svg
                viewBox="0 0 700 600"
                className="absolute inset-0 hidden h-full w-full lg:block"
              >
                {[
                  "M350 310 L130 120",
                  "M350 310 L555 128",
                  "M350 310 L122 292",
                  "M350 310 L568 300",
                  "M350 310 L348 520",
                ].map((path, index) => (
                  <motion.path
                    key={path}
                    d={path}
                    fill="none"
                    stroke="rgba(214,161,92,0.6)"
                    strokeWidth="1.4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 0.9 } : {}}
                    transition={{ duration: 0.9, delay: 0.75 + index * 0.04, ease: "easeOut" }}
                  />
                ))}
              </motion.svg>

              <motion.div
                data-testid="case-material-central-file"
                className="absolute left-1/2 top-1/2 z-10 w-full max-w-[20rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] border border-[rgba(185,130,69,0.36)] bg-[linear-gradient(180deg,rgba(17,10,6,0.88),rgba(42,23,16,0.8))] p-5 shadow-[0_34px_110px_rgba(42,23,16,0.48)] backdrop-blur-2xl"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,161,92,0.14),transparent_26%)]" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4 border-b border-[rgba(214,161,92,0.16)] pb-4">
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[#D6A15C]">
                        Case File
                      </p>
                      <p className="mt-2 text-sm text-[#D8C7B2]">
                        Connected material for assigned preparation.
                      </p>
                    </div>
                    <div className="rounded-full border border-[rgba(214,161,92,0.22)] bg-[rgba(42,23,16,0.68)] p-3 text-[#D6A15C]">
                      <FileText className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    {[
                      ["Case Title", "Matter under review"],
                      ["Case Number", "Reference available"],
                      ["Current Status", "Active for hearing"],
                      ["Next Hearing", "Date linked to schedule"],
                    ].map(([label, value], index) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.36, delay: 1.0 + index * 0.08 }}
                        className="rounded-[20px] border border-[rgba(214,161,92,0.16)] bg-[rgba(42,23,16,0.56)] px-4 py-4"
                      >
                        <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#D6A15C]">
                          {label}
                        </p>
                        <p className="mt-3 text-sm text-[#F3E7D3]">{value}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={slideTwelveTileListVariants}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="absolute inset-0 grid gap-4 lg:block"
              >
                {[
                  "left-0 top-4 max-w-[13rem]",
                  "right-0 top-8 max-w-[13rem]",
                  "left-0 top-[44%] max-w-[13rem]",
                  "right-0 top-[46%] max-w-[13rem]",
                  "left-1/2 bottom-0 max-w-[15rem] -translate-x-1/2",
                ].map((positionClassName, index) => (
                  <motion.div
                    key={caseMaterialTiles[index]}
                    variants={slideTwelveTileVariants}
                    whileHover={{ y: -4 }}
                    data-testid={`case-material-tile-${index + 1}`}
                    className={`rounded-[24px] border border-[rgba(214,161,92,0.22)] bg-[rgba(42,23,16,0.68)] px-4 py-4 shadow-[0_18px_42px_rgba(5,4,3,0.18)] backdrop-blur-xl lg:absolute ${positionClassName}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#D6A15C]" />
                      <p className="text-sm text-[#F3E7D3]">{caseMaterialTiles[index]}</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <span className="h-2 w-20 rounded-full bg-[rgba(243,231,211,0.18)]" />
                      <span className="h-2 w-14 rounded-full bg-[rgba(216,199,178,0.14)]" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <PracticeScriptOverlay
          script={slideTwelveScript}
          visible={showScript}
          testId="speaker-script-12"
        />
      </div>
    </div>
  );
}

function PulseFlowBridgeSlide({
  onNavigate,
  active,
}: {
  onNavigate: () => void;
  active: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.45, once: false });
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (!active) {
      return;
    }

    const timeout = window.setTimeout(() => setShouldLoadVideo(true), 140);
    return () => window.clearTimeout(timeout);
  }, [active]);

  return (
    <div ref={ref} className="relative h-full overflow-hidden bg-[#0F172A]">
      <div className="attendance-grid absolute inset-0 opacity-18" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_24%)]" />

      <div className="relative grid h-full gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[0.88fr_1.12fr] lg:px-16 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", duration: 0.4, bounce: 0.18 }}
          className="flex flex-col justify-center"
        >
          <p className="text-xs uppercase tracking-[0.36em] text-[#22C55E]/88">
            Slide 07 / PulseFlow Proposal
          </p>
          <h2 className="mt-5 max-w-[11ch] font-sans text-[clamp(2.8rem,4.8vw,5rem)] font-semibold leading-[0.95] text-[#F8FAFC]">
            Trust-first attendance flow for Bedi & Associates.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[#CBD5E1]/76">
            PulseFlow now frames attendance around accountability, transparency, and employee
            comfort, with cross-platform flow for Windows, macOS, and Linux.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Admin Clarity", icon: LayoutDashboard },
              { label: "Cross-Platform", icon: Monitor },
              { label: "Trust Logic", icon: Workflow },
            ].map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-[#E2E8F0]/72 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-[#22C55E]/25 bg-[#22C55E]/12 p-2 text-[#22C55E]">
                    <Icon className="h-4 w-4" />
                  </div>
                  {label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-4">
            <Button
              variant="gold"
              size="lg"
              className="bg-[#22C55E] text-[#052E16] hover:bg-[#4ADE80]"
              onClick={onNavigate}
            >
              Open Bedi Proposal
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-sm text-[#CBD5E1]/64">Routes to `/attendence`</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ type: "spring", duration: 0.4, bounce: 0.16, delay: 0.08 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-full max-w-[760px]">
            <div className="rounded-[34px] border border-white/10 bg-[#0B1220] p-3 shadow-[0_42px_120px_rgba(2,6,23,0.45)]">
              <div className="relative overflow-hidden rounded-[24px]">
                <div className="attendance-placeholder absolute inset-0" />
                {shouldLoadVideo ? (
                  <video
                    className="hidden aspect-[16/10] w-full object-cover md:block"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source src={landscapeVideo} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={portraitImage}
                    alt=""
                    aria-hidden="true"
                    className="hidden aspect-[16/10] w-full scale-110 object-cover opacity-35 blur-xl md:block"
                  />
                )}
                <img
                  src={portraitImage}
                  alt="PulseFlow attendance preview"
                  className="aspect-[16/10] w-full object-cover md:hidden"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.28))]" />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-4 rounded-[24px] border border-white/10 bg-[#0F172A]/88 px-4 py-4 text-sm text-[#E2E8F0]/76 backdrop-blur-xl">
              Privacy-first screenshot timeline
            </div>
            <div className="absolute -right-4 top-6 rounded-[24px] border border-[#22C55E]/25 bg-[#22C55E]/12 px-4 py-4 text-sm text-[#86EFAC] backdrop-blur-xl">
              Auto-punch + music alert
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function LegacyPresentation({
  onNavigateToAttendance,
}: {
  onNavigateToAttendance: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const activeIndexRef = useRef(0);
  const wheelLockRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [practiceMode, setPracticeMode] = useState(false);

  useEffect(() => {
    document.title = "Legacy-First Law Association Presentation";
  }, []);

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

  const advanceStory = (direction: 1 | -1) => {
    navigateTo(activeIndexRef.current + direction);
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
      }, 720);

      advanceStory(event.deltaY > 0 ? 1 : -1);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const handlePracticeKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Shift") {
        return;
      }

      setPracticeMode((current) => (current ? current : true));
    };

    const handlePracticeKeyUp = (event: KeyboardEvent) => {
      if (event.key !== "Shift") {
        return;
      }

      setPracticeMode((current) => (current ? false : current));
    };

    const handlePracticeBlur = () => {
      setPracticeMode(false);
    };

    window.addEventListener("keydown", handlePracticeKeyDown);
    window.addEventListener("keyup", handlePracticeKeyUp);
    window.addEventListener("blur", handlePracticeBlur);

    return () => {
      window.removeEventListener("keydown", handlePracticeKeyDown);
      window.removeEventListener("keyup", handlePracticeKeyUp);
      window.removeEventListener("blur", handlePracticeBlur);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /input|textarea|select/i.test(target.tagName)) {
        return;
      }

      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        advanceStory(1);
      }

      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        advanceStory(-1);
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

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-paper text-[#051121]">
      <div
        ref={containerRef}
        className="story-container relative h-screen w-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden scroll-smooth"
      >
        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[0] = element;
          }}
          className="bg-[#050403]"
        >
          <FoundationSlide showScript={practiceMode && activeIndex === 0} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[1] = element;
          }}
          className="bg-[#050403]"
        >
          <AuthorityHallSlide showScript={practiceMode && activeIndex === 1} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[2] = element;
          }}
          className="bg-[#050403]"
        >
          <LegalPlatformIntroSlide showScript={practiceMode && activeIndex === 2} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[3] = element;
          }}
          className="bg-[#050403]"
        >
          <PublicWebsiteSlide showScript={practiceMode && activeIndex === 3} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[4] = element;
          }}
          className="bg-[#050403]"
        >
          <HomepageQuickActionsSlide showScript={practiceMode && activeIndex === 4} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[5] = element;
          }}
          className="bg-[#050403]"
        >
          <CaseStatusSearchSlide showScript={practiceMode && activeIndex === 5} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[6] = element;
          }}
          className="bg-[#020814]"
        >
          <JusticeClockSlide
            active={activeIndex === 6}
            showScript={practiceMode && activeIndex === 6}
          />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[7] = element;
          }}
          className="bg-[#050403]"
        >
          <AppointmentBookingSlide showScript={practiceMode && activeIndex === 7} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[8] = element;
          }}
          className="bg-[#050403]"
        >
          <JudgesInformationSlide showScript={practiceMode && activeIndex === 8} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[9] = element;
          }}
          className="bg-[#050403]"
        >
          <LawyerDashboardSlide showScript={practiceMode && activeIndex === 9} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[10] = element;
          }}
          className="bg-[#050403]"
        >
          <LawyerSecuritySlide showScript={practiceMode && activeIndex === 10} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[11] = element;
          }}
          className="bg-[#050403]"
        >
          <AssignedCasesDocumentsSlide showScript={practiceMode && activeIndex === 11} />
        </SectionShell>

        <SectionShell
          sectionRef={(element) => {
            sectionRefs.current[12] = element;
          }}
          className="bg-[#0F172A]"
        >
          <PulseFlowBridgeSlide
            active={activeIndex === 12}
            onNavigate={onNavigateToAttendance}
          />
        </SectionShell>
      </div>
    </div>
  );
}

function normalizeRoute(pathname: string): AppRoute {
  return pathname === "/attendence" || pathname === "/attendance" ? "/attendence" : "/";
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => normalizeRoute(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setRoute(normalizeRoute(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextRoute: AppRoute) => {
    if (window.location.pathname !== nextRoute) {
      window.history.pushState({}, "", nextRoute);
    }

    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return route === "/attendence" ? (
    <AttendancePresentation onNavigateHome={() => navigate("/")} />
  ) : (
    <LegacyPresentation onNavigateToAttendance={() => navigate("/attendence")} />
  );
}
