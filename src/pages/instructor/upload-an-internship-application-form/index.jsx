import Layout from "@/components/layout";
import UploadInput from "@/components/uploadinput";
import { Title, Box, Stack, Button, Group, ActionIcon } from "@mantine/core";

import { useState } from "react";
import { Download, Upload } from "tabler-icons-react";

export default function Index({data}) {
  const defaultValue = data.url ? {
    name: "application_form.pdf",
  } : null;

  const [file, setFile] = useState(defaultValue);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileChanged, setFileChanged] = useState(false)
  const [hrefDownload, setHrefDownload] = useState(data.url);

  function uploadHandler(event) {
    setFileLoading(true);
    toBase64(file)
      .then((blob) => {
        return fetch("http://localhost:3000/api/instructor/upload-form", {
          method: "POST",
          body: blob,
        });
      })
      .then((response) => {
        setFileLoading(false);
      });
  }

  function fileHandler(file){
    toBase64(file)
      .then((blob) => {
        setHrefDownload(blob)
      })
    setFile(file);
    setFileChanged(true);
  }

  function cancelHandler() {
    setFile(defaultValue);
    setHrefDownload(data.url)
    setFileChanged(false);
  }

  return (
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
                description={"Uploaded at 2020"}
                defaultValue={defaultValue}
                value={file}
                onChange={fileHandler}
                variant="filled"
                icon={<Upload size={"1.1rem"} />}
                placeholder="Upload an Application Form"
                label={"Application Form"}
                radius={"xl"}
                sx={{ width: "100%", maxWidth: "300px" }}
              />
              {file ? <ActionIcon
                component="a"
                download = {file?.name}
                href={hrefDownload}
                target="_blank"
                mb={"0.3rem"}
                radius={"xl"}
              >
                <Download size={"1.3rem"} />
              </ActionIcon>:<></>}
             
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

export async function getServerSideProps() {
  const data = await fetch("http://localhost:3000/api/instructor/get-form").then((res)=>res.json()).then((res)=>res.data)
  return { props: {data} };
}
