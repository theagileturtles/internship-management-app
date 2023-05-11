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
} from "@mantine/core";
import { useState } from "react";
import { Checkbox, Download, Tex, Upload } from "tabler-icons-react";
   
const MAX_LETTER = 150;
export default function Index() {
  const theme = useMantineTheme();

  const defaultValues = {
    company:"",
    type:"",
    transcript:"",
    message:"",
  }

  const [values, setValues] = useState(defaultValues)

  function messageHandler(event){
    setValues({...values,message:event.target.value})
  }

  return (
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
          <Grid gutter={"xl"}>
            <Grid.Col span={12}>
              <TextInput
                sx={{ maxWidth: 250 }}
                radius={"xl"}
                placeholder="Company Name You Applied"
                label="Company Name"
                withAsterisk
              />
            </Grid.Col>

            <Grid.Col xs={12} sm={12} lg={6} xl={6}>
              <Radio.Group
                name="typeOfInternship"
                label="Choose Internship Type"
                withAsterisk
              >
                <Stack mt="xs">
                  <Radio value="compulsary1" label="Compulsary-1" />
                  <Radio value="compulsary2" label="Compulsary-2" />
                  <Radio value="voluntary" label="Voluntary" />
                </Stack>
              </Radio.Group>
            </Grid.Col>
            <Grid.Col xs={12} sm={12} lg={6} xl={6}>
              <Stack>

            <FileInput
                      icon={<Upload size={"1.1rem"} />}
                      variant="filled"
                      placeholder="Your Transcript"
                      label="Transcript"
                      radius="xl"
                      withAsterisk
                      sx={{ maxWidth: 300 }}
                    />
                    <Stack display={"flex"} spacing={2}>
                    <Textarea onChange={messageHandler} autosize minRows={3} maxRows={3} radius={"md"} maxLength={150} placeholder="Additional Information" label="Message"/>
                      <Text  size={"sm"} sx={{alignSelf:"end"}} color="dimmed">{values.message.length}/{MAX_LETTER}</Text>
                    </Stack>
              </Stack>
            </Grid.Col>
            <Grid.Col xl={12}>
              <Center>
                <Button sx={{ width: "100%", maxWidth: 200 }} radius={"xl"}>
                  Create
                </Button>
              </Center>
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
}