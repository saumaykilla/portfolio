"use client";

import { motion } from "framer-motion";

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  type: "education" | "work";
  features?: string[];
}

export function AboutMe() {

  const timelineData: TimelineItem[] = [
    {
      id: 1,
      year: "2018-2022",
      title: "Bachelor of Technology",
      company: "SRM Institute of Science & Technology",
      description: "Computer Science Engineering - Gained strong foundation in programming, algorithms, and software development principles.",
      type: "education",
      features: [
        "Advanced programming concepts",
        "Algorithm design & analysis",
        "Software engineering principles",
        "Database management systems"
      ]
    },
    {
      id: 2,
      year: "2021-2022",
      title: "Software Development Intern",
      company: "HighRadius",
      description: "Worked on enterprise software solutions, gaining hands-on experience in full-stack development and agile methodologies.",
      type: "work",
      features: [
        "Full-stack development",
        "Agile methodologies",
        "Enterprise software solutions",
        "Team collaboration"
      ]
    },
    {
      id: 3,
      year: "2022-2023",
      title: "Software Developer",
      company: "Wiz Freight",
      description: "Developed and maintained logistics software solutions, contributing to the digital transformation of freight management systems.",
      type: "work",
      features: [
        "Logistics software development",
        "Digital transformation",
        "System maintenance",
        "Performance optimization"
      ]
    },
    {
      id: 4,
      year: "2023-2025",
      title: "Master of Science",
      company: "New York University",
      description: "Management & Systems - Advanced studies in technology management, system design, and business strategy integration.",
      type: "education",
      features: [
        "Technology management",
        "System design",
        "Business strategy",
        "Advanced analytics"
      ]
    },
    {
      id: 5,
      year: "2024-Present",
      title: "Founding Engineer",
      company: "Humainority",
      description: "Building a nonprofit platform that empowers job seekers to create professional resumes and cover letters, making career opportunities more accessible.",
      type: "work",
      features: [
        "Nonprofit platform development",
        "Resume & cover letter tools",
        "Career accessibility",
        "Social impact technology"
      ]
    }
  ];


  const statsData = [
    { label: "Years Experience", value: "3+", icon: "🎯" },
    { label: "Companies Worked", value: "3", icon: "🏢" },
    { label: "Projects Delivered", value: "10+", icon: "🚀" },
    { label: "Technologies Mastered", value: "15+", icon: "⚡" }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="text-blue-600 dark:text-blue-400">Me</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            A journey through education and professional growth, driven by passion for AI technology, 
            healthcare innovation, and making a positive impact on society.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            My Journey
          </h3>
          
          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeOut",
                  delay: 0.1
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                  {/* Year Badge */}
                  <motion.div
                    className={`flex-shrink-0 w-32 text-center ${
                      index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className={` px-4 py-2 rounded-full text-nowrap text-sm font-bold ${
                      item.type === "education"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    }`}>
                      {item.year}
                    </div>
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    className={`flex-1 ${
                      index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                    }`}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-3 h-3 rounded-full ${
                          item.type === "education" ? "bg-blue-500" : "bg-green-500"
                        }`}></div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.type === "education"
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-800 dark:text-blue-300"
                            : "bg-green-50 text-green-600 dark:bg-green-800 dark:text-green-300"
                        }`}>
                          {item.type === "education" ? "Education" : "Work Experience"}
                        </span>
                      </div>

                      {/* Title and Company */}
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
                        {item.company}
                      </h4>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Features */}
                      {item.features && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {item.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <div className={`w-2 h-2 rounded-full ${
                                item.type === "education" ? "bg-blue-400" : "bg-green-400"
                              }`}></div>
                              {feature}
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Technical Skills
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Frontend Skills */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Frontend</h4>
              </div>
              <div className="space-y-2">
                {[
                  "React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", 
                  "Redux", "Tailwind CSS", "HTML5", "CSS3", 
                  "Responsive Design", "Cross-browser Compatibility", 
                  "Accessibility (WCAG)", "Zustand"
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Backend Skills */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⚙️</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Backend</h4>
              </div>
              <div className="space-y-2">
                {[
                  "Python", "Node.js", "Express.js", "RESTful APIs", 
                  "Server-Side Rendering (SSR)"
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Database Skills */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🗄️</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">Database</h4>
              </div>
              <div className="space-y-2">
                {[
                  "Postgres", "SQL", "MongoDB", "Supabase"
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* DevOps & Cloud Skills */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 300, damping: 20 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">☁️</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">DevOps & Cloud</h4>
              </div>
              <div className="space-y-2">
                {[
                  "AWS (Lambda, EC2, S3, Amplify)", "Docker", "CI/CD", 
                  "Langchain", "AI Integrations"
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

   
      </div>
    </section>
  );
}
