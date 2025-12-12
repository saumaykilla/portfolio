import { motion } from "framer-motion";


const EXPERIENCE = [
      {
    id: 2,
    role: "Founding Full Stack Developer",
    company: "Creative Pulse Agency",
    period: "AUG 2024 - PRESENT",
    description:
      "Led the development of scalable web applications, designed robust APIs, and mentored a team of junior developers, significantly improving system performance.",
  },
  {
    id: 1,
    role: "MS in Management Information Systems",
    company: "New York University",
    period: "SEPT 2023 - MAY 2025",
    description:
      "Focused on Advanced studies in technology management, system design, and business strategy integration.",
  },

  {
    id: 3,
    role: "Software Developer",
    company: "Wiz Freight",
    period: "APRIL 2022 - JULY 2023",
    description:
      "Contributed to the development and maintenance of various client websites using modern web technologies, actively collaborating with UI/UX designers.",
  },
  {
    id: 4,
    role: "Software Developer Intern",
    company: "Highradius",
    period: "AUG 2021 - MARCH 2022",
    description:
      "Contributed to the development and maintenance of various client websites using modern web technologies, actively collaborating with UI/UX designers.",
  },
  {
    id: 5,
    role: "Bachelor's in Computer Science & Engineering",
    company: "SRM Institute of Science and Technology",
    period: "JULY 2018 - MAY 2022",
    description:
      "Covered fundamental computer science principles, software design, and object-oriented programming.",
  },
];

const Timeline = () => {
  return (
         <section
        id="timeline"
        className="py-32 px-6 lg:px-24 bg-white/40 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold mb-4">The Journey</h2>
            <p className="text-slate-500">
              My professional evolution over the years.
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 transform md:-translate-x-1/2"></div>

            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 mb-16 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="flex-1 md:text-right md:pt-2">
                  <div
                    className={`p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-colors ${
                      index % 2 === 0 ? "md:text-left" : "md:text-right"
                    }`}
                  >
                    <h3 className="text-xl font-bold text-slate-900">
                      {exp.role}
                    </h3>
                    <p className="text-indigo-600 font-medium mb-2">
                      {exp.company}
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Node */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 -ml-4 rounded-full border-4 border-white bg-indigo-500 shadow-lg z-10 flex items-center justify-center transform md:-translate-x-1/2 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>

                {/* Date */}
                <div
                  className={`flex-1 pl-12 md:pl-0 md:pt-3 ${
                    index % 2 === 0
                      ? "md:text-right md:pr-12"
                      : "md:text-left md:pl-12"
                  }`}
                >
                  <span className="font-mono text-sm text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    {exp.period}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Timeline