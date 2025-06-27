'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  reason: z.string().min(2, 'Please select a reason'),
  phone: z.string().min(7, 'Phone must be at least 7 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', icon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
  ) },
  { name: 'Instagram', href: 'https://instagram.com', icon: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg>
  ) },
];

const officeHours = [
  { day: 'Mon-Fri', hours: '9:00am - 6:00pm' },
  { day: 'Saturday', hours: '10:00am - 2:00pm' },
  { day: 'Sunday', hours: 'Closed' },
];

function getTodayOfficeHours() {
  const d = new Date();
  const day = d.getDay();
  if (day === 0) return officeHours[2];
  if (day === 6) return officeHours[1];
  return officeHours[0];
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitSuccess(true);
      reset();
    } catch {
      setSubmitError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const todayHours = getTodayOfficeHours();
  const reason = watch('reason');
  const progress = [
    watch('name')?.length > 1,
    watch('email')?.length > 3 && watch('email')?.includes('@'),
    reason && reason.length > 1,
    watch('phone')?.length > 6,
    watch('message')?.length > 9,
  ].filter(Boolean).length / 5 * 100;

  return (
    <div className="min-h-screen py-0 bg-gradient-to-br from-red-50 via-white to-red-100 relative">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-20 pb-8">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center shadow-lg mb-4">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 10.34V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7.34M21 10.34a8.38 8.38 0 01-7.34 7.34M21 10.34V21M21 21H10.34" /></svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-2 drop-shadow-lg">Contact Us</h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto mb-3">Have questions about our CPR classes? Send us a message and we&apos;ll get back to you as soon as possible.</p>
          <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-2 shadow-sm">We usually reply within 24 hours</span>
        </motion.div>
      </section>

      {/* Split Layout Section */}
      <section className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 px-4 mb-20">
        {/* Left: Info & Map */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="flex-1 flex flex-col gap-8 justify-between">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <span className="text-gray-700 font-medium">Alemayehu Tessema</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <a href="mailto:contact@alexcpr.com" className="text-red-700 hover:underline">contact@alexcpr.com</a>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span className="text-gray-700">(360) 314-7506</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="text-gray-700">13184 SE 124th Ave, Clackamas OR, 97015</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" /></svg>
              <span className="text-gray-700">Office Hours: <span className="font-semibold">{todayHours.day}</span> <span className="ml-2 text-green-600">{todayHours.hours !== 'Closed' ? 'Open Now' : 'Closed'}</span> <span className="ml-2 text-gray-500">({todayHours.hours})</span></span>
            </div>
            <div className="flex gap-4 mt-2">
              {socialLinks.map((item) => (
                <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors" aria-label={item.name}>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="w-full h-56 md:h-48 rounded-xl overflow-hidden shadow-md relative">
            <iframe
              title="AlexCPR Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-122.5525%2C45.4145%2C-122.5425%2C45.4245&amp;layer=mapnik&amp;marker=45.4195%2C-122.5475"
              className="w-full h-full border-0 rounded-xl"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <a href="https://maps.google.com/?q=13184+SE+124th+Ave,+Clackamas+OR,+97015" target="_blank" rel="noopener noreferrer" className="absolute bottom-3 right-3 bg-white/90 text-red-700 px-4 py-1 rounded-full shadow hover:bg-red-100 text-sm font-semibold transition-all">Get Directions</a>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="flex-1 bg-white/90 rounded-2xl shadow-2xl p-10 backdrop-blur-md flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Reason for Contact</label>
              <div className="text-xs text-gray-400">{progress}% complete</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-red-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <select
              id="reason"
              {...register('reason')}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/80"
              aria-invalid={!!errors.reason}
              aria-describedby="reason-error"
              defaultValue=""
            >
              <option value="" disabled>Select a reason...</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Booking">Booking</option>
              <option value="Support">Support</option>
              <option value="Feedback">Feedback</option>
            </select>
            {errors.reason && (
              <p id="reason-error" className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
            )}
            <div>
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
            <div>
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
            <div>
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
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                {...register('message')}
                rows={5}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/80"
                placeholder="Your message..."
                aria-invalid={!!errors.message}
                aria-describedby="message-error"
              />
              {errors.message && (
                <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>
            <AnimatePresence>
              {submitError && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 bg-red-50 text-red-600 rounded-md">
                  {submitError}
                </motion.div>
              )}
              {submitSuccess && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center p-4 bg-green-50 text-green-600 rounded-md">
                  <motion.svg initial={{ scale: 0 }} animate={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 300, damping: 10 }} className="w-10 h-10 mb-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><motion.path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></motion.svg>
                  Thank you for your message! We&apos;ll get back to you soon.
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              type="submit"
              disabled={isSubmitting || !isValid}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: isSubmitting || !isValid ? 1 : 1.04 }}
              className={`w-full bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-red-700 hover:to-red-600 transition-all duration-300
                ${isSubmitting || !isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
      </section>
    </div>
  );
} 