"use client";
import { useState, useEffect, useRef } from 'react';

const experiences = [
  {
    year: "2024 - Present",
    title: "Senior Full-Stack Developer",
    company: "Tech Innovators Inc.",
    type: "Full-time",
    description: "Leading development of enterprise web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting scalable solutions.",
    achievements: [
      "Improved application performance by 40%",
      "Led team of 5 developers",
      "Implemented CI/CD pipelines"
    ],
    tech: ["React", "Node.js", "AWS", "Docker"]
  },
  {
    year: "2023 - 2024",
    title: "Full-Stack Developer",
    company: "Digital Solutions Co.",
    type: "Full-time",
    description: "Developed and maintained multiple client projects ranging from e-commerce platforms to SaaS applications. Collaborated with design teams to create pixel-perfect implementations.",
    achievements: [
      "Delivered 15+ successful projects",
      "Reduced bug reports by 60%",
      "Implemented automated testing"
    ],
    tech: ["Vue.js", "Express.js", "PostgreSQL", "Tailwind"]
  },
  {
    year: "2022 - 2023",
    title: "Frontend Developer",
    company: "Creative Agency",
    type: "Contract",
    description: "Specialized in creating responsive, interactive websites for various clients. Focused on performance optimization and user experience enhancement.",
    achievements: [
      "Improved site speed by 50%",
      "Created reusable component library",
      "Achieved 98% client satisfaction"
    ],
    tech: ["React", "SCSS", "JavaScript", "Figma"]
  },
  {
    year: "2021 - 2022",
    title: "Junior Developer",
    company: "StartUp Hub",
    type: "Full-time",
    description: "Started my professional journey building web applications and learning industry best practices. Contributed to various projects while continuously expanding my skill set.",
    achievements: [
      "Completed 10+ learning modules",
      "Built first production application",
      "Received 'Quick Learner' award"
    ],
    tech: ["HTML", "CSS", "JavaScript", "PHP"]
  }
];

export default function AboutExperience() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate items one by one
          experiences.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index]);
            }, index * 200);
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
    <section ref={sectionRef} className="py-20 bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-orange-600/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-medium mb-4">
              Career Path
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A journey of growth, learning, and delivering exceptional results
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  className={`relative transition-all duration-700 delay-${index * 200} ${
                    visibleItems.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-gray-950"></div>

                  {/* Content */}
                  <div className="ml-20">
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/80 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full mb-2">
                            {exp.year}
                          </span>
                          <h3 className="text-2xl font-semibold text-white mb-1">{exp.title}</h3>
                          <p className="text-blue-400 font-medium">{exp.company} • {exp.type}</p>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-6 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-white font-semibold mb-3">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-center text-gray-300">
                              <span className="text-green-400 mr-3">✓</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600/50">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
