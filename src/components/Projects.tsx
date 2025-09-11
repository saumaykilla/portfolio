"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
} from "lucide-react";

interface Project {
  category: string;
  title: string;
  description: string;
  stack: string[];
  image: string;
  isPDF: boolean;
  link: string;
}

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const projects: Project[] = [
    {
        category: "Full Stack Project",
        title: "Online Trading Ticker",
        description:
          "An Applciation tracking the live prices of crypto currencies.",
        stack: [
          "Next.js",
          "Node.js",
          "Playwright",
          "Tailwind CSS",
          "ShadCN UI",
          "Express.js",
          "ConnectRPC",
          "WebSocket",
        ],
        image: "/Images/crypto.png",
        isPDF: false,
        link: "https://github.com/saumaykilla/Live-Trading-Ticker",
      },
      {
        category: "Full Stack Project",
        title: "Product Market Analysis",
        description:
          "An Applciation that uses AI to generate strategies based on the business goals for products in a market.",
        stack: [
          "Next.js",
          "FastAPI",
          "Langchain",
          "Gemini AI",
          "Supabase",
          "Python"
        ],
        image: "/Images/marketing.png",
        isPDF: false,
        link: "https://frontend-segment-ai.vercel.app/",
      },
    {
      category: "Full Stack Project",
      title: "JobsHush",
      description:
        "An AI-powered platform that helps job seekers optimize their resumes and generate cover letter based on the Job Description.",
      stack: [
        "Next.js",
        "Python",
        "Tailwind CSS",
        "ShadCN UI",
        "AWS",
        "Docker File",
      ],
      image: "/Images/jobsHush.png",
      isPDF: false,
      link: "https://jobshush.com/",
    },
    {
      category: "Full Stack Project",
      title: "Document Processor",
      description:
        "An AI-powered application that parses sales order from PDF.",
      stack: ["Next.js", "Tailwind CSS", "ShadCN UI", "Supabase"],
      image: "/Images/docProcessor.png",
      isPDF: false,
      link: "https://document-parser-super-base.vercel.app/",
    },
    {
      category: "Frontend Project",
      title: "To Do List",
      description:
        "Boost  productivity with a sleek Todo List app! It lets you effortlessly create, complete, and delete tasks. Leveraging the cookie storage, the todos stay intact even after a page refresh.",
      stack: ["Next.js", "Jotai", "Tailwind CSS"],
      image: "/Images/ToDoList.png",
      isPDF: false,
      link: "https://to-do-list-saumay.vercel.app/",
    },
    {
      category: "Frontend Project",
      title: "Weather App",
      description: `Stay ahead of the weather with this intuitive app! Search for any city and instantly access up-to-date weather information. Powered by the OpenWeatherMap API, the app delivers accurate forecasts. With a seamless searchable dropdown from Headless UI and RapidAPI's city search, finding weather updates has never been easier!`,
      stack: ["Next.js", "Headless UI", "Tailwind CSS"],
      image: "/Images/Weather.png",
      isPDF: false,
      link: "https://weather-app-saumay.vercel.app/",
    },
    {
      category: "Database Designing Project",
      title: "Spotify Database Modeling",
      description: `This project aims to enhance Spotify's database management by improving data security and scalability. Key strategies include end-to-end encryption, strict access controls, real-time monitoring, security audits, distributed database architecture, load balancing, and caching mechanisms, ensuring optimal performance and responsiveness as Spotify's user base grows.`,
      stack: ["Oracle Data Modeler", "MySQL"],
      image: "/Images/Spotify.png",
      isPDF: true,
      link: "/PDF/Spotify-Data-Modeling.pdf",
    },
    {
      category: "Database Designing Project",
      title: `Netflix Database Modeling`,
      description:
        "This project at NYU aims to enhance Netflix's password protection, reducing unauthorized access and password sharing from 85% to 20% in four months. Strategies include advanced authentication, user control features, and continuous monitoring, supported by a scalable and secure database architecture to improve security and user experience.",
      stack: ["Oracle Data Modeler", "MySQL"],
      image: "/Images/Netflix.png",
      isPDF: true,
      link: "/PDF/Netflix-Database-Modeling.pdf",
    },
    {
      category: "Data Mining and Warehousing Project",
      title: "Amazon Prime Data Warehousing",
      description: `This project aims to develop an Amazon Prime data warehouse to centralize and analyze customer subscription and video content data. By tracking demographics, subscription plans, renewal dates, and viewing habits, the project seeks to optimize content strategies and enhance client satisfaction through data-driven decision-making.`,
      stack: ["Oracle Data Modeler", "MySQL"],
      image: "/Images/Prime.png",
      isPDF: true,
      link: "/PDF/Prime.pdf",
    },
  ];

  // Function to start auto-play
  const startAutoPlay = () => {
    // Clear existing interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 5000); // Change every 5 seconds
  };

  // Auto-play functionality
  useEffect(() => {
    // Clear existing interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 5000); // Change every 5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [projects.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    startAutoPlay(); // Reset the auto-play timer
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
    startAutoPlay(); // Reset the auto-play timer
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    startAutoPlay(); // Reset the auto-play timer
  };

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My{" "}
            <span className="text-blue-600 dark:text-blue-400">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A showcase of my work across different industries, from healthcare
            AI to social impact technology.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col lg:flex-row min-h-[500px]"
              >
                {/* Project Image */}
                <div className="lg:w-1/2 relative">
                  <div
                    className="h-64 lg:h-full flex items-center justify-center relative overflow-hidden"
                    style={{
                      backgroundImage: `url(${projects[currentIndex].image})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  {/* Project Type Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        projects[currentIndex].isPDF
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {projects[currentIndex].isPDF
                        ? "PDF Report"
                        : "Preview"}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
                      {projects[currentIndex].category}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {projects[currentIndex].title}
                  </h3>

                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {projects[currentIndex].description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[currentIndex].stack.map((tech, index) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    {projects[currentIndex].isPDF ? (
                      <motion.a
                        href={projects[currentIndex].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FileText className="w-4 h-4" />
                        View Report
                      </motion.a>
                    ) : (
                      <motion.a
                        href={projects[currentIndex].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Preview
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-600 dark:bg-blue-400 scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
