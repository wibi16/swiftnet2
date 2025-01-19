import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { Badge } from "../components/ui/badge";
import gitbookIcon from "../assets/gitbook.png";
import AnimatedCABadge from "./animated-copy-btn";
import axios from "axios"

const Navbar = () => {
  const [copied, setCopied] = useState(false);
  const [caAddress, setCaAddress] = useState("f6b4d5a9b09d508bbce9f49ed7b5fa707865e");

  const handleCopy = () => {
    navigator.clipboard.writeText(caAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    axios.get("https://catools.dev3vds1.link/get/swiftnet")
    .then((res)=>{
      console.log(res);
      setCaAddress(res.data[0]['address'])
    })
    .catch((err)=>{
      console.log(err);
    })
     
  },[])

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 py-1 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center hover:scale-105 duration-300">
              <img
                src="/logo.png"
                className="w-20 h-auto bg-blend-multiply mix-blend-multiply"
                alt="logo"
              />
              <Link
                to="/"
                className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                SwiftNet
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center justify-center space-x-4">

            <AnimatedCABadge
              contractAddress={caAddress}
            />

            <div className="flex items-center space-x-3">
              {/* Twitter Link */}
              <Link
                to="https://twitter.com/swiftnetai"
                target="_blank"
                className="flex flex-col items-center hover:scale-110 transition-all duration-300"
              >
                <Button variant="icon" className="flex items-center justify-center">
                  <img
                    width="35"
                    height="35"
                    src="https://img.icons8.com/?size=100&id=YfCbGWCWcuar&format=png&color=515251"
                    alt="Twitter"
                    className="dark:invert"
                  />
                </Button>
              </Link>

              {/* GitHub Link */}
              <Link
                to="https://github.com/wibi16/swiftnet2"
                target="_blank"
                className="flex flex-col items-center hover:scale-110 transition-all duration-300"
              >
                <Button variant="icon" className="flex items-center justify-center">
                  <img
                    width="35"
                    height="35"
                    src="https://img.icons8.com/?size=100&id=62856&format=png&color=515251"
                    alt="Github"
                    className="dark:invert"
                  />
                </Button>
              </Link>

              {/* Docs Link */}
              <Link
                to="http://docs.swiftnet.ai/"
                className="flex flex-col items-center hover:scale-110 transition-all duration-300"
              >
                <Button variant="icon" className="flex items-center justify-center">
                  <img
                    width="50"
                    height="50"
                    src={gitbookIcon}
                    alt="Docs"
                    className="opacity-75"
                  />
                </Button>
              </Link>

              <Link
                to="/"
                className="flex flex-col items-center hover:scale-110 transition-all duration-300"
              >
                <Button variant="icon" className="flex items-center justify-center">
                  <img
                    width="30"
                    height="30"
                    src="/dex.png"
                    alt="Docs"
                    className="opacity-75 rounded-md"
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
