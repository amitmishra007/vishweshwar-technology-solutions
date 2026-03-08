"use client";

import { JSX, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import {
  Mail,
  Phone,
  User,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const temp: Partial<FormData> = {};
    if (!formData.firstName.trim()) temp.firstName = "First name is required";
    if (!formData.lastName.trim()) temp.lastName = "Last name is required";
    if (!formData.email.trim()) temp.email = "Email is required";
    if (!formData.phone.trim()) temp.phone = "Phone number is required";
    if (!formData.message.trim()) temp.message = "Message cannot be empty";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 800));
    setIsSubmitting(false);
    router.push("/thank-you");
  };

  return (
    <>
      <Navbar />
      <section className="relative w-full min-h-screen bg-gradient-to-b from-white via-blue-50 to-white pt-36 pb-20 overflow-hidden">
        {/* Decorative Glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/30 blur-[140px] rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 flex flex-col gap-16">
          {/* ---------------- GRID SECTION ---------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* ---------------- LEFT CONTACT INFO ---------------- */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col gap-6 pt-3.5"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 bg-gradient-to-r from-blue-900 via-amber-700 to-yellow-500 bg-clip-text ">
                Get in Touch
              </h1>
              <p className="text-blue-900/80 text-lg max-w-md leading-relaxed">
                Need help with a project? Want to craft something extraordinary?
                Let’s talk and make it happen.
              </p>

              {/* Contact Cards */}
              <div className="flex flex-col gap-4 mt-6">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-4 p-4 rounded-2xl backdrop-blur-md bg-white/60 border border-white/30 shadow-lg transition-all"
                >
                  <Mail className="text-blue-900" size={24} />
                  <span className="text-blue-950 font-medium">
                    info@yourcompany.com
                  </span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-4 p-4 rounded-2xl backdrop-blur-md bg-white/60 border border-white/30 shadow-lg transition-all"
                >
                  <Phone className="text-blue-900" size={24} />
                  <span className="text-blue-950 font-medium">
                    +91 98765 43210
                  </span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-4 p-4 rounded-2xl backdrop-blur-md bg-white/60 border border-white/30 shadow-lg transition-all"
                >
                  <MapPin className="text-blue-900" size={24} />
                  <span className="text-blue-950 font-medium">
                    We reply within 2–6 hours on business days.
                  </span>
                </motion.div>

                {/* Social Icons */}
                <div className="flex items-center gap-4 mt-4">
                  <a
                    href="#"
                    className="text-blue-900 hover:text-amber-600 transition-colors"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-blue-900 hover:text-amber-600 transition-colors"
                  >
                    <Twitter size={24} />
                  </a>
                  <a
                    href="#"
                    className="text-blue-900 hover:text-amber-600 transition-colors"
                  >
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* ---------------- RIGHT FORM ---------------- */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="backdrop-blur-xl bg-white/60 border border-white/30 shadow-2xl rounded-3xl p-8 relative overflow-hidden grid gap-4"
            >
              <h2 className="text-2xl font-semibold text-blue-950 mb-6">
                Send a Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputCard
                  name="firstName"
                  placeholder="First Name"
                  icon={<User className="text-blue-900" size={20} />}
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                />
                <InputCard
                  name="lastName"
                  placeholder="Last Name"
                  icon={<User className="text-blue-900" size={20} />}
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                />
              </div>

              <InputCard
                name="email"
                placeholder="Email"
                icon={<Mail className="text-blue-900" size={20} />}
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <InputCard
                name="phone"
                placeholder="Phone Number"
                icon={<Phone className="text-blue-900" size={20} />}
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />

              <TextareaCard
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
              />

              <button
                disabled={isSubmitting}
                className="w-full py-3 mt-4 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-900 via-amber-700 to-yellow-500 hover:opacity-90 transition-all shadow-lg"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </motion.form>
          </div>

          {/* ---------- MAP BELOW ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-16 w-full h-[280px] md:h-[320px] rounded-3xl overflow-hidden border border-blue-200 shadow-xl"
          >
            <iframe
              className="w-full h-full"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3516.5449093053794!2d76.80970407916509!3d28.190752641909008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDExJzI2LjciTiA3NsKwNDgnNTIuNSJF!5e0!3m2!1sen!2sin!4v1772390982236!5m2!1sen!2sin"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ----------------- INPUT CARD ----------------- */
interface InputCardProps {
  name: string;
  placeholder: string;
  icon: JSX.Element;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
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
      <div className="flex items-center gap-2 bg-white/50 border border-blue-100 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-amber-500/40 transition-all">
        {icon}
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-blue-950 placeholder-blue-600"
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-red-500 mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

/* ----------------- TEXTAREA CARD ----------------- */
interface TextareaCardProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}
function TextareaCard({
  name,
  placeholder,
  value,
  onChange,
  error,
}: TextareaCardProps) {
  return (
    <div className="relative mt-2">
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-white/50 border border-blue-100 rounded-xl px-4 py-3 outline-none placeholder-blue-600 resize-none h-32 focus:ring-2 focus:ring-amber-500/40 transition-all"
      />
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-red-500 mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
