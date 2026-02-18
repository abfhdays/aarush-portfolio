export const personalInfo = {
  name: "Aarush Ghosh",
  bio: {
    intro: "I'm a 3rd year student studying Math @ UWaterloo",
    work: [
      { text: "your concert memories, made intentional; architected the Go backend scaled for 25,000+ active users ", company: "co-founder @ ReLive", url: "https://qorsa.com", icon: "/relive_portfolio_icon.png" },
      { text: "engineered a Graph RAG application for government intelligence contracts powered by open-source LLMs ", company: "ai software engineer @ Qorsa", url: "https://qorsa.com", icon: "/qorsa_portfolio_icon.png" },
      { text: "deployed a text-to-SQL agent for web traffic analytics for major insurance client managed on Databricks", company: "ai consultant @ CGI", url: "https://www.cgi.com", icon: "/cgi_portfolio_icon.jpg" },
      { text: "scaled data infrastructure for student tuition forecasting used to budget plan 9,000+ students ", company: "software engineer @ UW", url: "https://uwaterloo.ca/math/", icon: "/uw_portfolio_icon.png" }
    ],
    interests: {
      intro: "In my own time, I'm deepening my core engineering skills by",
      items: [
        {
          text: "learning/mastering backend development in Go",
          linkLabel: "I talk about it here",
          linkUrl: "#", // add your blog link
        },
        {
          text: "thinking about data systems at scale",
          linkLabel: "one of my favourite projects - iRouter",
          linkUrl: "https://github.com/abfhdays/intelligent-query-router",
        },
      ],
      outro: "I'm also working on improving my writing alongside my engineering journey",
      outroLinkLabel: "I write about music and film too",
      outroLinkUrl: "/writing",
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