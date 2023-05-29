import Layout from "@/components/layout";
import MessagesLayout from "@/components/messagesLayout";
import {
  Stack,
  Select,
  TextInput,
  Textarea,
  Button,
  Flex,
  Group,
  Text,
  Avatar,
  Transition,
  Notification,
} from "@mantine/core";
import { forwardRef, useState } from "react";
import { Check, X } from "tabler-icons-react";

export default function Index({ data }) {
  const [contact, setContact] = useState(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationData, setNotificationData] = useState({
    title: "",
    description: "",
    icon: <Check />,
  });
  const [sendLoader, setSendLoader] = useState(false);

  const SelectItem = forwardRef(function SelectedItem(
    { image, label, description, ...others },
    ref
  ) {
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" opacity={0.65}>
              {description}
            </Text>
          </div>
        </Group>
      </div>
    );
  });

  function contactHandler(event) {
    setContact(event);
  }

  function subjectHandler(event) {
    setSubject(event.target.value);
  }

  function messageHandler(event) {
    setMessage(event.target.value);
  }

  function sendHandler() {
    setSendLoader(true)
    fetch("http://localhost:3000/api/messages/new/"+contact, {
      method: "POST",
      body: JSON.stringify({
        subject: subject,
        message: message,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
           setNotificationData({
            title: "Message Has Been Sended!",
            description: (
              <Text>
                You can display your messages via {" "}
                <span style={{ fontWeight: 700 }}>Outgoing Messages</span>{" "}
                tab in the sidebar.
              </Text>
            ),
            icon: <Check />,})
          setContact(null);
          setMessage("");
          setSubject("");
        } else {
          setNotificationData({
            title: "Error Occured!",
            color: "red",
            description: (
              <Text>
                an Error occured. Please try again later.
              </Text>
            ),
            icon: <X />,})
        }
      })
      .catch(() => {
        setNotificationData({
          title: "Error Occured!",
          color: "red",
          description: (
            <Text>
              an Error occured. Please try again later.
            </Text>
          ),
          icon: <X />,})
      })
      .finally(() => {
        setNotificationVisible(true);
        setSendLoader(false)
      });
  }

  return (
    <>
    <MessagesLayout title={"NEW MESSAGE"}>
      <Stack
        spacing={30}
        p={"1.5rem"}
        sx={{ backgroundColor: "white", borderRadius: "25px" }}
      >
        <Select
          itemComponent={SelectItem}
          onChange={contactHandler}
          searchable
          nothingFound="No options"
          value={contact}
          label="Contact"
          radius={"xl"}
          sx={{ maxWidth: "300px" }}
          withAsterisk
          placeholder="Pick one"
          data={data.map((element) => {
            return {
              value: element.UUID,
              label: element.label,
              group: element.group,
              description: element.description,
            };
          })}
        />
        <TextInput
          onChange={subjectHandler}
          value={subject}
          label="Subject"
          placeholder="Subject"
          withAsterisk
          radius={"xl"}
          sx={{ maxWidth: "300px" }}
        />
        <Textarea
          onChange={messageHandler}
          value={message}
          withAsterisk
          placeholder="Your Message"
          minRows={4}
          maxRows={10}
          radius={"xl"}
          label="Message"
        />
        <Flex justify={"center"}>
          <Button
            onClick={sendHandler}
            disabled={!(contact && subject.trim().length > 0 && message.trim().length > 0)}
            w={"fit-content"}
            pr={"2rem"}
            pl={"2rem"}
            radius={"xl"}
            loading={sendLoader}
          >
            Send
          </Button>
        </Flex>
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

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/messages/get-contacts");
  const data = await res.json();

  return { props: { data } };
}
