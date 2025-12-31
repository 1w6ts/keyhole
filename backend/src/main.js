const express = require("express");
require("dotenv").config();
const metaRoutes = require("./routes/meta");
const tableRoutes = require("./routes/table");

const app = express();
app.use(express.json());

app.use("/api", metaRoutes);
app.use("/api", tableRoutes);

const PORT = process.env.PORT || 6671;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
