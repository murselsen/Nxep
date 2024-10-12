const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const profileRoutes = require("./routes/profileRoutes");
// const config = path.join(__dirname, "config.json");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  resJson = {
    routes: [
      { title: "Main", path: "/" },
      { title: "Profile List", path: "profiles/" },
    ],
  };
  res.json(resJson);
  console.log("Response:", resJson);
});

// Profiles Routes
app.use("/profiles", profileRoutes);

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}.`);
});
