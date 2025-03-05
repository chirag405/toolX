import AgentPulse from "@/components/AgentPulse";
import Image from "next/image";
import {
  Bolt,
  Shield,
  Users,
  Settings,
  CloudUpload,
  LineChart,
  User,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import YoutubeVideoForm from "@/components/YtVideoForm";
export default function Home() {
  console.log("Home Page Entered");
  const features = [
    {
      icon: Bolt,
      iconBg: "bg-blue-100",
      iconColor: "#3b82f6",
      title: "Fast Performance",
      description:
        "Experience blazing-fast load times with our optimized platform.",
    },
    {
      icon: Shield,
      iconBg: "bg-green-100",
      iconColor: "#10b981",
      title: "Enhanced Security",
      description:
        "Your data is protected with industry-leading security measures.",
    },
    {
      icon: Users,
      iconBg: "bg-yellow-100",
      iconColor: "#facc15",
      title: "Community Support",
      description:
        "Join a thriving community of creators and collaborate effortlessly.",
    },
    {
      icon: Settings,
      iconBg: "bg-red-100",
      iconColor: "#ef4444",
      title: "Customizable Features",
      description: "Tailor your experience with flexible settings and options.",
    },
    {
      icon: CloudUpload,
      iconBg: "bg-purple-100",
      iconColor: "#a855f7",
      title: "Cloud Sync",
      description:
        "Access your data anywhere with seamless cloud synchronization.",
    },
    {
      icon: LineChart,
      iconBg: "bg-indigo-100",
      iconColor: "#6366f1",
      title: "Advanced Analytics",
      description:
        "Get insights into your performance with detailed analytics.",
    },
  ];
  const steps = [
    {
      icon: User,
      title: "Sign Up",
      description:
        "Create an account and set up your profile in just a few minutes.",
    },
    {
      icon: MessageCircle,
      title: "Interact with AI",
      description:
        "Chat with your AI assistant and get instant, insightful responses.",
    },
    {
      icon: CheckCircle,
      title: "Achieve Your Goals",
      description: "Use AI-driven insights to make better decisions and grow.",
    },
  ];

  return (
    <div className="flex flex-col  min-h-screen py-2 px-6 bg-amber-100">
      {/* hero section */}

      <section className="container mx-auto px-4 mt-10">
        <div className="flex flex-col items-center ">
          <AgentPulse size="medium" color="blue" />
          <div className="text-4xl md:text-6xl font-semibold text-center">
            <h1>Meet your personal </h1>
            <span className="bg-gradient-to-b from-blue-600 to-blue-400 bg-clip-text  text-transparent">
              AI content Agent
            </span>

            <p className=" text-lg md:text-2xl text-center mt-4 ">
              Create content in seconds with AI powered tools and templates for
              your business needs
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-10 py-10">
          <YoutubeVideoForm />
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 px-15 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features for Content Creators
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* features */}
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.iconBg}`}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: feature.iconColor }}
                  />
                </div>

                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Your AI Agent in 3 Simple Steps
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* footer */}

      <section className="py-20 px-4 md:px-0 bg-gradient-to-r from-blue-600 to-blue-400">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Meet Your AI Content Agent?
          </h2>
          <p className="text-xl text-blue-50">
            Join creators leveraging AI to unlock content insights.
          </p>
        </div>
      </section>
    </div>
  );
}
