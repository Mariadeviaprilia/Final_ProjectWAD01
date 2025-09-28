const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Simpan user dummy (sementara)
const users = [];

// === ROUTE HALAMAN === //
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

// === ROUTE AUTH === //
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  users.push({ email, password });
  console.log("User terdaftar:", email);
  res.redirect("/login");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    console.log("Login sukses:", email);
    res.redirect("/dashboard");
  } else {
    console.log("Login gagal:", email);
    res.redirect("/login");
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:3000`);
});
