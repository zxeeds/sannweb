"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from 'react';

export default function AboutCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
    <section ref={sectionRef} className="relative bg-gradient-to-r from-gray-950 via-purple-900 to-gray-950 overflow-hidden">
      {/* Background Effects */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b5cf6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="relative max-w-4xl mx-auto text-center py-20 px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-6">
              Let's Connect
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Work
            <span className="block bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Together?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            I'm always excited to take on new challenges and collaborate on interesting projects. 
            Let's discuss how we can bring your ideas to life!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/contact"
              className="group bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/25"
            >
              Get In Touch
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">💬</span>
            </Link>
            <Link
              href="/portfolio"
              className="border border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all hover:bg-gray-800/50"
            >
              View My Work
            </Link>
          </div>
          
          {/* Fun Facts */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-400 text-xl">☕</span>
              </div>
              <p className="text-gray-400 text-sm">Coffee Consumed</p>
              <p className="text-white font-medium">1000+ Cups</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-400 text-xl">🌙</span>
              </div>
              <p className="text-gray-400 text-sm">Late Night Coding</p>
              <p className="text-white font-medium">500+ Hours</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-400 text-xl">🐛</span>
              </div>
              <p className="text-gray-400 text-sm">Bugs Fixed</p>
              <p className="text-white font-medium">2000+ Issues</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-400 text-xl">🎉</span>
              </div>
              <p className="text-gray-400 text-sm">Happy Clients</p>
              <p className="text-white font-medium">100% Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
