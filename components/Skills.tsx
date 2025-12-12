import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";




const SKILLS = {
  frontend: [
    { name: "React / Next.js", icon: "fa-brands fa-react" },
    { name: "TypeScript", icon: "fa-brands fa-js" },
    { name: "Tailwind CSS", icon: "fa-brands fa-css3" },
    { name: "Framer Motion", icon: "fa-solid fa-film" },
  ],
  backend: [
    { name: "Node.js", icon: "fa-brands fa-node" },
    { name: "PostgreSQL", icon: "fa-solid fa-database" },
    { name: "MongoDB", icon: "fa-solid fa-database" },
    { name: "Python", icon: "fa-brands fa-python" },
  ],
  tools: [
    { name: "Docker", icon: "fa-brands fa-docker" },
    { name: "AWS", icon: "fa-brands fa-aws" },
    { name: "Git", icon: "fa-brands fa-git-alt" },
    { name: "Figma", icon: "fa-brands fa-figma" },
  ],
};


const Skills = ({setCursorVariant, linkEnter, textLeave}:{setCursorVariant: (variant: string) => void, linkEnter: () => void, textLeave: () => void}) => {
  return (
         <section id="skills" className="py-32 px-6 lg:px-24">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Technical Capabilities</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              A modular toolbelt tuned for high-performance delivery.
            </p>
          </motion.div>

          <Tabs defaultValue="frontend" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-slate-100/50 p-1 rounded-full">
              {Object.keys(SKILLS).map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  onClick={() => setCursorVariant("link")} // Trigger slight hover effect logic if desired
                  className="capitalize rounded-full data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all"
                >
                  {key}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(SKILLS).map(([category, skills]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {skills.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      onMouseEnter={linkEnter}
                      onMouseLeave={textLeave}
                      className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="text-4xl text-slate-700 mb-4 group-hover:text-indigo-600 transition-colors">
                        <i className={skill.icon}></i>
                      </div>
                      <span className="font-medium text-slate-600">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
  )
}

export default Skills