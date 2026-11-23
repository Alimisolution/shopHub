import { motion } from 'framer-motion';
import { Target, Heart, Leaf, Award } from 'lucide-react';
import PageTransition from '../components/PageTransition';


export default function AboutPage() {
  const values = [
    { icon: Target, title: 'Our Mission', desc: 'To make premium quality accessible to everyone, without compromise.' },
    { icon: Heart, title: 'Crafted with Care', desc: 'Every product is thoughtfully selected for quality, durability, and design.' },
    { icon: Leaf, title: 'Sustainable', desc: 'We partner with ethical manufacturers who share our commitment to the planet.' },
    { icon: Award, title: 'Quality First', desc: 'Rigorous testing ensures every item meets our high standards before it reaches you.' },
  ];

  return (
    <PageTransition>
      {/* Hero */}
      <section className="bg-primary text-white py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-accent font-medium tracking-wider text-sm uppercase"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl font-bold mt-4 mb-6"
          >
            Building a Better Way to <span className="text-accent italic">Shop</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            ShopHub was founded in 2024 with a simple belief: everyone deserves access to beautifully designed, 
            high-quality products without the luxury markup.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
              alt="Our store"
              className="rounded-2xl shadow-xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-bold mb-4">From Idea to Reality</h2>
            <p className="text-text-secondary mb-4 leading-relaxed">
              What started as a small passion project has grown into a trusted destination for thousands of 
              customers worldwide. We believe shopping should be joyful, transparent, and effortless.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Our team carefully curates every product in our collection, working directly with artisans and 
              manufacturers who share our commitment to quality and ethical practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-12">
            What We <span className="text-accent italic">Stand For</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-border hover:border-accent transition-colors"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { num: '10K+', label: 'Happy Customers' },
              { num: '500+', label: 'Products' },
              { num: '50+', label: 'Countries' },
              { num: '4.9', label: 'Average Rating' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="font-serif text-4xl sm:text-5xl font-bold text-accent mb-2">{stat.num}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}