"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  Code2,
  Compass,
  Crown,
  Database,
  Globe2,
  Layers3,
  Lightbulb,
  Network,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useEffect, useState } from "react";

/* ============================================================
   TYPES
============================================================ */

type TimelineItem = {
  year: string;
  phase: string;
  title: string;
  description: string;
  technologies: string[];
  icon: LucideIcon;
};

type Capability = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

type Metric = {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

type Technology = {
  name: string;
  category: string;
  mark: string;
};

/* ============================================================
   TECHNOLOGIES
============================================================ */

const technologies: Technology[] = [
  {
    name: "Next.js",
    category: "WEB",
    mark: "N",
  },
  {
    name: "React",
    category: "WEB",
    mark: "R",
  },
  {
    name: "Node.js",
    category: "BACKEND",
    mark: "JS",
  },
  {
    name: "Flutter",
    category: "MOBILE",
    mark: "F",
  },
  {
    name: "React Native",
    category: "MOBILE",
    mark: "RN",
  },
  {
    name: "Supabase",
    category: "DATA",
    mark: "S",
  },
  {
    name: "PostgreSQL",
    category: "DATA",
    mark: "PG",
  },
  {
    name: "Cloud",
    category: "INFRA",
    mark: "☁",
  },
];

/* ============================================================
   DATA
============================================================ */

const timeline: TimelineItem[] = [
  {
    year: "01",
    phase: "THE FOUNDATION",
    title: "Learning how the web actually works",
    description:
      "The journey began with hands-on web development and PHP, learning the fundamentals by building real websites rather than simply studying technology in isolation.",
    technologies: ["PHP", "MySQL", "HTML", "CSS"],
    icon: Lightbulb,
  },
  {
    year: "02",
    phase: "THE CRAFT",
    title: "From websites to business platforms",
    description:
      "Projects became increasingly connected to real business operations — from content platforms and e-commerce to custom websites that needed to support customers, products and internal workflows.",
    technologies: ["WordPress", "Magento", "PHP", "E-commerce"],
    icon: Layers3,
  },
  {
    year: "03",
    phase: "THE ENGINEERING MINDSET",
    title: "Building systems instead of pages",
    description:
      "Custom application development introduced a deeper understanding of architecture, databases, APIs, integrations and the importance of building software that could evolve with the business.",
    technologies: ["CodeIgniter", "MySQL", "APIs", "Custom Systems"],
    icon: Workflow,
  },
  {
    year: "04",
    phase: "THE MODERN STACK",
    title: "Moving toward modern product engineering",
    description:
      "The work expanded into modern frontend frameworks, backend services, mobile applications and data-driven products — shifting the focus from individual technologies to complete digital solutions.",
    technologies: ["Next.js", "Node.js", "React", "Mobile"],
    icon: Zap,
  },
  {
    year: "05",
    phase: "THE COMPANY",
    title: "Vishweshwar Industries is founded",
    description:
      "In 2023, years of practical experience became the foundation for Vishweshwar Industries — a digital company created around a simple idea: technology should serve the business, not the other way around.",
    technologies: ["Technology", "Design", "Brand", "Growth"],
    icon: Crown,
  },
  {
    year: "06",
    phase: "TODAY",
    title: "Building digital foundations for what comes next",
    description:
      "Today, Vishweshwar Industries combines engineering, design, branding and digital strategy to help businesses build stronger products and a more capable digital presence.",
    technologies: ["Web", "Mobile", "Cloud", "Digital"],
    icon: Rocket,
  },
];

const capabilities: Capability[] = [
  {
    number: "01",
    title: "Digital Engineering",
    description:
      "Business websites, web applications, dashboards, portals and custom systems engineered around real operational requirements.",
    icon: Code2,
    tags: ["Next.js", "Node.js", "React", "APIs"],
  },
  {
    number: "02",
    title: "Mobile Products",
    description:
      "Cross-platform and native mobile experiences designed around performance, usability, maintainability and business objectives.",
    icon: Globe2,
    tags: ["Android", "iOS", "React Native", "Flutter"],
  },
  {
    number: "03",
    title: "Product Experience",
    description:
      "Interfaces that make complex products easier to understand, navigate and use while maintaining a distinctive visual identity.",
    icon: Palette,
    tags: ["UI/UX", "Design Systems", "Interaction"],
  },
  {
    number: "04",
    title: "Brand & Identity",
    description:
      "Visual systems that bring consistency across websites, applications, marketing material and every customer-facing digital touchpoint.",
    icon: Sparkles,
    tags: ["Identity", "Visuals", "Creative"],
  },
  {
    number: "05",
    title: "Business Systems",
    description:
      "Connected digital workflows that bring data, users, processes and technology together instead of leaving them in isolated tools.",
    icon: Database,
    tags: ["Supabase", "PostgreSQL", "Cloud", "Automation"],
  },
  {
    number: "06",
    title: "Digital Growth",
    description:
      "A practical approach to visibility, conversion and digital presence that connects creative work with measurable business outcomes.",
    icon: BarChart3,
    tags: ["SEO", "Marketing", "Analytics"],
  },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    description:
      "We start with the business, the audience and the problem — not with a predetermined technology.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Define",
    description:
      "Requirements, priorities, user journeys and technical direction are shaped before unnecessary complexity enters the project.",
    icon: Target,
  },
  {
    number: "03",
    title: "Design",
    description:
      "The experience, visual language and interaction model are developed around how people will actually use the product.",
    icon: Palette,
  },
  {
    number: "04",
    title: "Engineer",
    description:
      "The product is built with attention to performance, maintainability, security and the ability to grow.",
    icon: Code2,
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Deployment is treated as part of the product — with testing, optimisation and the infrastructure needed to go live confidently.",
    icon: Rocket,
  },
  {
    number: "06",
    title: "Evolve",
    description:
      "The relationship doesn't have to end at launch. Digital products improve as the business, users and market change.",
    icon: TrendingUp,
  },
];

const metrics: Metric[] = [
  {
    value: "10+",
    label: "Years",
    description: "of hands-on digital experience",
    icon: BriefcaseBusiness,
  },
  {
    value: "2023",
    label: "Founded",
    description: "Vishweshwar Industries established",
    icon: Building2,
  },
  {
    value: "103+",
    label: "Clients",
    description: "businesses and organisations served",
    icon: Users,
  },
  {
    value: "89+",
    label: "Projects",
    description: "digital projects delivered",
    icon: CheckCircle2,
  },
  {
    value: "57+",
    label: "Technologies",
    description: "worked with across projects",
    icon: Layers3,
  },
];

/* ============================================================
   ANIMATION
============================================================ */

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const viewport = {
  once: true,
  amount: 0.15,
};

/* ============================================================
   SECTION LABEL
============================================================ */

function SectionLabel({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] ${
        dark ? "text-[#f5d78e]" : "text-[#9b7b18]"
      }`}
    >
      <span className="h-px w-10 bg-[#d4af37]" />
      {children}
    </div>
  );
}

/* ============================================================
   TECHNOLOGY MARK
============================================================ */

function TechnologyMark({
  technology,
  active,
}: {
  technology: Technology;
  active: boolean;
}) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center rounded-full border transition-all duration-500 ${
        active
          ? "border-[#d4af37] bg-[#fffdf4] shadow-[0_0_45px_rgba(212,175,55,0.28)]"
          : "border-[#0a1a2f]/10 bg-white/90 shadow-[0_18px_50px_rgba(10,26,47,0.08)]"
      }`}
    >
      <span
        className={`font-mono text-[11px] font-bold tracking-[-0.04em] ${
          active ? "text-[#9b7b18]" : "text-[#0a1a2f]/55"
        }`}
      >
        {technology.mark}
      </span>

      <span
        className={`absolute -bottom-6 whitespace-nowrap text-[7px] font-semibold uppercase tracking-[0.18em] transition-all duration-500 ${
          active ? "text-[#9b7b18]" : "text-[#0a1a2f]/25"
        }`}
      >
        {technology.name}
      </span>
    </div>
  );
}

/* ============================================================
   HERO TECHNOLOGY CONSTELLATION
============================================================ */

function TechnologyConstellation() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % technologies.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const activeTechnology = technologies[active];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[720px]">
      {/* Ambient atmosphere */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/10 blur-[80px]"
      />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#355c8a]/10 blur-[70px]"
      />

      {/* Technical rings */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-[5%] rounded-full border border-[#0a1a2f]/8"
        animate={
          reducedMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]" />
        <span className="absolute bottom-[13%] right-[5%] h-1.5 w-1.5 rounded-full bg-[#355c8a]" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-[15%] rounded-full border border-[#d4af37]/25 border-dashed"
        animate={
          reducedMotion
            ? undefined
            : {
                rotate: -360,
              }
        }
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="absolute left-[11%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#d4af37]" />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-[25%] rounded-full border border-[#355c8a]/10"
      />

      {/* Connection system */}
      <div
        aria-hidden="true"
        className="absolute inset-[15%] rounded-full"
      >
        {technologies.map((technology, index) => {
          const angle =
            (360 / technologies.length) * index - 90;

          return (
            <div
              key={`${technology.name}-line`}
              className="absolute left-1/2 top-1/2 h-1/2 w-px origin-bottom bg-gradient-to-t from-[#d4af37]/25 to-transparent"
              style={{
                transform: `translate(-50%, -100%) rotate(${angle}deg)`,
              }}
            />
          );
        })}
      </div>

      {/* Technology nodes */}
      {technologies.map((technology, index) => {
        const angle =
          (360 / technologies.length) * index - 90;

        const radius =
          index % 2 === 0 ? "39%" : "32%";

        return (
          <motion.button
            key={technology.name}
            type="button"
            aria-label={`Select ${technology.name}`}
            onClick={() => setActive(index)}
            className="absolute left-1/2 top-1/2 z-20 h-[58px] w-[58px] -translate-x-1/2 -translate-y-1/2 sm:h-[68px] sm:w-[68px]"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}) rotate(${-angle}deg)`,
            }}
            animate={{
              scale: active === index ? 1.12 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 20,
            }}
          >
            <TechnologyMark
              technology={technology}
              active={active === index}
            />
          </motion.button>
        );
      })}

      {/* Central system */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-30 flex h-[39%] w-[39%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        animate={
          reducedMotion
            ? undefined
            : {
                scale: [1, 1.018, 1],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle at 32% 24%, #ffffff 0%, #fff8dc 23%, #d4af37 54%, #8e6c15 72%, #0a1a2f 100%)",
          boxShadow:
            "inset 0 0 55px rgba(255,255,255,0.55), 0 0 65px rgba(212,175,55,0.20), 0 30px 100px rgba(10,26,47,0.14)",
        }}
      >
        <div className="absolute inset-2.5 rounded-full border border-white/45 sm:inset-3" />

        <div className="relative z-10 flex max-w-[180px] flex-col items-center px-4 text-center sm:max-w-[230px]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0a1a2f]" />
            <span className="text-[7px] font-semibold uppercase tracking-[0.28em] text-[#0a1a2f]/60 sm:text-[8px]">
              Digital Systems
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#0a1a2f]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTechnology.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <p className="text-[clamp(1rem,2vw,1.35rem)] font-medium tracking-[-0.04em] text-[#0a1a2f]">
                {activeTechnology.name}
              </p>

              <p className="mt-1 text-[7px] font-semibold uppercase tracking-[0.22em] text-[#0a1a2f]/45">
                {activeTechnology.category}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 hidden h-px w-20 bg-[#0a1a2f]/15 sm:block" />

          <p className="mt-3 hidden text-[8px] leading-4 text-[#0a1a2f]/45 sm:block">
            Technology, experience and strategy working as one.
          </p>
        </div>
      </motion.div>

      {/* Peripheral labels */}
      <div className="absolute left-[3%] top-[25%] hidden sm:block">
        <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#0a1a2f]/25">
          ENGINEERING
        </p>
      </div>

      <div className="absolute bottom-[18%] right-[2%] hidden sm:block">
        <p className="text-[8px] font-semibold uppercase tracking-[0.28em] text-[#0a1a2f]/25">
          EXPERIENCE
        </p>
      </div>

      <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-3 whitespace-nowrap">
          <span className="h-px w-7 bg-[#d4af37]" />
          <span className="text-[7px] font-semibold uppercase tracking-[0.25em] text-[#0a1a2f]/30">
            Technology · Design · Brand · Growth
          </span>
          <span className="h-px w-7 bg-[#d4af37]" />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HERO
============================================================ */

function HeroSection() {
  return (
    <section className="relative min-h-[calc(100svh-88px)] overflow-hidden bg-[#faf9f6]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgba(212,175,55,0.13),transparent_27%),radial-gradient(circle_at_10%_90%,rgba(53,92,138,0.07),transparent_30%),linear-gradient(180deg,#ffffff,#faf9f6)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.11]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,26,47,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(10,26,47,0.045) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          maskImage:
            "radial-gradient(circle at 70% 50%, black, transparent 66%)",
          WebkitMaskImage:
            "radial-gradient(circle at 70% 50%, black, transparent 66%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute right-[-15%] top-[-35%] h-[650px] w-[650px] rounded-full border border-[#d4af37]/10"
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-88px)] max-w-[1500px] items-center px-6 py-16 sm:px-10 lg:grid-cols-[0.88fr_1.12fr] lg:px-16 lg:py-20 xl:px-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-40 max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>About Vishweshwar Industries</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[clamp(3.45rem,6.5vw,7.2rem)] font-medium leading-[0.84] tracking-[-0.078em]"
          >
            Experience
            <span className="block bg-gradient-to-r from-[#0a1a2f] via-[#355c8a] to-[#9b7b18] bg-clip-text text-transparent">
              meets ideas.
            </span>
            <span className="block">Ideas become systems.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-base leading-8 text-[#0a1a2f]/58 sm:text-lg"
          >
            Vishweshwar Industries is a digital technology and creative
            company founded by{" "}
            <strong className="font-medium text-[#0a1a2f]">
              Amit Mishra
            </strong>{" "}
            in 2023, built on more than a decade of practical experience
            across web development, applications, technology, design and
            digital growth.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              href="#experience"
              className="group inline-flex items-center gap-3 rounded-full bg-[#0a1a2f] px-6 py-3.5 text-sm font-medium text-white shadow-[0_18px_50px_rgba(10,26,47,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#142c49]"
            >
              Explore Our Journey
              <ArrowDown
                size={16}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </Link>

            <Link
              href="/contact-us"
              className="group inline-flex items-center gap-3 rounded-full border border-[#0a1a2f]/12 bg-white/65 px-6 py-3.5 text-sm font-medium text-[#0a1a2f] backdrop-blur-xl transition-all duration-300 hover:border-[#d4af37]/60 hover:bg-white"
            >
              Work With Us
              <ArrowUpRight
                size={16}
                className="text-[#9b7b18] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-11 grid max-w-lg grid-cols-3 border-t border-[#0a1a2f]/10 pt-5"
          >
            {[
              ["10+", "Years"],
              ["103+", "Clients"],
              ["89+", "Projects"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={index === 0 ? "" : "border-l border-[#0a1a2f]/10 pl-5"}
              >
                <p className="text-2xl font-medium tracking-[-0.04em]">
                  {value}
                </p>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0a1a2f]/35">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 35 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 1.15,
            ease: "easeOut",
          }}
          className="relative mt-12 lg:mt-0"
        >
          <TechnologyConstellation />
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 lg:flex">
        <span className="h-px w-12 bg-[#d4af37]" />
        <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#0a1a2f]/30">
          2023 — Present
        </span>
        <span className="h-px w-12 bg-[#d4af37]" />
      </div>
    </section>
  );
}

/* ============================================================
   FOUNDER
============================================================ */

function FounderSection() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#0a1a2f] px-6 py-28 text-white sm:px-10 lg:px-16 lg:py-36 xl:px-20"
    >
      <div
        aria-hidden="true"
        className="absolute right-[-180px] top-[-180px] h-[650px] w-[650px] rounded-full border border-[#d4af37]/10"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-[-250px] left-[-150px] h-[600px] w-[600px] rounded-full border border-[#355c8a]/20"
      />

      <div className="relative mx-auto max-w-[1250px]">
        <div className="grid gap-20 lg:grid-cols-[0.72fr_1.28fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
          >
            <SectionLabel dark>Why We Exist</SectionLabel>

            <h2 className="text-5xl font-medium leading-[0.94] tracking-[-0.06em] sm:text-6xl">
              Technology is only useful when it{" "}
              <span className="text-[#f5d78e]">solves something.</span>
            </h2>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/30 bg-white/5">
                <Crown
                  size={21}
                  strokeWidth={1.4}
                  className="text-[#f5d78e]"
                />
              </div>

              <div>
                <p className="text-sm font-medium">Amit Mishra</p>
                <p className="mt-1 text-xs text-white/35">
                  Founder · Vishweshwar Industries
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="space-y-8"
          >
            <motion.p
              variants={fadeUp}
              className="text-xl leading-9 text-white/65 sm:text-2xl"
            >
              Vishweshwar Industries was not created simply to become another
              company that builds websites and applications.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="max-w-3xl text-base leading-8 text-white/40"
            >
              Years of working directly with businesses revealed a recurring
              problem: technology, design, branding and marketing are often
              treated as separate activities. A website is built by one
              person, branding by another, marketing by someone else and the
              systems underneath are rarely designed as one connected
              ecosystem.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="max-w-3xl text-base leading-8 text-white/40"
            >
              Our approach is different. We look at the complete digital
              picture — what the business is trying to achieve, who it serves,
              how its people work and what technology can genuinely improve.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 sm:grid-cols-3"
            >
              {[
                {
                  value: "01",
                  title: "Business First",
                  text: "Understand the problem before choosing the solution.",
                },
                {
                  value: "02",
                  title: "Built to Last",
                  text: "Prefer useful, maintainable systems over unnecessary complexity.",
                },
                {
                  value: "03",
                  title: "One Direction",
                  text: "Bring technology, design and growth into the same conversation.",
                },
              ].map((item) => (
                <div
                  key={item.value}
                  className="bg-white/[0.035] p-6 transition-colors hover:bg-white/[0.06]"
                >
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[#f5d78e]/60">
                    {item.value}
                  </span>

                  <h3 className="mt-5 text-base font-medium">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-white/35">
                    {item.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   JOURNEY
============================================================ */

function JourneySection() {
  const [active, setActive] = useState(4);
  const activeItem = timeline[active];

  return (
    <section className="relative overflow-hidden bg-[#f4f5f5] px-6 py-28 sm:px-10 lg:px-16 lg:py-36 xl:px-20">
      <div className="mx-auto max-w-[1250px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <SectionLabel>The Journey</SectionLabel>

          <h2 className="text-5xl font-medium leading-[0.94] tracking-[-0.06em] sm:text-6xl">
            Ten years of{" "}
            <span className="text-[#9b7b18]">learning by building.</span>
          </h2>

          <p className="mt-7 max-w-2xl text-base leading-8 text-[#0a1a2f]/50">
            The company you see today is the result of many different stages
            of learning. Each stage added another layer — from writing code to
            understanding architecture, then products, businesses and the
            bigger digital ecosystem.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative">
            <div className="absolute bottom-7 left-[17px] top-7 w-px bg-gradient-to-b from-[#d4af37] via-[#0a1a2f]/15 to-transparent" />

            <div className="space-y-2">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                const isActive = active === index;

                return (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => setActive(index)}
                    className="group relative flex w-full items-center gap-5 text-left"
                  >
                    <span
                      className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isActive
                          ? "border-[#d4af37] bg-[#0a1a2f] text-[#f5d78e] shadow-[0_8px_30px_rgba(10,26,47,0.15)]"
                          : "border-[#0a1a2f]/10 bg-white text-[#0a1a2f]/35 group-hover:border-[#d4af37]/50"
                      }`}
                    >
                      <Icon size={15} strokeWidth={1.5} />
                    </span>

                    <div
                      className={`flex-1 rounded-2xl px-5 py-4 transition-all duration-300 ${
                        isActive
                          ? "bg-white shadow-[0_15px_45px_rgba(10,26,47,0.07)]"
                          : "hover:bg-white/60"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`text-[9px] font-semibold tracking-[0.2em] ${
                            isActive
                              ? "text-[#9b7b18]"
                              : "text-[#0a1a2f]/30"
                          }`}
                        >
                          {item.phase}
                        </span>

                        <span className="font-mono text-[9px] text-[#0a1a2f]/20">
                          {item.year}
                        </span>
                      </div>

                      <p
                        className={`mt-2 text-sm font-medium ${
                          isActive
                            ? "text-[#0a1a2f]"
                            : "text-[#0a1a2f]/55"
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[500px] overflow-hidden rounded-[34px] bg-[#0a1a2f] p-8 text-white sm:p-12">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#d4af37]/15"
            />

            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#355c8a]/10 blur-3xl"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 flex h-full flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold tracking-[0.28em] text-[#f5d78e]">
                      {activeItem.phase}
                    </span>

                    <span className="font-mono text-[11px] text-white/25">
                      {activeItem.year} / 06
                    </span>
                  </div>

                  <h3 className="mt-10 max-w-xl text-4xl font-medium leading-[1] tracking-[-0.045em] sm:text-5xl">
                    {activeItem.title}
                  </h3>

                  <p className="mt-7 max-w-2xl text-sm leading-8 text-white/45">
                    {activeItem.description}
                  </p>
                </div>

                <div className="mt-12">
                  <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/25">
                    Experience added
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {activeItem.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-medium text-white/55"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-6">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                    Next
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setActive(
                        (current) => (current + 1) % timeline.length,
                      )
                    }
                    className="group flex items-center gap-2 text-xs font-medium text-[#f5d78e]"
                  >
                    Continue the journey
                    <ChevronRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CAPABILITIES
============================================================ */

function CapabilitiesSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-28 sm:px-10 lg:px-16 lg:py-36 xl:px-20">
      <div
        aria-hidden="true"
        className="absolute right-[-220px] top-20 h-[600px] w-[600px] rounded-full border border-[#d4af37]/10"
      />

      <div className="relative mx-auto max-w-[1250px]">
        <div className="grid gap-16 lg:grid-cols-[0.72fr_1.28fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
          >
            <SectionLabel>What We Do</SectionLabel>

            <h2 className="max-w-lg text-5xl font-medium leading-[0.95] tracking-[-0.06em] sm:text-6xl">
              Six disciplines.
              <span className="block text-[#9b7b18]">
                One digital ecosystem.
              </span>
            </h2>

            <p className="mt-8 max-w-md text-base leading-8 text-[#0a1a2f]/50">
              A business rarely needs “just a website”. It needs a digital
              presence, systems that work, experiences people understand and a
              foundation that can support its next stage.
            </p>

            <div className="mt-10 rounded-[28px] border border-[#0a1a2f]/8 bg-[#faf9f6] p-7">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0a1a2f] text-[#f5d78e]">
                  <Network size={18} strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-sm font-medium">Connected thinking</p>
                  <p className="mt-1 text-xs text-[#0a1a2f]/40">
                    Technology · Experience · Brand · Growth
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div>
            <div className="grid gap-px overflow-hidden rounded-[32px] border border-[#0a1a2f]/8 bg-[#0a1a2f]/8 sm:grid-cols-2">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon;

                return (
                  <motion.article
                    key={capability.number}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    variants={fadeUp}
                    transition={{
                      delay: index * 0.06,
                    }}
                    className="group relative min-h-[300px] bg-[#faf9f6] p-7 transition-colors duration-500 hover:bg-[#fffdf8] sm:p-8"
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/25 bg-white text-[#9b7b18] transition-all duration-500 group-hover:rotate-6 group-hover:border-[#d4af37]/60 group-hover:shadow-[0_12px_30px_rgba(212,175,55,0.12)]">
                        <Icon size={18} strokeWidth={1.5} />
                      </span>

                      <span className="font-mono text-[9px] tracking-[0.2em] text-[#0a1a2f]/20">
                        {capability.number}
                      </span>
                    </div>

                    <h3 className="mt-8 text-xl font-medium tracking-[-0.025em]">
                      {capability.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#0a1a2f]/48">
                      {capability.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {capability.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#0a1a2f]/8 bg-white px-2.5 py-1 text-[8px] font-medium uppercase tracking-[0.12em] text-[#0a1a2f]/35"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="absolute bottom-0 left-0 h-px w-0 bg-[#d4af37] transition-all duration-500 group-hover:w-full" />
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HOW WE WORK
============================================================ */

function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-[#f1f3f3] px-6 py-28 sm:px-10 lg:px-16 lg:py-36 xl:px-20">
      <div className="mx-auto max-w-[1250px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="max-w-3xl"
        >
          <SectionLabel>How We Work</SectionLabel>

          <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.06em] sm:text-6xl">
            From a business problem
            <span className="block text-[#9b7b18]">
              to something people can use.
            </span>
          </h2>
        </motion.div>

        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-[#d4af37] via-[#0a1a2f]/10 to-transparent lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.number}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  variants={fadeUp}
                  transition={{
                    delay: index * 0.07,
                  }}
                  className="relative"
                >
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#f1f3f3]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#9b7b18] shadow-[0_8px_25px_rgba(10,26,47,0.06)]">
                      <Icon size={17} strokeWidth={1.5} />
                    </div>
                  </div>

                  <span className="mt-7 block font-mono text-[9px] tracking-[0.2em] text-[#9b7b18]">
                    {step.number}
                  </span>

                  <h3 className="mt-3 text-lg font-medium tracking-[-0.02em]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-[#0a1a2f]/45">
                    {step.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   NUMBERS
============================================================ */

function NumbersSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a1a2f] px-6 py-28 text-white sm:px-10 lg:px-16 lg:py-36 xl:px-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(212,175,55,0.16),transparent_27%),radial-gradient(circle_at_10%_80%,rgba(53,92,138,0.18),transparent_30%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
        }}
      />

      <div className="relative mx-auto max-w-[1250px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div>
            <SectionLabel dark>By The Numbers</SectionLabel>

            <h2 className="max-w-3xl text-5xl font-medium leading-[0.95] tracking-[-0.06em] sm:text-6xl">
              Experience you can
              <span className="text-[#f5d78e]"> build on.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/35">
            Numbers only tell part of the story. Behind each one is a project,
            a business problem, a lesson learned and a relationship built.
          </p>
        </motion.div>

        <div className="mt-16 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <motion.div
                key={metric.label}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                transition={{
                  delay: index * 0.06,
                }}
                className="group border-b border-white/10 px-1 py-10 sm:border-r sm:px-7 lg:border-b-0 lg:px-7 first:lg:pl-0 last:lg:border-r-0"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#f5d78e] transition-transform duration-500 group-hover:rotate-6">
                    <Icon size={16} strokeWidth={1.5} />
                  </span>

                  <span className="font-mono text-[9px] tracking-[0.2em] text-white/20">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-8 text-[clamp(3rem,4vw,4.5rem)] font-medium leading-none tracking-[-0.065em]">
                  {metric.value}
                </p>

                <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#f5d78e]">
                  {metric.label}
                </p>

                <p className="mt-2 text-xs leading-5 text-white/30">
                  {metric.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PRINCIPLES
============================================================ */

function PrinciplesSection() {
  const principles = [
    {
      icon: ShieldCheck,
      title: "Build with responsibility",
      text: "Good engineering means thinking about security, performance, maintainability and what happens after launch.",
    },
    {
      icon: Users,
      title: "Design for people",
      text: "Technology ultimately serves people. Every interface should reduce friction rather than create more of it.",
    },
    {
      icon: Lightbulb,
      title: "Keep questioning",
      text: "Experience should not become an excuse to stop learning. Better solutions often come from challenging assumptions.",
    },
    {
      icon: Zap,
      title: "Prefer useful complexity",
      text: "Complexity is valuable when it solves a real problem. Otherwise, simplicity usually wins.",
    },
  ];

  return (
    <section className="relative bg-white px-6 py-28 sm:px-10 lg:px-16 lg:py-36 xl:px-20">
      <div className="mx-auto max-w-[1250px]">
        <div className="grid gap-16 lg:grid-cols-[0.72fr_1.28fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
          >
            <SectionLabel>What We Believe</SectionLabel>

            <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.06em] sm:text-6xl">
              Principles that
              <span className="block text-[#9b7b18]">
                shape the work.
              </span>
            </h2>

            <p className="mt-8 max-w-md text-base leading-8 text-[#0a1a2f]/50">
              Technology changes quickly. The principles behind good work
              should be much harder to change.
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            {principles.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <motion.article
                  key={principle.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  variants={fadeUp}
                  transition={{
                    delay: index * 0.07,
                  }}
                  className="group rounded-[28px] border border-[#0a1a2f]/8 bg-[#faf9f6] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#d4af37]/30 hover:bg-[#fffdf8] hover:shadow-[0_25px_70px_rgba(10,26,47,0.07)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/25 bg-white text-[#9b7b18] transition-transform duration-500 group-hover:rotate-6">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-7 text-lg font-medium">
                    {principle.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#0a1a2f]/45">
                    {principle.text}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL CTA
============================================================ */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#f1f3f3] px-6 py-28 sm:px-10 lg:px-16 lg:py-40 xl:px-20">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af37]/10"
      />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#355c8a]/10"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.25,
        }}
        variants={stagger}
        className="relative mx-auto max-w-[950px] text-center"
      >
        <motion.div variants={fadeUp}>
          <SectionLabel>What Comes Next</SectionLabel>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="text-[clamp(3.4rem,7vw,7rem)] font-medium leading-[0.88] tracking-[-0.075em]"
        >
          Your business has
          <span className="block text-[#9b7b18]">another chapter.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#0a1a2f]/50 sm:text-lg"
        >
          Whether you are starting something new, replacing an outdated
          system, building a digital product or trying to make your existing
          presence work harder, let&apos;s figure out what should come next.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <Link
            href="/contact-us"
            className="group inline-flex items-center gap-3 rounded-full bg-[#0a1a2f] px-7 py-4 text-sm font-medium text-white shadow-[0_18px_50px_rgba(10,26,47,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#142c49]"
          >
            Start a Conversation
            <ArrowUpRight
              size={17}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            href="/services"
            className="group inline-flex items-center gap-3 rounded-full border border-[#0a1a2f]/12 bg-white/60 px-7 py-4 text-sm font-medium text-[#0a1a2f] backdrop-blur-md transition-all duration-300 hover:border-[#d4af37]/50 hover:bg-white"
          >
            Explore Services
            <ArrowRight
              size={17}
              strokeWidth={1.5}
              className="text-[#9b7b18] transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function AboutUsPage() {
  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#0a1a2f]">
      <HeroSection />
      <FounderSection />
      <JourneySection />
      <CapabilitiesSection />
      <ProcessSection />
      <NumbersSection />
      <PrinciplesSection />
      <FinalCTA />
    </main>
  );
}