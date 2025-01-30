import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface AnimatedElementProps {
  children: React.ReactNode
  delay?: number
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: "-50px",
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.6 },
        scale: { duration: 0.7 },
      }}
    >
      {children}
    </motion.div>
  )
}

