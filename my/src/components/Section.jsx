import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function Section({ children, index = 0, noAnimation = false }) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  const commonStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  if (noAnimation) {
    return (
      <section
        style={commonStyle}
      >
        {children}
      </section>
    );
  }

  const initialX = index % 2 === 0 ? -200 : 200;
  const transition = {
    duration: 0.8,
    ease: "anticipate",
    ...(index === 0 && { delay: 0.5 })
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, x: initialX }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: initialX }}
      transition={transition}
      style={commonStyle}
    >
      {children}
    </motion.section>
  );
}