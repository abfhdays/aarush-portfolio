export const about = {
  title: "Aarush Ghosh",
  intro: [
    "Hi visitors. I’m a Statistics major working towards a CS minor at the University of Waterloo. I build software and love turning data into products—designing pipelines and shipping ML/AI features for both serious and just-for-fun problems.",
    "Professionally, I have built RA an AI Dev at CGI, and with the Dean of Mathematics to build a Markov model forecasting student tuition dynamics. I enjoy building and open-sourcing small tools, and I learn best by mixing coursework, real projects, and hands-on tinkering.",
    "Outside of work, you’ll find me playing baseball, football, or soccer—or going deep on niche sports stats on sites like Baseball-Reference (see my sports project). I also make and obsess over music; new soundscapes and lyrics are a daily habit."
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
