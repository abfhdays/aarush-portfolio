import { socialLinks } from "@/content/navigation";
import { assetPath } from "@/lib/assets";
import type { PersonalInfo } from "@/types/content";

export const personalInfo: PersonalInfo = {
  name: "Aarush Ghosh",
  bio: {
    intro: "I'm a 4th year Math and CS student @ UWaterloo graduating in Spring 2028. I am a Software Engineer interested in problems around complex production systems and designing meaningful infrastructure for engineers and users.",
    work: [
      
      { text: "Architected and shipped the first MLOps pipeline within our AI/ML platform team. Engineered Go microservices. Managed customer infra on Kubernetes  ", company: "SWE Intern @ Versa Networks", url: "https://versa-networks.com", icon: "/versa_networks_logo.jpeg" },
      { text: "Worked on Qorsa's downstream AI Framework; Wrote the foundational infrastructure for the Graph Database Engine. Spearheaded the initial cloud deployments ", company: " MLE Intern @ Qorsa", url: "https://qorsa.com", icon: "/qorsa_portfolio_icon.png" },
      { text: "Your concert memories, made intentional; Built the Go backend for our McHacks 13 winner, handling 1,000+ concurrent requests ", company: "Building ReLive", url: "https://github.com/areeeeeeeb/reLive", icon: "/relive_portfolio_icon.png" },
      { text: "Deployed RAG-powered text-to-SQL pipeline for insurance marketing analytics ", company: "AI Eng Intern @ CGI", url: "https://www.cgi.com", icon: "/cgi_portfolio_icon.jpg" },
      { text: "Tuition forecasting for budget planning across 9,000+ students ", company: "DE Co-op @ UWaterloo", url: "https://uwaterloo.ca/math/", icon: "/uw_portfolio_icon.png" }
    ],
    interests: {
      intro: "In my own time, I'm deepening my core engineering skills by",
      items: [
        {
          text: "learning/mastering backend development in Go",
        },
        {
          text: "understanding distributed database systems",
          linkLabel: "optimized an open-source SQL engine: iRouter",
          linkUrl: "https://github.com/abfhdays/intelligent-query-router",
        },
        {
          text: "reverse-engineering how transformers work under the hood",
          linkLabel: "built a transformer encoder to investigate safety blitzes in the NFL",
          linkUrl: "https://github.com/abfhdays/bdb25-blitz1",
        },
      ],
      outroLinkLabel: "All of my projects are on my Github. Check them out!!",
      outroLinkUrl: socialLinks.github,
    },
    personal: "(check my projects out!)"
  },
  links: [
    {
      label: "github",
      url: socialLinks.github
    },
    {
      label: "linkedin",
      url: socialLinks.linkedin
    },
    {
      label: "resume",
      url: assetPath("/resume.pdf")
    }
  ]
};
