'use client';

import { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isSunday } from 'date-fns';
import Link from 'next/link';

type ClassType = {
  id: string;
  title: string;
  price: number;
  duration: string;
  description: string;
  includes: string[];
  comingSoon?: boolean;
  contactOnly?: boolean;
};

// Reuse the classes array from Classes page for schedule
const classes = [
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
];

const holidays = [
  '2024-07-04', // Independence Day
  '2024-12-25', // Christmas
  // Add more as needed
];

const workingHours: { [key: number]: number[] } = {
  1: [9,10,11,12,13,14,15,16,17,18], // Mon
  2: [9,10,11,12,13,14,15,16,17,18], // Tue
  3: [9,10,11,12,13,14,15,16,17,18], // Wed
  4: [9,10,11,12,13,14,15,16,17,18], // Thu
  5: [9,10,11,12,13,14,15,16,17,18], // Fri
  6: [10,11,12,13,14], // Sat
  0: [], // Sun
};

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Phone must be at least 7 digits'),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
});

type FormData = z.infer<typeof formSchema>;

function isHoliday(date: Date) {
  return holidays.includes(formatDate(date));
}

function getPSTDate(date: Date) {
  // Returns a Date object in PST
  return new Date(date.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getDayOfWeek(date: Date) {
  // 0 = Sun, 1 = Mon, ...
  return getPSTDate(date).getDay();
}

function getAvailableTimes(date: Date) {
  const day = getDayOfWeek(date);
  return workingHours[day] || [];
}

function formatTime(hour: number) {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}:00 ${ampm}`;
}

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalClass, setModalClass] = useState<ClassType | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const todayDate = getPSTDate(new Date());
  const [dateObj, setDateObj] = useState<Date>(todayDate);
  const [selectedTime, setSelectedTime] = useState('');

  // Booking form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    setValue('date', formatDate(dateObj));
    setValue('time', selectedTime);
  }, [dateObj, selectedTime, setValue]);

  // Progress bar
  const steps = ['Select Class', 'Booking Details', 'Payment'];
  const renderProgressBar = () => (
    <div className="w-full flex flex-col items-center mb-8">
      <div className="relative w-full max-w-2xl flex items-center justify-between">
        {/* Progress track */}
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full -z-10" style={{ transform: 'translateY(-50%)' }} />
        {/* Animated progress */}
        <motion.div
          className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-red-500 to-red-700 rounded-full z-0"
          style={{ width: `${((step - 1) / 2) * 100}%`, transform: 'translateY(-50%)' }}
          initial={{ width: 0 }}
          animate={{ width: `${((step - 1) / 2) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
        {steps.map((label, idx) => (
          <div key={label} className="flex flex-col items-center z-10 w-1/3">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full border-4 transition-all duration-300 font-bold text-lg ${step === idx + 1 ? 'bg-red-600 border-red-400 text-white scale-110 shadow-lg' : step > idx + 1 ? 'bg-green-500 border-green-400 text-white' : 'bg-white border-gray-300 text-gray-400'}`}>{
              idx === 0 ? <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /></svg>
              : idx === 1 ? <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z" /></svg>
              : <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            }</div>
            <span className={`mt-2 text-xs font-semibold ${step === idx + 1 ? 'text-red-700' : 'text-gray-500'}`}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Spotlight effect
  const renderSpotlight = (isSelected: boolean) => (
    isSelected ? (
      <motion.div
        layoutId="spotlight"
        className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-red-100 via-white to-red-200 opacity-80 blur-2xl scale-110"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
      />
    ) : null
  );

  // Card modal
  const renderModal = () => (
    <AnimatePresence>
      {showModal && modalClass && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-2xl font-bold" onClick={() => setShowModal(false)} aria-label="Close">&times;</button>
            <h2 className="text-2xl font-bold text-red-900 mb-2">{modalClass.title}</h2>
            <p className="text-gray-700 mb-4">{modalClass.description}</p>
            <h3 className="text-lg font-semibold text-red-900 mb-2">Course Includes:</h3>
            <ul className="mb-4">
              {modalClass.includes.map((item, idx) => (
                <li key={idx} className="flex items-center text-gray-700 mb-1">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  {item}
                </li>
              ))}
            </ul>
            <button className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-red-700 transition-all w-full" onClick={() => { setSelectedClass(modalClass); setShowModal(false); setStep(2); setTimeout(() => nextBtnRef.current?.scrollIntoView({ behavior: 'smooth' }), 200); }}>Select & Continue</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Step 1: Class selection (advanced)
  const renderClassSelection = () => (
    <div className="max-w-4xl mx-auto relative">
      {renderProgressBar()}
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl font-bold text-red-900 mb-8 text-center">
        Book Your Class
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-gray-700 text-center mb-12 text-lg">
        Choose a class to get started. All classes include hands-on practice and certification upon completion.
      </motion.p>
      <div className="grid grid-cols-1 gap-8">
        {classes.map((classItem: ClassType, index) => {
          const isSelected = selectedClass?.id === classItem.id;
          return (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${isSelected ? 'ring-4 ring-red-400 scale-105 z-10' : ''}`}
              tabIndex={0}
              onClick={() => { setSelectedClass(classItem); setTimeout(() => nextBtnRef.current?.scrollIntoView({ behavior: 'smooth' }), 200); }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedClass(classItem);
                  setTimeout(() => nextBtnRef.current?.scrollIntoView({ behavior: 'smooth' }), 200);
                }
                if (e.key === 'ArrowDown' && index < classes.length - 1) {
                  document.querySelectorAll('.class-card')[index + 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                if (e.key === 'ArrowUp' && index > 0) {
                  document.querySelectorAll('.class-card')[index - 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              role="button"
              onDoubleClick={() => { setModalClass(classItem); setShowModal(true); }}
              onFocus={e => e.currentTarget.classList.add('ring-2', 'ring-red-300')}
              onBlur={e => e.currentTarget.classList.remove('ring-2', 'ring-red-300')}
              style={{ outline: 'none' }}
            >
              {renderSpotlight(isSelected)}
              <div className="class-card relative p-8 z-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-red-900 mb-2 flex items-center gap-2">
                      {classItem.title}
                      {isSelected && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block ml-2">
                          <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        </motion.span>
                      )}
                    </h2>
                    <p className="text-gray-600">Duration: {classItem.duration}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    {classItem.price && !classItem.contactOnly ? (
                      <p className="text-3xl font-bold text-red-600">${classItem.price}</p>
                    ) : classItem.comingSoon ? (
                      <span className="inline-block bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">Coming Soon</span>
                    ) : null}
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <button type="button" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold shadow hover:bg-gray-200 transition-all" onClick={e => { e.stopPropagation(); setModalClass(classItem); setShowModal(true); }}>Preview</button>
                  {!classItem.comingSoon && !classItem.contactOnly && (
                    <button type="button" className={`bg-red-600 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-red-700 transition-all ${isSelected ? 'ring-2 ring-red-400' : ''}`} onClick={e => { e.stopPropagation(); setSelectedClass(classItem); setTimeout(() => nextBtnRef.current?.scrollIntoView({ behavior: 'smooth' }), 200); }}>Select</button>
                  )}
                  {classItem.contactOnly && (
                    <Link href="/contact" className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition-all">Contact Us</Link>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* Sticky Next Button */}
      <AnimatePresence>
        {selectedClass && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ duration: 0.4 }} className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
            <button
              ref={nextBtnRef}
              className="pointer-events-auto bg-gradient-to-r from-red-600 to-red-500 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 hover:from-red-700 hover:to-red-600 transition-all duration-300"
              onClick={() => setStep(2)}
            >
              Next: Booking Details
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {renderModal()}
    </div>
  );

  // Step 2: Date/time picker and booking form
  const renderDateTimeForm = () => {
    // Only allow Mon-Sat, not holidays, not past dates
    const filterDate = (date: Date) => {
      const isPast = date < todayDate;
      const isSun = isSunday(date);
      return !isPast && !isSun && !isHoliday(date);
    };
    // Get available times for selected date
    const availableTimes = getAvailableTimes(dateObj);

    return (
      <div className="max-w-xl mx-auto">
        {renderProgressBar()}
        <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-bold text-red-900 mb-8 text-center">
          Booking Details
        </motion.h2>
        <form onSubmit={handleSubmit((data) => { setFormData(data); setStep(3); })} className="space-y-8 bg-white/90 rounded-2xl shadow-2xl p-10 backdrop-blur-md">
          <div className="grid grid-cols-1 gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 rounded-full p-3">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z" /></svg>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                <DatePicker
                  selected={dateObj}
                  onChange={(date: Date | null) => {
                    if (date) {
                      setDateObj(date);
                      setSelectedTime('');
                    }
                  }}
                  filterDate={filterDate}
                  minDate={todayDate}
                  dateFormat="EEE, MMM d, yyyy"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/80"
                  calendarClassName="!z-50"
                  showPopperArrow={false}
                />
                {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-red-100 rounded-full p-3">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Time</label>
                <div className="flex flex-wrap gap-2">
                  {availableTimes.length === 0 && <span className="text-gray-400">No times available</span>}
                  {availableTimes.map((hour: number) => (
                    <button
                      type="button"
                      key={hour}
                      className={`px-4 py-2 rounded-lg border ${selectedTime === formatTime(hour) ? 'bg-red-600 text-white' : 'bg-white text-gray-700'} shadow hover:bg-red-100 transition-all`}
                      onClick={() => setSelectedTime(formatTime(hour))}
                    >
                      {formatTime(hour)}
                    </button>
                  ))}
                </div>
                {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-red-100 rounded-full p-3">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
              <div className="flex-1">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/80"
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  aria-describedby="name-error"
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-red-100 rounded-full p-3">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 01-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div className="flex-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/80"
                  placeholder="your@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-red-100 rounded-full p-3">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10a4 4 0 018 0v4a4 4 0 01-8 0v-4z" /></svg>
              </div>
              <div className="flex-1">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/80"
                  placeholder="Your phone number"
                  aria-invalid={!!errors.phone}
                  aria-describedby="phone-error"
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-8 border-t pt-8">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-300 transition-all"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isValid}
            >
              Next: Payment
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Step 3: Payment
  const handlePayment = async () => {
    if (!selectedClass) return;
    try {
      const response = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classId: selectedClass.id,
          className: selectedClass.title,
          price: selectedClass.price,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create checkout session');
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (stripe) await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Payment error:', error.message);
      } else {
        console.error('Payment error:', error);
      }
    }
  };

  // Step 4: Confirmation (placeholder, can be improved with animation)
  const renderConfirmation = () => (
    <div className="max-w-xl mx-auto text-center">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center bg-white/90 rounded-2xl shadow-2xl p-10 mt-10">
        <motion.svg initial={{ scale: 0 }} animate={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 300, damping: 10 }} className="w-16 h-16 mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><motion.path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></motion.svg>
        <h2 className="text-3xl font-bold text-green-700 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-700 mb-4">Thank you for booking your class. A confirmation email has been sent to <span className="font-semibold">{formData?.email}</span>.</p>
        <div className="bg-gray-100 rounded-lg p-4 text-left w-full max-w-md mx-auto">
          <p className="text-gray-800 font-semibold mb-1">Class: {selectedClass?.title}</p>
          <p className="text-gray-800 mb-1">Name: {formData?.name}</p>
          <p className="text-gray-800 mb-1">Email: {formData?.email}</p>
          <p className="text-gray-800 mb-1">Phone: {formData?.phone}</p>
        </div>
      </motion.div>
    </div>
  );

  const renderPayment = () => (
    <div className="max-w-xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-bold text-red-900 mb-8 text-center">
        Payment
      </motion.h2>
      <div className="bg-white/90 rounded-2xl shadow-2xl p-10 mb-8">
        <h3 className="text-xl font-semibold text-red-900 mb-2">{selectedClass?.title}</h3>
        <p className="text-gray-700 mb-2">Price: <span className="font-bold text-red-600">${selectedClass?.price}</span></p>
        <p className="text-gray-700 mb-2">Name: <span className="font-semibold">{formData?.name}</span></p>
        <p className="text-gray-700 mb-2">Email: <span className="font-semibold">{formData?.email}</span></p>
        <p className="text-gray-700 mb-2">Phone: <span className="font-semibold">{formData?.phone}</span></p>
        <p className="text-gray-700 mb-2">Date: <span className="font-semibold">{formData?.date}</span></p>
        <p className="text-gray-700 mb-2">Time: <span className="font-semibold">{formData?.time}</span></p>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-300 transition-all"
          onClick={() => setStep(2)}
        >
          Back
        </button>
        <button
          className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-red-700 transition-all"
          onClick={handlePayment}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-red-50 via-white to-red-100">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          {step === 1 && renderClassSelection()}
          {step === 2 && renderDateTimeForm()}
          {step === 3 && renderPayment()}
          {step === 4 && renderConfirmation()}
        </AnimatePresence>
      </div>
    </div>
  );
} 