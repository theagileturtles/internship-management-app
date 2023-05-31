
import MessagesLayout from "../../../components/messagesLayout";
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Grid,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import moment from "moment";
import { useState } from "react";
import { Search } from "tabler-icons-react";

export default function Index({ data }) {
  const [values, setValues] = useState(data);
  return (
    <MessagesLayout title={"INCOMING MESSAGES"}>
      <Stack
        spacing={30}
        p={"1.5rem"}
        sx={{ backgroundColor: "white", borderRadius: "25px" }}
        mb={"3rem"}
      >
        {values.length === 0 ? <Center><Text fw={700}>There is no incoming messages so far.</Text></Center> :values.map((element) => (
          <Grid
            grow
            key={"incoming_messages_" + element.senderUUID}
            p={"sm"}
            justify="center"
            align="center"
            fw={element.read ? 400 : 700 }
            sx={{
              backgroundColor: "#f9f9f9",
              borderRadius: "25px",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                cursor: "default",
              },
            }}
          >
            <Grid.Col md={2} lg={1}>
              <Stack spacing={0}>
                <Avatar />
              </Stack>
            </Grid.Col>
            <Grid.Col md={10} lg={3}>
              <Stack spacing={0}>
                <Text>{element.name}</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <Text>{element.subject}</Text>
            </Grid.Col>
            <Tooltip label={new Date(element.createdAt).toLocaleString()}>
            <Grid.Col md={6} lg={3}>
              <Text ta={"center"}>{moment(element.createdAt).fromNow()}</Text>
            </Grid.Col>
            </Tooltip>
            <Grid.Col md={6} lg={1}>
              <ActionIcon component="a" href={"/messages/incoming/"+element.messageUUID} size={"1.3rem"}>
                <Search />
              </ActionIcon>
            </Grid.Col>
          </Grid>
        ))}
      </Stack>
    </MessagesLayout>
  );
}

export async function getServerSideProps() {
  const data = await fetch("http://localhost:3000/api/messages/incoming").then((res)=>res.json()).then((res)=>res.data)
  return { props: { data } };
}
