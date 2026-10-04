import { socialLinks } from "@/content/navigation";
import { versaMlops } from "@/content/writing/versa-mlops";
import { assetPath } from "@/lib/assets";
import type { PersonalInfo } from "@/types/content";

export const personalInfo: PersonalInfo = {
  name: "Aarush Ghosh",
  bio: {
    intro: {
      textBeforeEmphasis: "I am in my 4th year studying ",
      emphasis: "Math and CS @ University of Waterloo",
      text: ". I have enjoyed working within complex production systems and building infrastructure that serves users well and supports engineers in a meaningful way.",
    },
    work: [
      { text: "Designed and shipped our AI/ML platform team's first MLOps pipeline, built Go microservices, and managed customer infrastructure on Kubernetes.", company: "SWE Intern @ Versa Networks", url: "https://versa-networks.com", icon: "/versa_networks_logo.jpeg" },
      { text: "Built the foundation of the graph database engine behind Qorsa's downstream AI framework and led its first cloud deployments.", company: "MLE Intern @ Qorsa", url: "https://qorsa.com", icon: "/qorsalogo.jpeg" },
      { text: "Deployed a RAG-powered text-to-SQL pipeline for insurance marketing analytics.", company: "AI Eng Intern @ CGI", url: "https://www.cgi.com", icon: "/cgi_portfolio_icon.jpg" },
      { text: "Built tuition forecasts to support budget planning for 9,000+ students.", company: "DE Co-op @ UWaterloo", url: "https://uwaterloo.ca/math/", icon: "/uwlogo.jpg" }
    ],
    interests: {
      intro: "In my own time",
      items: [
        {
          textBeforeLink: "Building ",
          inlineLink: { label: "reLive", url: "https://github.com/areeeeeeeb/reLive" },
          icon: "/relive_portfolio_icon.png",
          text: ", our McHacks 13 winner, to help people keep and revisit their concert memories. I built the backend from scratch to handle 1,000+ concurrent requests.",
        },
        {
          textBeforeLink: "Continuing part-time at ",
          inlineLink: { label: "Versa Networks", url: "https://versa-networks.com" },
          text: " during the school term after my summer internship. I wrote about my main project there: ",
          linkLabel: versaMlops.title,
          linkUrl: versaMlops.link,
        },
        {
          text: "Learning more about distributed databases and how queries get executed.",
          linkLabel: "iRouter: SQL query optimization built on SQLGlot",
          linkUrl: "https://github.com/abfhdays/intelligent-query-router",
        },
      ],
      outroLinkLabel: "More of what I'm building on GitHub",
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
