import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email Us', value: 'hello@shophub.com', link: 'mailto:hello@shophub.com' },
    { icon: Phone, label: 'Call Us', value: '+1 (555) 123-4567', link: 'tel:+15551234567' },
    { icon: MapPin, label: 'Visit Us', value: '123 Fashion Ave, NY 10001', link: '#' },
    { icon: Clock, label: 'Working Hours', value: 'Mon - Fri: 9AM - 6PM', link: '#' },
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="bg-neutral-900 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Mail className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Have a question about our products, shipping, or returns? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-serif text-3xl font-bold text-neutral-900 mb-6">Contact Information</h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              Fill out the form and our team will get back to you within 24 hours. You can also reach us directly through the channels below.
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{item.label}</h3>
                    <a href={item.link} className="text-neutral-600 hover:text-amber-600 transition-colors">
                      {item.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-12 text-center"
              >
                <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
                <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-2">Message Sent!</h3>
                <p className="text-neutral-600">We'll get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    placeholder="Order Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-neutral-900 text-white py-3.5 rounded-lg font-semibold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}