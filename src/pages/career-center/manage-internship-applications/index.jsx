import Layout from "../../../components/layout";
import UploadInput from "../../../components/uploadinput";
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
  ActionIcon,
} from "@mantine/core";
import moment from "moment";
import { useState } from "react";

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
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationData, setNotificationData] = useState({
    title: "",
    description: "",
    icon: <Check />,
  });

  const [file, setFile] = useState(values.uuid ? defaultFile : null);
  const [fileLoading, setFileLoading] = useState(false);
  const [hrefDownload, setHrefDownload] = useState();


    function fileHandler(file){
      if (file) {
        toBase64(file).then((blob) => {
          setHrefDownload(blob);
        });
        setFile(file);
      }
    }

    function cancelHandler(){
      setFile(null)
    }

    function uploadHandler(uuid){
      setFileLoading(true)
      fetch("http://localhost:3000/api/career-center/manage/internship-application/"+uuid,{
        method:"PUT",
        body:hrefDownload,
      }).then((res)=>{
        if(res.status === 200){
          setNotificationData({
            title: "The SGK Form Uploaded Successfully!",
            description: (
              <Text>
                You can display the application via <span style={{fontWeight:700}}>Internship Applications</span> tab on the sidebar. 
              </Text>
            ),
            icon: <Check />,
          });
        }else{
          setNotificationData({
            title: "Error Occured",
            description: (
              <Text>
               Please try again later.
              </Text>
            ),
            color:"red",
            icon: <X />,
          });
        }
      }).catch(()=>{
        setNotificationData({
          title: "Error Occured",
          description: (
            <Text>
             Please try again later.
            </Text>
          ),
          color:"red",
          icon: <X />,
        });
      }).finally(()=>{
        setFileLoading(false);
        setNotificationVisible(true);
        fetchData().then((res)=>{
          setValues(res)
        })
      })
    
    }

  return (
    <>
      <Layout role={"career_center"}>
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
                      <Flex pb={15} sx={{ justifyContent: "center" }}>
                        <Group
                          spacing={2}
                          sx={{
                            width: "100%",
                            alignItems: "end",
                            justifyContent: "center",
                          }}
                        >
                          <UploadInput
                          accept="application/pdf"
                            description={
                              typeof values.createdAt !== "undefined"
                                ? "Last Update: " +
                                  new Date(
                                    values.createdAt
                                  ).toLocaleTimeString() +
                                  " - " +
                                  new Date(
                                    values.createdAt
                                  ).toLocaleDateString()
                                : ""
                            }
                            value={file}
                            onChange={fileHandler}
                            variant="filled"
                            icon={<Upload size={"1.1rem"} />}
                            placeholder="Upload an Application Form"
                            label={"Application Form"}
                            radius={"xl"}
                            sx={{ width: "100%", maxWidth: "300px" }}
                          />
                          {file ? (
                            <ActionIcon
                              color="mainBlue"
                              component="a"
                              download={file?.name}
                              href={hrefDownload}
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
                      </Flex>
                      <Group sx={{ justifyContent: "center" }}>
                        <Button
                          disabled={!file}
                          loading={fileLoading}
                          onClick={()=>{uploadHandler(element.UUID)}}
                          radius={"xl"}
                          sx={{ width: "fit-content" }}
                        >
                          Upload
                        </Button>
                        {file ? (
                          <Button
                            onClick={cancelHandler}
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
    </>
  );
}

export async function getServerSideProps() {
  const data = await fetchData()
  return { props: { data } };
}

async function fetchData(){
  return fetch(
    "http://localhost:3000/api/career-center/get-internship-applications?status=pending_for_sgk"
  ).then((res) => res.json()).then((res)=>res.data);
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