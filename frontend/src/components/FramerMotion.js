import { motion } from 'framer-motion';

const pageVariants = {
  in: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  },
  initialLeft: {
    opacity: 0,
    x: '-100vw',
    scale: 0.5,
  },
  initialRight: {
    opacity: 0,
    x: '100vw',
    scale: 0.5,
  },
  initialBottom: {
    opacity: 0,
    y: '100vh',
    scale: 0.5,
  },
  initialTop: {
    opacity: 0,
    y: '-100vh',
    scale: 0.5,
  },
  outLeft: {
    opacity: 0,
    x: '-100vw',
    scale: 0.5,
  },
  outRight: {
    opacity: 0,
    x: '100vw',
    scale: 0.5,
  },
  outBottom: {
    opacity: 0,
    y: '100vh',
    scale: 0.5,
  },
  outTop: {
    opacity: 0,
    y: '-100vh',
    scale: 0.5,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 1,
};
export default function NavAnimation({ children, start, end }) {
  return (
    <motion.div
      initial={start}
      animate="in"
      exit={end}
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
