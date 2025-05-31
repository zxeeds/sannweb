const services = [
  {
    icon: "🎨",
    title: "UI/UX Design",
    description: "Desain interface yang intuitif dan pengalaman pengguna yang memukau untuk meningkatkan engagement.",
    tech: ["Figma", "Adobe XD", "Sketch"]
  },
  {
    icon: "💻",
    title: "Web Development", 
    description: "Pengembangan website modern dengan teknologi terkini yang responsive, cepat, dan SEO-friendly.",
    tech: ["React", "Next.js", "Node.js"]
  },
  {
    icon: "📱",
    title: "Mobile App",
    description: "Aplikasi mobile native dan cross-platform yang performant untuk iOS dan Android.",
    tech: ["React Native", "Flutter", "Swift"]
  },
  {
    icon: "⚡",
    title: "Performance Optimization",
    description: "Optimasi performa website dan aplikasi untuk loading yang lebih cepat dan user experience yang better.",
    tech: ["Lighthouse", "GTMetrix", "Core Web Vitals"]
  },
  {
    icon: "🔧",
    title: "Technical Consulting",
    description: "Konsultasi teknis untuk arsitektur sistem, pemilihan teknologi, dan strategi pengembangan.",
    tech: ["Architecture", "DevOps", "Cloud"]
  },
  {
    icon: "🚀",
    title: "MVP Development",
    description: "Pengembangan Minimum Viable Product untuk startup dan bisnis yang ingin validasi ide dengan cepat.",
    tech: ["Rapid Prototyping", "Agile", "Lean"]
  }
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-4">
            What I Do
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Services & Expertise
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Solusi lengkap untuk kebutuhan digital Anda, dari konsep hingga implementasi
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {service.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
