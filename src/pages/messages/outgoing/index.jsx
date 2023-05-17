import Layout from "@/components/layout";
import MessagesLayout from "@/components/messagesLayout";
import {
  ActionIcon,
  Avatar,
  Box,
  Grid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { Search } from "tabler-icons-react";

export default function Index({ data }) {
  const [values, setValues] = useState(data);
  return (
    <MessagesLayout title={"OUTGOING MESSAGES"}>
      <Stack
        spacing={30}
        p={"1.5rem"}
        sx={{ backgroundColor: "white", borderRadius: "25px" }}
      >
        {values.map((element) => (
          <Grid
            grow
            key={"incoming_messages_" + element.uuid}
            p={"sm"}
            justify="center"
            align="center"
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
                <Text>{element.firstName + " " + element.lastName}</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <Text>{element.subject}</Text>
            </Grid.Col>
            <Grid.Col md={6} lg={3}>
              <Text>{new Date(element.createdAt).toLocaleString()}</Text>
            </Grid.Col>
            <Grid.Col md={6} lg={1}>
              <ActionIcon size={"1.3rem"}>
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
  const data = [
    {
      UUID: "2978fff6-ca4d-4183-b6a6-94b3a73f4542",
      firstName: "Müberra",
      lastName: "Yerinde",
      email: "muberra.yerinde@st.uskudar.edu.tr",
      subject: "RE: About absences at internship",
      createdAt: "2023-05-17T16:36:23.000Z",
    },
  ];
  return { props: { data } };
}
