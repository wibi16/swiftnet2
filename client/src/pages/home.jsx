import { cn } from "@/lib/utils";
import { DotPattern } from "../components/ui/dot-pattern";
import ShimmerButton from "@/components/ui/shimmer-button";
import Navbar from "../components/navbar";
import { AnimatedBeamMultipleOutputDemo } from "../components/beams";
import { MagicCard } from "@/components/ui/magic-card";
import Footer from "../components/footer";
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useEffect } from "react";
import CyberPulseButton from "../components/custom-button";
// Animation variants for different elements
const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
};

const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 }
};

const staggerChildren = {
    animate: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const Home = () => {
    const { login, authenticated } = usePrivy();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login();
            if (authenticated) {
                navigate("/chat")
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white to-cyan-100" />

                <motion.h1
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="z-10 text-center lg:text-8xl md:text-7xl text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent animate-gradient"
                >
                    SwiftNet
                </motion.h1>

                <motion.p
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="z-10 lg:w-1/3 md:w-1/2 w-full text-center text-xl leading-relaxed my-4 text-gray-700 dark:text-gray-300"
                >
                    Dynamic platform that seamlessly integrates multiple AI agents for smarter and more accurate results.
                </motion.p>

                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="z-10 mt-8"
                >
                    <CyberPulseButton
                        onClick={handleLogin}
                        className="z-10 mt-8"
                    >
                        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                            Get Started
                        </span>
                    </CyberPulseButton>
                </motion.div>

                <DotPattern
                    width={10}
                    height={10}
                    className="h-screen fill-cyan-600/20 dark:fill-cyan-400/20"
                />
            </div>

            {/* Productivity Section */}
            <div className="bg-gradient-to-b from-cyan-100 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="min-h-screen container mx-auto py-20">
                    <motion.h2
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-bold text-6xl text-center mb-8"
                    >
                        Be 5x more Productive
                    </motion.h2>

                    <motion.p
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center text-xl mx-auto my-8 w-full text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl"
                    >
                        Work like never before. Elevate your tasks with specialized agents working together to complete your work.
                        Precise and reliable results increase your productivity rate by several folds.
                    </motion.p>

                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="my-10"
                    >
                        <AnimatedBeamMultipleOutputDemo />
                    </motion.div>

                    <motion.p
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center text-xl mx-auto my-8 w-full text-gray-700 dark:text-gray-300 leading-relaxed max-w-5xl"
                    >
                        Dedicated deck of agents specialized to solve task more effectively than anyone. Agents not only limited to chats elevate web surfing, code excution and many more in a single task.
                    </motion.p>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white dark:bg-gray-900 py-20">
                <div className="container mx-auto">
                    <motion.h2
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="bg-gradient-to-r py-4 from-cyan-500 to-blue-500 bg-clip-text text-transparent font-bold text-6xl text-center mb-20"
                    >
                        Multi Agent for Multi Purpose
                    </motion.h2>

                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={staggerChildren}
                        className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8"
                    >
                        {[
                            {
                                icon: "https://img.icons8.com/?size=100&id=NHf3Nw8jio00&format=png&color=515251",
                                title: "Task Master",
                                description: "Oversees task delegation, guiding agents to complete tasks effectively and on time."
                            },
                            {
                                icon: "https://img.icons8.com/?size=100&id=9m41mZRgjWQY&format=png&color=515251",
                                title: "Browser Bot",
                                description: "Automates browsing tasks such as data scraping, form filling, and web navigation for efficiency."
                            },
                            {
                                icon: "https://img.icons8.com/?size=100&id=ilaNo2CsqDrK&format=png&color=515251",
                                title: "File Scout",
                                description: "Organizes and categorizes files for quick retrieval, enhancing workflow efficiency and accessibility."
                            },
                            {
                                icon: "https://img.icons8.com/?size=100&id=NpWB6GLVTcND&format=png&color=515251",
                                title: "Code Smith",
                                description: "Develops and refines code, crafting efficient software solutions and ensuring optimal performance."
                            },
                            {
                                icon: "https://img.icons8.com/?size=100&id=2160&format=png&color=515251",
                                title: "Shell Commander",
                                description: "Executes system commands and automates terminal tasks, enhancing workflow with streamlined processes."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                            >
                                <MagicCard
                                    className="cursor-pointer flex-col items-center justify-center p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                                    gradientColor="rgba(6, 182, 212, 0.1)"
                                >
                                    <img
                                        width="60"
                                        height="60"
                                        className="mx-auto dark:invert"
                                        src={feature.icon}
                                        alt={feature.title}
                                    />
                                    <h3 className="text-2xl font-semibold text-center py-4 text-gray-800 dark:text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="px-4 text-center text-gray-600 dark:text-gray-300">
                                        {feature.description}
                                    </p>
                                </MagicCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;