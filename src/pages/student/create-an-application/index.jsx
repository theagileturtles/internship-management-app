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
} from "@mantine/core";
import { Checkbox, Download, Upload } from "tabler-icons-react";

export default function Index() {
  const theme = useMantineTheme();
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
          CREATE AN APPLICATION
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
          <Grid sx={{height:"fit-content"}} gutter={30}>
            <Grid.Col sx={{}} lg={12} xl={3}>
              <Box
                p={"1rem"}
                sx={{
                    height:"100%",
                  backgroundColor: theme.colors.info[3],
                  color: theme.colors.info[11],
                  borderRadius: 30,
                }}
              >
                <Text pb={15}>
                  For the application, you must first download the internship
                  application file below, fill it in completely and then add the
                  file to the system. If there is incorrect or incomplete
                  information in the application form you downloaded and
                  uploaded, your application will be rejected.
                </Text>
                <Anchor
                sx={{display:"flex",justifyContent:"center"}}
                  download
                  href="https://stix.uskudar.edu.tr/student/download/047d0b80bc1310e8ff05478ffadc538a"
                >
                  <Button leftIcon = {<Download size={"1.1rem"} />} ta={"center"}  radius={"xl"}>Download</Button>
                </Anchor>
              </Box>
            </Grid.Col>
            <Grid.Col lg={12} xl={9}>
              <Grid gutter={"xl"}>
                <Grid.Col lg={12}>
                  <TextInput
                    sx={{ maxWidth: 250 }}
                    radius={"xl"}
                    placeholder="Company Name You Applied"
                    label="Company Name"
                    withAsterisk
                  />
                </Grid.Col>

                <Grid.Col xs={12} sm={12}  lg={6} xl={6}>
                  <Radio.Group
                    name="typeOfInternship"
                    label="Choose Internship Type"
                    withAsterisk
                  >
                    <Stack mt="xs">
                      <Radio value="react" label="React" />
                      <Radio value="svelte" label="Svelte" />
                      <Radio value="ng" label="Angular" />
                      <Radio value="vue" label="Vue" />
                    </Stack>
                  </Radio.Group>
                </Grid.Col>
                <Grid.Col xs={12} sm={12}  lg={6} xl={6}>
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
                    <FileInput
                      icon={<Upload size={"1.1rem"} />}
                      variant="filled"
                      placeholder="Filled Application Form"
                      label="Application Form"
                      radius="xl"
                      withAsterisk
                      sx={{ maxWidth: 300 }}
                    />
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
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
}
