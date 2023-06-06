import { authOptions } from '@/pages/api/auth/[...nextauth]';
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
  Group,
  ActionIcon,
  Transition,
  Notification,
  Tooltip,
} from "@mantine/core";
import moment from "moment/moment";
import { getServerSession } from 'next-auth';
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Check,
  Checkbox,
  Cross,
  Download,
  Trash,
  Upload,
  X,
} from "tabler-icons-react";

export default function Index({ data }) {
  const router = useRouter();
  const UUID = router.query.uuid;

  const theme = useMantineTheme();
  const [company, setCompany] = useState(data.company);
  const [type, setType] = useState(data.type);
  const [transcript, setTranscript] = useState({ name: "transcript.pdf" });
  const [transcriptHref, setTranscriptHref] = useState(data.transcript);
  const [applicationFormHref, setApplicationFormHref] = useState(
    data.filledApplicationForm
  );
  const [applicationForm, setApplicationForm] = useState({
    name: "application-form.pdf",
  });
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationData, setNotificationData] = useState({
    title: "",
    description: "",
    icon: <Check />,
  });
  const [createLoader, setCreateLoader] = useState(false);

  function transcriptHandler(file) {
    if (file) {
      setTranscript(file);
      toBase64(file).then((blob) => setTranscriptHref(blob));
    }
  }

  function applicationFormHandler(file) {
    if (file) {
      setApplicationForm(file);
      toBase64(file).then((blob) => setApplicationFormHref(blob));
    }
  }

  function companyHandler(event) {
    setCompany(event.target.value);
  }

  function typeHandler(event) {
    setType(event);
  }

  function editHandler() {
    let body = { company: company, type: type, files: [] };

    if (data.transcript !== transcriptHref) {
      body.files.push({
        name: "transcript",
        blob: transcriptHref,
      });
    }
    if (data.filledApplicationForm !== applicationFormHref) {
      body.files.push({
        name: "application-form",
        blob: applicationFormHref,
      });
    }
    console.log(body);
    setCreateLoader(true);
    fetch("/api/student/update-internship-application?uuid=" + UUID, {
      method: "PUT",
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 200) {
          setNotificationData({
            title: "The Application is Updated Successfully!",
            description: (
              <Text>
                You can track the application via{" "}
                <span style={{ fontWeight: 700 }}>Internship Applications</span>{" "}
                tab in the sidebar.
              </Text>
            ),
            icon: <Check />,
          });
          data.company = company;
          data.type = type;
          data.transcript = transcriptHref;
          data.filledApplicationForm = applicationFormHref;
          router.push("/student/internship-applications")
        } else {
          setNotificationData({
            title: "Error Occured",
            description: (
              <Text>
                Error occured while you are editting your application. Please
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
        setCreateLoader(false);
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
            EDIT YOUR APPLICATION
          </Title>
          <Box
            pl={"3rem"}
            pr={"3rem"}
            pt={"1.5rem"}
            pb={"1.5rem"}
            sx={{
              backgroundColor: "white",
              borderRadius: 50,
              marginBottom: "50px",
              minHeight: "50vh",
              textAlign: "left",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Grid sx={{ height: "fit-content" }} gutter={30}>
              <Grid.Col sx={{}} lg={12} xl={3}>
                <Box
                  p={"1rem"}
                  sx={{
                    height: "100%",
                    backgroundColor: theme.colors.info[3],
                    color: theme.colors.info[11],
                    borderRadius: 30,
                  }}
                >
                  <Text pb={15}>
                    For the application, you must first download the internship
                    application file below, fill it in completely and then add
                    the file to the system. If there is incorrect or incomplete
                    information in the application form you downloaded and
                    uploaded, your application will be rejected.
                  </Text>
                  <Stack
                    spacing={3}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      component="a"
                      download={"application_form"}
                      href={data?.applicationFormHref}
                      disabled={!data.applicationFormHref}
                      leftIcon={<Download size={"1.1rem"} />}
                      ta={"center"}
                      radius={"xl"}
                      sx={{ width: "fit-content" }}
                    >
                      Download
                    </Button>
                    {data ? (
                      <Tooltip
                        position="bottom"
                        label={new Date(
                          data.applicationFormCreatedAt
                        ).toLocaleString()}
                      >
                        <Text fs={"italic"} size={"xs"} ta={"center"}>
                          Uploaded{" "}
                          {moment(data.applicationFormCreatedAt).fromNow()}
                        </Text>
                      </Tooltip>
                    ) : (
                      <Text fs={"italic"} size={"xs"} ta={"center"}>
                        The form is not uploaded yet. Wait for coordinator to
                        start to process.
                      </Text>
                    )}
                  </Stack>
                </Box>
              </Grid.Col>
              <Grid.Col lg={12} xl={9}>
                <Grid gutter={"xl"}>
                  <Grid.Col lg={12}>
                    <TextInput
                      disabled={!data}
                      value={company}
                      sx={{ maxWidth: 250 }}
                      radius={"xl"}
                      placeholder="Company Name You Applied"
                      label="Company Name"
                      withAsterisk
                      onChange={companyHandler}
                    />
                  </Grid.Col>

                  <Grid.Col xs={12} sm={12} lg={6} xl={6}>
                    <Radio.Group
                      name="typeOfInternship"
                      label="Choose Internship Type"
                      withAsterisk
                      value={type}
                      onChange={typeHandler}
                    >
                      <Stack mt="xs">
                        <Radio
                          disabled={!data}
                          value="compulsory1"
                          label="Compulsary-1"
                        />
                        <Radio
                          disabled={!data}
                          value="compulsory2"
                          label="Compulsary-2"
                        />
                        <Radio
                          disabled={!data}
                          value="voluntary"
                          label="Voluntary"
                        />
                      </Stack>
                    </Radio.Group>
                  </Grid.Col>
                  <Grid.Col xs={12} sm={12} lg={6} xl={6}>
                    <Stack>
                      <Group
                        spacing={2}
                        sx={{
                          width: "100%",
                          alignItems: "end",
                        }}
                      >
                        <UploadInput
                          disabled={!data}
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
                            {transcriptHref !== data.transcript ? (
                              <ActionIcon
                                onClick={() => {
                                  setTranscript({ name: "transcript.pdf" });
                                  setTranscriptHref(data.transcript);
                                }}
                                color="red"
                                mb={"0.3rem"}
                                radius={"xl"}
                              >
                                <Trash size={"1.3rem"} />
                              </ActionIcon>
                            ) : (
                              <></>
                            )}
                          </Group>
                        ) : (
                          <></>
                        )}
                      </Group>
                      <Group
                        spacing={2}
                        sx={{
                          width: "100%",
                          alignItems: "end",
                        }}
                      >
                        <UploadInput
                          disabled={!data}
                          value={applicationForm}
                          withAsterisk
                          onChange={applicationFormHandler}
                          variant="filled"
                          icon={<Upload size={"1.1rem"} />}
                          placeholder="Your Application Form"
                          label={"Application Form"}
                          radius={"xl"}
                          sx={{ width: "100%", maxWidth: "300px" }}
                        />
                        {applicationForm ? (
                          <Group spacing={2}>
                            <ActionIcon
                              color="mainBlue"
                              component="a"
                              download={applicationForm.name}
                              href={applicationFormHref}
                              target="_blank"
                              mb={"0.3rem"}
                              radius={"xl"}
                            >
                              <Download size={"1.3rem"} />
                            </ActionIcon>

                            {applicationFormHref !==
                            data.filledApplicationForm ? (
                              <ActionIcon
                                onClick={() => {
                                  setApplicationForm({
                                    name: "application-form.pdf",
                                  });
                                  setApplicationFormHref(
                                    data.filledApplicationForm
                                  );
                                }}
                                color="red"
                                mb={"0.3rem"}
                                radius={"xl"}
                              >
                                <Trash size={"1.3rem"} />
                              </ActionIcon>
                            ) : (
                              <></>
                            )}
                          </Group>
                        ) : (
                          <></>
                        )}
                      </Group>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col xl={12}>
                    <Center>
                      <Button
                        loading={createLoader}
                        disabled={
                          company === data.company &&
                          type === data.type &&
                          transcriptHref === data.transcript &&
                          applicationFormHref === data.filledApplicationForm
                        }
                        onClick={editHandler}
                        sx={{ width: "100%", maxWidth: 200 }}
                        radius={"xl"}
                      >
                        Save the Changes
                      </Button>
                    </Center>
                  </Grid.Col>
                </Grid>
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

export async function getServerSideProps(context) {


  const { uuid } = context.query;
  let data = null;
  const formResponse = await fetch(
    "http://localhost:3000/api/student/get-form-uuid",{
      headers:{
        "Cookie": context.req.headers.cookie||"",
      }
    }
    
  )
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err));

  const applicationResponse = await fetch(
    "http://localhost:3000/api/student/get-internship-application?uuid=" + uuid,{
      headers:{
        "Cookie": context.req.headers.cookie||"",
      }
    }
  )
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err));

  console.log(applicationResponse);

  if (formResponse && applicationResponse) {
    data = {
      applicationFormCreatedAt: formResponse.createdAt,
      applicationFormHref:
        "/api/student/download/application-form/" + formResponse.UUID,
      company: applicationResponse.company,
      type: applicationResponse.type,
      transcript: applicationResponse.transcript,
      filledApplicationForm: applicationResponse.applicationForm,
    };
  }
  return { props: { data } };
}
