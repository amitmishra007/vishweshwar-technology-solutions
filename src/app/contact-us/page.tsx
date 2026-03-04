"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import FloatingShapes from "../components/FloatingShapes";
import Navbar from "../components/Navbar";

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

  /* ------------------- HANDLE CHANGE ------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ---------------------- VALIDATE ---------------------- */
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

  /* ---------------------- SUBMIT ---------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 800)); // fake request
    setIsSubmitting(false);

    router.push("/thank-you");
  };

  return (
    <>
      <Navbar />{" "}
      <section className="relative min-h-screen w-full bg-gradient-to-b from-white to-blue-50 pt-44 pb-20 overflow-hidden">
        {/* Floating Shapes */}
        <div className="absolute inset-0 z-0 opacity-70">
          <FloatingShapes />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* ---------------- LEFT SIDE ---------------- */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6"
            >
              <h1 className="text-3xl font-bold text-blue-950">Contact Us</h1>
              <p className="text-blue-900/70 max-w-md">
                Need help with an app? Want to build something amazing? We’d
                love to talk.
              </p>

              <div className="flex flex-col gap-4 mt-4">
                <p className="text-blue-950 font-semibold">
                  📧 info@yourcompany.com
                </p>
                <p className="text-blue-950 font-semibold">
                  📞 +91 98765 43210
                </p>
                <p className="text-blue-900/70 max-w-sm">
                  We reply within 2–6 hours on business days.
                </p>
              </div>
            </motion.div>

            {/* ---------------- RIGHT FORM ---------------- */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="
              backdrop-blur-xl bg-white/60 
              border border-white/30
              shadow-xl rounded-3xl p-8
              relative overflow-hidden"
              style={{
                borderImage:
                  "linear-gradient(135deg, #1e2a78, #d4af37, #ffecb3) 1",
              }}
            >
              <h2 className="text-xl font-semibold text-blue-950 mb-6">
                We’d love to hear from you!
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <input
                    name="firstName"
                    placeholder="First Name"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-blue-100 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none transition-all"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.firstName}
                    </motion.p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <input
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-blue-100 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none transition-all"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.lastName}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mt-4">
                <input
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-blue-100 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none transition-all"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-red-500 mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Phone */}
              <div className="mt-4">
                <input
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-blue-100 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none transition-all"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-red-500 mt-1"
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </div>

              {/* Message */}
              <div className="mt-4">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-blue-100 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 outline-none transition-all h-32 resize-none"
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-red-500 mt-1"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </div>

              {/* Button */}
              <button
                disabled={isSubmitting}
                className="
                w-full mt-6 py-3 rounded-xl text-white font-semibold 
                bg-gradient-to-r from-blue-900 via-amber-700 to-yellow-500
                hover:opacity-90 transition-all"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </motion.form>
          </div>

          {/* MAP SECTION */}
          <div className="mt-16 w-full h-[380px] rounded-3xl overflow-hidden bg-blue-100 border border-blue-200 shadow-xl">
            <iframe
              className="w-full h-full"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3516.5449093053794!2d76.80970407916509!3d28.190752641909008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDExJzI2LjciTiA3NsKwNDgnNTIuNSJF!5e0!3m2!1sen!2sin!4v1772390982236!5m2!1sen!2sin"
            />
          </div>
        </div>
      </section>
    </>
  );
}
