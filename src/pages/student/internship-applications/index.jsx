import Layout from "@/components/layout";
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
  Center,
} from "@mantine/core";
import Link from "next/link";
import { Download } from "tabler-icons-react";

// Custom Text component as Title for details part
function DetailsTitle(props) {
  return <Text size={"xs"} {...props} />;
}

// Custom Text component as content for details part
function DetailsText(props) {
  return <Text size={"sm"} fw={700} {...props} />;
}

// Custom Text component as text for the rows
function TableText(props) {
  return <Text fw={700} ta={"center"} {...props} />;
}

// Custom Text component as title for the columns
function TableHeader(props) {
  return <Text ta={"center"} {...props} />;
}

// This function will be displayed (rendered) on the screen when http://localhost:3000/student/internship-applications called.
export default function Index({ data }) {
  // We can code here in JS to do the operations that we need.

  // Theme object helps to use theme color codes which we declared already in _app.js file.
  const theme = useMantineTheme();

  // Return needs to be a JSX component. You cannot write JS code directly in a component. You can write JS code in curly brackets {}.
  return (
    // This layout function provides the header, sidebar and footer. You can go to file directly by clicking the component name while pressing CTRL
    <Layout>
      {/* Parent div */}
      <Box
        sx={{
          height: "100%",
          width: "100%",
          paddingLeft: "5vw",
          paddingRight: "5vw",
        }}
      >
        {/* Title for the page. pb means padding bottom which creates space between bottom part. ta means text align. Also you can define
        these features in sx prop which helps to create custom css on the specific mantine component*/}
        <Title pb={5} ta={"left"} color="text">
          INTERNSHIP APPLICATIONS
        </Title>

        {/* This box wraps the table and its content*/}
        <Box
          sx={{
            overflowX:"clip",
            overflowY:"auto",
            backgroundColor: "white",
            borderRadius: 50,
            width: "100%",
            height: "50vh",
            textAlign: "left",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {/* This stack wraps the all rows (header is included). It helps to display the components row by row (one on top of the other). More info:https://mantine.dev/core/stack */}
          <Stack sx={{ width: "100%" }}>
            {/* Used grid to make it more responsive the header of the table. Normally these are in a row. After a specific resolution it will be displayed as one on top of the other*/}
            {/* More info about the grid: https://mantine.dev/core/grid */}
            <Grid pl={"2.875rem"} pr={"1rem"} pt={15}>
              <Grid.Col xs={4}>
                <TableHeader>Created at</TableHeader>
              </Grid.Col>
              <Grid.Col xs={4}>
                <TableHeader>Internship Type</TableHeader>
              </Grid.Col>
              <Grid.Col xs={4}>
                <TableHeader>Status</TableHeader>
              </Grid.Col>
            </Grid>
            {/* This helps to accordion display for the content rows. When the user clicks the row, it will be extented and display the details. */}
            {/* More info about the Accordion: https://mantine.dev/core/accordion/*/}
            <Accordion color="mainBlue" variant="filled" chevronPosition="left">
              {/* data variable is an Array which contains the information about the internship-application. We are using map function to render each element as a row component.*/}
              {/* More info about Array.prototype.map function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map */}
              {data.map((element, index) => (
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
                      <Grid.Col xs={4}>
                        <TableText>{element.createdAt}</TableText>
                      </Grid.Col>
                      <Grid.Col xs={4}>
                        <TableText>{element.type}</TableText>
                      </Grid.Col>
                      <Grid.Col xs={4}>
                        <TableText>{element.status}</TableText>
                      </Grid.Col>
                    </Grid>
                  </Accordion.Control>
                  <Accordion.Panel sx={{ color: theme.colors.mainBlue[6] }}>
                    <Grid grow pl={"2.875rem"} pr={"1rem"} columns={12}>
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

                          {element.files.map((file) => (
                            <Anchor
                              sx={{ justifyContent: "center", display: "flex" }}
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
                        <Stack spacing={0} ta={"center"}>
                          <DetailsTitle>Logs</DetailsTitle>
                          {element.logs.map((log, index) => (
                            <DetailsText
                              sx={{ color: "inherit" }}
                              key={element.uuid + "_log_" + index}
                            >
                              {log}
                            </DetailsText>
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
                          <DetailsTitle>Department</DetailsTitle>
                          <DetailsText>{element.department}</DetailsText>
                        </Box>
                      </Grid.Col>
                    </Grid>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
}

// Next js offered several render options. Server Side Rendering is one of them. It means, this part of the code runs on the server.
// In future, we will implement the API endpoints here. Then we will get information from the endpoint.
// Now I just hardcodded the data here.
export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();

  const data = [
    {
      uuid: "e16f6b76-2e97-48ba-bcf0-52d209bdc0c1",
      createdAt: "15.04.2023",
      type: "Voluntary",
      status: "Pending for SGK Entry",
      department: "Software Engineering",
      files: [
        { name: "Transcript", link: "/" },
        { name: "Application Form", link: "/" },
      ],
      logs: [
        "created at 15.04.2023 - 23:54",
        "approved by coordinator 16.04.2023 - 14:02",
      ],
    },
    {
      uuid: "0855eae4-eb8e-11ed-a05b-0242ac120003",
      createdAt: "12.04.2023",
      type: "Compulsory-2",
      status: "Pending for Approvment",
      department: "Software Engineering",
      files: [
        { name: "Transcript", link: "/" },
        { name: "Application Form", link: "/" },
      ],
      logs: ["created at 12.04.2023 - 23:54"],
    },
  ];
  // Pass data to the page via props
  return { props: { data } };
}
