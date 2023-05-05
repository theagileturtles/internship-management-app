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
} from "@mantine/core";
import Link from "next/link";
import { Download } from "tabler-icons-react";

// Custom Text component as Title for details part
function DetailsTitle(props){
    return(
        <Text size={"xs"} {...props}/>
    )
}

// Custom Text component as content for details part
function DetailsText(props){
    return (
        <Text size={"sm"} fw={700} {...props}/>
    )
}

// Custom Text component as text for the rows
function TableText(props){
    return (
        <Text fw={700} ta={"center"} {...props}/>
    )
}

// Custom Text component as title for the columns
function TableHeader(props){
    return (
        <Text ta={"center"} {...props}/>
    )
}

// This function will be displayed (rendered) on the screen when http://localhost:3000/student/internship-applications called.
export default function Index({ data }) {
  // We can code here in JS to do the operations that we need.
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
                <TableHeader >Created at</TableHeader>
              </Grid.Col>
              <Grid.Col xs={4}>
                <TableHeader>Internship Type</TableHeader>
              </Grid.Col>
              <Grid.Col xs={4}>
                <TableHeader >Status</TableHeader>
              </Grid.Col>
            </Grid>
            {/* This helps to accordion display for the content rows. When the user clicks the row, it will be extented and display the details. */}
            {/* More info about the Accordion: https://mantine.dev/core/accordion/*/}
            <Accordion color="mainBlue" variant="filled" chevronPosition="left">

              {/* data variable is an Array which contains the information about the internship-application. We are using map function to render each element as a row component.*/}
              {/* More info about Array.prototype.map function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map */}
              {data.map((element, index) => (
                <>
                  <Accordion.Item
                    key={"accordion_item_" + index}
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
                          <TableText >
                            {element.createdAt}
                          </TableText>
                        </Grid.Col>
                        <Grid.Col xs={4}>
                          <TableText >
                            {element.type}
                          </TableText>
                        </Grid.Col>
                        <Grid.Col xs={4}>
                          <TableText >
                            {element.status}
                          </TableText>
                        </Grid.Col>
                      </Grid>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Stack pb={10} pl={"1.7rem"} ta={"center"} spacing={15}>
                        <Box>
                          <DetailsTitle>
                            Department
                          </DetailsTitle>
                          <DetailsText>
                            {element.department}
                          </DetailsText>
                        </Box>
                        <Box>
                          <DetailsTitle>
                            Files
                          </DetailsTitle>
                          {element.files.map((file) => (
                            <>
                              <Flex gap={5} sx={{alignItems:"center", justifyContent:"center"}} direction={"row"}>
                                <Download size={18}/>
                                <Anchor target="_blank" href={file.link} download>
                                  <DetailsText>
                                    {file.name}
                                  </DetailsText>
                                </Anchor>{" "}
                              </Flex>
                            </>
                          ))}
                        </Box>
                        <Box>
                        <DetailsTitle>
                            Logs
                          </DetailsTitle>
                          {element.logs.map((log) => (
                            <>
                        <DetailsText >
                            {log}
                        </DetailsText>
                            </>
                          ))}
                        </Box>
                      </Stack>
                    </Accordion.Panel>
                  </Accordion.Item>
                </>
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
