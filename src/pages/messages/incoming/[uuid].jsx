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
  Transition,
  Notification,
} from "@mantine/core";
import { useState } from "react";
import { Check, X } from "tabler-icons-react";

export default function Index({ data }) {
  const [reply, setReply] = useState("");
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationData, setNotificationData] = useState({
    title: "",
    description: "",
    icon: <Check />,
  });
  const [sendLoader, setSendLoader] = useState(false);

  function replyHandler(event) {
    setReply(event.target.value);
  }

  function replyButtonHandler() {
    setSendLoader(true);
    fetch("http://localhost:3000/api/messages/new/" + data.senderUUID, {
      method: "POST",
      body: JSON.stringify({
        subject: "RE: " + data.subject,
        message: reply,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setNotificationData({
            title: "Message Has Been Sended!",
            description: (
              <Text>
                You can display your messages via{" "}
                <span style={{ fontWeight: 700 }}>Outgoing Messages</span> tab
                in the sidebar.
              </Text>
            ),
            icon: <Check />,
          });
          setReply("");
        } else {
          setNotificationData({
            title: "Error Occured!",
            color: "red",
            description: <Text>an Error occured. Please try again later.</Text>,
            icon: <X />,
          });
        }
      })
      .catch(() => {
        setNotificationData({
          title: "Error Occured!",
          color: "red",
          description: <Text>an Error occured. Please try again later.</Text>,
          icon: <X />,
        });
      })
      .finally(() => {
        setNotificationVisible(true);
        setSendLoader(false);
      });
  }
  return (
    <>
      <MessagesLayout title={data.subject}>
        <Stack
          spacing={30}
          p={"1.5rem"}
          sx={{ backgroundColor: "white", borderRadius: "25px" }}
        >
          <Stack>
            <Group>
              <Avatar src={data.image} />
              <Stack spacing={0}>
                <Title order={5}>{data.name}</Title>
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
            <Stack>
              <Textarea
                value={reply}
                onChange={replyHandler}
                label={"Reply"}
                placeholder="Reply"
              />
              <Center>
                <Button
                  onClick={replyButtonHandler}
                  loading={sendLoader}
                  disabled={reply.trim().length === 0}
                  radius={"xl"}
                >
                  Reply
                </Button>
              </Center>
            </Stack>
          </Stack>
        </Stack>
      </MessagesLayout>
      <Transition
        mounted={notificationVisible}
        transition="fade"
        duration={200}
        timingFunction="ease"
      >
        {(styles) => (
          <Notification
            onClose={() => {
              setNotificationVisible(false);
            }}
            withCloseButton
            style={styles}
            sx={{ position: "fixed", bottom: "3rem", left: "3rem" }}
            icon={notificationData.icon}
            color={notificationData.color}
            title={notificationData.title}
          >
            {notificationData.description}
          </Notification>
        )}
      </Transition>
    </>
  );
}

export async function getServerSideProps(context) {
  const { uuid } = context.query;
  const data = await fetch(
    "http://localhost:3000/api/messages/incoming/" + uuid,{
      headers:{
        "Cookie": context.req.headers.cookie||"",
      }
    }
  )
    .then((res) => res.json())
    .then((res) => res.data);
  console.log(uuid, data);
  return { props: { data } };
}
