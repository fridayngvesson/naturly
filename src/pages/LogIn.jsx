import React, { useState } from "react";
import { TextField, Button, Avatar, Typography, Box, Link } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const LogInRegister = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const greenDark = "#063831";
  const buttonYellow = "#ecf39e";

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage("Något gick fel vid registrering");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setMessage(data.message);
      if (data.token) localStorage.setItem("token", data.token);
    } catch (err) {
      console.error(err);
      setMessage("Något gick fel vid login");
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
      {/* Icon med grön cirkel */}
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

      {/* Username */}
      {!isLogin && (
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": { borderRadius: 2 },
            "& label": { color: greenDark },
          }}
        />
      )}

      {/* Email */}
      {!isLogin && (
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": { borderRadius: 2 },
            "& label": { color: greenDark },
          }}
        />
      )}

      {/* Password */}
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": { borderRadius: 2 },
          "& label": { color: greenDark },
        }}
      />

      {/* Forgot password vid login */}
      {isLogin && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          <Link href="#" underline="hover" sx={{ color: greenDark }}>
            Forgot password?
          </Link>
        </Typography>
      )}

      {/* Meddelande */}
      {message && <Typography sx={{ mt: 2, color: greenDark }}>{message}</Typography>}

      {/* Knappar */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleRegister}
          sx={{
            backgroundColor: buttonYellow,
            color: greenDark,
            borderRadius: 3,
            padding: "10px 20px",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#d9e38d" },
            flex: 1,
          }}
        >
          Register
        </Button>
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            backgroundColor: buttonYellow,
            color: greenDark,
            borderRadius: 3,
            padding: "10px 20px",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#d9e38d" },
            flex: 1,
          }}
        >
          Login
        </Button>
      </Box>

      {/* Växla mellan login/register */}
      <Typography sx={{ mt: 2 }}>
        {isLogin ? "Inte registrerad?" : "Redan registrerad?"}{" "}
        <Link
          href="#"
          underline="hover"
          sx={{ color: greenDark, cursor: "pointer" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Registrera här" : "Logga in här"}
        </Link>
      </Typography>
    </Box>
  );
};

export default LogInRegister;
