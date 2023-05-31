import { useState } from "react";
import Layout from "../../../components/layout"
import UploadInput from "../../../components/uploadinput";
import generateFile from "../../../utils/GenerateLetter";
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
  FileInput,
  Tooltip,
  ActionIcon,
  Center,
  Transition,
  Notification,
} from "@mantine/core";
import moment from "moment";

import { Check, Download, Trash, Upload, X } from "tabler-icons-react";

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
  const [fileLoading, setFileLoading] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationData, setNotificationData] = useState({
    title: "",
    description: "",
    icon: <Check />,
  });

  const handleGenerateClick = async (element) => {
    const generatedFileData = await generateFile(element);
    const temp = values.map((value) => {
      if (value.UUID === element.UUID) {
        return {
          ...value,
          file: generatedFileData,
          hrefDownload: generatedFileData.url,
        };
      } else {
        return value;
      }
    });
    setValues(temp);
  };

  function fileHandler(file, UUID) {
    if (file) {
      toBase64(file).then((blob) => {
        const temp = values.map((value) => {
          if (value.UUID === UUID) {
            return { ...value, file: file, hrefDownload: blob };
          } else {
            return value;
          }
        });
        setValues(temp);
      });
    }
  }

  function uploadHandler(UUID) {
    setFileLoading(true);
    const temp = values.filter((value) => {
      if (value.UUID === UUID) {
        fetch(
          "http://localhost:3000/api/instructor/manage/letter-request/" + UUID,
          {
            method: "PUT",
            body: value.hrefDownload,
          }
        )
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              setNotificationData({
                title: "The Official Letter Has Sended",
                description: (
                  <Text>
                    The official letter has sended for the request. You can check it via <span style={{fontWeight:700}}>Completed Official Letter Requests</span> tab in the sidebar.
                  </Text>
                ),
                icon: <Check />,
              });
            } else {
              setNotificationData({
                title: "Error occured.",
                description: (
                  <Text>
                    Error occured. Please try again later.
                  </Text>
                ),
                icon: <X />,
                color:"red"
              });
            }
          })
          .finally(() => {
            setFileLoading(false);
            setNotificationVisible(true);
          });
      }
      return value.UUID !== UUID;
    });
    setValues(temp);
  }

  function cancelHandler(UUID) {
    const temp = values.map((value) => {
      if (value.UUID === UUID) {
        return { ...value, file: null };
      } else {
        return value;
      }
    });
    setValues(temp);
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
            MANAGE OFFICIAL LETTER REQUESTS
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
              <Accordion
                color="mainBlue"
                variant="filled"
                chevronPosition="left"
              >
                {values.length === 0 ? (
                  <Center>
                    <Text fw={700}>There is no record now.</Text>
                  </Center>
                ) : (
                  values.map((element, index) => (
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
                            <TableText>{element.type?.label}</TableText>
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
                            md={4}
                          >
                            <Stack
                              spacing={0}
                              sx={{
                                textAlign: "center",
                                color: "inherit",
                              }}
                            >
                              <DetailsTitle>Files</DetailsTitle>

                              {element.files.map((file) => (
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
                          <Grid.Col
                            sx={{
                              justifyContent: "center",
                              display: "flex",
                              minWidth: "fit-content",
                            }}
                            md={4}
                          >
                            <Stack spacing={0} ta={"center"}>
                              <DetailsTitle>
                                Number of Incomplete Internship(s)
                              </DetailsTitle>
                              <DetailsText
                                sx={{ color: "inherit" }}
                                key={
                                  element.uuid +
                                  "_no_of_incomplete_internships_" +
                                  index
                                }
                              >
                                {element.incompleteInternships}
                              </DetailsText>
                            </Stack>
                          </Grid.Col>
                          <Grid.Col
                            sx={{
                              justifyContent: "center",
                              display: "flex",
                              minWidth: "fit-content",
                            }}
                            md={4}
                          >
                            <Box ta={"center"}>
                              <DetailsTitle>Student No</DetailsTitle>
                              <DetailsText>{element.studentID}</DetailsText>
                            </Box>
                          </Grid.Col>
                          <Grid.Col
                            sx={{
                              justifyContent: "center",
                              display: "flex",
                              minWidth: "fit-content",
                            }}
                            span={12}
                          >
                            <Box ta={"center"}>
                              <DetailsTitle>Message</DetailsTitle>
                              <DetailsText>
                                {element.message ?? "No message is provided"}
                              </DetailsText>
                            </Box>
                          </Grid.Col>
                        </Grid>
                        <Stack
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Group
                            spacing={2}
                            sx={{
                              width: "100%",
                              alignItems: "end",
                              justifyContent: "center",
                            }}
                          >
                            <UploadInput
                              value={element.file}
                              onChange={(event) =>
                                fileHandler(event, element.UUID)
                              }
                              variant="filled"
                              icon={<Upload size={"1.1rem"} />}
                              placeholder="Upload or Generate an Official Letter"
                              label={"Official Letter"}
                              radius={"xl"}
                              sx={{ width: "100%", maxWidth: "300px" }}
                            />
                            <Group spacing={2}>
                              {element.file ? (
                                <ActionIcon
                                  color="mainBlue"
                                  component="a"
                                  download={element.file?.name}
                                  href={element.hrefDownload}
                                  target="_blank"
                                  mb={"0.3rem"}
                                  radius={"xl"}
                                >
                                  <Download size={"1.3rem"} />
                                </ActionIcon>
                              ) : (
                                <></>
                              )}
                            </Group>
                          </Group>
                          <Group>
                            <Button
                              disabled={!element.file}
                              loading={fileLoading}
                              onClick={() => uploadHandler(element.UUID)}
                              radius={"xl"}
                              sx={{ width: "fit-content" }}
                            >
                              Upload
                            </Button>
                            {element.file ? (
                              <Button
                                onClick={() => {
                                  cancelHandler(element.UUID);
                                }}
                                sx={{ width: "fit-content" }}
                                color="gray"
                                radius={"xl"}
                              >
                                Cancel
                              </Button>
                            ) : (
                              <></>
                            )}
                          </Group>
                          <Button
                            disabled={element.file}
                            radius={"xl"}
                            onClick={() => handleGenerateClick(element)}
                            sx={{ width: "fit-content" }}
                          >
                            Generate an Official Letter
                          </Button>
                        </Stack>
                      </Accordion.Panel>
                    </Accordion.Item>
                  ))
                )}
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
    </>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(
    "http://localhost:3000/api/instructor/get/letter-requests?status=pending",{
      headers:{
        "Cookie": context.req.headers.cookie||"",
      }
    }
  ).then((res) => res.json());

  const data = [...response.data];
  return { props: { data } };
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
