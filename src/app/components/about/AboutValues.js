"use client";
import { useState, useEffect, useRef } from 'react';

const values = [
  {
    icon: "🎯",
    title: "Quality First",
    description: "I believe in delivering high-quality code that is maintainable, scalable, and performs exceptionally. Every line of code is written with purpose and precision."
  },
  {
    icon: "🚀",
    title: "Innovation",
    description: "Staying ahead of the curve by embracing new technologies and methodologies. I love exploring creative solutions to complex problems."
  },
  {
    icon: "🤝",
    title: "Collaboration",
    description: "Great products are built by great teams. I value open communication, knowledge sharing, and working together towards common goals."
  },
  {
    icon: "📚",
    title: "Continuous Learning",
    description: "The tech world evolves rapidly, and so do I. I'm committed to lifelong learning and staying updated with industry best practices."
  },
  {
    icon: "💡",
    title: "Problem Solving",
    description: "I approach challenges with analytical thinking and creativity. Every problem is an opportunity to learn and create something better."
  },
  {
    icon: "⚡",
    title: "Efficiency",
    description: "Working smart, not just hard. I focus on creating efficient workflows, optimized code, and solutions that save time and resources."
  }
];

export default function AboutValues() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate cards with staggered delay
          values.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index]);
            }, index * 150);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-600/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-4">
              Core Values
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Drives Me
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles and values that guide my work and define my approach to development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`group transition-all duration-700 ${
                  visibleCards.includes(index) 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-10 scale-95'
                }`}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 text-white text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-purple-400 transition-colors">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
