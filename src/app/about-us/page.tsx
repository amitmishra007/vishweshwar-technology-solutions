"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Code2,
  Compass,
  Crown,
  Gem,
  Globe2,
  Layers3,
  Lightbulb,
  MoveUpRight,
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
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Sphere,
  Torus,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type StoryItem = {
  number: string;
  era: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

type Capability = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const storyItems: StoryItem[] = [
  {
    number: "01",
    era: "THE BEGINNING",
    title: "Learning how things really work",
    description:
      "The journey started more than a decade ago with a curiosity for understanding how digital products are actually built. Early work involved PHP and the fundamentals of web development, creating a foundation that would influence every stage that followed.",
    icon: Lightbulb,
  },
  {
    number: "02",
    era: "THE CRAFT",
    title: "From websites to real business problems",
    description:
      "As the experience grew, the work moved beyond simple websites into content platforms, e-commerce and increasingly complex business requirements. WordPress, Magento and custom application development became opportunities to understand how technology supports real organisations.",
    icon: Layers3,
  },
  {
    number: "03",
    era: "THE ENGINEERING MINDSET",
    title: "Learning to build systems, not just pages",
    description:
      "Working with frameworks such as CodeIgniter and building custom applications brought a deeper understanding of architecture, databases, APIs, integrations and the importance of creating systems that can keep working as businesses grow.",
    icon: Workflow,
  },
  {
    number: "04",
    era: "THE MODERN ERA",
    title: "A broader view of digital products",
    description:
      "The journey naturally evolved toward modern application development, bringing together frontend experiences, backend systems, mobile applications and data-heavy interfaces. The focus shifted from individual technologies to solving the complete problem.",
    icon: Zap,
  },
  {
    number: "05",
    era: "THE NEXT CHAPTER",
    title: "Vishweshwar Industries",
    description:
      "In 2023, that experience became the foundation for Vishweshwar Industries. Founded by Ami Mishra, the company was created with a simple belief: businesses deserve technology that is thoughtfully designed, properly engineered and built around their goals.",
    icon: Crown,
  },
  {
    number: "06",
    era: "TODAY",
    title: "Building what comes next",
    description:
      "Today, Vishweshwar Industries brings years of hands-on experience into every project — combining technology, design, branding and growth to help businesses create stronger digital foundations and move forward with confidence.",
    icon: Rocket,
  },
];

const capabilities: Capability[] = [
  {
    title: "Technology",
    description:
      "Digital products and business systems engineered around real-world requirements.",
    icon: Code2,
  },
  {
    title: "Experience",
    description:
      "Interfaces designed to make products intuitive, useful and memorable.",
    icon: Palette,
  },
  {
    title: "Brand",
    description:
      "Visual identities that give businesses a consistent and distinctive presence.",
    icon: Sparkles,
  },
  {
    title: "Growth",
    description:
      "Digital strategies designed to turn attention into meaningful business outcomes.",
    icon: TrendingUp,
  },
];

const metrics = [
  {
    value: "10+",
    label: "Years",
    description: "of hands-on experience",
    icon: BriefcaseBusiness,
  },
  {
    value: "2023",
    label: "Founded",
    description: "Vishweshwar Industries",
    icon: Building2,
  },
  {
    value: "103+",
    label: "Clients",
    description: "served across industries",
    icon: Users,
  },
  {
    value: "89+",
    label: "Projects",
    description: "delivered successfully",
    icon: CheckCircle2,
  },
];

const heroVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const viewport = {
  once: true,
  amount: 0.18,
};

function SectionLabel({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] ${
        dark ? "text-[#f5d78e]" : "text-[#9b7b18]"
      }`}
    >
      <span className="h-px w-9 bg-[#d4af37]" />
      {children}
    </div>
  );
}

/* ============================================================
   3D HERO CORE
============================================================ */

function DigitalCore() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.y = state.clock.elapsedTime * 0.12;

    group.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.24) * 0.06;
  });

  return (
    <group ref={group}>
      <Float
        speed={1.1}
        rotationIntensity={0.2}
        floatIntensity={0.45}
        floatingRange={[-0.06, 0.06]}
      >
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#d4af37"
            roughness={0.2}
            metalness={0.72}
            distort={0.14}
            speed={1.2}
          />
        </Sphere>

        <Torus
          args={[1.42, 0.011, 16, 180]}
          rotation={[Math.PI / 2.4, 0.2, 0]}
        >
          <meshStandardMaterial
            color="#355c8a"
            metalness={0.9}
            roughness={0.2}
          />
        </Torus>

        <Torus
          args={[1.68, 0.008, 16, 180]}
          rotation={[0.4, Math.PI / 3, 0.8]}
        >
          <meshStandardMaterial
            color="#d4af37"
            metalness={0.85}
            roughness={0.2}
          />
        </Torus>

        <Torus
          args={[1.9, 0.006, 16, 180]}
          rotation={[1.1, 0.2, Math.PI / 3]}
        >
          <meshStandardMaterial
            color="#0a1a2f"
            metalness={0.75}
            roughness={0.25}
          />
        </Torus>
      </Float>
    </group>
  );
}

function ThreeHero() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{
          position: [0, 0, 5.7],
          fov: 36,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={1.7} />

        <directionalLight
          position={[4, 5, 5]}
          intensity={2.8}
          color="#fff8df"
        />

        <pointLight
          position={[-4, -2, 2]}
          intensity={15}
          distance={8}
          color="#355c8a"
        />

        <pointLight
          position={[4, 2, 2]}
          intensity={12}
          distance={7}
          color="#d4af37"
        />

        <DigitalCore />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 2.3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}

/* ============================================================
   INTERACTIVE BACKGROUND
============================================================ */

function InteractiveSurface({
  children,
}: {
  children: React.ReactNode;
}) {
  const x = useMotionValue(50);
  const y = useMotionValue(50);

  const smoothX = useSpring(x, {
    stiffness: 80,
    damping: 20,
  });

  const smoothY = useSpring(y, {
    stiffness: 80,
    damping: 20,
  });

  const background = useTransform(
    [smoothX, smoothY],
    ([latestX, latestY]) =>
      `radial-gradient(circle at ${latestX}% ${latestY}%, rgba(212,175,55,0.12), transparent 28%)`,
  );

  return (
    <div
      className="relative overflow-hidden"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();

        x.set(((event.clientX - rect.left) / rect.width) * 100);
        y.set(((event.clientY - rect.top) / rect.height) * 100);
      }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background }}
      />

      {children}
    </div>
  );
}

/* ============================================================
   HERO
============================================================ */

function HeroSection({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <section className="relative min-h-[calc(100svh-88px)] overflow-hidden bg-[#faf9f6]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_78%_40%,rgba(212,175,55,0.12),transparent_25%),radial-gradient(circle_at_15%_80%,rgba(53,92,138,0.07),transparent_28%),linear-gradient(180deg,#ffffff,#faf9f6)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,26,47,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(10,26,47,0.035) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(circle at 72% 50%, black, transparent 64%)",
          WebkitMaskImage:
            "radial-gradient(circle at 72% 50%, black, transparent 64%)",
        }}
      />

      <InteractiveSurface>
        <div className="relative mx-auto grid min-h-[calc(100svh-88px)] max-w-[1450px] items-center px-6 py-16 sm:px-10 lg:grid-cols-[1fr_0.82fr] lg:gap-8 lg:px-16 lg:py-20 xl:px-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="relative z-20 max-w-2xl"
          >
            <motion.div variants={fadeUpVariants}>
              <SectionLabel>Vishweshwar Industries</SectionLabel>
            </motion.div>

            <motion.h1
              variants={fadeUpVariants}
              className="text-[clamp(3.3rem,6.6vw,7rem)] font-medium leading-[0.88] tracking-[-0.07em]"
            >
              Built from
              <span className="block bg-gradient-to-r from-[#0a1a2f] via-[#355c8a] to-[#9b7b18] bg-clip-text text-transparent">
                experience.
              </span>

              <span className="block">Driven by ideas.</span>
            </motion.h1>

            <motion.p
              variants={fadeUpVariants}
              className="mt-8 max-w-xl text-base leading-8 text-[#0a1a2f]/60 sm:text-lg"
            >
              Founded in 2023 by{" "}
              <strong className="font-medium text-[#0a1a2f]">
                Ami Mishra
              </strong>
              , Vishweshwar Industries brings more than a decade of hands-on
              experience into a modern digital company built around technology,
              creativity and business growth.
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                href="#our-story"
                className="group inline-flex items-center gap-3 rounded-full bg-[#0a1a2f] px-6 py-3.5 text-sm font-medium text-white shadow-[0_18px_50px_rgba(10,26,47,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#142c49]"
              >
                Discover Our Story
                <ArrowDown
                  size={16}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </Link>

              <Link
                href="/contact-us"
                className="group inline-flex items-center gap-3 rounded-full border border-[#0a1a2f]/15 bg-white/60 px-6 py-3.5 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:border-[#d4af37]/60 hover:bg-white"
              >
                Work With Us
                <ArrowUpRight
                  size={16}
                  className="text-[#9b7b18] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="mt-11 flex items-center gap-4"
            >
              <div className="h-px w-14 bg-[#d4af37]" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#0a1a2f]/35">
                Technology · Design · Growth
              </span>
            </motion.div>
          </motion.div>

          {/* Smaller, contained 3D visual */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.88,
              x: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            transition={{
              duration: reducedMotion ? 0 : 1.2,
              ease: "easeOut",
            }}
            className="relative mx-auto mt-4 h-[390px] w-full max-w-[520px] sm:h-[470px] lg:mt-0 lg:h-[540px] lg:max-w-[540px] xl:h-[570px]"
          >
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/10 blur-[80px]"
            />

            <ThreeHero />

            <div className="pointer-events-none absolute left-[7%] top-[21%] hidden rounded-full border border-white/70 bg-white/65 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0a1a2f]/60 shadow-[0_20px_50px_rgba(10,26,47,0.06)] backdrop-blur-xl sm:block">
              Ideas
            </div>

            <div className="pointer-events-none absolute right-[5%] top-[17%] hidden rounded-full border border-white/70 bg-white/65 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0a1a2f]/60 shadow-[0_20px_50px_rgba(10,26,47,0.06)] backdrop-blur-xl sm:block">
              Experience
            </div>

            <div className="pointer-events-none absolute bottom-[18%] left-[9%] hidden rounded-full border border-white/70 bg-white/65 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0a1a2f]/60 shadow-[0_20px_50px_rgba(10,26,47,0.06)] backdrop-blur-xl sm:block">
              Strategy
            </div>

            <div className="pointer-events-none absolute bottom-[16%] right-[6%] hidden rounded-full border border-white/70 bg-white/65 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0a1a2f]/60 shadow-[0_20px_50px_rgba(10,26,47,0.06)] backdrop-blur-xl sm:block">
              Growth
            </div>
          </motion.div>
        </div>
      </InteractiveSurface>
    </section>
  );
}

/* ============================================================
   STORY
============================================================ */

function FounderStory() {
  return (
    <section
      id="our-story"
      className="relative overflow-hidden bg-white px-6 py-28 sm:px-10 lg:px-16 lg:py-36 xl:px-20"
    >
      <div
        aria-hidden="true"
        className="absolute -right-40 top-20 h-[540px] w-[540px] rounded-full border border-[#d4af37]/10"
      />

      <div
        aria-hidden="true"
        className="absolute right-0 top-40 h-[320px] w-[320px] rounded-full border border-[#355c8a]/8"
      />

      <div className="relative mx-auto max-w-[1250px]">
        <div className="grid gap-16 lg:grid-cols-[0.72fr_1.28fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUpVariants}
          >
            <SectionLabel>Our Story</SectionLabel>

            <h2 className="max-w-lg text-5xl font-medium leading-[0.96] tracking-[-0.055em] sm:text-6xl">
              More than a decade
              <span className="block text-[#9b7b18]">
                in the making.
              </span>
            </h2>

            <p className="mt-8 max-w-md text-base leading-8 text-[#0a1a2f]/55">
              Vishweshwar Industries did not begin with a business plan. It
              began with years of curiosity, problem solving and an obsession
              with understanding how digital products could work better.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/35 bg-[#fffaf0] text-[#9b7b18]">
                <BriefcaseBusiness size={19} strokeWidth={1.5} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#0a1a2f]">
                  Founded by Ami Mishra
                </p>

                <p className="mt-1 text-xs text-[#0a1a2f]/40">
                  Vishweshwar Industries · 2023
                </p>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[22px] top-7 bottom-7 w-px bg-gradient-to-b from-[#d4af37] via-[#0a1a2f]/10 to-transparent" />

            <div className="space-y-3">
              {storyItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.number}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    variants={fadeUpVariants}
                    transition={{
                      delay: index * 0.06,
                    }}
                    className="group relative pl-14"
                  >
                    <div className="absolute left-0 top-7 flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[#d4af37]/35 bg-white shadow-[0_8px_30px_rgba(10,26,47,0.07)]">
                      <Icon
                        size={17}
                        strokeWidth={1.5}
                        className="text-[#9b7b18] transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="rounded-[28px] border border-[#0a1a2f]/7 bg-[#faf9f6] p-7 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#d4af37]/30 group-hover:bg-[#fffdf8] group-hover:shadow-[0_25px_70px_rgba(10,26,47,0.07)] sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="text-[10px] font-semibold tracking-[0.24em] text-[#9b7b18]">
                          {item.era}
                        </span>

                        <span className="font-mono text-[10px] tracking-[0.2em] text-[#0a1a2f]/25">
                          {item.number}
                        </span>
                      </div>

                      <h3 className="mt-4 text-2xl font-medium tracking-[-0.035em] text-[#0a1a2f]">
                        {item.title}
                      </h3>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#0a1a2f]/53">
                        {item.description}
                      </p>
                    </div>
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
   VISION / MISSION
============================================================ */

function VisionMission() {
  return (
    <section className="relative overflow-hidden bg-[#f2f4f5] px-6 py-28 sm:px-10 lg:px-16 lg:py-36 xl:px-20">
      <div
        aria-hidden="true"
        className="absolute right-[-120px] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-[#d4af37]/10"
      />

      <div className="relative mx-auto max-w-[1250px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUpVariants}
          className="mb-16 max-w-2xl"
        >
          <SectionLabel>Direction</SectionLabel>

          <h2 className="text-5xl font-medium leading-[0.97] tracking-[-0.055em] sm:text-6xl">
            Where experience
            <span className="text-[#9b7b18]"> takes us next.</span>
          </h2>
        </motion.div>

        <div className="grid gap-px overflow-hidden border border-[#0a1a2f]/10 bg-[#0a1a2f]/10 md:grid-cols-2">
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUpVariants}
            className="relative min-h-[430px] overflow-hidden bg-[#faf9f6] p-9 sm:p-14"
          >
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/30 bg-white text-[#9b7b18]">
                  <Target size={19} strokeWidth={1.5} />
                </span>

                <span className="font-mono text-[10px] tracking-[0.22em] text-[#0a1a2f]/25">
                  01 / VISION
                </span>
              </div>

              <div>
                <h3 className="max-w-xl text-4xl font-medium leading-[1.02] tracking-[-0.045em]">
                  To become the digital partner businesses can grow with.
                </h3>

                <p className="mt-6 max-w-lg text-sm leading-7 text-[#0a1a2f]/50">
                  We want to build relationships that last beyond a single
                  project — becoming a trusted part of our clients&apos;
                  digital journey.
                </p>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full border border-[#d4af37]/20"
            />

            <Gem
              aria-hidden="true"
              size={110}
              strokeWidth={0.45}
              className="absolute bottom-8 right-8 rotate-12 text-[#d4af37]/10"
            />
          </motion.article>

          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUpVariants}
            className="relative min-h-[430px] overflow-hidden bg-[#0a1a2f] p-9 text-white sm:p-14"
          >
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/35 bg-white/5 text-[#f5d78e]">
                  <Rocket size={19} strokeWidth={1.5} />
                </span>

                <span className="font-mono text-[10px] tracking-[0.22em] text-white/25">
                  02 / MISSION
                </span>
              </div>

              <div>
                <h3 className="max-w-xl text-4xl font-medium leading-[1.02] tracking-[-0.045em]">
                  To turn ideas into digital experiences that create real
                  value.
                </h3>

                <p className="mt-6 max-w-lg text-sm leading-7 text-white/45">
                  We combine thoughtful strategy, purposeful design and
                  dependable engineering to help businesses solve problems,
                  create opportunities and move forward.
                </p>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#d4af37]/10 blur-3xl"
            />

            <ShieldCheck
              aria-hidden="true"
              size={130}
              strokeWidth={0.35}
              className="absolute bottom-5 right-6 text-white/[0.035]"
            />
          </motion.article>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ECOSYSTEM
============================================================ */

function EcosystemSection() {
  return (
    <section className="relative bg-[#faf9f6] px-6 py-28 sm:px-10 lg:px-16 lg:py-36 xl:px-20">
      <div className="mx-auto max-w-[1250px]">
        <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUpVariants}
          >
            <SectionLabel>What We Bring Together</SectionLabel>

            <h2 className="max-w-lg text-5xl font-medium leading-[0.97] tracking-[-0.055em] sm:text-6xl">
              Different strengths.
              <span className="block text-[#9b7b18]">
                One direction.
              </span>
            </h2>

            <p className="mt-8 max-w-md text-base leading-8 text-[#0a1a2f]/52">
              Years of working across different kinds of projects taught us
              that great digital work rarely comes from one discipline alone.
            </p>
          </motion.div>

          <div>
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;

              return (
                <motion.div
                  key={capability.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  variants={fadeUpVariants}
                  transition={{
                    delay: index * 0.08,
                  }}
                  className="group grid gap-5 border-t border-[#0a1a2f]/10 py-8 sm:grid-cols-[64px_190px_1fr] sm:items-center sm:gap-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/25 bg-white text-[#9b7b18] transition-all duration-500 group-hover:rotate-6 group-hover:border-[#d4af37]/60 group-hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)]">
                    <Icon size={19} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-medium tracking-[-0.02em]">
                    {capability.title}
                  </h3>

                  <p className="max-w-xl text-sm leading-7 text-[#0a1a2f]/50">
                    {capability.description}
                  </p>
                </motion.div>
              );
            })}

            <div className="border-t border-[#0a1a2f]/10" />
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
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(212,175,55,0.15),transparent_28%),radial-gradient(circle_at_15%_80%,rgba(53,92,138,0.16),transparent_30%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "78px 78px",
        }}
      />

      <div className="relative mx-auto max-w-[1250px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUpVariants}
          className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div>
            <SectionLabel dark>Built Over Time</SectionLabel>

            <h2 className="max-w-3xl text-5xl font-medium leading-[0.97] tracking-[-0.055em] sm:text-6xl">
              Experience gives
              <span className="text-[#f5d78e]"> perspective.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-white/40">
            Years of learning, building and adapting have shaped how we think
            about digital work today.
          </p>
        </motion.div>

        <div className="grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <motion.div
                key={metric.label}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUpVariants}
                transition={{
                  delay: index * 0.08,
                }}
                className="group border-b border-white/10 px-1 py-10 sm:border-r sm:px-7 lg:border-b-0 lg:px-8 first:lg:pl-0 last:lg:border-r-0"
              >
                <div className="mb-7 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#f5d78e] transition-transform duration-500 group-hover:rotate-6">
                    <Icon size={16} strokeWidth={1.5} />
                  </span>

                  <span className="font-mono text-[9px] tracking-[0.2em] text-white/20">
                    0{index + 1}
                  </span>
                </div>

                <p className="text-[clamp(3.5rem,5vw,5.5rem)] font-medium leading-none tracking-[-0.065em]">
                  {metric.value}
                </p>

                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f5d78e]">
                  {metric.label}
                </p>

                <p className="mt-2 text-sm text-white/35">
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
   CTA
============================================================ */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#f1f3f3] px-6 py-28 sm:px-10 lg:px-16 lg:py-40 xl:px-20">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af37]/10"
      />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#355c8a]/10"
      />

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/10 blur-3xl"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.3,
        }}
        variants={heroVariants}
        className="relative mx-auto max-w-[950px] text-center"
      >
        <motion.div variants={fadeUpVariants}>
          <SectionLabel>What Comes Next</SectionLabel>
        </motion.div>

        <motion.h2
          variants={fadeUpVariants}
          className="text-[clamp(3.3rem,7vw,7rem)] font-medium leading-[0.9] tracking-[-0.07em]"
        >
          The next chapter
          <span className="block text-[#9b7b18]">could be yours.</span>
        </motion.h2>

        <motion.p
          variants={fadeUpVariants}
          className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#0a1a2f]/50 sm:text-lg"
        >
          Tell us what you are building, what you want to improve or simply
          where you think technology could take your business.
        </motion.p>

        <motion.div
          variants={fadeUpVariants}
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
            <MoveUpRight
              size={17}
              strokeWidth={1.5}
              className="text-[#9b7b18] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <main className="overflow-hidden bg-[#faf9f6] text-[#0a1a2f]">
      <HeroSection reducedMotion={reducedMotion} />

      <FounderStory />

      <VisionMission />

      <EcosystemSection />

      <NumbersSection />

      <FinalCTA />
    </main>
  );
}