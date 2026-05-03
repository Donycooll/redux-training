import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import { Link, replace, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "./AuthContext";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUser(email, password);
      navigate("/", replace);
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        alert("البريد الإلكتروني مستخدم بالفعل");
        navigate("/", replace);
      } else if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        alert("كلمة المرور يجب أن تكون على الأقل 6 أحرف");
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

  const handleGoogleSignup = async () => {
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
        سجل الآن
      </Typography>
      <Stack style={{ width: "100%", alignItems: "center" }}>
        <TextField
          fullWidth
          autoFocus
          label="البريد الإلكتروني"
          variant="outlined"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="كلمة المرور"
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
          onClick={handleSignup}
          disabled={!email || !password}
        >
          سجل الآن
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
          onClick={handleGoogleSignup}
        >
          <GoogleIcon style={{ marginLeft: "10px" }} />
          التسجيل باستخدام جوجل
        </Button>
        <Typography
          variant="body2"
          style={{ marginTop: "10px", textAlign: "start", width: "100%" }}
        >
          لديك حساب بالفعل ؟
          <Link to="/">
            <Button variant="text" color="primary">
              سجل الدخول
            </Button>
          </Link>
        </Typography>
      </Stack>
    </Container>
  );
}
