const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/expenses", require("./routes/expenseRoutes"));

app.listen(3000, () => console.log("Backend running"));