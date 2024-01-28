const path = require("path");
const express = require("express");
const cors = require("cors");
const logs = require("./routes/logs");
const partner = require("./routes/partner");
const review = require("./routes/review");

const app = express();
const PORT = 5020;
const SIZE_LIMIT = "10mb";
const PUBLIC_PATH = path.join(__dirname);

app.use(cors({ origin: '*' }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: SIZE_LIMIT }));
app.use(express.static(PUBLIC_PATH));

// TODO : ajouter le middleware de journalisation pour tous les types de requêtes HTTP
app.use((request, response, next) => {
    console.log(`New HTTP request: ${request.method} ${request.url}`);
    next();
  });

// TODO : Rajouter les routeurs sur les bon prefixes
const { requestLogger } = require("./middlewares/requestLogger");
app.use("/", requestLogger);
// TODO : Rajouter les routeurs sur les bon prefixes
const { router: partenerRouter } = require("./routes/partner");
app.use("/api/partner", partenerRouter);
const { router: reviewRouter } = require("./routes/review");
app.use("/api/review",  reviewRouter);
const { router: logsRouter } = require("./routes/logs");
app.use("/logs", logsRouter);
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = server;
