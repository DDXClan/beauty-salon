
import { motion } from 'framer-motion';

interface BorderAnimationProps {
    isInView: boolean;
    onAnimationComplete: () => void;
}

const BorderAnimation = ({ isInView, onAnimationComplete }: BorderAnimationProps) => {
    
    return (
        <>
            <motion.div 
                className="borderAnimation top" 
                initial={{ width: '0%', opacity: 1 }} 
                animate={isInView ? { width: '100%', opacity: 1 } : { width: '0%', opacity: 0 }} 
                transition={{ duration: 0.5, ease: "easeInOut" }} 
                onAnimationComplete={onAnimationComplete}
            />

            <motion.div 
                className="borderAnimation right" 
                initial={{ height: '0%', opacity: 1 }} 
                animate={isInView ? { height: '100%', opacity: 1 } : { height: '0%', opacity: 0 }} 
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }} 
                onAnimationComplete={onAnimationComplete}
            />

            <motion.div 
                className="borderAnimation bottom" 
                initial={{ width: '0%', opacity: 1 }} 
                animate={isInView ? { width: '100%', opacity: 1 } : { width: '0%', opacity: 0 }} 
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }} 
                onAnimationComplete={onAnimationComplete}
            />

            <motion.div 
                className="borderAnimation left" 
                initial={{ height: '0%', opacity: 1 }} 
                animate={isInView ? { height: '100%', opacity: 1 } : { height: '0%', opacity: 0 }} 
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }} 
                onAnimationComplete={onAnimationComplete}
            />
        </>
    );
};

export default BorderAnimation;
