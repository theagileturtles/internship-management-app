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
  Avatar,
  Button,
  Pagination,
  TextInput,
  Group,
  ActionIcon,
  Menu,
  Loader,
  Tooltip,
} from "@mantine/core";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dots, DotsVertical, Download, Pencil, Search, Trash } from "tabler-icons-react";

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

  const [values, setValues] = useState(data);
  const [keyword, setKeyword] = useState("");
  const [searchLoader, setSearchLoader] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchLoader(true);
      fetchData(keyword).then((res) => {
        setValues(res);
        setSearchLoader(false);
      });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  function keywordHandler(event) {
    setKeyword(event.target.value);
  }


  // Return needs to be a JSX component. You cannot write JS code directly in a component. You can write JS code in curly brackets {}.
  return (
    // This layout function provides the header, sidebar and footer. You can go to file directly by clicking the component name while pressing CTRL
    <Layout role={"career_center"}>
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
          INTERNSHIP OPPORTUNUTIES
        </Title>
        <TextInput
          pb={10}
          value={keyword}
          onChange={keywordHandler}
          placeholder="Search"
          icon={<Search size={"1.1rem"} />}
          radius={"xl"}
        />
        {/* This box wraps the table and its content*/}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 50,
            marginBottom: "50px",
            minHeight: "50vh",
            textAlign: "left",
            display: "flex",
            backgroundColor: "white",

            marginBottom: "50px",

            flexDirection: "column",
          }}
        >
          {/* This stack wraps the all rows (header is included). It helps to display the components row by row (one on top of the other). More info:https://mantine.dev/core/stack */}
          <Stack pr={10} sx={{ minHeight: "45vh", width: "100%" }}>
            {/* Used grid to make it more responsive the header of the table. Normally these are in a row. After a specific resolution it will be displayed as one on top of the other*/}
            {/* More info about the grid: https://mantine.dev/core/grid */}
            <Grid
              sx={{ alignItems: "center" }}
              grow
              pl={"2.875rem"}
              pr={"1rem"}
              pt={15}
            >
              <Grid.Col xs={2} lg={1}></Grid.Col>
              <Grid.Col xs={3} lg={3}>
                <TableHeader>Created at</TableHeader>
              </Grid.Col>
              <Grid.Col xs={3} lg={4}>
                <TableHeader>Company</TableHeader>
              </Grid.Col>
              <Grid.Col xs={3} lg={3}>
                <TableHeader>Internship Type</TableHeader>
              </Grid.Col>
              <Grid.Col xs={1} lg={1}></Grid.Col>
            </Grid>
            {/* This helps to accordion display for the content rows. When the user clicks the row, it will be extented and display the details. */}
            {/* More info about the Accordion: https://mantine.dev/core/accordion/*/}
            <Accordion color="mainBlue" variant="filled" chevronPosition="left">
              {/* data variable is an Array which contains the information about the internship-application. We are using map function to render each element as a row component.*/}
              {/* More info about Array.prototype.map function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map */}
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
                    <Grid sx={{ alignItems: "center" }} grow>
                      <Grid.Col xs={2} lg={1}>
                        <Center>
                          <Avatar
                            color="mainBlue"
                            src={element.image}
                            alt={element.title}
                          ></Avatar>
                        </Center>
                      </Grid.Col>
                      <Tooltip label={new Date(element.createdAt).toLocaleString()}>
                      <Grid.Col xs={3} lg={3}>
                        <TableText>{moment(element.createdAt).fromNow()}</TableText>
                      </Grid.Col>
                      </Tooltip>
                      <Grid.Col xs={3} lg={4}>
                        <TableText>{element.company}</TableText>
                      </Grid.Col>
                      <Grid.Col xs={3} lg={3}>
                        <TableText>{element.type.label}</TableText>
                      </Grid.Col>
                      <Grid.Col xs={1}>
                        <Menu shadow="md" width={200}>
                          <Menu.Target>
                            <ActionIcon radius={"xl"} onClick={(event)=>{event.stopPropagation()}}>
                              <Dots />
                            </ActionIcon>
                          </Menu.Target>
                          <Menu.Dropdown>
                          <Menu.Item onClick={(event)=>{event.stopPropagation()}} icon={<Pencil size={14} />}>Edit</Menu.Item>
                          <Menu.Item onClick={(event)=>{event.stopPropagation()}} color="red" icon={<Trash size={14} />}>Delete</Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </Grid.Col>
                    </Grid>
                  </Accordion.Control>
                  <Accordion.Panel sx={{ color: theme.colors.mainBlue[6] }}>
                    <Stack pl={"2.875rem"} pr={"1rem"}>
                      <Stack spacing={0}>
                        <Title order={3}>{element.header}</Title>
                        {element.explanation}
                      </Stack>
                      <Center>
                        <Button
                          target="_blank"
                          component="a"
                          href={element.href}
                          radius={"xl"}
                          sx={{ width: "fit-content" }}
                        >
                          Apply
                        </Button>
                      </Center>
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
            <Center pl={"2.875rem"} pr={"1rem"}>
              {searchLoader ? (
                <Loader />
              ) : (
                <>
                  {values.length === 0 ? (
                    <Text fs={"italic"}>
                      There is no opportunuties now. Keep looking!
                    </Text>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Center>
          </Stack>
          <Pagination mb={"sm"} sx={{ alignSelf: "center" }} total={1} />
        </Box>
      </Box>
    </Layout>
  );
}

// Next js offered several render options. Server Side Rendering is one of them. It means, this part of the code runs on the server.
// In future, we will implement the API endpoints here. Then we will get information from the endpoint.
// Now I just hardcodded the data here.
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}

async function fetchData(keyword) {
  if (keyword) {
    const res = await fetch(
      "http://localhost:3000/api/student/getInternshipOpportunities?keyword=" +
        keyword
    );
    return await res.json();
  } else {
    const res = await fetch(
      "http://localhost:3000/api/student/getInternshipOpportunities"
    );
    return await res.json();
  }
}
