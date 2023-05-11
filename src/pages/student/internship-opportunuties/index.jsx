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
} from "@mantine/core";
import Image from "next/image";
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
          INTERNSHIP OPPORTUNUTIES
        </Title>

        <Grid pt={15} pb={15} grow>
          <Grid.Col xs={10} lg={11}>
            <TextInput radius={"xl"} />
          </Grid.Col>
          <Grid.Col xs={2} lg={1}>
            <Center>
              <Button sx={{ maxWidth: "150px" }} fullWidth radius={"xl"}>
                Search
              </Button>
            </Center>
          </Grid.Col>
        </Grid>
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
              <Grid.Col xs={3} lg={1}></Grid.Col>
              <Grid.Col xs={3} lg={3}>
                <TableHeader>Created at</TableHeader>
              </Grid.Col>
              <Grid.Col xs={3} lg={4}>
                <TableHeader>Company</TableHeader>
              </Grid.Col>
              <Grid.Col xs={3} lg={4}>
                <TableHeader>Internship Type</TableHeader>
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
                    <Grid sx={{ alignItems: "center" }} grow>
                      <Grid.Col xs={3} lg={1}>
                        <Center>
                          <Avatar
                            color="mainBlue"
                            src={element.image}
                            alt={element.title}
                          ></Avatar>
                        </Center>
                      </Grid.Col>
                      <Grid.Col xs={3} lg={3}>
                        <TableText>{element.createdAt}</TableText>
                      </Grid.Col>
                      <Grid.Col xs={3} lg={4}>
                        <TableText>{element.company}</TableText>
                      </Grid.Col>
                      <Grid.Col xs={3} lg={4}>
                        <TableText>{element.type}</TableText>
                      </Grid.Col>
                    </Grid>
                  </Accordion.Control>
                  <Accordion.Panel sx={{ color: theme.colors.mainBlue[6] }}>
                    <Stack pl={"2.875rem"} pr={"1rem"}>
                      <Stack spacing={0}>
                        <Title order={3}>{element.title}</Title>
                        {element.description}
                      </Stack>
                      <Center>
                        <Button
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
  // Fetch data from external API
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();

  const data = [
    {
      uuid: "f510623c-206f-4d3c-88c3-de821139ce7d",
      image:
        "https://scontent.fist2-4.fna.fbcdn.net/v/t39.30808-6/337139833_952740385726939_1881981141483951226_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=lM0lO7ttXxUAX9zEzYm&_nc_ht=scontent.fist2-4.fna&oh=00_AfB3SH93dr-p4FSE2z50SASJzBusujBGIIUAHVySfBiLBw&oe=645FA6F2",
      createdAt: "10.05.2023",
      title: "Techno Camp 2023 Turkcell Global Information",
      type: "Summer Internship",
      href: "/",
      company: "Turkcell",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut sodales turpis, ac rhoncus lectus. Ut rhoncus odio non ultricies sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis vitae lacus nunc. Nullam in varius libero. Donec elementum facilisis mauris a convallis. Ut iaculis luctus augue quis sodales.",
    },
    {
      uuid: "f510623c-206f-4d3c-88c3-de821139ce7d",
      image:
        "data:image/png;base64,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",
      createdAt: "10.05.2023",
      title: "QA Internship Program",
      type: "Summer Internship",
      href: "/",
      company: "Trendyol",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut sodales turpis, ac rhoncus lectus. Ut rhoncus odio non ultricies sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis vitae lacus nunc. Nullam in varius libero. Donec elementum facilisis mauris a convallis. Ut iaculis luctus augue quis sodales.",
    },
  ];

  return { props: { data } };
}
