import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";
import radialGradient from "assets/theme/functions/radialGradient";
import rgba from "assets/theme/functions/rgba";
import borders from "assets/theme/base/borders";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignIn from "assets/images/signUpImage.png";
import { auth, db } from "../../../firebase"; // Импортируйте инициализированные экземпляры
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

function SignUp() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userRole = role === "" ? "admin" : role;

      console.log("Email: ", email);
      console.log("Password: ", password);
      console.log("Role: ", userRole);
      console.log("Name: ", name);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email,
        name,
        role: userRole,
        approved: false,
      });
      console.log("User registered:", user);

      if (userRole === "admin") {
        navigate("/dashboard_admin");
      } else if (userRole === "teacher") {
        navigate("/dashboard_teacher");
      } else if (userRole === "student") {
        navigate("/dashboard_student");
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <CoverLayout
      title="Добро пожаловать!"
      color="white"
      description="Используйте эти замечательные формы, чтобы войти или создать новую учетную запись в вашем проекте бесплатно."
      image={bgSignIn}
      premotto="ВДОХНОВЛЕНО БУДУЩИМ:"
      motto="THE VISION UI DASHBOARD"
      cardContent
    >
      <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
        <VuiBox
          component="form"
          role="form"
          borderRadius="inherit"
          p="45px"
          sx={{
            backgroundColor: theme.palette.secondary.focus,
          }}
          onSubmit={handleSignUp}
        >
          <VuiTypography
            color="white"
            fontWeight="bold"
            textAlign="center"
            mb="24px"
            sx={{
              fontSize: theme.typography.size.lg,
            }}
          >
            Зарегистрируйтесь с помощью
          </VuiTypography>
          <Stack mb="25px" justifyContent="center" alignItems="center" direction="row" spacing={2}>
            <GradientBorder borderRadius="xl">
              <a href="#">
                <IconButton
                  transition="all .25s ease"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    borderRadius: theme.borders.borderRadius.xl,
                    padding: "25px",
                    backgroundColor: theme.palette.secondary.focus,
                    "&:hover": {
                      backgroundColor: rgba(theme.palette.secondary.focus, 0.9),
                    },
                  }}
                >
                  <Icon
                    as={FaFacebook}
                    sx={{
                      color: theme.palette.white.focus,
                    }}
                  />
                </IconButton>
              </a>
            </GradientBorder>
            <GradientBorder borderRadius="xl">
              <a href="#">
                <IconButton
                  transition="all .25s ease"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    borderRadius: theme.borders.borderRadius.xl,
                    padding: "25px",
                    backgroundColor: theme.palette.secondary.focus,
                    "&:hover": {
                      backgroundColor: rgba(theme.palette.secondary.focus, 0.9),
                    },
                  }}
                >
                  <Icon
                    as={FaApple}
                    sx={{
                      color: theme.palette.white.focus,
                    }}
                  />
                </IconButton>
              </a>
            </GradientBorder>
            <GradientBorder borderRadius="xl">
              <a href="#">
                <IconButton
                  transition="all .25s ease"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    borderRadius: theme.borders.borderRadius.xl,
                    padding: "25px",
                    backgroundColor: theme.palette.secondary.focus,
                    "&:hover": {
                      backgroundColor: rgba(theme.palette.secondary.focus, 0.9),
                    },
                  }}
                >
                  <Icon
                    as={FaGoogle}
                    sx={{
                      color: theme.palette.white.focus,
                    }}
                  />
                </IconButton>
              </a>
            </GradientBorder>
          </Stack>
          <VuiTypography
            color="text"
            fontWeight="bold"
            textAlign="center"
            mb="14px"
            sx={{ fontSize: theme.typography.size.lg }}
          >
            или
          </VuiTypography>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Имя
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={theme.borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                theme.palette.gradients.borderLight.main,
                theme.palette.gradients.borderLight.state,
                theme.palette.gradients.borderLight.angle
              )}
            >
              <VuiInput
                placeholder="Ваше полное имя..."
                sx={{ fontSize: theme.typography.size.sm }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </GradientBorder>
          </VuiBox>
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Email
              </VuiTypography>
            </VuiBox>
            <GradientBorder
              minWidth="100%"
              borderRadius={theme.borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                theme.palette.gradients.borderLight.main,
                theme.palette.gradients.borderLight.state,
                theme.palette.gradients.borderLight.angle
              )}
            >
              <VuiInput
                type="email"
                placeholder="Ваш email..."
                sx={{ fontSize: theme.typography.size.sm }}
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
              borderRadius={theme.borders.borderRadius.lg}
              padding="1px"
              backgroundImage={radialGradient(
                theme.palette.gradients.borderLight.main,
                theme.palette.gradients.borderLight.state,
                theme.palette.gradients.borderLight.angle
              )}
            >
              <VuiInput
                type="password"
                placeholder="Ваш пароль..."
                sx={{ fontSize: theme.typography.size.sm }}
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
          <VuiBox mt={4} mb={1}>
            <VuiButton color="info" fullWidth type="submit">
              ЗАРЕГИСТРИРОВАТЬСЯ
            </VuiButton>
          </VuiBox>
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Уже есть аккаунт?{" "}
              <VuiTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                Войти
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </GradientBorder>
    </CoverLayout>
  );
}

export default SignUp;
