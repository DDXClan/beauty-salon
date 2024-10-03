import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import BorderAnimation from "./borderanimation";
import '@/styles/service_list.css';

type Service = {
    id: number;
    name: string;
};

const services: Service[] = [
    { id: 0, name: 'Покраска ногтей' },
    { id: 1, name: 'Покраска волос' },
    { id: 2, name: 'Стрижка' },
    { id: 3, name: 'Педикюр' },
    { id: 4, name: 'Маникюр' },
    { id: 5, name: 'Укладка волос' },
    { id: 6, name: 'Массаж' },
    { id: 7, name: 'Эпиляция' },
    { id: 8, name: 'Косметические процедуры' },
    { id: 9, name: 'Макияж' },
];

const ServiceList = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [animationComplete, setAnimationComplete] = useState(false);
    const [borderAnimationCount, setBorderAnimationCount] = useState(0);
    const totalBorders = 4; 
    const handleAnimationComplete = () => {
        setBorderAnimationCount(prevCount => prevCount + 1);
    };

    useEffect(() => {
        if (borderAnimationCount === totalBorders) {
            setAnimationComplete(true);
        }
    }, [borderAnimationCount]);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (isInView) {
                setAnimationComplete(true);
            }
        }, 100); 
    
        return () => clearTimeout(timer);
    }, [isInView]);
    
    

    return ( 
        <div className="all__service__list">
            <motion.div
                className="service__list__main"
                ref={ref}
                initial={{ skew: 1, boxShadow: '4px 4px 64px 2px rgba(255, 255, 255, 0.5)' }}
                animate={{
                    skew: isInView ? 8 : 0,
                    boxShadow: isInView ? '4px 4px 64px 2px rgba(255, 255, 255, 0.2)' : '0px 0px 64px 4px rgba(255, 255, 255, 0.5)'
                }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <BorderAnimation isInView={isInView} onAnimationComplete={handleAnimationComplete} />

                <motion.div className="service__list__container">
                    <motion.ul
                        className="service__list__ul"
                        initial="hidden"
                        animate={animationComplete ? "visible" : "hidden"}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.5 } }
                        }}
                    >
                        {services.map((service, index) => (
                            <motion.li
                                className={`service__list`}
                                key={service.id}
                                initial={{ translateY: 0 }} 
                                animate={animationComplete ? { translateY: (index % 2 === 0 ? -40 : -108) } : { translateY: 0 }} 
                                transition={{ duration: 0.5, delay: 0.6 }} 
                            >
                                <div className="service__list__block"></div>
                                <p className="service__list__name">{service.name}</p>
                            </motion.li>    
                        ))}
                    </motion.ul>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default ServiceList;
