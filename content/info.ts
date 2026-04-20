export const personalInfo = {
  name: "Aarush Ghosh",
  bio: {
    intro: "I'm a software developer focused on scalable AI/data and backend systems. I'm studying Computational Mathematics and Statistics at UWaterloo.",
    work: [
      { text: "joining Versa Networks as a software engineer intern (incoming, Summer 2026).", company: "software engineer intern @ Versa Networks", url: "https://versa-networks.com" },
      { text: "architecting a distributed Dgraph backend for a GraphRAG engine, plus Kubernetes/Helm deployment and CI/CD for production reliability.", company: "software engineer intern @ Qorsa", url: "https://qorsa.com", icon: "/qorsa_portfolio_icon.png" },
      { text: "building the Go backend for a concert video platform that handles 1,000+ concurrent requests while keeping latency under 200ms.", company: "co-founder @ reLive", url: "https://github.com/areeeeeeeb/reLive", icon: "/relive_portfolio_icon.png" },
      { text: "deploying a production text-to-SQL RAG pipeline over GA4 marketing data and improving query accuracy with retrieval-augmented parsing.", company: "AI developer intern @ CGI", url: "https://www.cgi.com", icon: "/cgi_portfolio_icon.jpg" },
      { text: "automating budget forecasting for 9,000+ students and migrating SQL workflows into a faster Databricks PySpark ETL pipeline.", company: "developer @ University of Waterloo", url: "https://uwaterloo.ca/math/", icon: "/uw_portfolio_icon.png" }
    ],
    interests: {
      intro: "In my own time, I'm deepening my core engineering skills by",
      items: [
        {
          text: "learning/mastering backend development in Go",
          linkLabel: "i wrote about it here",
          linkUrl: "#", // add your blog link
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
      outroLinkUrl: "https://github.com/abfhdays",
    },
    personal: "(check my projects out!)"
  },
  links: [
    {
      label: "github",
      url: "https://github.com/abfhdays"
    },
    {
      label: "linkedin",
      url: "https://www.linkedin.com/in/aarush-ghosh-/"
    },
    {
      label: "resume",
      url: "https://drive.google.com/file/d/16ThJygvUi28VGBbVaBncEUnVaS-eIbl1/view?usp=sharing"
    }
  ]
};