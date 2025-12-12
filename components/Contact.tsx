import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";


type ContactFormValues = {
    name: string;
    email: string;
    message: string;
};

const Contact = ({linkEnter, textLeave}:{setCursorVariant: (variant: string) => void, linkEnter: () => void, textLeave: () => void}) => {
      const { register, handleSubmit, reset } = useForm<ContactFormValues>();

  const onFormSubmit = (data: ContactFormValues) => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\r\nEmail: ${data.email}\r\n\r\nMessage:\r\n${data.message}`
    );
    window.location.href = `mailto:saumaykilla@gmail.com?subject=${subject}&body=${body}`;
    reset();
  };
  return (
          <section
        id="contact"
        className="py-32 px-6 lg:px-24 bg-indigo-900 text-white relative overflow-hidden"
      >
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500 rounded-full blur-[128px] opacity-20 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl font-bold mb-6 tracking-tight">
                Let's build something{" "}
                <span className="text-indigo-300">extraordinary.</span>
              </h2>
              <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                Whether you have a question, a project proposal, or just want to
                say hi, my inbox is always open.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                    <i className="fa-solid fa-envelope text-indigo-300"></i>
                  </div>
                  <div>
                    <p className="text-sm text-indigo-200">Email</p>
                    <p className="font-medium hover:text-white transition-colors cursor-pointer">
                     saumaykilla@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                    <i className="fa-solid fa-location-dot text-indigo-300"></i>
                  </div>
                  <div>
                    <p className="text-sm text-indigo-200">Location</p>
                    <p className="font-medium">New York, NY</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-0 bg-white/5 backdrop-blur-md text-white shadow-2xl">
              <CardHeader>
                <CardTitle className="text-white">Send a Message</CardTitle>
                <CardDescription className="text-indigo-200">
                  I'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit(onFormSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-indigo-100">
                      Name
                    </label>
                    <Input
                      {...register("name", { required: true })}
                      placeholder="John Doe"
                      className="bg-white/10 border-white/20 text-white placeholder:text-indigo-300/50 focus-visible:ring-indigo-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-indigo-100">
                      Email
                    </label>
                    <Input
                      {...register("email", { required: true })}
                      placeholder="john@example.com"
                      type="email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-indigo-300/50 focus-visible:ring-indigo-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-indigo-100">
                      Message
                    </label>
                    <Textarea
                      {...register("message", { required: true })}
                      placeholder="Tell me about your project..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-indigo-300/50 min-h-[120px] focus-visible:ring-indigo-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-white text-indigo-900 hover:bg-indigo-50 font-bold"
                    onMouseEnter={linkEnter}
                    onMouseLeave={textLeave}
                  >
                    Send Message
                    <i className="fa-solid fa-paper-plane ml-2"></i>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
  )
}

export default Contact