import { IconType } from "react-icons";
import Link from "next/link";

import { 
  FaStethoscope,
  FaUserMd,
  FaShieldAlt,
  FaLock,
  FaEyeSlash,
  FaSearch,
  FaBrain,
  FaExclamationTriangle,
  FaClipboardList,
  FaChartLine 
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1e33] to-[#1a2a3a] text-white font-sans">
      {/* Top Navigation */}
      <header className="w-full px-10 py-6 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div className="text-blue-400 text-4xl">
            <FaStethoscope size="1em" />
          </div>
          <h1 className="text-xl font-semibold">SymptomAnalyzer</h1>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium opacity-90">
          <a href="#" className="hover:text-blue-400 transition">Home</a>
          <a href="#" className="hover:text-blue-400 transition">How It Works</a>
          <a href="#" className="hover:text-blue-400 transition">Features</a>
          <a href="#" className="hover:text-blue-400 transition">Privacy</a>
          <a href="#" className="hover:text-blue-400 transition">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-10 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Left Text */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Analyze Your Symptoms with AI Precision
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            Input your symptoms and get instant, AI-powered insights into possible conditions, risk levels, and next steps. Always consult a healthcare professional for accurate diagnosis.
          </p>

         <Link
  href="/systemanaa"
  className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-medium shadow-lg transition transform hover:scale-105"
>
  Start Analysis
</Link>

        </div>

        {/* Right Hero Icon */}
        <div className="flex justify-center">
          <div className="text-blue-400 opacity-80 drop-shadow-2xl">
            <FaUserMd size="9rem" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-10 py-16">
        <h3 className="text-2xl font-semibold mb-10 text-center">Key Features</h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {[
            { icon: FaClipboardList, label: "Symptom Input" },
            { icon: FaBrain, label: "AI Analysis" },
            { icon: FaExclamationTriangle, label: "Risk Assessment" },
            { icon: FaSearch, label: "Personalized Advice" },
            { icon: FaChartLine, label: "Health Tracking" }
          ].map(({ icon: Icon, label }, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-3 px-4 hover:scale-105 transition transform"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center shadow-lg">
                <div className="text-blue-400">
                  <Icon size="2.5rem" />
                </div>
              </div>
              <p className="text-sm opacity-90">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-10 py-16 border-t border-white/10">
        <h3 className="text-2xl font-semibold mb-10 text-center">How SymptomAnalyzer Works</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="hover:scale-105 transition transform">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <div className="text-blue-400">
                <FaClipboardList size="3.5rem" />
              </div>
            </div>
            <p className="text-lg font-medium">Describe Your Symptoms</p>
            <p className="text-sm text-gray-300 mt-2">Enter details like duration, severity, and location.</p>
          </div>

          <div className="hover:scale-105 transition transform">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <div className="text-blue-400">
                <FaBrain size="3.5rem" />
              </div>
            </div>
            <p className="text-lg font-medium">AI-Powered Analysis</p>
            <p className="text-sm text-gray-300 mt-2">Our AI cross-references with medical databases for insights.</p>
          </div>

          <div className="hover:scale-105 transition transform">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <div className="text-blue-400">
                <FaSearch size="3.5rem" />
              </div>
            </div>
            <p className="text-lg font-medium">Get Recommendations</p>
            <p className="text-sm text-gray-300 mt-2">Receive possible causes, urgency levels, and advice to seek care.</p>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="px-10 py-16 border-t border-white/10">
        <h3 className="text-2xl font-semibold mb-10 text-center">Your Privacy & Security</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          <div className="hover:scale-105 transition transform">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <div className="text-blue-400">
                <FaShieldAlt size="2.5rem" />
              </div>
            </div>
            <p className="font-medium">HIPAA Compliant</p>
            <p className="text-sm text-gray-300 mt-2">Your data is protected under strict medical privacy laws.</p>
          </div>

          <div className="hover:scale-105 transition transform">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <div className="text-blue-400">
                <FaLock size="2.5rem" />
              </div>
            </div>
            <p className="font-medium">End-to-End Encryption</p>
            <p className="text-sm text-gray-300 mt-2">All information is securely encrypted and anonymized.</p>
          </div>

          <div className="hover:scale-105 transition transform">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <div className="text-blue-400">
                <FaEyeSlash size="2.5rem" />
              </div>
            </div>
            <p className="font-medium">No Data Storage</p>
            <p className="text-sm text-gray-300 mt-2">We don't store personal data—analysis is done in real-time.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-10 py-20 text-center">
        <p className="text-xl text-gray-300 mb-6 max-w-xl mx-auto">
          Take control of your health. Analyze symptoms quickly and get informed insights.
        </p>

        <a
          href="#"
          className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-10 py-4 rounded-full text-lg font-semibold shadow-lg transition transform hover:scale-105"
        >
          Try It Now
        </a>
      </section>

      {/* Footer */}
      <footer className="px-10 py-6 text-center text-sm text-gray-400 border-t border-white/10">
        © {new Date().getFullYear()} SymptomAnalyzer. Not a substitute for professional medical advice.
      </footer>
    </div>
  );
}