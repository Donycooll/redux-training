import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import { Link, replace, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const login = async () => {
    try {
      await handleLogin(email, password);
      navigate("/", replace);
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        alert("يرجى التحقق من بياناتك وإعادة المحاولة");
      } else if (error.message === "Firebase: Error (auth/invalid-email).") {
        alert("يرجى إدخال بريد إلكتروني صالح");
      } else if (
        error.message === "Firebase: Error (auth/network-request-failed)."
      ) {
        alert("حدث خطأ في الاتصال بالشبكة");
      } else {
        alert(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/", replace);
    } catch (error) {
      if (error.message === "Firebase: Error (auth/popup-closed-by-user).") {
        alert("تم إغلاق نافذة تسجيل الدخول قبل إكمال العملية");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "10px auto",
        direction: "rtl",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: "darkblue",
          position: "sticky",
          top: "0",
          background: "white",
          width: "100%",
          padding: "10px 0",
          zIndex: "100",
        }}
      >
        تسجيل الدخول
      </Typography>
      <Stack style={{ width: "100%", alignItems: "center" }}>
        <TextField
          fullWidth
          label="البريد الإلكتروني"
          autoFocus
          required
          variant="outlined"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="كلمة المرور"
          required
          variant="outlined"
          margin="normal"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={login}
          disabled={!email || !password}
        >
          تسجيل الدخول
        </Button>
        <Typography
          variant="h5"
          color="primary"
          style={{ marginTop: "10px", fontWeight: "bold" }}
        >
          او
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
          onClick={handleGoogleLogin}
        >
          <GoogleIcon style={{ marginLeft: "10px" }} />
          تسجيل الدخول باستخدام جوجل
        </Button>
        <Typography
          variant="body2"
          style={{ marginTop: "10px", textAlign: "start", width: "100%" }}
        >
          ليس لديك حساب ؟{" "}
          <Link to="/signup">
            <Button variant="text" color="primary">
              سجل الآن
            </Button>
          </Link>
        </Typography>
      </Stack>
    </Container>
  );
}
