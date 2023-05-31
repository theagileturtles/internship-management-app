import Layout from "../../../components/layout"
import UploadInput from "../../../components/uploadinput";
import { Title, Box, Stack, Button, Group, ActionIcon, Transition, Notification, Text } from "@mantine/core";

import { useEffect, useState } from "react";
import { Check, Cross, Download, Trash, Upload, X } from "tabler-icons-react";

export default function Index({ data }) {
  const [values, setValues] = useState(data);
  const defaultFile = { name: "application_form.pdf" };

  const [file, setFile] = useState(values.uuid ? defaultFile : null);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileChanged, setFileChanged] = useState(false);
  const [hrefDownload, setHrefDownload] = useState(
    "/api/instructor/download/application-form/" + values.uuid
  );
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationData, setNotificationData] = useState({
    title: "",
    description: "",
    icon: <Check />,
  });

  function uploadHandler() {
    setFileLoading(true);
    toBase64(file)
      .then((blob) => {
        return fetch(
          "http://localhost:3000/api/instructor/upload/application-form",
          {
            method: "POST",
            body: blob,
          }
        );
      })
      .then((res) => {
        setFileLoading(false);
        getUUID().then((res) => {
          setValues(res);
          setHrefDownload(
            "/api/instructor/download/application-form/" + res.uuid
          );
        });
        setFileChanged(false);
        setFile(defaultFile);
        if(res.status === 200){
          setNotificationData({
            title: "The Application Form is Uploaded!",
            description: (
              <Text>
                You can check the form if it is correct by downloanding from the download button.
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
       
        setNotificationVisible(true);
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
        setNotificationVisible(true);
      });
  }

  function deleteHandler() {
    fetch("http://localhost:3000/api/instructor/delete/application-form", {
      method: "DELETE",
    }).then(() => {
      setValues({});
      setHrefDownload("");
      setFileChanged(false);
      setFile(null);
      setNotificationData({
        title: "The Application Form is Deleted!",
        description: (
          <Text>
           The application form is deleted.
          </Text>
        ),
        icon: <Check />,
      });
      setNotificationVisible(true);
    }).catch(()=>{
      setNotificationData({
        title: "an Error Occured",
        description: (
          <Text>
           Please try again later.
          </Text>
        ),
        color:"red",
        icon: <Cross />,
      });
      setNotificationVisible(true);
    });
  }

  function fileHandler(file) {
    if (file) {
      toBase64(file).then((blob) => {
        setHrefDownload(blob);
      });
      setFile(file);
      setFileChanged(true);
    }
  }

  function cancelHandler() {
    if(typeof values.uuid === "undefined"){
      setFile(null);
    }else{
      setFile(defaultFile);
    }
    
    setHrefDownload("/api/instructor/download/application-form/" + values.uuid);
    setFileChanged(false);
  }

  return (
    <>
    <Layout role={"instructor"}>
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
          UPLOAD AN APPLICATION FORM
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
            minHeight: "20vh",
            textAlign: "left",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Stack sx={{ width: "100%", alignItems: "center" }}>
            <Group
              spacing={2}
              sx={{
                width: "100%",
                alignItems: "end",
                justifyContent: "center",
              }}
            >
              <UploadInput
                description={
                  typeof values.createdAt !== "undefined"
                    ? "Last Update: " +
                      new Date(values.createdAt).toLocaleTimeString() +
                      " - " +
                      new Date(values.createdAt).toLocaleDateString()
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
              <Group spacing={2}>
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
                {file && !fileChanged ? (
                  <ActionIcon
                    onClick={deleteHandler}
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
            </Group>
            <Group>
              <Button
                disabled={!fileChanged}
                loading={fileLoading}
                onClick={uploadHandler}
                radius={"xl"}
                sx={{ width: "fit-content" }}
              >
                Upload
              </Button>
              {fileChanged ? (
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
          </Stack>
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
  const data = await getUUID(context);
  return { props: { data } };
}

async function getUUID(context) {
  return await fetch("http://localhost:3000/api/instructor/get/form-uuid",{
    headers:{
      "Cookie": context?.req?.headers?.cookie||"",
    }
  })
    .then((res) => res.json())
    .then((res) => res.data);
}
