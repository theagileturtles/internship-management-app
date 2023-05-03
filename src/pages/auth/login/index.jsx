import { useState } from 'react';
import { Box, Button, Stack, TextInput, Checkbox } from "@mantine/core";
import logo from "../../../assets/uulogo.png"
import Image from 'next/image';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  // Declare three state variables using the useState hook, and initialize them with empty string, empty string and false, respectively.


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  // Declare a function that updates the email state variable with the value of the email input field.

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  // Declare a function that updates the password state variable with the value of the password input field.

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };
  // Declare a function that updates the rememberMe state variable with the checked status of the rememberMe checkbox.

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Login with:', email, password, rememberMe);
  };
  // Declare a function that prevents the default form submission behavior, and logs the values of email, password and rememberMe to the console.


  return (
    <Box sx={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: 'white' }}>
      {/* Render a Box component from the 'mantine' module, with styles for height, display, justifyContent and alignItems. */}
      <Stack spacing={"sm"} sx={{ alignItems: 'center' }}>
        {/* Render a Stack component from the 'mantine' module, with a spacing prop of "sm". */}
        <Image src={logo} width={150} height={150} alt="Placeholder image" />
        {/* Render an Image component from the 'mantine' module, with src, width, height and alt props. */}
        <Box sx={{ textAlign: 'center', fontSize: '2rem' }}>
          <h>Sign in to <span style={{ color: '#08B3AD', fontWeight: 'bold' }}>IMA</span></h>
        </Box>
        <TextInput placeholder="Email" radius="md" value={email} onChange={handleEmailChange} sx={{ width: '300px', borderColor: 'black' }} />
        {/* Render a TextInput component from the 'mantine' module, with placeholder, radius, value and onChange props. */}
        <TextInput placeholder="Password" radius="md" value={password} onChange={handlePasswordChange} type="password" sx={{ width: '300px', borderColor: 'black' }} />
        {/* Render a TextInput component from the 'mantine' module, with placeholder, radius, value, onChange and type props. */}
        <Box sx={{ width: "100%", display: "flex", justifyContent: "left", alignItems: "start" }}>
          <Checkbox label="Remember me" checked={rememberMe} onChange={handleRememberMeChange} />
          {/* Render a Checkbox component from the 'mantine' module, with label, checked and onChange props. */}
        </Box>
        <Button radius={"xl"} size="sm" sx={{ width: '150px', backgroundColor: '#08B3AD', ':hover': { backgroundColor: '#06A09A' } }} onClick={handleLogin}>Sign In</Button>
        {/* Render a Button component from the 'mantine' module, with radius and onClick props. */}
      </Stack>
      <Box sx={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', color: 'gray' }}>
        <p>© 2023 Agile Turtles</p>
      </Box>
    </Box>
  );
}

export default LoginPage;
// Export the LoginPage component as the default export of this module.
