"use client";

import { useState, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, User, Phone, MessageSquare, Sparkles } from "lucide-react";
import FancyButton from "./FancyButton";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactSection(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState("");

  // 🔥 VALIDATION
  const validateField = (name: keyof FormData, value: string) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Please enter your name";

      case "email":
        if (!value.trim()) return "Email required";
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
          ? ""
          : "Enter a valid email";

      case "phone":
        if (!value.trim()) return "Phone number required";
        if (value.length < 10) return "Enter valid phone number";
        return "";

      case "message":
        return value.trim()
          ? ""
          : "Please write a message (Describe your idea/ share any websites)";

      default:
        return "";
    }
  };

  const validateAll = () => {
    const newErrors: Errors = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    return newErrors;
  };

  // 🔥 HANDLE CHANGE (LIVE VALIDATION)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    let { value } = e.target;

    // ✅ phone: only numbers
    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ✅ live validation
    const errorMsg = validateField(name as keyof FormData, value);

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg || undefined,
    }));

    setSuccess("");
  };

  // 🔥 SUBMIT
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateAll();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccess("Your message has been sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <section
      suppressHydrationWarning
      className="relative w-full py-28 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-stretch">
        {/* LEFT STORY PANEL (UNCHANGED) */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-blue-950  p-12 flex flex-col justify-center"
        >
          <div className="absolute -top-10 -left-10 w-96 h-96 bg-amber-400/20 blur-[160px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 blur-[160px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:28px_28px]" />

          <div className="relative z-10 max-w-lg">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="text-amber-400" size={20} />
              <span className="text-amber-300 text-sm font-medium tracking-wide">
                Let’s Build Something Amazing
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight tracking-tight">
              Have an idea, project or question?
            </h2>

            <p className="text-blue-200/80 mt-6 leading-relaxed text-sm md:text-base">
              Whether you&apos;re planning a new digital platform, improving
              your online presence, or launching a mobile application, our team
              is ready to help transform your vision into something exceptional.
            </p>

            <p className="text-blue-200/80 mt-4 leading-relaxed text-sm md:text-base">
              Great partnerships begin with a simple conversation. Tell us about
              your idea and we’ll help you shape it into a powerful digital
              experience.
            </p>

            <div className="mt-8 space-y-3 text-sm text-blue-200">
              <p>✔ Free consultation for your project</p>
              <p>✔ Transparent communication</p>
              <p>✔ Long-term scalable solutions</p>
            </div>
          </div>
        </motion.div>

        {/* FORM PANEL */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.15)] p-8 md:p-10"
        >
          {/* NAME */}
          <div className="mb-6">
            <label className="text-sm font-medium text-blue-900 flex items-center gap-2 mb-2">
              <User size={16} /> Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-blue-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* EMAIL */}
          <div className="mb-6">
            <label className="text-sm font-medium text-blue-900 flex items-center gap-2 mb-2">
              <Mail size={16} /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-blue-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* PHONE */}
          <div className="mb-6">
            <label className="text-sm font-medium text-blue-900 flex items-center gap-2 mb-2">
              <Phone size={16} /> Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-blue-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
            />
            <AnimatePresence>
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.phone}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* MESSAGE */}
          <div className="mb-8">
            <label className="text-sm font-medium text-blue-900 flex items-center gap-2 mb-2">
              <MessageSquare size={16} /> Message
            </label>
            <textarea
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-blue-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
            />
            <AnimatePresence>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* 🔥 FORCE SUBMIT (critical fix) */}
          <button type="submit" className="w-full">
            <FancyButton
              className="w-full py-3 rounded-xl font-medium shadow-lg hover:scale-[1.02] transition"
              text="Send Message"
            />
          </button>

          <AnimatePresence>
            {success && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 text-sm text-center mt-4"
              >
                {success}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}
