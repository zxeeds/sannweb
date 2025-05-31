import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="relative max-w-4xl mx-auto text-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            Ready to Start?
          </span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Let's Build Something
          <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Amazing Together
          </span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Punya ide project yang menarik? Mari diskusikan bagaimana kita bisa mewujudkannya. 
          Konsultasi pertama gratis!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="/contact"
            className="group bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/25"
          >
            Start a Project
            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">🚀</span>
          </Link>
          <Link
            href="/services"
            className="border border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all hover:bg-gray-800/50"
          >
            View All Services
          </Link>
        </div>
        
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-400 text-xl">📧</span>
            </div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-white font-medium">hello@sann.dev</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-400 text-xl">💬</span>
            </div>
            <p className="text-gray-400 text-sm">WhatsApp</p>
            <p className="text-white font-medium">+62 xxx xxxx xxxx</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-400 text-xl">⚡</span>
            </div>
            <p className="text-gray-400 text-sm">Response Time</p>
            <p className="text-white font-medium">&lt; 24 hours</p>
          </div>
        </div>
      </div>
    </section>
  );
}
