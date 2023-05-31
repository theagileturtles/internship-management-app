import Layout from "../../../components/layout"
import {
  Accordion,
  Box,
  Grid,
  Text,
  Title,
  Stack,
  useMantineTheme,
  Flex,
  Anchor,
  Button,
  Group,
  Pagination,
  Tooltip,
  Alert,
  Notification,
  Transition,
  Modal,
  Textarea,
} from "@mantine/core";
import moment from "moment";
import { useState } from "react";

import { Check, Download } from "tabler-icons-react";

function DetailsTitle(props) {
  return <Text size={"xs"} {...props} />;
}

function DetailsText(props) {
  return <Text size={"sm"} fw={700} {...props} />;
}

function TableText(props) {
  return <Text fw={700} ta={"center"} {...props} />;
}

function TableHeader(props) {
  return <Text ta={"center"} {...props} />;
}

export default function Index({ data }) {
  const theme = useMantineTheme();
  const [values, setValues] = useState(data);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationData, setNotificationData] = useState({
    title: "",
    description: "",
    icon: <Check />,
  });
  const [message, setMessage] = useState("")
  const [rejectUUID, setRejectUUID] = useState()
  const [rejectCompany, setRejectCompany] = useState()
  const [rejectUserUUID, setRejectUserUUID] = useState()

  function messageHandler(event){
    setMessage(event.target.value)
  }

  function approveHandler(event, uuid) {
    event.stopPropagation();
    fetch(
      `/api/instructor/manage/internship-application/${uuid}?action=approve`,
      {
        method: "PUT",
      }
    ).then((res) => {
      if (res.status === 200) {
        fetchData().then((response) => setValues(response));
        setNotificationData({
          title: "The Application is Approved!",
          description: (
            <Text>
              You can track the application from{" "}
              <span style={{ fontWeight: 700 }}>
                Completed Internship Applications
              </span>{" "}
              tab in the sidebar.
            </Text>
          ),
          icon: <Check />,
        });
        setNotificationVisible(true);
      }
    });
  }

  function rejectHandler(event, uuid, company, userUUID ) {
    event.stopPropagation();
    setModalVisible(true)
    setRejectUUID(uuid);
    setRejectCompany(company)
    setRejectUserUUID(userUUID)
  }

  function rejectAndSendHandler(){
    fetch(
      `/api/instructor/manage/internship-application/${rejectUUID}?action=reject`,
      {
        method: "PUT",
      }
    ).then((res) => {
      if (res.status === 200) {

        fetch("http://localhost:3000/api/messages/new/"+rejectUserUUID, {
        method: "POST",
        body: JSON.stringify({
          subject: "Internship Application to " + rejectCompany + " is Rejected",
          message: message,
      }),
    }).then(()=>{
      fetchData().then((response) => setValues(response));
      setNotificationData({
        title: "The Application is Rejected!",
        description: (
          <Text>
            The application was sent back to the student. The student will get
            a notification about that.
          </Text>
        ),
        icon: <Check />,
      });
      setNotificationVisible(true);
      setModalVisible(false)
      setMessage("")
    })
      }
    });
  }
  return (
    <>
      <Layout role={"instructor"}>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            paddingLeft: "5vw",
            paddingRight: "5vw",
          }}
        >
          <Title pb={5} ta={"left"} color="text">
            MANAGE INTERNSHIP APPLICATIONS
          </Title>

          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 50,
              marginBottom: "50px",
              minHeight: "50vh",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack pb={20} sx={{ minHeight: "45vh", width: "100%" }}>
              <Grid pl={"2.875rem"} pr={"1rem"} pt={15}>
                <Grid.Col xs={6} md={3}>
                  <TableHeader>Received at</TableHeader>
                </Grid.Col>
                <Grid.Col xs={6} md={3}>
                  <TableHeader>Student</TableHeader>
                </Grid.Col>
                <Grid.Col xs={6} md={3}>
                  <TableHeader>Company</TableHeader>
                </Grid.Col>
                <Grid.Col xs={6} md={3}>
                  <TableHeader>Internship Type</TableHeader>
                </Grid.Col>
              </Grid>
              {values.length === 0 ? (
                <Text
                  pt={"0.5rem"}
                  fw={700}
                  fs={"italic"}
                  color="text"
                  ta={"center"}
                >
                  There is no record now.
                </Text>
              ) : (
                <></>
              )}
              <Accordion
                color="mainBlue"
                variant="filled"
                chevronPosition="left"
              >
                {values.map((element, index) => (
                  <Accordion.Item
                    key={element.uuid + "_accordion_item_" + index}
                    sx={{
                      width: "100%",
                      transition: "0.3s",
                      ":hover": {
                        backgroundColor: "#f9f9f9",
                      },
                      "&[data-active]": {
                        backgroundColor: theme.colors.mainBlue[0],
                      },
                    }}
                    value={"accordion_item_" + index}
                  >
                    <Accordion.Control sx={{ width: "100%" }}>
                      <Grid>
                        <Tooltip
                          label={new Date(element.updatedAt).toLocaleString()}
                        >
                          <Grid.Col xs={6} md={3}>
                            <TableText>
                              {moment(element.updatedAt).fromNow()}
                            </TableText>
                          </Grid.Col>
                        </Tooltip>
                        <Grid.Col xs={6} md={3}>
                          <TableText>
                            {element.firstName + " " + element.lastName}
                          </TableText>
                        </Grid.Col>
                        <Grid.Col xs={6} md={3}>
                          <TableText>{element.company}</TableText>
                        </Grid.Col>
                        <Grid.Col xs={6} md={3}>
                          <TableText>{element.type.label}</TableText>
                        </Grid.Col>
                      </Grid>
                    </Accordion.Control>
                    <Accordion.Panel
                      pl={"2.875rem"}
                      pr={"1rem"}
                      sx={{ color: theme.colors.mainBlue[6] }}
                    >
                      <Grid pb={15} grow columns={12}>
                        <Grid.Col
                          sx={{
                            justifyContent: "center",
                            display: "flex",
                          }}
                          span={4}
                        >
                          <Stack
                            spacing={0}
                            sx={{
                              textAlign: "center",
                              color: "inherit",
                            }}
                          >
                            <DetailsTitle>Files</DetailsTitle>

                            {element.files?.map((file) => (
                              <Anchor
                                sx={{
                                  justifyContent: "center",
                                  display: "flex",
                                }}
                                key={element.uuid + "_file_" + file.name}
                                target="_blank"
                                href={file.link}
                                download
                              >
                                <Flex gap={3} direction={"row"}>
                                  <Download size={18} />
                                  <DetailsText>{file.name}</DetailsText>
                                </Flex>
                              </Anchor>
                            ))}
                          </Stack>
                        </Grid.Col>
                        {/* <Grid.Col
                        sx={{
                          justifyContent: "center",
                          display: "flex",
                          minWidth: "fit-content",
                        }}
                        span={4}
                      >
                        <Stack spacing={0} ta={"center"}>
                          <DetailsTitle>Logs</DetailsTitle>
                          {element.logs?.map((log, index) => (
                            <DetailsText
                              sx={{ color: "inherit" }}
                              key={element.uuid + "_log_" + index}
                            >
                              {log}
                            </DetailsText>
                          ))}
                        </Stack>
                      </Grid.Col> */}
                        <Grid.Col
                          sx={{
                            justifyContent: "center",
                            display: "flex",
                            minWidth: "fit-content",
                          }}
                          span={4}
                        >
                          <Box ta={"center"}>
                            <DetailsTitle>Student No</DetailsTitle>
                            <DetailsText>{element.studentID}</DetailsText>
                          </Box>
                        </Grid.Col>
                      </Grid>
                      <Flex sx={{ justifyContent: "center" }}>
                        <Group>
                          <Button
                            radius={"xl"}
                            onClick={(event) =>
                              approveHandler(event, element.UUID)
                            }
                            sx={{ width: "100px" }}
                          >
                            Approve
                          </Button>
                          <Button
                            color="red"
                            radius={"xl"}
                            onClick={(event) =>
                              rejectHandler(event, element.UUID, element.company, element.userUUID)
                            }
                            sx={{ width: "100px" }}
                          >
                            Reject
                          </Button>
                        </Group>
                      </Flex>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Stack>
            <Pagination mb={"sm"} sx={{ alignSelf: "center" }} total={1} />
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
            icon={<Check size="1.1rem" />}
            color={notificationData.color}
            title={notificationData.title}
          >
            {notificationData.description}
          </Notification>
        )}
      </Transition>
      <Modal
        centered
        opened={modalVisible}
        onClose={()=>setModalVisible(false)}
        title={"Feedback"}
      >
        <Flex
          direction={"column"}
          sx={{ justifyContent: "center", alignItems: "center" }}
          p={5}
        >
          <Textarea
            w={"100%"}
            label="Message"
            withAsterisk
            placeholder="Message about the rejection."
            onChange={messageHandler}
          />
          <Group>
            <Button
              color="red"
              sx={{ width: "fit-content" }}
              mt={"1rem"}
              radius={"xl"}
              disabled = {message.length === 0}
              onClick={rejectAndSendHandler}
            >
              Reject the Application
            </Button>
            <Button
              color="gray"
              sx={{ width: "fit-content" }}
              mt={"1rem"}
              radius={"xl"}
              onClick={()=>{setModalVisible(false); setMessage("")}}
            >
              Cancel
            </Button>
          </Group>
        </Flex>
      </Modal>
    </>
  );
}

export async function getServerSideProps(context) {
  const data = await fetchData(context);
  return { props: { data } };
}

async function fetchData(context) {
  const response = await fetch(
    "http://localhost:3000/api/instructor/get/internship-applications?status=pending_for_coordinator",{
      headers:{
        "Cookie": context.req.headers.cookie||"",
      }
    }
  ).then((res) => res.json());

  return [...response.data];
}
