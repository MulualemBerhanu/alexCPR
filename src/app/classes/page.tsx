'use client';
import Link from "next/link";
import { motion } from "framer-motion";

type ClassType = {
  id: string;
  title: string;
  price: number | null;
  duration: string;
  description: string;
  includes: string[];
  comingSoon?: boolean;
  contactOnly?: boolean;
};

const classes: ClassType[] = [
  {
    id: "adult-first-aid-cpr-aed",
    title: "Adult First Aid, CPR AED and Infant/Child CPR AED",
    price: 80,
    duration: "4 hours",
    description: "Comprehensive training covering adult and pediatric CPR, AED usage, and First Aid. This complete course prepares you to handle emergency situations for all age groups with confidence.",
    includes: [
      "Adult CPR and AED training",
      "Infant and Child CPR techniques",
      "First Aid certification",
      "Wound care and emergency response",
      "2-year certification upon completion",
      "Hands-on practice with mannequins",
      "Digital learning materials",
      "Small class size for personalized attention"
    ]
  },
  {
    id: "bloodborne-pathogens",
    title: "Bloodborne Pathogens (BBP)",
    price: 60,
    duration: "2 hours",
    description: "OSHA-compliant training for handling bloodborne pathogens and maintaining workplace safety. Essential for healthcare workers and first responders.",
    includes: [
      "OSHA-compliant infection control training",
      "How to handle blood and bodily fluid exposure",
      "Use of PPE (Personal Protective Equipment)",
      "Understanding BBP standards in the workplace",
      "Digital certificate of completion"
    ]
  },
  {
    id: "defensive-driving",
    title: "Defensive Driver Safety",
    price: 80,
    duration: "3 hours",
    description: "Comprehensive defensive driving course focusing on safety, risk management, and emergency response for both personal and commercial drivers.",
    includes: [
      "Safe driving techniques and risk management",
      "Emergency response handling",
      "Driver attitude and reaction control",
      "Rules for commercial/fleet drivers",
      "Completion certificate"
    ]
  },
  {
    id: "workday-training",
    title: "Workday Training (Tier 1 & 2)",
    price: 80,
    duration: "3 hours",
    description: "Master Workday navigation and workflows with hands-on training. Perfect for employees and HR professionals looking to enhance their system proficiency.",
    includes: [
      "Intro to Workday navigation and workflows",
      "Employee self-service and task processing",
      "HR/Payroll task handling (Tier 2)",
      "Hands-on practice with simulations",
      "Helpful take-home reference guides"
    ],
    contactOnly: true
  },
  {
    id: "ois",
    title: "Oregon Intervention System (OIS)",
    price: null,
    duration: "TBD",
    description: "Safe and respectful behavioral intervention training in line with Oregon state standards. Required for support professionals working with vulnerable populations.",
    includes: [
      "Behavioral intervention techniques",
      "State-compliant training methods",
      "Safety protocols and procedures",
      "Hands-on practice scenarios",
      "Certification upon completion"
    ],
    comingSoon: true
  },
  {
    id: "firearm-safety",
    title: "Firearm Safety & Responsibility",
    price: null,
    duration: "TBD",
    description: "Comprehensive firearm safety training covering safe handling, legal responsibilities, and secure storage. Ideal for civilians, new owners, and security personnel.",
    includes: [
      "Safe firearm handling techniques",
      "Legal responsibilities and regulations",
      "Secure storage practices",
      "Emergency response protocols",
      "Hands-on safety demonstrations"
    ],
    comingSoon: true
  }
];

export default function ClassesPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-red-900 mb-8 text-center"
          >
            Available Classes
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-700 text-center mb-12 text-lg"
          >
            Choose from our selection of professional CPR and First Aid training courses.
            All classes include hands-on practice and certification upon completion.
          </motion.p>

          <div className="grid grid-cols-1 gap-8">
            {classes.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  classItem.comingSoon ? 'opacity-75' : ''
                }`}
              >
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-red-900 mb-2">
                        {classItem.title}
                      </h2>
                      <p className="text-gray-600">
                        Duration: {classItem.duration}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      {classItem.price && !classItem.contactOnly ? (
                        <p className="text-3xl font-bold text-red-600">
                          ${classItem.price}
                        </p>
                      ) : classItem.comingSoon ? (
                        <span className="inline-block bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
                          Coming Soon
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">
                    {classItem.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-red-900 mb-4">
                      Course Includes:
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {classItem.includes.map((item, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-4 mt-4">
                    {!classItem.comingSoon && !classItem.contactOnly && (
                      <Link
                        href={`/book?class=${classItem.id}`}
                        className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-red-700 transition-all"
                      >
                        Book Now
                      </Link>
                    )}
                    {classItem.contactOnly && (
                      <Link
                        href="/contact"
                        className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition-all"
                      >
                        Contact Us
                      </Link>
                    )}
                    {classItem.comingSoon && (
                      <div className="text-center text-gray-500 italic">
                        This course will be available soon. Stay tuned for updates!
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 