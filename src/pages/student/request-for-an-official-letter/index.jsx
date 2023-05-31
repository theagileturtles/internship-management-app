import Layout from '../../../components/layout';
import UploadInput from "../../../components/uploadinput";
import {
  Box,
  Title,
  Stack,
  Text,
  useMantineTheme,
  Button,
  Anchor,
  TextInput,
  Radio,
  Grid,
  FileInput,
  Center,
  Textarea,
  ActionIcon,
  Group,
  Select,
  Transition,
  Notification,
} from "@mantine/core";
import { useState } from "react";
import {
  Check,
  Checkbox,
  Download,
  Tex,
  Trash,
  Upload,
  X,
} from "tabler-icons-react";

const MAX_LETTER = 150;
export default function Index() {
  const theme = useMantineTheme();

  const [company, setCompany] = useState("");
  const [type, setType] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [message, setMessage] = useState("");
  const [numberOfIncomplete, setNumberOfIncomplete] = useState(null);
  const [transcriptHref, setTranscriptHref] = useState(null);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationData, setNotificationData] = useState({
    title: "",
    description: "",
    icon: <Check />,
  });
  const [requestLoader, setRequestLoader] = useState(false);

  function messageHandler(event) {
    setMessage(event.target.value);
  }

  function companyHandler(event) {
    setCompany(event.target.value);
  }

  function transcriptHandler(file) {
    if (file) {
      setTranscript(file);
      toBase64(file).then((blob) => setTranscriptHref(blob));
    }
  }

  function numberOfIncompleteHandler(event) {
    setNumberOfIncomplete(event);
  }

  function typeHandler(event) {
    setType(event);
  }

  function requestHandler() {
    setRequestLoader(true);
    fetch("/api/student/sendRequestOfficialLetter", {
      method: "POST",
      body: JSON.stringify({
        blob: transcriptHref,
        company: company,
        type: type,
        message: message,
        numberOfIncomplete: numberOfIncomplete,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setNotificationData({
            title: "The Official Letter is Requested Successfully!",
            description: (
              <Text>
                You can track the request via{" "}
                <span style={{ fontWeight: 700 }}>Official Letter Request</span>{" "}
                tab in the sidebar.
              </Text>
            ),
            icon: <Check />,
          });
        } else {
          setNotificationData({
            title: "Error Occured",
            description: (
              <Text>
                Error occured while you are creating your application. Please
                try again later.
              </Text>
            ),
            color: "red",
            icon: <X />,
          });
        }
        setNotificationVisible(true);
      })
      .finally(() => {
        setRequestLoader(false);
        setCompany("");
        setType(null);
        setTranscript(null);
        setMessage("");
        setNumberOfIncomplete(null);
      });
  }

  return (
    <>
      <Layout role={"student"}>
        <Box
          sx={{
            minHeight: "100%",
            width: "100%",
            paddingLeft: "5vw",
            paddingRight: "5vw",
          }}
        >
          {/* Title for the page. pb means padding bottom which creates space between bottom part. ta means text align. Also you can define
        these features in sx prop which helps to create custom css on the specific mantine component*/}
          <Title pb={5} ta={"left"} color="text">
            REQUEST FOR AN OFFICIAL LETTER
          </Title>
          <Box
            pl={"3rem"}
            pr={"3rem"}
            pt={"1.5rem"}
            pb={"1.5rem"}
            sx={{
              backgroundColor: "white",
              borderRadius: 50,
              width: "100%",
              minHeight: "50vh",
              textAlign: "left",
              display: "flex",
            }}
          >
            <Grid align="start" gutter={"xl"}>
              <Grid.Col sm={12} lg={6}>
                <TextInput
                  sx={{ maxWidth: 250 }}
                  onChange={companyHandler}
                  value={company}
                  radius={"xl"}
                  placeholder="Company Name You Applied"
                  label="Company Name"
                  withAsterisk
                />
              </Grid.Col>
              <Grid.Col sm={12} lg={6}>
                <Select
                  onChange={numberOfIncompleteHandler}
                  value={numberOfIncomplete}
                  sx={{ maxWidth: "250px" }}
                  label="Number of incomplete internships"
                  placeholder="Pick one"
                  withAsterisk
                  radius={"xl"}
                  data={[
                    { value: "0", label: "0" },
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                  ]}
                />
              </Grid.Col>
              <Grid.Col xs={12} sm={12} lg={6} xl={6}>
                <Radio.Group
                  onChange={typeHandler}
                  value={type}
                  name="typeOfInternship"
                  label="Choose Internship Type"
                  withAsterisk
                >
                  <Stack mt="xs">
                    <Radio value="compulsory1" label="Compulsary-1" />
                    <Radio value="compulsory2" label="Compulsary-2" />
                    <Radio value="voluntary" label="Voluntary" />
                  </Stack>
                </Radio.Group>
              </Grid.Col>
              <Grid.Col xs={12} sm={12} lg={6} xl={6}>
                <Stack spacing={33}>
                  <Group
                    spacing={2}
                    sx={{
                      width: "100%",
                      alignItems: "end",
                    }}
                  >
                    <UploadInput
                      value={transcript}
                      withAsterisk
                      onChange={transcriptHandler}
                      variant="filled"
                      icon={<Upload size={"1.1rem"} />}
                      placeholder="Your Transcript"
                      label={"Transcript"}
                      radius={"xl"}
                      sx={{ width: "100%", maxWidth: "300px" }}
                    />
                    {transcript ? (
                      <Group spacing={2}>
                        <ActionIcon
                          color="mainBlue"
                          component="a"
                          download={transcript.name}
                          href={transcriptHref}
                          target="_blank"
                          mb={"0.3rem"}
                          radius={"xl"}
                        >
                          <Download size={"1.3rem"} />
                        </ActionIcon>

                        <ActionIcon
                          onClick={() => {
                            setTranscript(null);
                          }}
                          color="red"
                          mb={"0.3rem"}
                          radius={"xl"}
                        >
                          <Trash size={"1.3rem"} />
                        </ActionIcon>
                      </Group>
                    ) : (
                      <></>
                    )}
                  </Group>
                  <Stack display={"flex"} spacing={2}>
                    <Textarea
                      onChange={messageHandler}
                      autosize
                      value={message}
                      minRows={3}
                      maxRows={3}
                      radius={"md"}
                      maxLength={150}
                      placeholder="Additional Information"
                      label="Message"
                    />
                    <Text size={"sm"} sx={{ alignSelf: "end" }} color="dimmed">
                      {message.length}/{MAX_LETTER}
                    </Text>
                  </Stack>
                </Stack>
              </Grid.Col>
              <Grid.Col xl={12}>
                <Center>
                  <Button
                  loading={requestLoader}
                    onClick={requestHandler}
                    disabled={
                      !(
                        company.length > 0 &&
                        type &&
                        transcript &&
                        numberOfIncomplete
                      )
                    }
                    sx={{ width: "100%", maxWidth: 200 }}
                    radius={"xl"}
                  >
                    Request
                  </Button>
                </Center>
              </Grid.Col>
            </Grid>
          </Box>
        </Box>
      </Layout>
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

function toBase64(blob) {
  const reader = new FileReader();
  return new Promise((res, rej) => {
    reader.readAsDataURL(blob);
    reader.onload = function () {
      res(reader.result);
    };
  });
}
