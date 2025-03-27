
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const mousePosition = useRef({ x: 0, y: 0 });
  const isMouseMoving = useRef(false);
  const mouseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const createParticles = () => {
      particles.current = [];
      const particleCount = Math.min(100, Math.floor(window.innerWidth / 15));
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: Math.random() * 0.3 - 0.15,
          speedY: Math.random() * 0.3 - 0.15,
          opacity: Math.random() * 0.5 + 0.2,
          color: getRandomColor()
        });
      }
    };

    const getRandomColor = () => {
      const colors = [
        'rgba(91, 15, 178, 0.7)',   // cosmic-500
        'rgba(166, 125, 227, 0.6)',  // cosmic-300
        'rgba(200, 169, 240, 0.5)',  // cosmic-200
        'rgba(255, 255, 255, 0.6)',  // white
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // Draw and update function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle, index) => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Connect particles
        connectParticles(particle, index);
        
        // Interact with mouse
        if (isMouseMoving.current) {
          const dx = particle.x - mousePosition.current.x;
          const dy = particle.y - mousePosition.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            particle.x += Math.cos(angle) * force * 2;
            particle.y += Math.sin(angle) * force * 2;
          }
        }
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    const connectParticles = (particle: Particle, index: number) => {
      for (let i = index + 1; i < particles.current.length; i++) {
        const otherParticle = particles.current[i];
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(91, 15, 178, ${0.15 * (1 - distance / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      }
    };
    
    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      isMouseMoving.current = true;
      
      // Reset mouse moving state after inactivity
      if (mouseTimeoutRef.current !== null) {
        window.clearTimeout(mouseTimeoutRef.current);
      }
      
      mouseTimeoutRef.current = window.setTimeout(() => {
        isMouseMoving.current = false;
      }, 100);
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Initialize and start animation
    createParticles();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId.current);
      if (mouseTimeoutRef.current !== null) {
        window.clearTimeout(mouseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
};

export default ParticleBackground;
