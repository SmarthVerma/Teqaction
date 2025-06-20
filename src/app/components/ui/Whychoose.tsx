"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Code, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  BarChart3,
  ArrowRight,
  CheckCircle
} from "lucide-react";

// Sample content for web services company
const webServicesContent = [
  {
    title: "Custom Web Development",
    description: "Build scalable, responsive websites and web applications tailored to your business needs with modern technologies and best practices.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center ">
        <div className="text-center text-white">
          <img src="/website.webp" alt="" />
        </div>
      </div>
    ),
    features: ["React & Next.js", "Responsive Design", "SEO Optimized", "Fast Loading"],
    icon: Code
  },
  {
    title: "Cross-Platform App Development",
    description: "Build high-performance mobile apps for iOS and Android using React Native and Flutter with native-like quality.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center ">
        <div className="text-center text-white">
          <img src="/Flutter.webp" alt="" />
        </div>
      </div>
    ),
    features: [
      "React Native Apps", 
      "Flutter Apps", 
      "UI/UX Optimization", 
      "API Integration"
    ],
    icon: Globe,
  },
  {
    title: "Security & Compliance",
    description: "Protect your digital assets with comprehensive security measures and compliance standards for peace of mind.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center ">
        <div className="text-center text-white">
          <img src="/security1.webp" alt="" />
        </div>
      </div>
    ),
    features: ["SSL Certificates", "Data Encryption", "Security Audits", "GDPR Compliant"],
    icon: Shield
  },
  {
    title: "Cloud Infrastructure",
    description: "Deploy and manage your applications with enterprise-grade cloud solutions that scale with your business growth.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center ">
        <div className="text-center text-white">
          <img src="cloud.webp" alt="" />
        </div>
      </div>
    ),
    features: ["AWS & Azure", "Auto Scaling", "Load Balancing", "CDN Integration"],
    icon: Zap
  },
  {
    title: "24/7 Support & Maintenance",
    description: "Get round-the-clock support and proactive maintenance to keep your web services running smoothly.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <Users className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Expert Support</h3>
          <p className="text-indigo-100">Always Here to Help</p>
        </div>
      </div>
    ),
    features: ["24/7 Monitoring", "Quick Response", "Regular Updates", "Backup Services"],
    icon: Users
  }
];

import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content = webServicesContent,
  contentClassName = "",
  showProgress = true,
  showFeatures = true,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "linear-gradient(135deg, #111827 0%, #0b1120 50%, #020617 100%)",
    "linear-gradient(135deg, #111827 0%, #0d1e2c 50%, #041a27 100%)",
    "linear-gradient(135deg, #111827 0%, #0f172a 50%, #060d1a 100%)",
    "linear-gradient(135deg, #111827 0%, #0d1e1b 50%, #041711 100%)",
    "linear-gradient(135deg, #111827 0%, #0e1e22 50%, #051712 100%)"
  ];

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="px-4 w-full mx-auto">
        <div className="space-y-8">
          {content.map((item, index) => {
            const IconComponent = item.icon || Code;
            return (
              <motion.div
                key={item.title + index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl"
              >
                {/* Mobile Content Card */}
                <div className="mb-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="h-48 w-full overflow-hidden rounded-xl shadow-lg"
                  >
                    {item.content}
                  </motion.div>
                </div>

                {/* Mobile Text Content */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      {item.title}
                    </h2>
                  </div>
                  
                  <p className="text-base text-white/90 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Mobile Features */}
                  {showFeatures && item.features && (
                    <div className="grid grid-cols-1 gap-2 mt-4">
                      {item.features.map((feature, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2 text-white/80"
                        >
                          <CheckCircle className="w-4 h-4 text-green-300 flex-shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Mobile CTA */}
                  <button className="w-full mt-6 px-4 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/30 transition-all duration-300 flex items-center justify-center gap-2 group">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 shadow-xl"
        >
          <div className="grid grid-cols-3 gap-4 text-white text-center">
            <div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-xs opacity-80">Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-xs opacity-80">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-xs opacity-80">Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Desktop Layout (original with some optimizations)
  return (
    <div className="px-4 lg:px-20 w-full mx-auto">
      <motion.div
        style={{
          background: backgroundColors[activeCard % backgroundColors.length],
        }}
        className="relative flex h-[40rem] justify-center space-x-10 overflow-y-auto rounded-xl p-8 shadow-2xl"
        ref={ref}
      >
        {/* Content Section */}
        <div className="relative flex items-start px-6 flex-1">
          <div className="max-w-2xl">
            {content.map((item, index) => {
              const IconComponent = item.icon || Code;
              return (
                <div key={item.title + index} className="my-32 first:mt-20">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.4,
                      y: activeCard === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-white">
                        {item.title}
                      </h2>
                    </div>
                    
                    <p className="text-xl text-white/90 max-w-lg leading-relaxed">
                      {item.description}
                    </p>

                    {/* Features List */}
                    {showFeatures && item.features && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: activeCard === index ? 1 : 0 
                        }}
                        className="grid grid-cols-2 gap-3 mt-6"
                      >
                        {item.features.map((feature, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center gap-2 text-white/80"
                          >
                            <CheckCircle className="w-4 h-4 text-green-300" />
                            <span className="text-sm font-medium">{feature}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {/* CTA Button */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: activeCard === index ? 1 : 0,
                        scale: activeCard === index ? 1 : 0.9 
                      }}
                      className="mt-8 px-6 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/30 transition-all duration-300 flex items-center gap-2 group"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </motion.div>
                </div>
              );
            })}
            <div className="h-40" />
          </div>
        </div>

        {/* Sticky Content Card - Desktop Only */}
        <div className="sticky top-5 block">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className={cn(
              "h-[30rem] w-[40rem] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5",
              contentClassName,
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                {content[activeCard].content}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
          >
            <div className="flex items-center justify-between text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-xs opacity-80">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-xs opacity-80">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-xs opacity-80">Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StickyScroll;