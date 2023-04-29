import { Box, Button, Stack, TextInput } from "@mantine/core";

export default function Index() {
  return (
    <Box 
      sx={{height:"100vh" ,display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Stack spacing={"sm"}>
        <TextInput placeholder="Email" radius="md" />
        <TextInput placeholder="Password" radius="md" />
        <Button radius={"xl"} >Login</Button>
      </Stack>
    </Box>
  );
}
