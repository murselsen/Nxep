const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const profileRoutes = require("./routes/profileRoutes");
// const config = path.join(__dirname, "config.json");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("/ App Data:", app);
  resJson = {
    routes: [
      { title: "Main", path: "/" },
      { title: "Local Profile List", path: "/profiles/local/" },
      { title: "Cloud Profile List", path: "/profiles/cloud/" },
    ],
  };
  res.json(resJson);
  console.log("Response:", resJson);
});

// Profiles Routes
app.use("/profiles", profileRoutes);

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}.`);
});
