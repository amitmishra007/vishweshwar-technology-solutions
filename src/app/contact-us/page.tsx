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

  // 🔥 FIELD VALIDATOR
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

    // 🔥 HARD SANITIZATION
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
      <section className="relative w-full min-h-screen bg-gradient-to-b from-white via-blue-50 to-white pt-44 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/30 blur-[140px] rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 flex flex-col gap-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* LEFT SAME */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative flex flex-col gap-6 pt-8 p-8 rounded-3xl overflow-hidden text-white"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-950 opacity-95 -z-10" />
              <div className="absolute -top-10 -left-10 w-96 h-96 bg-amber-400/20 blur-[160px] rounded-full -z-10" />
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 blur-[160px] rounded-full -z-10" />

              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-amber-400" size={18} />
                <span className="text-amber-300 text-sm tracking-wide">
                  Let’s Build Something Amazing
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                Get in Touch
              </h1>
            </motion.div>

            {/* FORM */}
            <motion.form
              onSubmit={handleSubmit}
              className="relative backdrop-blur-2xl bg-white/60 border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.25)] rounded-3xl p-8 grid gap-4"
            >
              <h2 className="text-2xl font-semibold text-blue-950 mb-6">
                Send a Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputCard
                  {...{
                    name: "firstName",
                    placeholder: "First Name",
                    icon: <User size={20} />,
                    value: formData.firstName,
                    onChange: handleChange,
                    error: touched.firstName ? errors.firstName : "",
                  }}
                />
                <InputCard
                  {...{
                    name: "lastName",
                    placeholder: "Last Name",
                    icon: <User size={20} />,
                    value: formData.lastName,
                    onChange: handleChange,
                    error: touched.lastName ? errors.lastName : "",
                  }}
                />
              </div>

              <InputCard
                {...{
                  name: "email",
                  placeholder: "Email",
                  icon: <Mail size={20} />,
                  value: formData.email,
                  onChange: handleChange,
                  error: touched.email ? errors.email : "",
                }}
              />
              <InputCard
                {...{
                  name: "phone",
                  placeholder: "Phone Number",
                  icon: <Phone size={20} />,
                  value: formData.phone,
                  onChange: handleChange,
                  error: touched.phone ? errors.phone : "",
                }}
              />

              <TextareaCard
                {...{
                  name: "message",
                  placeholder: "Your Message",
                  value: formData.message,
                  onChange: handleChange,
                  error: touched.message ? errors.message : "",
                }}
              />

              <button
                disabled={isSubmitting}
                className="relative w-full py-3 mt-4 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-900 via-amber-700 to-yellow-500"
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
          error ? "border-red-400 shadow-red-300/40" : "border-white/20"
        } backdrop-blur-lg rounded-xl px-4 py-3 transition`}
      >
        {icon}
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="off"
          className="w-full bg-transparent outline-none text-blue-950 placeholder-blue-600"
        />
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
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
    <div className="relative mt-2">
      <motion.textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        animate={error ? { x: [-4, 4, -4, 0] } : { x: 0 }}
        className={`w-full bg-white/40 border ${
          error ? "border-red-400" : "border-white/20"
        } backdrop-blur-lg rounded-xl px-4 py-3 outline-none h-32`}
      />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-xs text-red-500 mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
