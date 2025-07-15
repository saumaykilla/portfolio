"use client";
import { Button } from "@/components/ui/button";
import { IoDocumentTextSharp } from "react-icons/io5";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  BiLogoHtml5,
  BiLogoCss3,
  BiLogoReact,
  BiLogoNodejs,
  BiLogoMongodb,
  BiLogoJavascript,
  BiLogoTypescript,
  BiLogoPython,
  BiLogoTailwindCss,
} from "react-icons/bi";
export default function Home() {
  const skills =
    [
      {
        icon: (
          <BiLogoHtml5 className="text-[#FF9002]" />
        ),
        label:
          "HTML",
      },
      {
        icon: (
          <BiLogoCss3 className="text-[#264DE4]" />
        ),
        label:
          "CSS",
      },
      {
        icon: (
          <BiLogoTailwindCss className="text-[#00B8D5]" />
        ),
        label:
          "Tailwind CSS",
      },
      {
        icon: (
          <BiLogoReact className="text-[#60DBFB]" />
        ),
        label:
          "React.JS",
      },
      {
        icon: (
          <BiLogoNodejs className="text-[#83CD29]" />
        ),
        label:
          "Node.JS",
      },
      {
        icon: (
          <BiLogoJavascript className="text-yellow-300" />
        ),
        label:
          "JavaScript",
      },
      {
        icon: (
          <BiLogoTypescript className="text-[#3077C6]" />
        ),
        label:
          "TypeScript",
      },
      {
        icon: (
          <BiLogoPython className="text-[#646464]" />
        ),
        label:
          "Python",
      },
      {
        icon: (
          <BiLogoMongodb className="text-[#4FAA41]" />
        ),
        label:
          "MongoDB",
      },
    ];
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-lg xl:text-xl ">
              Software
              Developer
            </span>
            <h1 className="h1 mb-6">
              Hello
              I'm
              <br />
              <span className="text-accent/70">
                Saumay
                Killa
              </span>
            </h1>
            <p className=" max-w-[600px] text-md xl:text-base mb-9 text-gray-400/80 font-semibold">
              I'm
              a
              passionate
              developer
              with
              a
              keen
              eye
              for
              detail
              and
              a
              love
              for
              crafting
              engaging
              user
              experiences.
              I
              am
              proficient
              in
              various
              programming
              languages
              and
              technologies
            </p>

            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Link
                href="/PDF/Resume.pdf"
                target="_"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex text-accent hover:text-white border-accent rounded-xl items-center hover:bg-accent gap-2"
                >
                  <span>
                    Resume/
                    CV
                  </span>
                  <IoDocumentTextSharp className="text-xl" />
                </Button>
              </Link>

              <div className="mb-8 xl:mb-0">
                <div className="flex gap-6">
                  <Link
                    href="https://github.com/saumaykilla"
                    target="_"
                    className="w-9 h-9 border-accent border rounded-full flex justify-center
                     items-center text-accent text-base hover:bg-accent hover:text-white hover:transition-all duration-500"
                  >
                    <FaGithub />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/saumaykilla/"
                    target="_"
                    className="w-9 h-9 border-accent border rounded-full flex justify-center
                     items-center text-accent text-base hover:bg-accent hover:text-white hover:transition-all duration-500"
                  >
                    <FaLinkedin />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-8 xl-mb-0">
            <div className="w-full h-full relative">
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition:
                    {
                      delay: 1,
                      duration: 0.4,
                      ease: "easeIn",
                    },
                }}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                    transition:
                      {
                        delay: 2,
                        duration: 0.4,
                        ease: "easeInOut",
                      },
                  }}
                  className="w-[296px] h-[296px] xl:w-[496px] xl:h-[496px] absolute "
                >
                  <Image
                    src="/profile.png"
                    alt=""
                    priority
                    quality={
                      100
                    }
                    fill
                    className="object-contain rounded-full  "
                  />
                </motion.div>
                <motion.svg
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                    transition:
                      {
                        delay: 2,
                        duration: 0.4,
                        ease: "easeInOut",
                      },
                  }}
                  className="w-[300px] h-[300px] xl:h-[506px] xl:w-[506px] "
                  fill="transparent"
                  viewBox="0 0 506 506"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.circle
                    cx="253"
                    cy="253"
                    r="250"
                    stroke="#B6663C"
                    strokeWidth={
                      "4"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{
                      strokeDasharray:
                        "24 10 0 0",
                    }}
                    animate={{
                      strokeDasharray:
                        [
                          "15 120 25 25",
                          "16 25 92 72",
                          "4 250 22 22",
                        ],
                      rotate:
                        [
                          120,
                          360,
                        ],
                    }}
                    transition={{
                      duration: 20,
                      repeat:
                        Infinity,
                      repeatType:
                        "reverse",
                    }}
                  />
                </motion.svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
