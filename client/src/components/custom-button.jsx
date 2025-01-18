import { useState, useEffect, useCallback, useRef } from 'react';

const CyberPulseButton = ({ children, onClick, className }) => {
  const buttonRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);

  const createParticle = useCallback((x, y, type = 'normal') => {
    if (type === 'explosion') {
      return {
        id: Math.random(),
        x,
        y,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 15,
        speedY: (Math.random() - 0.5) * 15,
        life: 1,
        color: `hsl(${Math.random() * 60 + 180}, 100%, 70%)`,
        type: 'explosion'
      };
    }
    
    return {
      id: Math.random(),
      x,
      y,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 5,
      speedY: (Math.random() - 0.5) * 5,
      life: 1,
      color: `hsl(${Math.random() * 60 + 180}, 100%, 70%)`,
      type: 'normal'
    };
  }, []);

  const animate = useCallback(() => {
    setParticles(prevParticles => 
      prevParticles
        .map(p => ({
          ...p,
          x: p.x + p.speedX * (p.type === 'explosion' ? 1.5 : 1),
          y: p.y + p.speedY * (p.type === 'explosion' ? 1.5 : 1),
          size: p.type === 'explosion' ? p.size * 0.95 : p.size,
          life: p.life - (p.type === 'explosion' ? 0.03 : 0.02),
          speedY: p.type === 'explosion' ? p.speedY + 0.2 : p.speedY
        }))
        .filter(p => p.life > 0)
    );
  }, []);

  useEffect(() => {
    if (particles.length > 0) {
      const frame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frame);
    }
  }, [particles, animate]);

  const handleMouseMove = (e) => {
    if (isHovered && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
      
      if (Math.random() > 0.7) {
        setParticles(prev => [...prev, createParticle(x, y)]);
      }
    }
  };

  const handleClick = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const explosionParticles = Array.from(
        { length: 30 }, 
        () => createParticle(x, y, 'explosion')
      );
      setParticles(prev => [...prev, ...explosionParticles]);
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
      onClick?.(e);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setParticles([]);
      }}
      onMouseMove={handleMouseMove}
      className={`
        relative overflow-visible rounded-xl
        px-8 py-4 text-white
        transition-all duration-300
        ${className}
      `}
    >
      {/* Main button background with gradient */}
      <div className={`
        absolute inset-0 rounded-xl
        bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500
        background-animate
        transition-all duration-300
        ${isHovered ? 'scale-105 shadow-lg shadow-cyan-500/50' : 'scale-100'}
        ${isPressed ? 'scale-95' : ''}
      `} />

      {/* Glow effect */}
      <div className={`
        absolute inset-0 rounded-xl
        transition-opacity duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="absolute inset-0 rounded-xl bg-cyan-500 blur-lg opacity-30" />
      </div>

      {/* Border gradient animation */}
      <div className={`
        absolute inset-[-2px] rounded-xl
        bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400
        opacity-0 transition-opacity duration-300
        ${isHovered ? 'opacity-100' : ''}
      `} />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life,
            transform: `translate(-50%, -50%) scale(${particle.type === 'explosion' ? particle.life : 1})`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}

      {/* Mouse trail effect */}
      {isHovered && (
        <div
          className="absolute w-20 h-20 pointer-events-none"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(103,232,249,0.1) 0%, rgba(6,182,212,0) 70%)',
          }}
        />
      )}

      <style jsx>{`
        @keyframes background-animate {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .background-animate {
          background-size: 400%;
          animation: background-animate 3s linear infinite;
        }
      `}</style>
    </button>
  );
};

export default CyberPulseButton;