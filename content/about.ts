export const about = {
  title: "Aarush Ghosh",
  intro: [
    "Hello there! Thanks for checking out my portfolio. I’m heading to my 3rd year as student at the University of Waterloo majoring in Statistics exploring other disciplines through my minors in CO (combinatorics and optimization) and computing.",
    "I build data driven products with data pipelines, LLMs, and web apps. I’m passionate about building simple, resilient software that solves real problems.",
    "I’m currently looking for a co-op position for Winter 2026. "
  ],
  passions: ["LLMs and information retrieval", "data pipelines", "minimal product design", "music production and drums"],
  hobbies: ["photography", "hiking", "basketball"],
  experiences: [
    {
      role: "Machine Learning Developer - University of Waterloo: Dean of Mathematics",
      time: "Winter 2025",
      bullets: [
        "Developed a Markov chain model in NumPy to simulate student progression through academic terms using a discrete state space (e.g., pass, fail, transfer) and estimated transition probability matrices to forecast program-level tuitionrevenue. Validated the model by backtesting against historical data from previous academic years, achieving 97.3%accuracy in revenue projections.",
        "Automated ingestion of tuition rates and student data from Oracle databases/dynamic web pages, and transformed 30+ legacy SQL Power Queries into a production-ready Data Gen Flow 2 pipeline using PySpark and SQL, improving pipeline runtime by 82%."
      ]
    },
    {
      role: "AI Developer - CGI",
      time: "Summer 2024",
      bullets: [
        "Developed and trained an internal chatbot using RAG for client marketing data, leveraging an ETL data flow on Azure Databricks using a gold medallion architecture.",
        "Utilized Pandas and Airflow to manage Google Analytics 4 data via GA4 API for data ingestion and used SQL notebooks for data filtering and transformation.",
        "Implemented a text-to-SQL RAG pipeline involving table retrieval, indexing, natural language parsing while leveraging RAG techniques such as fixed-size chunking to synthesize chat responses."
      ]
    }
  ]
};
