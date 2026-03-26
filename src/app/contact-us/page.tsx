"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { Mail, Phone, User, Sparkles } from "lucide-react";
import { Footer } from "../components/Footer";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

type InputCardProps = {
  name: keyof FormData;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

type TextareaCardProps = {
  name: keyof FormData;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
};

export default function ContactPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: keyof FormData, value: string) => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) return "This field is required";
        if (!/^[A-Za-z\s]{2,30}$/.test(value))
          return "Only alphabets (2–30 chars)";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
          return "Enter a valid email address";
        return "";

      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!/^[6-9]\d{9}$/.test(value))
          return "Enter valid 10-digit Indian number";
        return "";

      case "message":
        if (!value.trim()) return "Message cannot be empty";
        if (value.length < 10) return "Message must be at least 10 characters";
        return "";

      default:
        return "";
    }
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name as keyof FormData;
    let value = e.target.value;

    if (name === "firstName" || name === "lastName") {
      value = value.replace(/[^a-zA-Z\s]/g, "");
    }

    if (name === "phone") {
      value = value.replace(/[^0-9]/g, "").slice(0, 10);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error || undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched: Partial<Record<keyof FormData, boolean>> = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach(
      (k) => (allTouched[k] = true),
    );
    setTouched(allTouched);

    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 800));
    setIsSubmitting(false);
    router.push("/thank-you");
  };

  return (
    <>
      <Navbar />

      <section className="relative w-full min-h-screen pt-40 pb-24 overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white">
        {/* BACKGROUND FX */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-200/30 blur-[180px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-200/30 blur-[180px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center items-center gap-2 mb-4">
              <Sparkles className="text-amber-500" size={18} />
              <span className="text-amber-500 text-sm tracking-wider">
                CONTACT US
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-blue-950">
              Let’s Build Something Great
            </h1>

            <p className="text-blue-700/70 mt-4 max-w-xl mx-auto">
              We’d love to hear about your project. Fill out the form and we’ll
              get back to you.
            </p>
          </motion.div>

          {/* MAIN GRID */}
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* LEFT PANEL (UPGRADED) */}
            {/* LEFT PANEL — GOD+++ MODE */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              className="relative rounded-3xl overflow-hidden p-10 text-white flex flex-col justify-between min-h-[520px]"
            >
              {/* 🔥 CINEMATIC BACKGROUND */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-950" />

              {/* GLOW FX */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-amber-400/20 blur-[160px] rounded-full"
              />
              <motion.div
                animate={{ scale: [1.1, 1, 1.1] }}
                transition={{ duration: 12, repeat: Infinity }}
                className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/20 blur-[160px] rounded-full"
              />

              {/* GRID OVERLAY */}
              <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />

              {/* CONTENT */}
              <div className="relative z-10 flex flex-col gap-6">
                {/* TAG */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 text-amber-400 text-sm tracking-widest"
                >
                  ✦ CREATIVE DIGITAL STUDIO
                </motion.div>

                {/* HEADLINE */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold leading-tight"
                >
                  Let’s Build <br />
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-300 text-transparent bg-clip-text">
                    Something Exceptional
                  </span>
                </motion.h2>

                {/* DESCRIPTION */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-white/70 leading-relaxed text-sm md:text-base max-w-md"
                >
                  &quot; We are a digital creative studio specializing in web,
                  mobile, and application development, alongside branding and
                  design. Our work is focused on empowering organizations in the
                  arts, culture, entertainment, and nonprofit sectors through
                  impactful, high-quality digital experiences.&quot;
                </motion.p>

                {/* CONTACT CARDS */}
                <div className="flex flex-col gap-4 pt-6">
                  {/* EMAIL */}
                  <motion.a
                    href="mailto:hello@yourdomain.com"
                    whileHover={{ scale: 1.04 }}
                    className="group flex items-center justify-between bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl px-4 py-3 transition hover:border-amber-400/40"
                  >
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-amber-400" />
                      <span className="text-white/80 text-sm">
                        hello@yourdomain.com
                      </span>
                    </div>
                    <span className="text-xs text-white/40 group-hover:text-amber-400 transition">
                      EMAIL
                    </span>
                  </motion.a>

                  {/* PHONE */}
                  <motion.a
                    href="tel:+919876543210"
                    whileHover={{ scale: 1.04 }}
                    className="group flex items-center justify-between bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl px-4 py-3 transition hover:border-amber-400/40"
                  >
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-amber-400" />
                      <span className="text-white/80 text-sm">
                        +91 98765 43210
                      </span>
                    </div>
                    <span className="text-xs text-white/40 group-hover:text-amber-400 transition">
                      CALL
                    </span>
                  </motion.a>
                </div>
              </div>

              {/* FOOTER */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="relative z-10 text-xs text-white/40 mt-10"
              >
                © {new Date().getFullYear()} Your Company. Crafted with
                precision.
              </motion.div>
            </motion.div>

            {/* FORM PANEL */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative backdrop-blur-2xl bg-white/70 border border-white/30 shadow-[0_30px_100px_rgba(0,0,0,0.2)] rounded-3xl p-8 md:p-10 grid gap-5"
            >
              <h2 className="text-2xl font-semibold text-blue-950 mb-4">
                Send Message
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <InputCard
                  name="firstName"
                  placeholder="First Name"
                  icon={<User size={18} />}
                  value={formData.firstName}
                  onChange={handleChange}
                  error={touched.firstName ? errors.firstName : ""}
                />
                <InputCard
                  name="lastName"
                  placeholder="Last Name"
                  icon={<User size={18} />}
                  value={formData.lastName}
                  onChange={handleChange}
                  error={touched.lastName ? errors.lastName : ""}
                />
              </div>

              <InputCard
                name="email"
                placeholder="Email"
                icon={<Mail size={18} />}
                value={formData.email}
                onChange={handleChange}
                error={touched.email ? errors.email : ""}
              />

              <InputCard
                name="phone"
                placeholder="Phone Number"
                icon={<Phone size={18} />}
                value={formData.phone}
                onChange={handleChange}
                error={touched.phone ? errors.phone : ""}
              />

              <TextareaCard
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                error={touched.message ? errors.message : ""}
              />

              <button
                disabled={isSubmitting}
                className="relative w-full py-3 mt-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-900 via-amber-700 to-yellow-500 hover:scale-[1.02] transition"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* INPUT */
function InputCard({
  name,
  placeholder,
  icon,
  value,
  onChange,
  error,
}: InputCardProps) {
  return (
    <div className="relative">
      <motion.div
        animate={error ? { x: [-4, 4, -4, 0] } : { x: 0 }}
        className={`flex items-center gap-2 bg-white/40 border ${
          error ? "border-red-400" : "border-white/20"
        } backdrop-blur-lg rounded-xl px-4 py-3`}
      >
        {icon}
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-blue-950 placeholder-blue-600"
        />
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-red-500 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* TEXTAREA */
function TextareaCard({
  name,
  placeholder,
  value,
  onChange,
  error,
}: TextareaCardProps) {
  return (
    <div className="relative">
      <motion.textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        animate={error ? { x: [-4, 4, -4, 0] } : { x: 0 }}
        className={`w-full bg-white/40 border ${
          error ? "border-red-400" : "border-white/20"
        } backdrop-blur-lg rounded-xl px-4 py-3 h-32 outline-none`}
      />

      <AnimatePresence>
        {error && (
          <motion.p className="text-xs text-red-500 mt-1">{error}</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
