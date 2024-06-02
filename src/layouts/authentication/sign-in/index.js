import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "UserContext"; // Импортируйте контекст пользователя

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

import CoverLayout from "layouts/authentication/components/CoverLayout";

import bgSignIn from "assets/images/signInImage.png";
import { auth, db } from "../../../firebase"; // Импортируйте инициализированные экземпляры
import { signInWithEmailAndPassword } from "firebase/auth"; // Импортируйте функции аутентификации
import { doc, getDoc } from "firebase/firestore"; // Импортируйте функции Firestore

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser(); // Получите функцию для установки пользователя

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const userRole = role === "" ? "admin" : role;

    try {
      // Логика аутентификации
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Authenticated user UID:", user.uid); // Log authenticated user UID

      // Получите роль пользователя из базы данных
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        console.error(`No user document for UID ${user.uid}`);
        throw new Error("Пользователь не найден в базе данных");
      }


      const userData = userDoc.data();
      console.log("User data:", userData);

      console.log("User data from Firestore:", userData); // Log Firestore user data
      console.log("Expected role:", userRole); // Log expected role

      if (userData.role !== expectedRole) {
        throw new Error("Неверная роль пользователя");
      }

      // Установите пользователя в контексте
      setUser({ email: user.email, role: userData.role });

      // Перенаправление в зависимости от роли пользователя
      if (userRole === "admin") {
        navigate("/dashboard_admin");
      } else if (userRole === "teacher") {
        navigate("/dashboard_teacher");
      } else if (userRole === "student") {
        navigate("/dashboard_student");
      }
    } catch (error) {
      console.error("Error during sign-in:", error); // Вывод ошибки в консоль
      setError(error.message);
    }
  };

  return (
    <CoverLayout
      title="Рады вас видеть!"
      color="white"
      description="Введите ваш email и пароль для входа"
      premotto="ВДОХНОВЛЕНО БУДУЩИМ:"
      motto="THE VISION UI DASHBOARD"
      image={bgSignIn}
    >
      <VuiBox component="form" role="form" onSubmit={handleLogin}>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Email
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="email"
              placeholder="Ваш email..."
              fontWeight="500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Пароль
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="password"
              placeholder="Ваш пароль..."
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Роль
            </VuiTypography>
          </VuiBox>
          <RadioGroup
            value={role}
            onChange={handleRoleChange}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <FormControlLabel value="student" control={<Radio />} label="Студент" />
            <FormControlLabel value="teacher" control={<Radio />} label="Учитель" />
          </RadioGroup>
        </VuiBox>
        <VuiBox display="flex" alignItems="center">
          <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Запомнить меня
          </VuiTypography>
        </VuiBox>
        {error && (
          <VuiBox mb={2}>
            <VuiTypography color="error" textAlign="center">
              {error}
            </VuiTypography>
          </VuiBox>
        )}
        <VuiBox mt={4} mb={1}>
          <VuiButton color="info" fullWidth type="submit">
            ВОЙТИ
          </VuiButton>
        </VuiBox>
        <VuiBox mt={3} textAlign="center">
          <VuiTypography variant="button" color="text" fontWeight="regular">
            У вас нет аккаунта?{" "}
            <VuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="white"
              fontWeight="medium"
            >
              Зарегистрироваться
            </VuiTypography>
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;
