import React from 'react';
import { 
  Shield, 
  Eye, 
  Settings, 
  User, 
  Mail, 
  Lock, 
  Database,
  UserCheck,
  Globe,
  Bell
} from 'lucide-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 dark:from-cyan-900/20 dark:to-blue-900/20 animate-gradient" />
        
        <div className="container mx-auto px-4 py-24 text-center relative">
          <div className="inline-block p-4 mb-6 rounded-2xl bg-white/30 dark:bg-white/10 backdrop-blur-lg">
            <Shield className="w-12 h-12 text-cyan-500 dark:text-cyan-400 animate-bounce-slow" />
          </div>
          
          <h1 className="text-5xl md:text-6xl pb-8 font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Your privacy matters to us. Learn how we protect and respect your data.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: <Eye className="w-8 h-8" />,
              title: "Information Collection",
              description: "We collect and process your data with utmost care and transparency.",
              items: ["Personal details", "Usage statistics", "Device information"]
            },
            {
              icon: <Settings className="w-8 h-8" />,
              title: "How We Use Data",
              description: "Your data helps us provide and improve our services.",
              items: ["Service optimization", "Platform security", "User experience"]
            },
            {
              icon: <Lock className="w-8 h-8" />,
              title: "Data Security",
              description: "Industry-leading security measures to protect your information.",
              items: ["Encryption", "Regular audits", "Secure storage"]
            },
            {
              icon: <UserCheck className="w-8 h-8" />,
              title: "Your Rights",
              description: "You have full control over your personal information.",
              items: ["Access rights", "Data portability", "Deletion options"]
            }
          ].map((section, index) => (
            <div 
              key={index}
              className="group relative p-8 bg-gradient-to-br from-white to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 dark:from-cyan-800/20 dark:to-blue-800/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative">
                <div className="inline-block p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </div>
                
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                  {section.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {section.description}
                </p>
                
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="flex items-center text-gray-600 dark:text-gray-300 group-hover:translate-x-2 transition-transform duration-300"
                    >
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Mail className="w-5 h-5 text-cyan-500" />
            <span>privacy@swiftnet.ai</span>
          </div>
          
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Last updated: January 15, 2025
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;