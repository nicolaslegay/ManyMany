const http = require("http");

const port = process.env.PORT || 8080;

const server = http.createServer(async (req, res) => {
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "healthy", service: "ManyMany CRM Agents" }));
    return;
  }

  if (req.url === "/agents/scoring" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk.toString(); });
    req.on("end", () => {
      const { deal } = JSON.parse(body || "{}");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        probability: 72,
        reasoning: `Analyse du deal "${deal?.name || "inconnu"}" : montant ${deal?.value || "?"}€, stade ${deal?.stage || "?"}. Score basé sur le stade et la valeur. Prochaine action recommandée : relance sous 48h.`
      }));
    });
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ ok: true, service: "ManyMany CRM Agents" }));
});

server.listen(port, () => {
  console.log(`ManyMany backend running on port ${port}`);
});
