import { socialLinks } from "@/content/navigation";
import { assetPath } from "@/lib/assets";
import type { PersonalInfo } from "@/types/content";

export const personalInfo: PersonalInfo = {
  name: "Aarush Ghosh",
  bio: {
    intro: "I'm a software developer building scalable AI/data and backend systems. I study Statistics & Computational Math with a CS minor @ UWaterloo, graduating in April 2028.",
    work: [
      
      { text: "building UEBA model training and delivery across Kubernetes clusters with Argo Workflows, MLflow, and Go ", company: "software engineer intern @ Versa Networks", url: "https://versa-networks.com", icon: "/versa_networks_logo.jpeg" },
      { text: "built a Dgraph-backed GraphRAG engine for government intelligence contracts and deployed vLLM inference ", company: "machine learning engineer intern @ Qorsa", url: "https://qorsa.com", icon: "/qorsa_portfolio_icon.png" },
      { text: "your concert memories, made intentional; built the Go backend for our McHacks 13 winner, handling 1,000+ concurrent requests ", company: "co-founder @ ReLive", url: "https://github.com/areeeeeeeb/reLive", icon: "/relive_portfolio_icon.png" },
      { text: "deployed RAG-powered text-to-SQL for insurance marketing analytics ", company: "ai developer intern @ CGI", url: "https://www.cgi.com", icon: "/cgi_portfolio_icon.jpg" },
      { text: "tuition forecasting for budget planning across 9,000+ students ", company: "software engineer @ UW", url: "https://uwaterloo.ca/math/", icon: "/uw_portfolio_icon.png" }
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