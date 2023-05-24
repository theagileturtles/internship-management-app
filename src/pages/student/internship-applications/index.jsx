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
  Tooltip,
  Badge,
  Button,
} from "@mantine/core";
import moment from "moment";
import Link from "next/link";
import { Ce, Download, ExclamationMark, Pencil } from "tabler-icons-react";

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
    <Layout role={"student"}>
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
            backgroundColor: "white",
            borderRadius: 50,
            marginBottom: "50px",
            paddingBottom: "50px",
            minHeight: "50vh",
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
              <Grid.Col xs={3}>
                <TableHeader>Created at</TableHeader>
              </Grid.Col>
              <Grid.Col xs={3}>
                <TableHeader>Company</TableHeader>
              </Grid.Col>
              <Grid.Col xs={3}>
                <TableHeader>Internship Type</TableHeader>
              </Grid.Col>
              <Grid.Col xs={3}>
                <TableHeader>Status</TableHeader>
              </Grid.Col>
            </Grid>
            {/* This helps to accordion display for the content rows. When the user clicks the row, it will be extented and display the details. */}
            {/* More info about the Accordion: https://mantine.dev/core/accordion/*/}
            <Accordion variant="filled" chevronPosition="left">
              {/* data variable is an Array which contains the information about the internship-application. We are using map function to render each element as a row component.*/}
              {/* More info about Array.prototype.map function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map */}
              {data.length>0 ? data.map((element, index) => (
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
                        label={new Date(element.createdAt).toLocaleString()}
                      >
                        <Grid.Col xs={3}>
                          <TableText color={element.status.color}>
                            {moment(element.createdAt).fromNow()}
                          </TableText>
                        </Grid.Col>
                      </Tooltip>
                      <Grid.Col xs={3}>
                        <TableText color={element.status.color}>
                          {element.company}
                        </TableText>
                      </Grid.Col>
                      <Grid.Col xs={3}>
                        <TableText color={element.status.color}>
                          {element.type.label}
                        </TableText>
                      </Grid.Col>
                      <Grid.Col xs={3}>
                        <TableText color={element.status.color}>
                          {element.status.label}
                        </TableText>
                      </Grid.Col>
                    </Grid>
                  </Accordion.Control>
                  <Accordion.Panel sx={{ color: theme.colors.mainBlue[6] }}>
                    <Stack pb={20}>
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
                            key={element.uuid + "_file_" + file.label}
                            target="_blank"
                            href={file.href}
                            download
                          >
                            <Flex gap={3} direction={"row"}>
                              <Download size={18} />
                              <DetailsText>{file.label}</DetailsText>
                            </Flex>
                          </Anchor>
                        ))}
                      </Stack>

                        {element.status.alias === "approved"  ?(<Box sx={{display:"flex",justifyContent:"center"}}>
                        <Button component="a" href={element.sgkForm} download={"sgk-form.pdf"} leftIcon={<Download size={"1.2rem"}/>} radius={"xl"}>
                              SGK Form
                            </Button>
                        </Box>) :<></>}

                      {element.status.alias === "rejected" ? (
                        <Stack sx={{justifyContent:"center", alignItems:"center"}}>
                          <Box
                            sx={{
                              backgroundColor: theme.colors.info[3],
                              color: theme.colors.info[11],
                              maxWidth: "500px",
                              borderRadius:"15px"
                            }}
                          >
                              <Text size={"sm"} p={5} ta={"center"} color="yellow">This application is rejected by the coordinator. You need to edit your application to restart the internship application process.</Text>
                          </Box>

                          <Center>
                            <Button radius={"xl"}>Edit Your Application</Button>
                          </Center>
                        </Stack>
                      ) : (
                        <></>
                      )}
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
              )):<Text fs={"italic"} ta={"center"}>There are no any internship applications now.</Text>}
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
  const res = await fetch(
    "http://localhost:3000/api/student/getInternshipApplications"
  );
  const data = await res.json();

  return { props: { data } };
}
