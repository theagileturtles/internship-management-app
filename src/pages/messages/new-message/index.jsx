import Layout from "@/components/layout";
import MessagesLayout from "@/components/messagesLayout";
import {
  Stack,
  Select,
  TextInput,
  Textarea,
  Button,
  Flex,
} from "@mantine/core";

export default function Index() {
  return (
    <MessagesLayout title={"NEW MESSAGE"}>
      <Stack
        spacing={30}
        p={"1.5rem"}
        sx={{ backgroundColor: "white", borderRadius: "25px" }}
      >
        <Select
          label="Contact"
          radius={"xl"}
          sx={{ maxWidth: "300px" }}
          withAsterisk
          placeholder="Pick one"
          data={[
            { value: "instructor", label: "Dr. Kristin Benli (Coordinator)" },
            { value: "career_center", label: "Career Center" },
          ]}
        />
        <TextInput
          label="Subject"
          placeholder="Subject"
          withAsterisk
          radius={"xl"}
          sx={{ maxWidth: "300px" }}
        />
        <Textarea
          withAsterisk
          placeholder="Your Message"
          minRows={4}
          maxRows={10}
          radius={"xl"}
          label="Message"
        />
        <Flex justify={"center"}>
          <Button w={"fit-content"} pr={"2rem"} pl={"2rem"} radius={"xl"}>
            Send
          </Button>
        </Flex>
      </Stack>
    </MessagesLayout>
  );
}
