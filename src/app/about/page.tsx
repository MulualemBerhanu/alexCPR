'use client';
import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { label: "Years Experience", value: 6, icon: (
    <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  ) },
  { label: "Students Trained", value: 1000, icon: (
    <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
  ) },
  { label: "Certifications", value: 3, icon: (
    <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
  ) },
];

const testimonials = [
  {
    name: "Mark M.",
    text: "Alemayehu's class was engaging and hands-on. I feel confident to help in an emergency now!",
  },
  {
    name: "Sam T.",
    text: "The best CPR training I've attended. The instructor made everything easy to understand.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-0 relative bg-gradient-to-br from-red-50 via-white to-red-100">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10">
          <div className="mx-auto w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-white bg-red-100 flex items-center justify-center mb-6">
            <svg className="w-24 h-24 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-red-900 text-center mb-2 drop-shadow-lg">Meet Your Instructor</h1>
          <h2 className="text-2xl text-red-700 text-center font-semibold mb-4">Alemayehu Tessema</h2>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto mb-4">With over 6 years of experience in emergency medical services and CPR training, Alemayehu is dedicated to empowering individuals with life-saving skills. As a certified instructor, he brings real-world experience and a passion for teaching to every class.</p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"><svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" /></svg>Certified CPR Instructor</span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"><svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" /></svg>Emergency Medical Services</span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"><svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>First Aid Expert</span>
          </div>
        </motion.div>
        {/* Animated Stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex flex-wrap justify-center gap-8 mt-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-md rounded-xl shadow-md px-8 py-6 flex flex-col items-center min-w-[140px]">
              {stat.icon}
              <span className="text-3xl font-bold text-red-900 mt-2">
                <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}>{stat.value}+</motion.span>
              </span>
              <span className="text-gray-600 text-sm mt-1">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto mt-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-xl p-10 mb-12 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-40" />
          <h2 className="text-2xl font-semibold text-red-900 mb-4 flex items-center gap-2">
            <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" /></svg>
            Our Mission
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            At AlexCPR, our mission is to make life-saving skills accessible to everyone. We believe that everyone should have the knowledge and confidence to respond effectively in emergency situations.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <li className="flex items-center gap-2 text-gray-700"><svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Hands-on, practical training</li>
            <li className="flex items-center gap-2 text-gray-700"><svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Personalized instruction for every student</li>
            <li className="flex items-center gap-2 text-gray-700"><svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Certification upon completion</li>
            <li className="flex items-center gap-2 text-gray-700"><svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>Supportive, inclusive environment</li>
          </ul>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-3xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="bg-white/90 rounded-2xl shadow-xl p-10 relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-40" />
          <h3 className="text-xl font-semibold text-red-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            What Students Say
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-red-50 rounded-xl p-6 shadow flex flex-col gap-2">
                <p className="text-gray-800 text-lg font-medium">“{t.text}”</p>
                <span className="text-red-700 font-semibold mt-2">- {t.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="text-center pb-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-semibold text-red-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-700 mb-6">
            Join our CPR and First Aid training classes and become certified today.
          </p>
          <Link 
            href="/book" 
            className="inline-block bg-gradient-to-r from-red-600 to-red-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 hover:from-red-700 hover:to-red-600 transition-all duration-300"
          >
            Book a Class
          </Link>
        </motion.div>
      </section>
    </div>
  );
} 