export const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: (
    i = 1 
  ) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.15 * i,
      delayChildren: 0.05 * i,
    },
  }),
};

export const itemVariants = {
  hidden: { 
    y: 30, 
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 10,
    }
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    },
  },
}; 