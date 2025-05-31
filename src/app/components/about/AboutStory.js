"use client";
import { useState, useEffect, useRef } from 'react';

export default function AboutStory() {
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
    <section ref={sectionRef} className="py-20 bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-600/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-4">
              My Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Story Behind the Code
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">How It All Started</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                My journey into the world of programming began during my college years when I first 
                encountered HTML and CSS. What started as curiosity quickly turned into passion as I 
                discovered the power of creating something from nothing but lines of code.
              </p>
              <p className="text-gray-300 leading-relaxed">
                The moment I built my first interactive website, I knew I had found my calling. 
                The ability to solve problems, create beautiful interfaces, and bring ideas to life 
                through technology became my driving force.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">The Learning Never Stops</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Technology evolves rapidly, and I embrace this constant change. From mastering 
                JavaScript frameworks to exploring cloud technologies, I'm always learning and 
                adapting to stay at the forefront of web development.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Every project teaches me something new, every challenge makes me stronger, and 
                every client interaction helps me understand the real-world impact of good software.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Beyond the Code</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge with the developer community. I believe 
                in giving back and helping others on their coding journey.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I also enjoy photography, which has taught me about composition and attention to 
                detail - skills that translate beautifully into UI/UX design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
