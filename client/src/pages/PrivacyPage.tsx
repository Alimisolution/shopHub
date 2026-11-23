import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes your name, email address, shipping address, and payment information.'
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use the information we collect to process your orders, communicate with you about your purchases, provide customer support, and send you promotional offers (if you have opted in).'
    },
    {
      title: '3. Cookies and Tracking',
      content: 'We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.'
    },
    {
      title: '4. Data Security',
      content: 'We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.'
    },
    {
      title: '5. Third-Party Services',
      content: 'We may employ third-party companies and individuals to facilitate our service, such as payment processors (e.g., Paystack) and shipping providers. These third parties have access to your personal data only to perform these tasks on our behalf.'
    },
    {
      title: '6. Your Rights',
      content: 'You have the right to access, update, or delete the information we have on you. You can do this by logging into your account or contacting our support team directly.'
    },
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="bg-neutral-900 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ShieldCheck className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-neutral-400">Last updated: November 2026</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-neutral-200"
        >
          <p className="text-neutral-600 mb-8 leading-relaxed">
            At ShopHub, your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, 
            and safeguard your information when you visit our website or make a purchase.
          </p>
          
          <div className="space-y-8">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <h2 className="font-serif text-xl font-bold mb-3 text-neutral-900">{section.title}</h2>
                <p className="text-neutral-600 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-500">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@shophub.com" className="text-amber-600 hover:underline">privacy@shophub.com</a>
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}