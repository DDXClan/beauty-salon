import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import BorderAnimation from "./borderanimation";
import '@/styles/service_list.css';
import { services_list } from '@/api/servicelist';

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
        if (isInView && !animationComplete) {
            setAnimationComplete(true);
        }
    }, [isInView, animationComplete]);
    
    

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
                        {services_list.map((service, index) => (
                            <motion.li
                                className={`service__list`}
                                key={service.id}
                                initial={{ translateY: 0 }} 
                                animate={isInView ? { translateY: (index % 2 === 0 ? -40 : -108) } : { translateY: 0 }} 
                                transition={{ duration: 0.8, delay: 0.6 }} 
                            >
                                {/* <div className="service__list__block"> */} {/* </div> */}
                                <img className="service__list__img" src={service.img}/>
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
