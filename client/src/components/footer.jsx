import React from "react";
import { MoveRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b mt-16 from-background to-gray-100 dark:from-background dark:to-gray-900">
      <div className="container mx-auto py-16 px-4">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Brand Section */}
          <div className="space-y-4 md:col-span-3">
            <h3 className="text-2xl font-bold">SwiftNet</h3>
            <p className="text-gray-600 dark:text-gray-400 md:w-1/3">
              Empowering productivity through intelligent automation and
              multi-agent collaboration.
            </p>
          </div>


          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Information</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/tokenomics"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center group"
                >
                  Tokenomics
                  <MoveRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              © 2025 SwiftNet. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;