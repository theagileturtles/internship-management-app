import Layout from "@/components/layout";
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
  AspectRatio,
  Group,
  Flex,
  Transition,
  Notification,
} from "@mantine/core";
import { useState } from "react";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import Image from "next/image";
import { Check, PhotoPlus, X } from "tabler-icons-react";

const MAX_LETTER = 1024;
export default function Index() {
  const theme = useMantineTheme();
  const [file, setFile] = useState();
  const [companyName, setCompanyName] = useState("");
  const [type, setType] = useState("");
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [header, setHeader] = useState("");
  const [applicationPage, setApplicationPage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState()
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationData, setNotificationData] = useState({
    title: "",
    description: "",
    icon: <Check />,
  });
  const [hrefDownload, setHrefDownload] = useState()

  const handlePublish = async () => {
    if (!companyName || !type || !file || !description || !applicationPage) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/career-center/postInternshipOpportinutes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          type,
          fileName,
          description,
          applicationPage,
          imageData,
          header
        }),
      }).then((res)=>{
        if(res.status === 200){
          setCompanyName("")
          setFile(null)
          setDescription("")
          setApplicationPage("")
          setType("")
          setFileName("")
          setHeader("")
          setNotificationData({
            title: "The Internship Oppurtnuity is Published!",
            description: (
              <Text>
                You can display and delete the opportunity via <span style={{fontWeight:700}}>Internship Opportunuties</span> tab on the sidebar. 
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
      });
    } catch (error) {
      console.error(error);
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
    }finally{
      setLoading(false);
      setNotificationVisible(true);
    }
    
  }

  function handleCompanyNameChange(event) {
    setCompanyName(event.target.value);
  }

  function handleHeaderChange(event) {
    setHeader(event.target.value);
  }

  function handleTypeChange(value) {
    setType(value);
  }


  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleApplicationPageChange(event) {
    setApplicationPage(event.target.value);
  }

  function handleFileChange(files) {
    const selectedFile = files[0];
    setFile(selectedFile);

    // Base64 formatına dönüştür
    const reader = new FileReader();
    
    reader.onload = () => {
      const base64Data = reader.result;
      const extension = selectedFile.name.split(".").slice(-1)[0];
      setFileName(fileName)
      const imageData = {
        extension:extension,
        base64Data: base64Data,
      }
      setImageData(imageData)
    };
    reader.readAsDataURL(selectedFile);
  }


  function preview() {
    if (file) {
      const imageUrl = window.URL.createObjectURL(file);
      return (
        <Image
          alt={"logo"}
          width={100}
          height={100}
          style={{ objectFit: "contain" }}
          src={imageUrl}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        />
      );
    } else {
      return <></>;
    }
  }

  return (
    <>
    <Layout role={"career_center"}>
      <Box
        sx={{
          minHeight: "100%",
          width: "100%",
          paddingLeft: "5vw",
          paddingRight: "5vw",
        }}
      >
        <Title pb={5} ta={"left"} color="text">
          PUBLISH INTERNSHIP OPPORTUNITY
        </Title>
        <Box
          pl={"3rem"}
          pr={"3rem"}
          pt={"1.5rem"}
          pb={"1.5rem"}
          mb={"1.5rem"}
          sx={{
            justifyContent:"center",
            backgroundColor: "white",
            borderRadius: 50,
            width: "100%",
            minHeight: "50vh",
            textAlign: "left",
            display: "flex",
          }}
        >
          <Grid grow gutter={"xl"}>
            <Grid.Col md={6}>
              <Stack spacing={30}>
                <TextInput
                  sx={{ maxWidth: 250 }}
                  radius={"xl"}
                  placeholder="Company Name You Applied"
                  label="Company Name"
                  withAsterisk
                  value={companyName}
                  onChange={handleCompanyNameChange}
                />
               <Radio.Group
                  name="typeOfInternship"
                  label="Choose Internship Type"
                  withAsterisk
                  value={type}
                  onChange={handleTypeChange}
                >
                  <Stack mt="xs">
                    <Radio value="long" label="Long Term" />
                    <Radio value="summer" label="Summer Term" />
                  </Stack>
                </Radio.Group>
              </Stack>
            </Grid.Col>
            <Grid.Col md={6}>
              <Dropzone
                sx={{
                  display:"flex",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                accept={IMAGE_MIME_TYPE}
                onDrop={handleFileChange}
              >
                <Group sx={{ justifyContent: "center" }}>
                  <PhotoPlus />
                  <Text> Drop image here <span style={{color:"red"}}>*</span> </Text>
                </Group>
                <Flex sx={{ justifyContent: "center" }}>{preview()}</Flex>
              </Dropzone>
            </Grid.Col>
            <Grid.Col xl={12}>
              <TextInput
                radius={"xl"}
                placeholder="Header"
                label="Header"
                withAsterisk
                value={header}
                onChange={handleHeaderChange}
              />
            </Grid.Col>
            <Grid.Col xs={12}>
              <Stack display={"flex"} spacing={2}>
                <Textarea
                withAsterisk
                  onChange={handleDescriptionChange}
                  autosize
                  minRows={6}
                  maxRows={8}
                  radius={"md"}
                  maxLength={MAX_LETTER}
                  placeholder="Additional Information"
                  label="Description"
                  value={description}
                />
                <Text size={"sm"} sx={{ alignSelf: "end" }} color="dimmed">
                  {description.length}/{MAX_LETTER}
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col xl={12}>
              <TextInput
                radius={"xl"}
                placeholder="https://...."
                label="Application page"
                withAsterisk
                value={applicationPage}
                onChange={handleApplicationPageChange}
              />
            </Grid.Col>
            <Grid.Col xl={12}>
              <Center>
                <Button
                loading={loading}
                  sx={{ width: "100%", maxWidth: 200 }}
                  radius={"xl"}
                  onClick={handlePublish}
                  disabled={!(companyName.length>0 && type && file && header.length>0 && description.length >0 && applicationPage.length > 0)}
                >
                  Publish
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
