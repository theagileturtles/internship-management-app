// Importing useState hook from React library for managing state
import { useState } from "react";
// Importing Box, Button, Stack, TextInput, and Checkbox components from Mantine's Core library for styling
import {
  Box,
  Button,
  Stack,
  TextInput,
  Checkbox,
  useMantineTheme,
  Title,
  Text,
} from "@mantine/core";
// Importing logo image from assets folder
import logo from "../../../assets/uulogo.png";
// Importing Image component from Next.js library for optimized image rendering
import Image from "next/image";

// LoginPage function component definition
function LoginPage() {
  // Declare state variables for email, password, and rememberMe using useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const theme = useMantineTheme();

  // Function to handle changes in email input field
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to handle changes in password input field
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleShowPassword = (event)=>{
    setShowPassword(event.target.checked)
  }

  // Function to handle changes in rememberMe checkbox
  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  // Function to handle login form submission
  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Login with:", email, password, rememberMe);
  };

  // Return JSX to render login page
  return (
    // Outer Box component for positioning and styling the login form
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {/* Stack component for arranging input fields and buttons vertically */}
      <Stack spacing={"sm"} sx={{ alignItems: "center" }}>
        {/* Image component for displaying logo */}
        <Image src={logo} width={150} height={150} alt="Placeholder image" />
        {/* Box component for displaying the sign in header */}
        <Box sx={{ textAlign: "center", fontSize: "2rem" }}>
          <Title fw={400}>
            Sign in to{" "}
            <span
              style={{ color: theme.colors.mainBlue[6], fontWeight: "bold" }}
            >
              IMA
            </span>
          </Title>
        </Box>
        {/* TextInput component for email input */}
        <TextInput
          placeholder="Email"
          radius="md"
          value={email}
          onChange={handleEmailChange}
          sx={{ width: "300px", borderColor: "black" }}
        />
        {/* TextInput component for password input */}
        <TextInput
          placeholder="Password"
          radius="md"
          value={password}
          onChange={handlePasswordChange}
          type={showPassword ? "text" :"password"}
          sx={{ width: "300px", borderColor: "black" }}
        />
        {/* Box component for positioning rememberMe checkbox */}
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "left",
            alignItems: "start",
          }}
        >
          <Checkbox
            label="Show Password"
            checked={showPassword}
            onChange={handleShowPassword}
          />
          {/* Checkbox component for rememberMe option */}
          <Checkbox
            label="Remember me"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
        </Stack>
        {/* Button component for submitting the login form */}
        <Button
          radius={"xl"}
          size="sm"
          sx={{
            width: "150px",
            transition: "0.3s",
            ":hover": { backgroundColor: theme.colors.mainHoverBlue },
          }}
          onClick={handleLogin}
        >
          Sign In
        </Button>
      </Stack>
      {/* Box component for displaying the footer */}
      <Box
        sx={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "gray",
        }}
      >
        <p>© 2023 Agile Turtles</p>
      </Box>
    </Box>
  );
}

// Export the LoginPage function component as the default export
export default LoginPage;
