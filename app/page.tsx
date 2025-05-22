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
    <div className="flex flex-col min-h-screen bg-base-200">
      {/* Hero Section */}
      <section className="hero min-h-[60vh] bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <AgentPulse size="medium" color="blue" />
            <h1 className="text-5xl font-bold mt-4">Meet your personal</h1>
            <h1 className="text-5xl font-bold bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent">
              AI Content Agent
            </h1>
            <p className="py-6 text-lg">
              Create content in seconds with AI powered tools and templates for
              your business needs.
            </p>
            {/* The YoutubeVideoForm will be part of the hero content */}
            <div className="mt-6">
              <YoutubeVideoForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-0 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features for Content Creators
          </h2>
        </div>

        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* features */}
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="card card-bordered bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                <div className="card-body items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${feature.iconBg}`}
                  >
                    <Icon
                      className="w-8 h-8"
                      style={{ color: feature.iconColor }}
                    />
                  </div>
                  <h2 className="card-title">{feature.title}</h2>
                  <p>{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Your AI Agent in 3 Simple Steps
          </h2>
        </div>

        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="card card-bordered bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                <div className="card-body items-center text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-content" />
                  </div>
                  <h2 className="card-title">{step.title}</h2>
                  <p>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* footer */}
      <section className="hero py-20 bg-primary text-primary-content">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Meet Your AI Content Agent?
            </h2>
            <p className="text-xl">
              Join creators leveraging AI to unlock content insights.
            </p>
            {/* Optional: Add a CTA button here if desired */}
            {/* <button className="btn btn-secondary mt-6">Get Started</button> */}
          </div>
        </div>
      </section>
    </div>
  );
}
