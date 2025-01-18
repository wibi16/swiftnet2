import React from "react";
import { MoveRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b mt-[10rem] from-background to-gray-100 dark:from-background dark:to-gray-900">
      <div className="container mx-auto py-16 px-4">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">SwiftNet</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Empowering productivity through intelligent automation and
              multi-agent collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Socials</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center group"
                >
                  Twitter
                  <MoveRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center group"
                >
                  Dexscreener
                  <MoveRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Information</h4>
            <ul className="space-y-2">
              {/* <li>
                <Link
                  to="https://kiwis-organization-2.gitbook.io/swiftnet"
                  target="_blank"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center group"
                >
                  About Us
                  <MoveRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li> */}
              <li>
                <Link
                  to="/tokenomics"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center group"
                >
                  Tokenomics
                  <MoveRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center group"
                >
                  Privacy Policy
                  <MoveRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Connect */}
          {/* <div>
                        <h4 className="text-lg font-semibold mb-4">Connect</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center group">
                                    Twitter
                                    <MoveRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center group">
                                    Instagram
                                    <MoveRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/wibi16/swiftnet" target='_blank' className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center group">
                                    github
                                    <MoveRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center group">
                                    Facebook
                                    <MoveRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </li>
                        </ul>
                    </div> */}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              © 2025 SwiftNet. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy-policy"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Privacy Policy
              </Link>
              {/* <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Terms of Service
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
