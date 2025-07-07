'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

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
  // Parallax effect for video card
  const videoCardRef = useRef<HTMLDivElement>(null);

  // Parallax mouse handler
  function handleParallax(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const card = videoCardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8; // max 8deg
    const rotateY = ((x - centerX) / centerX) * -8;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
  function resetParallax() {
    const card = videoCardRef.current;
    if (card) card.style.transform = "rotateX(0deg) rotateY(0deg)";
  }

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
              <div className="inline-block mt-4 ml-1 mb-4">
                <span className="bg-red-100 text-red-800 text-xs sm:text-sm font-medium px-4 py-1 rounded-full text-center whitespace-normal">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
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
              {/* Red Accent Card Behind Video with Heart Watermark */}
              <div className="absolute -top-8 sm:-top-12 -left-8 sm:-left-16 w-[120%] h-[70%] sm:w-[110%] sm:h-[80%] bg-gradient-to-tr from-red-500 to-red-400 rounded-3xl sm:rounded-[2.5rem] -rotate-6 shadow-2xl z-0 animate-card-glow overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-10 animate-heartbeat" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 29s-13-7.434-13-17A7 7 0 0116 7a7 7 0 0113 5c0 9.566-13 17-13 17z" fill="#fff"/>
                </svg>
              </div>
              {/* Floating SVG icons */}
              <svg className="absolute -top-6 -left-6 w-10 h-10 text-red-200 animate-float-slow z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              <svg className="absolute -bottom-8 left-1/2 w-8 h-8 text-red-100 animate-float-fast z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /></svg>
              <svg className="absolute top-1/2 -right-8 w-12 h-12 text-red-100 animate-float-slow z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="2" /></svg>
              <svg className="absolute top-8 right-1/3 w-7 h-7 text-red-200 animate-float-fast z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              <div
                ref={videoCardRef}
                onMouseMove={handleParallax}
                onMouseLeave={resetParallax}
                className="relative bg-white rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110 group-hover:shadow-2xl animate-card-glow z-20 border-4 border-transparent bg-clip-padding border-gradient-to-tr from-red-400 via-pink-300 to-red-500 animate-gradient-border"
                style={{ willChange: 'transform' }}
              >
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
                    {/* Shimmer overlay (desktop only) */}
                    <div className="hidden sm:block animate-shimmer pointer-events-none" />
                  </div>
                </div>
                {/* Floating Badge with glassmorphism and animation */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 sm:bottom-4 sm:right-4 sm:left-auto sm:transform-none bg-white/60 backdrop-blur-md px-2 py-1 sm:px-6 sm:py-2 rounded-full shadow-lg max-w-[95vw] sm:max-w-fit w-fit animate-bounce-slow border border-white/40">
                  <p className="text-gray-700 text-xs sm:text-sm font-semibold flex items-center justify-center space-x-2 whitespace-normal sm:whitespace-nowrap text-center leading-tight">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1 sm:mr-0" />
                    <span>Real hands-on CPR instruction</span>
                  </p>
                </div>
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
