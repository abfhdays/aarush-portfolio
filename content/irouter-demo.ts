export const irouterDemo = `**Quick Demo:**

<div class="demo-block">
<div class="demo-label">irouter execute</div>

\`\`\`bash
$ irouter execute "SELECT * FROM sales
                    WHERE date = '2024-11-01'
                    LIMIT 10"
---
Query Results:
┌─────────────┬─────────┬────────┬────────────┬──────────┬─────────────────────┐
│ customer_id │ amount  │ region │ product_id │ quantity │ date                │
├─────────────┼─────────┼────────┼────────────┼──────────┼─────────────────────┤
│ CUST0503    │ 1799.19 │ EU     │ PROD074    │ 4        │ 2024-11-01 00:00:00 │
│ CUST0325    │ 1909.55 │ EU     │ PROD092    │ 9        │ 2024-11-01 00:00:00 │
│ CUST0491    │ 1415.5  │ US     │ PROD051    │ 1        │ 2024-11-01 00:00:00 │
│ CUST0430    │ 4245.1  │ EU     │ PROD003    │ 5        │ 2024-11-01 00:00:00 │
│ CUST0234    │ 3413.27 │ APAC   │ PROD052    │ 9        │ 2024-11-01 00:00:00 │
│ CUST0092    │ 3065.42 │ EU     │ PROD060    │ 1        │ 2024-11-01 00:00:00 │
│ CUST0927    │ 4390.05 │ APAC   │ PROD034    │ 1        │ 2024-11-01 00:00:00 │
│ CUST0113    │ 2368.19 │ US     │ PROD069    │ 9        │ 2024-11-01 00:00:00 │
│ CUST0842    │ 3217.35 │ APAC   │ PROD016    │ 4        │ 2024-11-01 00:00:00 │
│ CUST0090    │ 2958.21 │ EU     │ PROD053    │ 8        │ 2024-11-01 00:00:00 │
└─────────────┴─────────┴────────┴────────────┴──────────┴─────────────────────┘

Execution Summary:
  Backend          DUCKDB
  Execution Time   0.004s
  Rows Processed   10
  Partitions       1/30
  Data Scanned     0.00 GB
  From Cache       Yes
  Pruning Speedup  30.0x
\`\`\`
</div>

<div class="demo-block">
<div class="demo-label">irouter explain</div>

\`\`\`bash
$ irouter explain "SELECT region, COUNT(*), SUM(amount)
                     FROM sales
                     WHERE date >= '2024-11-01'
                     GROUP BY region"
---
📊 QUERY ANALYSIS:
   Tables: sales
   Joins: 0
   Aggregations: 2
   Window Functions: 0
   Has DISTINCT: True
   Has ORDER BY: False
   Complexity Score: 3.0

🔍 PARTITION PRUNING:
   Total Partitions: 30
   Partitions to Scan: 30
   Data Skipped: 0.0%
   Estimated Speedup: 1.0x
   Data to Scan: 0.00 GB

   Predicates Applied:
    └─ date >= 2024-11-01

⚡ BACKEND SELECTION:
   Selected Backend: POLARS
   Reasoning: Selected polars: Parallel execution good for medium datasets.
              1.0x faster than duckdb, 829.9x faster than spark.

💰 COST ESTIMATES:
   duckdb:  Total Time: 2.10s | Scan: 0.00s | Compute: 2.08s | Overhead: 0.10s
   polars:  Total Time: 2.00s | Scan: 0.00s | Compute: 1.80s | Overhead: 0.20s
   spark:   Total Time: 1660.03s | Scan: 0.00s | Compute: 1.60s | Overhead: 15.00s
\`\`\`
</div>`;
