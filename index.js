const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "ManyMany CRM Agents" });
});

app.post("/agents/scoring", (req, res) => {
  const { deal } = req.body;
  res.json({ received: true, deal_name: deal?.name, score: null, message: "Agent scoring — bientôt actif" });
});

app.post("/agents/suggest", (req, res) => {
  const { deal } = req.body;
  res.json({ received: true, deal_name: deal?.name, suggestions: [], message: "Agent suggestion — bientôt actif" });
});

app.listen(port, () => {
  console.log(`ManyMany backend running on port ${port}`);
});
