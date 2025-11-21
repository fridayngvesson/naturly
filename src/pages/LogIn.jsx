import React, { useState } from "react";
import { TextField, Button, Avatar, Typography, Box, Link } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true); // default: login

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // only used on register
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const greenDark = "#063831";
  const buttonYellow = "#ecf39e";

  // ---------------------------
  // REGISTER USER
  // ---------------------------
  const handleRegister = async () => {
    if (!username || !email || !password) {
      setMessage("Fyll i alla fält.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5050/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Något gick fel.");
      } else {
        setMessage("Registrering lyckades! Logga in.");
        setIsLogin(true);
      }
    } catch (err) {
      setMessage("Serverfel, försök igen senare.");
    }
  };

  // ---------------------------
  // LOGIN USER
  // ---------------------------
  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("Fyll i användarnamn och lösenord.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Fel inloggningsuppgifter");
      } else {
        setMessage("Inloggning lyckades!");

        // spara token
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => {
          navigate("/");
        }, 900);
      }
    } catch (err) {
      setMessage("Serverfel.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 4,
        border: "1px solid #ccc",
        borderRadius: 3,
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <Avatar
        sx={{
          bgcolor: greenDark,
          width: 80,
          height: 80,
          margin: "0 auto 20px auto",
        }}
      >
        <PersonIcon sx={{ fontSize: 50, color: "#fff" }} />
      </Avatar>

      <Typography variant="h5" sx={{ mb: 2, color: greenDark }}>
        {isLogin ? "Logga in" : "Registrera"}
      </Typography>

      {/* USERNAME */}
      <TextField
        fullWidth
        label="Username"
        margin="normal"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* EMAIL - only when registering */}
      {!isLogin && (
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}

      {/* PASSWORD */}
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* SWITCH BETWEEN LOGIN/REGISTER */}
      <Typography variant="body2" sx={{ mt: 1 }}>
        {isLogin ? "Har du inget konto?" : "Har du redan ett konto?"}{" "}
        <Link
          onClick={() => setIsLogin(!isLogin)}
          sx={{ cursor: "pointer", color: greenDark, fontWeight: "bold" }}
        >
          {isLogin ? "Registrera dig" : "Logga in"}
        </Link>
      </Typography>

      {/* BUTTON */}
      <Button
        fullWidth
        variant="contained"
        onClick={isLogin ? handleLogin : handleRegister}
        sx={{
          mt: 3,
          backgroundColor: buttonYellow,
          color: greenDark,
          borderRadius: 3,
          padding: "10px 20px",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#d9e38d" },
        }}
      >
        {isLogin ? "Login" : "Register"}
      </Button>

      {/* FEEDBACK */}
      {message && (
        <Typography
          variant="body2"
          sx={{
            mt: 3,
            color: message.includes("lyckades") ? "green" : "red",
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LogIn;
