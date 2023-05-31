import MessagesLayout from "../../../components/messagesLayout";
import {
  Avatar,
  Stack,
  Box,
  Group,
  Text,
  Title,
  Textarea,
  Center,
  Button,
} from "@mantine/core";
import { useState } from "react";
const sessionData = require("./../../../../session-example.json");

export default function Index({ data }) {
  const session = sessionData.session;
  const [reply, setReply] = useState("");
console.log("sessionn: " + session.user.uuid)
  function replyHandler(event) {
    setReply(event.target.value);
  }

  return (
    <MessagesLayout title={data.subject}>
      <Stack
        spacing={30}
        p={"1.5rem"}
        sx={{ backgroundColor: "white", borderRadius: "25px" }}
      >
        <Stack>
          <Group>
            <Avatar />
            <Stack spacing={0}>
              <Title order={5}><span style={{fontStyle:"italic"}}>to:</span> {data.name}</Title>
              <Text color="dimmed" size={"xs"}>
                {data.description}
              </Text>
            </Stack>
          </Group>
          <Box pb={20}>
            <Text>{data.message}</Text>
            <Box>
              <Text fs={"italic"} size={"sm"} color="dimmed" ta={"end"}>
                {new Date(data.createdAt).toLocaleString()}
              </Text>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </MessagesLayout>
  );
}

export async function getServerSideProps(req, res) {
  const { uuid } = req.query;
  const data = await fetch("http://localhost:3000/api/messages/outgoing/" + uuid)
    .then((res) => res.json())
    .then((res) => res.data);
  console.log(uuid, data);
  return { props: { data } };
}
