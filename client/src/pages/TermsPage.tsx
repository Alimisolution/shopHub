import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import PageTransition from '../components/PageTransition';



export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using ShopHub, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree, please do not use our services.'
    },
    {
      title: '2. Use of Service',
      content: 'You agree to use ShopHub only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information.'
    },
    {
      title: '3. Products & Pricing',
      content: 'All prices are displayed in USD and are subject to change without notice. We reserve the right to modify or discontinue products at any time. Prices shown during checkout are final.'
    },
    {
      title: '4. Payment & Billing',
      content: 'We accept payments through Paystack and other approved methods. By making a purchase, you warrant that you are authorized to use the payment method. All transactions are processed securely.'
    },
    {
      title: '5. Shipping & Delivery',
      content: 'Shipping times are estimates and not guaranteed. We are not liable for delays caused by customs, weather, or other factors beyond our control.'
    },
    {
      title: '6. Returns & Refunds',
      content: 'We offer a 30-day return policy for unused items in original packaging. Refunds are processed within 5-10 business days after we receive the returned item.'
    },
    {
      title: '7. Intellectual Property',
      content: 'All content on ShopHub, including text, graphics, logos, and images, is the property of ShopHub and protected by intellectual property laws.'
    },
    {
      title: '8. Limitation of Liability',
      content: 'ShopHub shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.'
    },
  ];

  return (
    <PageTransition>
      <div className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FileText className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-white/70">Last updated: November 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-border"
        >
          <p className="text-text-secondary mb-8 leading-relaxed">
            Welcome to ShopHub. These Terms and Conditions govern your use of our website and services. 
            Please read them carefully before making a purchase.
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
                <h2 className="font-serif text-xl font-bold mb-3 text-text-primary">{section.title}</h2>
                <p className="text-text-secondary leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-text-secondary">
              If you have any questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@shophub.com" className="text-accent hover:underline">legal@shophub.com</a>
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}