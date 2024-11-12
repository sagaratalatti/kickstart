'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter }from 'next/navigation';
import {
  Ticket,
  Wallet,
  Shield,
  Coins,
  ArrowRight,
  Gift,
  Users,
  Zap,
  BarChart3,
  Key,
  Lock,
  Share2
} from 'lucide-react';

function App() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const router = useRouter();

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Verifiable",
      description: "Blockchain-backed tickets that can't be counterfeited"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Easy Transfer",
      description: "Transfer tickets securely with built-in royalties"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics Dashboard",
      description: "Track sales and attendance in real-time"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Exclusive Benefits",
      description: "Offer special perks to ticket holders"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Ticket className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Kickstart0x tickets
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
              onClick={() => router.push('/ticket-builder')}
            >
              <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />
              <span className="relative flex items-center gap-2">
                Let's Buidl This
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Create NFT Tickets like
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> ordering Pizzas</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Launch your NFT-powered event tickets in minutes. Secure, verifiable, and completely customizable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/ticket-builder'}
                className="px-8 py-4 rounded-xl bg-blue-500 text-white font-medium shadow-lg hover:shadow-xl hover:bg-blue-600 transition-all duration-300"
              >
                Start Creating
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-white text-gray-900 font-medium shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur">
                <img
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80"
                  alt="Event Ticketing Platform"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose NFT Tickets?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the next generation of event ticketing with blockchain technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-3 bg-blue-500/10 rounded-xl w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Login Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="glass-card p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-2/3">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Powered by ReOwn Social Login
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Create your Web3 wallet instantly using your favorite social accounts. No complicated seed phrases, just seamless access.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <motion.div
                    className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Key className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">One-click wallet creation</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <Lock className="w-5 h-5 text-purple-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Secure key management</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <Users className="w-5 h-5 text-emerald-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Multiple social providers</span>
                  </motion.div>
                </div>
              </div>
              <motion.div
                className="w-full md:w-1/3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl" />
                  <img
                    src="https://images.unsplash.com/photo-1432888622747-4eb9a8f2c1d9?auto=format&fit=crop&w=800&q=80"
                    alt="Social Login"
                    className="relative rounded-xl shadow-xl"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Backend Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Backend Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your NFT tickets efficiently
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="glass-card p-8 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-3 bg-blue-500 rounded-xl w-fit mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Real-time Analytics
              </h3>
              <p className="text-gray-600">
                Track sales, transfers, and attendance in real-time with our powerful analytics dashboard.
              </p>
            </motion.div>

            <motion.div
              className="glass-card p-8 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="p-3 bg-purple-500 rounded-xl w-fit mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Automated Royalties
              </h3>
              <p className="text-gray-600">
                Set up and collect royalties automatically for secondary market sales.
              </p>
            </motion.div>

            <motion.div
              className="glass-card p-8 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-3 bg-emerald-500 rounded-xl w-fit mb-6">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Multi-currency Support
              </h3>
              <p className="text-gray-600">
                Accept payments in multiple cryptocurrencies and traditional payment methods.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="glass-card p-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Event Ticketing?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of event organizers who've already made the switch to NFT tickets
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/ticket-builder'}
              className="px-8 py-4 rounded-xl bg-white text-blue-500 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default App;