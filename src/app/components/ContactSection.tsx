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

  const validate = () => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) newErrors.name = "Please enter your name";

    if (!formData.email.trim()) {
      newErrors.email = "Email required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.phone.trim()) newErrors.phone = "Phone number required";
    if (!formData.message.trim()) newErrors.message = "Please write a message";

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
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
        {/* LEFT STORY PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-black p-12 flex flex-col justify-center"
        >
          {/* cinematic glow */}
          <div className="absolute -top-10 -left-10 w-96 h-96 bg-amber-400/20 blur-[160px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 blur-[160px] rounded-full" />

          {/* subtle pattern */}
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

            {/* highlights */}
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
          {/* name */}
          <div className="mb-6">
            <label className="text-sm font-medium text-blue-900 flex items-center gap-2 mb-2">
              <User size={16} /> Name
            </label>

            <input
              suppressHydrationWarning
              autoComplete="name"
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

          {/* email */}
          <div className="mb-6">
            <label className="text-sm font-medium text-blue-900 flex items-center gap-2 mb-2">
              <Mail size={16} /> Email
            </label>

            <input
              suppressHydrationWarning
              autoComplete="email"
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

          {/* phone */}
          <div className="mb-6">
            <label className="text-sm font-medium text-blue-900 flex items-center gap-2 mb-2">
              <Phone size={16} /> Phone
            </label>

            <input
              suppressHydrationWarning
              autoComplete="tel"
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

          {/* message */}
          <div className="mb-8">
            <label className="text-sm font-medium text-blue-900 flex items-center gap-2 mb-2">
              <MessageSquare size={16} /> Message
            </label>

            <textarea
              suppressHydrationWarning
              autoComplete="off"
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

          <FancyButton
            className="w-full py-3 rounded-xl font-medium shadow-lg hover:scale-[1.02] transition"
            text="Send Message"
          />

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
