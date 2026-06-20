require("dotenv").config();
const express = require("express");
const cors = require("cors");

const predictRouter = require("./routes/predict");
const dashboardRouter = require("./routes/dashboard");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", predictRouter);
app.use("/api", dashboardRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend SoilScan prêt sur http://localhost:${PORT}`);
  console.log(`   Pense à configurer backend/config/models.config.js avec ton Space Hugging Face.`);
});
