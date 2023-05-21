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
} from "@mantine/core";
import { useState } from "react";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import Image from "next/image";
import { PhotoPlus } from "tabler-icons-react";

const MAX_LETTER = 1024;
export default function Index() {
  const theme = useMantineTheme();
  const [file, setFile] = useState();
  const [companyName, setCompanyName] = useState("");
  const [type, setType] = useState("");
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [applicationPage, setApplicationPage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
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
          applicationPage
        }),
      });
      const data = await response.json();
      console.log(data); // Handle the response from the API as needed
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  function handleCompanyNameChange(event) {
    setCompanyName(event.target.value);
  }

  function handleTypeChange(value) {
    setType(value);
  }
  

  function handleFileChange(files) {
    setFile(files[0]);
    setFileName(files[0].name);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleApplicationPageChange(event) {
    setApplicationPage(event.target.value);
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
                    <Radio value="longterm" label="Long Term" />
                    <Radio value="summerterm" label="Summer Term" />
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
                  <Text> Drop image here</Text>
                </Group>
                <Flex sx={{ justifyContent: "center" }}>{preview()}</Flex>
              </Dropzone>
            </Grid.Col>
            <Grid.Col xs={12}>
              <Stack display={"flex"} spacing={2}>
                <Textarea
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
                  sx={{ width: "100%", maxWidth: 200 }}
                  radius={"xl"}
                  onClick={handlePublish}
                  disabled={loading}
                >
                  {loading ? "Publishing..." : "Publish"}
                </Button>
              </Center>
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
}
