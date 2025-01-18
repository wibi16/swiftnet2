import { useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';

const AnimatedCABadge = ({ contractAddress }) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      
      // Create ripple effect
      if (buttonRef.current) {
        const button = buttonRef.current;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = '0px';
        circle.style.top = '0px';
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
          ripple.remove();
        }

        button.appendChild(circle);
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative" ref={buttonRef}>
      <Badge
        onClick={handleCopy}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          group relative cursor-pointer overflow-hidden
          bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900
          hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-950 dark:hover:to-blue-950
          transition-all duration-300 ease-out transform
          hover:scale-105 active:scale-95
          px-4 py-2 text-sm font-medium
          border border-gray-200 dark:border-gray-700
          shadow-lg hover:shadow-cyan-500/25
        `}
      >
        {/* Background animation */}
        <div className="absolute inset-0 -z-10">
          <div className={`
            absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20
            transition-transform duration-700 ease-out
            ${isHovered ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
          `} />
        </div>

        {/* Content container */}
        <div className="flex items-center space-x-2">
          <span className="relative">
            CA: {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
          </span>
          
          {/* Icon container with flip animation */}
          <div className="relative w-4 h-4">
            <span className={`
              absolute inset-0 transition-all duration-300
              ${copied ? 'rotate-y-180 opacity-0' : 'rotate-y-0 opacity-100'}
            `}>
              <Copy className="w-4 h-4" />
            </span>
            <span className={`
              absolute inset-0 transition-all duration-300
              ${copied ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0'}
            `}>
              <Check className="w-4 h-4 text-green-500" />
            </span>
          </div>
        </div>
      </Badge>

      {/* Styles for ripple effect */}
      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 600ms linear;
          background-color: rgba(255, 255, 255, 0.7);
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes rotate-y {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(180deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedCABadge;