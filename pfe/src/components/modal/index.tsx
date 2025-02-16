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
    const cursor = useRef<HTMLDivElement>(null);
    const cursorText = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const moveContainerX = gsap.quickTo(container.current, "left", { duration: 0.8, ease: "power3" });
        const moveContainerY = gsap.quickTo(container.current, "top", { duration: 0.8, ease: "power3" });

        const moveCursorX = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" });
        const moveCursorY = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" });

        const moveCursorTextX = gsap.quickTo(cursorText.current, "left", { duration: 0.45, ease: "power3" });
        const moveCursorTextY = gsap.quickTo(cursorText.current, "top", { duration: 0.45, ease: "power3" });

        window.addEventListener("mousemove", (e) => {
            moveContainerX(e.clientX);
            moveContainerY(e.clientY);
            moveCursorX(e.clientX);
            moveCursorY(e.clientY);
            moveCursorTextX(e.clientX);
            moveCursorTextY(e.clientY);
        })
    }, [])
    return (
        <>
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
            <motion.div ref={cursor} variants={scaleAnimation} initial="initial" animate={active ? "open" : "closed"}
                className='w-20 h-20 bg-[#455CE9] absolute pointer-events-none rounded-full flex items-center justify-center'>
            </motion.div>
            <motion.div ref={cursorText} variants={scaleAnimation} initial="initial" animate={active ? "open" : "closed"}
                className='text-white bg-transparent absolute pointer-events-none'>View</motion.div>
        </>
    )
}

export default index