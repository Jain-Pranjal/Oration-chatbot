'use client'
import React from 'react'
import { motion } from 'framer-motion'

const StatisticsSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
            },
        },
    }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-12 bg-black px-4 py-16 md:gap-20 md:px-16 md:py-20">
            <motion.div
                className="flex w-full max-w-[850px] flex-col items-center justify-start gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                <motion.div
                    className="flex flex-col items-center justify-start gap-6 self-stretch"
                    variants={itemVariants}
                >
                    <motion.div
                        className="flex items-center justify-start gap-3 rounded-2xl border border-gray-600 bg-black px-4 py-1.5"
                        variants={itemVariants}
                    >
                        <div className="flex items-center justify-start gap-2">
                            <div className="font-sans text-sm leading-5 font-medium text-gray-200">
                                Our statistics
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="self-stretch text-center font-sans text-3xl leading-tight font-normal text-white md:text-5xl md:leading-[67.20px] lg:text-[56px]"
                        variants={itemVariants}
                    >
                        The numbers that define our success
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                className="flex flex-col items-start justify-start gap-6 self-stretch md:gap-8 lg:flex-row"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                <motion.div
                    className="flex flex-1 flex-col items-start justify-start gap-8 rounded-[15px] bg-black bg-gradient-to-b from-[rgba(196,227,255,0.12)] to-[rgba(196,227,255,0.02)] p-6 md:gap-12 md:p-8"
                    variants={cardVariants}
                >
                    <div className="self-stretch font-['Roboto'] text-5xl leading-tight font-normal text-white md:text-6xl md:leading-[104px] lg:text-[80px]">
                        92%
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2 self-stretch">
                        <div className="font-sans text-lg leading-7 font-normal text-white md:text-xl">
                            Interview Success Rate
                        </div>
                        <div className="self-stretch font-sans text-sm leading-6 font-normal text-white opacity-80 md:text-base">
                            Users who received interview offers after using our
                            AI career counseling
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="flex flex-1 flex-col items-start justify-start gap-8 rounded-[15px] bg-black bg-gradient-to-b from-[rgba(196,227,255,0.12)] to-[rgba(196,227,255,0.02)] p-6 md:gap-12 md:p-8"
                    variants={cardVariants}
                >
                    <div className="self-stretch font-['Roboto'] text-5xl leading-tight font-normal text-white md:text-6xl md:leading-[104px] lg:text-[80px]">
                        45%
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2 self-stretch">
                        <div className="font-sans text-lg leading-7 font-normal text-white md:text-xl">
                            Average Salary Increase
                        </div>
                        <div className="self-stretch font-sans text-sm leading-6 font-normal text-white opacity-80 md:text-base">
                            Career transitions led to higher compensation for
                            our users
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="flex flex-1 flex-col items-start justify-start gap-8 rounded-[15px] bg-black bg-gradient-to-b from-[rgba(196,227,255,0.12)] to-[rgba(196,227,255,0.02)] p-6 md:gap-12 md:p-8"
                    variants={cardVariants}
                >
                    <div className="self-stretch font-['Roboto'] text-5xl leading-tight font-normal text-white md:text-6xl md:leading-[104px] lg:text-[80px]">
                        2.5x
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2 self-stretch">
                        <div className="font-sans text-lg leading-7 font-normal text-white md:text-xl">
                            Faster Job Search
                        </div>
                        <div className="self-stretch font-sans text-sm leading-6 font-normal text-white opacity-80 md:text-base">
                            Users find new opportunities 2.5 times faster with
                            AI guidance
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="flex flex-1 flex-col items-start justify-start gap-8 rounded-[15px] bg-black bg-gradient-to-b from-[rgba(196,227,255,0.12)] to-[rgba(196,227,255,0.02)] p-6 md:gap-12 md:p-8"
                    variants={cardVariants}
                >
                    <div className="self-stretch font-['Roboto'] text-5xl leading-tight font-normal text-white md:text-6xl md:leading-[104px] lg:text-[80px]">
                        98%
                    </div>
                    <div className="flex flex-col items-start justify-start gap-2 self-stretch">
                        <div className="font-sans text-lg leading-7 font-normal text-white md:text-xl">
                            User Satisfaction
                        </div>
                        <div className="self-stretch font-sans text-sm leading-6 font-normal text-white opacity-80 md:text-base">
                            Users report high satisfaction with personalized
                            career guidance
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default StatisticsSection
