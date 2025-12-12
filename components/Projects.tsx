import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PROJECTS = [
     {
    id: 7,
    title: "AI UI Generation",
    category: "Full Stack MVP",
    description:
      "A platform To generate UI designs based on the user input using AI",
    tech: ["React", "TypeScript", "Python", "AWS", "Docker", "Pinecone", "Retrieval Augmented Generation"],
    image: "/UI_Design.png",
    link: "",
    repo: "",
  },
  {
    id: 1,
    title: "JobsHush",
    category: "Full Stack MVP",
    description:
      "A job application platform with features to create tailored resumes and cover letters using AI to increase the chances of getting hired.",
    tech: ["React", "TypeScript", "Python", "AWS", "Docker"],
    image: "https://www.jobshush.com/_next/static/media/jobshush.0fa50676.png",
    link: "https://www.jobshush.com",
    repo: "",
  },
  {
    id: 2,
    title: "Product Market Analysis",
    category: "Full Stack",
    description:
      "An Applciation that uses AI to generate strategies based on the business goals for products in a market.",
    tech: [
      "Next.js",
      "FastAPI",
      "Langchain",
      "Gemini AI",
      "Supabase",
      "Python",
    ],
    image: "/marketing.png",
    link: "",
    repo: "https://github.com/saumaykilla/frontend-segment-ai",
  },
  {
    id: 3,
    title: "Authentication Flow",
    category: "Authentication",
    description:
      "A authentication flow library for react having login, register, forgot password, reset password screens, which can be used to create authentication flow for any react app.",
    tech: ["React", "TypeScript"],
    image: "/authentication-flow.png",
    link: "https://saumay-authentication-flow.vercel.app",
    repo: "https://github.com/saumaykilla/authentication-flow",
  },
  {
    id: 4,
    title: "Multi Step Form",
    category: "Frontend",
    description: "A multi step form to handle user information details",
    tech: ["React", "TypeScript"],
    image: "/multistepform.png",
    link: "https://saumay-multistep-form.vercel.app/",
    repo: "https://github.com/saumaykilla/multistep-form",
  },
  {
    id: 5,
    title: "Data Table System",
    category: "Frontend",
    description:
      "A modern, responsive, and feature-rich data table application. This system provides a comprehensive interface for managing user data with advanced filtering, sorting, and inline editing capabilities.",
    tech: ["React", "TypeScript"],
    image: "/datatable.jpg",
    link: "http://saumay-data-table-system.vercel.app/",
    repo: "https://github.com/saumaykilla/data-table-system",
  },
  {
    id: 6,
    title: "Online Trading Price Tracker",
    category: "Full Stack",
    description:
      "An Applciation tracking the live prices of crypto currencies.",
    tech: ["React", "TypeScript", "Node.js", "Express", "Playwright Scraper"],
    image: "/crypto.png",
    link: "",
    repo: "https://github.com/saumaykilla/Live-Trading-Ticker",
  },
    {
    id: 8,
    title: "Document Processor",
    category: "Full Stack",
    description:
      "An AI-powered application that parses sales order from PDF.",
    tech: ["React", "TypeScript", "Python","Supabase"],
    image: "/docProcessor.png",
    link: "",
    repo: "https://github.com/saumaykilla/document-parser-superBase ",
  },
      {
    id: 9,
    title: "Weather App",
    category: "Frontend",
    description:
      "A Frontend Application that shows the weather of a city.",
    tech: ["React", "API Integration"],
    image: "/weather.png",
    link: "https://saumay-weather-app.vercel.app/",
    repo: "https://github.com/saumaykilla/Weather-app",
  },
];

const Projects = ({
  linkEnter,
  textLeave,
}: {
  linkEnter: () => void;
  textLeave: () => void;
}) => {
  return (
    <section id="projects" className="py-32 px-6 lg:px-24 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Work</h2>
          <p className="text-slate-500 max-w-xl text-lg">
            A curation of digital products built with precision and performance
            in mind.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={linkEnter}
              onMouseLeave={textLeave}
              className="group relative"
            >
              <Card className="h-full border-0 shadow-lg bg-white/50 backdrop-blur-sm overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 rounded-3xl">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 z-10 group-hover:bg-slate-900/0 transition-colors"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-4">
                    {project.link && (
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full h-10 w-10 bg-white/90 backdrop-blur text-slate-900 hover:bg-indigo-600 hover:text-white transition-colors"
                        onClick={() => window.open(project.link, "_blank")}
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </Button>
                    )}
                    {project.repo && (
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full h-10 w-10 bg-black/60 backdrop-blur text-white hover:bg-indigo-600 hover:text-white transition-colors"
                        onClick={() => window.open(project.repo, "_blank")}
                      >
                        <i className="fa-brands fa-github"></i>
                      </Button>
                    )}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <Badge
                      variant="secondary"
                      className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                    >
                      {project.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 line-clamp-3 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, index) => (
                      <span
                        key={index}
                        className="text-xs font-mono text-slate-400"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
