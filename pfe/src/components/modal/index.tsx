import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    open: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
    closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
}

const index = ({ modal, projects }: {
    modal: { active: boolean, index: number },
    projects: { title: string, src: string, colour: string }[]
}) => {
    const { active, index } = modal;
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const moveContainerX = gsap.quickTo(container.current, "left", { duration: 0.8, ease: "power3" });
        const moveContainerY = gsap.quickTo(container.current, "top", { duration: 0.8, ease: "power3" });

        window.addEventListener("mousemove", (e) => {
            moveContainerX(e.clientX);
            moveContainerY(e.clientY);
        })
    }, [])
    return (
        <motion.div ref={container} variants={scaleAnimation} initial="initial" animate={active ? "open" : "closed"}
            className='flex items-center justify-center absolute h-[300px] w-[350px] overflow-hidden pointer-events-none'>
            <div className='absolute h-full w-full transition-all duration-300' style={{ top: index * -100 + "%" }}>
                {
                    projects.map((project, index) => {
                        const { src, colour } = project;
                        return (
                            <div className='h-full flex items-center justify-center'
                                key={`modal_${index}`} style={{ backgroundColor: colour }}>
                                <Image
                                    style={{ height: 'auto' }}
                                    src={`/images/${src}`}
                                    height={0}
                                    width={300}
                                    alt="picture"
                                />
                            </div>
                        )
                    })
                }
            </div>
        </motion.div>
    )
}

export default index