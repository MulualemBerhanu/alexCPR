'use client';

import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  {
    value: "1,000+",
    label: "Students Trained",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    ),
  },
  {
    value: "100%",
    label: "Certification Rate",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    ),
  },
  {
    value: "6+",
    label: "Years Experience",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-red-50 via-white to-red-50">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-red-100/30 to-transparent rounded-full blur-3xl transform rotate-12" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-red-100/30 to-transparent rounded-full blur-3xl transform -rotate-12" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-4">
                <span className="bg-red-100 text-red-800 text-sm font-medium px-4 py-1 rounded-full">
                  Professional CPR Training
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-red-900 mb-6 leading-tight">
                Learn Life-Saving{" "}
                <span className="relative">
                  <span className="relative z-10 text-red-600">Skills</span>
                  <span className="absolute bottom-0 left-0 w-full h-3 bg-red-200/50 -rotate-1" />
                </span>{" "}
                with Expert Training
              </h1>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-xl">
                Get certified in CPR and First Aid with expert instruction in Clackamas, OR. 
                Join our hands-on classes and gain the confidence to save lives.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/book" 
                  className="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full bg-red-600 text-white transition-all duration-300 hover:bg-red-700 hover:scale-105 transform"
                >
                  <span className="relative z-10 flex items-center text-lg font-semibold">
                    Book a Class
                    <svg className="w-5 h-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-red-500 to-red-700 transform skew-x-12 transition-transform duration-300 group-hover:translate-x-0" />
                </Link>
                
                <Link 
                  href="/classes" 
                  className="relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full bg-white text-red-600 border-2 border-red-600 transition-all duration-300 hover:bg-red-50 hover:scale-105 transform"
                >
                  <span className="text-lg font-semibold">View Classes</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm">Certified Training</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">Flexible Schedule</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">Small Class Size</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Video */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl transform rotate-6 scale-95 transition-transform duration-300 group-hover:rotate-4 group-hover:scale-105" />
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
                <div className="relative aspect-video">
                  {/* Video Container */}
                  <div className="relative w-full h-full">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src="/alexcpr-hero.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Simple Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Simple Info Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-sm font-medium">
                    CPR Training Session
                  </p>
                </div>
              </div>

              {/* Bottom Label */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg">
                <p className="text-gray-600 text-sm font-medium flex items-center space-x-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span>Real hands-on CPR instruction</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-50/50 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 hover:-translate-y-1 transform"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:rotate-6">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {stat.icon}
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-red-900">{stat.value}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-red-900 via-red-800 to-red-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-red-800/90 to-red-900/90" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 relative"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Certified?
            </h2>
            <p className="text-xl text-red-100/90 mb-10 leading-relaxed">
              Join our upcoming CPR and First Aid classes. Small group sizes ensure 
              personalized attention and hands-on practice.
            </p>
            <Link 
              href="/book" 
              className="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-full bg-white text-red-900 transition-all duration-300 hover:bg-red-50 hover:scale-105 transform"
            >
              <span className="relative z-10 flex items-center text-lg font-semibold">
                Book Your Class Now
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
