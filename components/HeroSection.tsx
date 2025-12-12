import {motion} from "framer-motion"
import {Badge} from "./ui/badge"
import {Button} from "./ui/button"
import { sections } from "@/app/page"

const HeroSection = ({scrollTo, textEnter, textLeave, linkEnter}: {scrollTo: (id: sections) => void, textEnter: () => void, textLeave: () => void, linkEnter: () => void}) => {
  return (
         <section id="home" className="relative min-h-screen flex items-center pt-20 px-6 lg:px-24 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10"
          >
            <div className="inline-block mb-4">
               <Badge variant="outline" className="px-3 py-1 text-xs font-mono text-indigo-600 border-indigo-200 bg-indigo-50/50 backdrop-blur-sm">
                 Available for hire
               </Badge>
            </div>
            <h1 
              onMouseEnter={textEnter} 
              onMouseLeave={textLeave} 
              className="text-6xl md:text-8xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]"
            >
              Building <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Digital Depth.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed mb-8">
              I'm <span className="font-semibold text-slate-900">Saumay Killa</span>. A Full-Stack Engineer crafting immersive web experiences with modern architecture and interactive depth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={() => scrollTo('projects')}
                onMouseEnter={linkEnter}
                onMouseLeave={textLeave}
                className="bg-slate-900 hover:bg-indigo-600 text-white rounded-full px-8 h-12 transition-colors duration-300"
              >
                View Work
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollTo('contact')}
                onMouseEnter={linkEnter}
                onMouseLeave={textLeave}
                className="rounded-full px-8 h-12 border-slate-200 hover:bg-slate-50"
              >
                Contact Me
              </Button>
            </div>
            
            <div className="mt-12 flex items-center  text-slate-400">
                <Button onClick={()=>{window.open('https://github.com/saumaykilla')}} variant="link" className="flex items-center gap-2 text-sm font-mono">
                    <i className="fa-brands fa-github text-xl hover:text-indigo-600 transition-colors cursor-pointer" onMouseEnter={linkEnter} onMouseLeave={textLeave}></i>
                    <span className="inline">GitHub</span>
                </Button>
                <Button onClick={()=>{window.open('https://linkedin.com/in/saumaykilla')}} variant="link" className="flex items-center gap-2 text-sm font-mono">
                    <i className="fa-brands fa-linkedin text-xl hover:text-indigo-600 transition-colors cursor-pointer" onMouseEnter={linkEnter} onMouseLeave={textLeave}></i>
                    <span className="inline">LinkedIn</span>
                </Button>
                <Button onClick={()=>{window.open('https://instagram.com/__saumay__')}} variant="link" className="flex items-center gap-2 text-sm font-mono">
                    <i className="fa-brands fa-instagram text-xl hover:text-indigo-600 transition-colors cursor-pointer" onMouseEnter={linkEnter} onMouseLeave={textLeave}></i>
                    <span className="inline">Instagram</span>
                </Button>
            </div>
          </motion.div>

          <motion.div 
            className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center perspective-1000"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Abstract 3D Representation */}
            <motion.div
               animate={{ 
                 y: [0, -20, 0],
                 rotateZ: [0, 2, -2, 0],
                 rotateY: [0, 5, -5, 0]
               }}
               transition={{ 
                 repeat: Infinity, 
                 duration: 6, 
                 ease: "easeInOut" 
               }}
               className="relative w-full h-full"
            >
                <div className="absolute inset-0 bg-linear-to-tr from-indigo-200/40 to-white/0 rounded-[3rem] blur-3xl transform rotate-6"></div>
                <img 
                  src="https://images.unsplash.com/photo-1764170347100-36f930110fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDI2MjV8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMDNkJTIwZ2xhc3MlMjBzaGFwZSUyMGJsdWV8ZW58MHwwfHx8MTc2NTU3MjU1OXww&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Abstract 3D Shape" 
                  className="w-full h-full object-contain drop-shadow-2xl mix-blend-multiply opacity-90 hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Floating Tech Badges */}
                <motion.div 
                    animate={{ y: [0, 15, 0] }} 
                    transition={{ duration: 4, repeat: Infinity, delay: 0 }}
                    className="absolute top-1/4 right-0 lg:right-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50"
                >
                   <i className="fa-brands fa-react text-4xl text-cyan-400"></i>
                </motion.div>
                
                <motion.div 
                    animate={{ y: [0, -15, 0] }} 
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-1/4 left-0 lg:left-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50"
                >
                   <i className="fa-brands fa-node-js text-4xl text-green-500"></i>
                </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
  )
}

export default HeroSection