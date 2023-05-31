import Layout from "../../../components/layout";
import {
  Accordion,
  Box,
  Grid,
  Text,
  Title,
  Stack,
  useMantineTheme,
  Center,
  Avatar,
  Button,
  Pagination,
  TextInput,
  ActionIcon,
  Loader,
  Tooltip,
  Modal,
  Group,
  Transition,
  Notification,
} from "@mantine/core";
import moment from "moment";
import { useEffect, useState } from "react";
import { Check, Search, Tex, Trash, X } from "tabler-icons-react";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationData, setNotificationData] = useState({
    title: "",
    description: "",
    icon: <Check />,
  });
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [deleteUUID, setDeleteUUID] = useState();

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

  function trashButtonHandler(event, uuid) {
    setDeleteUUID(uuid);
    setModalOpen(true);
    event.stopPropagation();
  }

  function deleteHandler() {
    setDeleteLoader(true);
    fetch(
      "http://localhost:3000/api/career-center/delete/internship-opportunity/" +
        deleteUUID,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.status === 200) {
          setNotificationData({
            title: "The Internship Opportunity is Deleted Successfully!",
            description: (
              <Text>
                The internship opportunity is deleted successfully. You can
                create a new one via{" "}
                <span style={{ fontWeight: 700 }}>
                  Publish Internship Opportunity
                </span>{" "}
                tab in sidebar.
              </Text>
            ),
            icon: <Check />,
          });
        } else {
          setNotificationData({
            title: "Error Occured",
            description: <Text>Please try again later.</Text>,
            color: "red",
            icon: <X />,
          });
        }
      })
      .catch(() => {
        setNotificationData({
          title: "Error Occured",
          description: <Text>Please try again later.</Text>,
          color: "red",
          icon: <X />,
        });
      })
      .finally(() => {
        setDeleteLoader(false);
        setModalOpen(false);
        setNotificationVisible(true);
        fetchData().then((res) => {
          setValues(res);
        });
      });
  }

  function AccordionControl(props) {
    return (
      <Box pr={"0.5rem"} sx={{ display: "flex", alignItems: "center" }}>
        <Accordion.Control {...props} />
          <ActionIcon
            onClick={(event) => trashButtonHandler(event, props.uuid)}
            radius={"xl"}
          >
            <Trash color="red" size={"1.1rem"} />
          </ActionIcon>
      </Box>
    );
  }

  // Return needs to be a JSX component. You cannot write JS code directly in a component. You can write JS code in curly brackets {}.
  return (
    // This layout function provides the header, sidebar and footer. You can go to file directly by clicking the component name while pressing CTRL
    <>
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
                pr={"3.2rem"}
                pt={15}
              >
                <Grid.Col xs={2} lg={1}></Grid.Col>
                <Grid.Col xs={3} lg={3}>
                  <TableHeader>Created at</TableHeader>
                </Grid.Col>
                <Grid.Col xs={3} lg={4}>
                  <TableHeader>Company</TableHeader>
                </Grid.Col>
                <Grid.Col xs={4} lg={4}>
                  <TableHeader>Internship Type</TableHeader>
                </Grid.Col>
              </Grid>
              {/* This helps to accordion display for the content rows. When the user clicks the row, it will be extented and display the details. */}
              {/* More info about the Accordion: https://mantine.dev/core/accordion/*/}
              <Accordion
                color="mainBlue"
                variant="filled"
                chevronPosition="left"
              >
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
                    <AccordionControl
                      uuid={element.uuid}
                      sx={{ width: "100%" }}
                    >
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
                        <Tooltip
                          label={new Date(element.createdAt).toLocaleString()}
                        >
                          <Grid.Col xs={3} lg={3}>
                            <TableText>
                              {moment(element.createdAt).fromNow()}
                            </TableText>
                          </Grid.Col>
                        </Tooltip>
                        <Grid.Col xs={3} lg={4}>
                          <TableText>{element.company}</TableText>
                        </Grid.Col>
                        <Grid.Col xs={4} lg={4}>
                          <TableText>{element.type.label}</TableText>
                        </Grid.Col>
                      </Grid>
                    </AccordionControl>
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
                            href={element.website}
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
      <Modal
        radius={"xl"}
        opened={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        centered
        withCloseButton={false}
      >
        <Stack spacing={15} p={10}>
          <Text fw={600} ta={"center"}>
            Are you sure want to delete the internship opportunity?
          </Text>
          <Center>
            <Group>
              <Button
                loading={deleteLoader}
                onClick={deleteHandler}
                radius={"xl"}
                color="red"
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  setModalOpen(false), setDeleteLoader();
                }}
                color="gray"
                radius={"xl"}
              >
                Cancel
              </Button>
            </Group>
          </Center>
        </Stack>
      </Modal>
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
            icon={<Check size="1.1rem" />}
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

// Next js offered several render options. Server Side Rendering is one of them. It means, this part of the code runs on the server.
// In future, we will implement the API endpoints here. Then we will get information from the endpoint.
// Now I just hardcodded the data here.
export async function getServerSideProps(context) {
  const data = await fetchData(context);
  console.log(data)
  return { props: { data } };
}

async function fetchData(context, keyword) {
  if (keyword) {
    const res = await fetch(
      "http://localhost:3000/api/career-center/getInternshipOpportunities?keyword=" +
        keyword
    );
    return await res.json();
  } else {
    const res = await fetch(
      "http://localhost:3000/api/career-center/getInternshipOpportunities",{
        headers:{
          "Cookie": context?.req?.headers?.cookie||"",
        }
      }
    );
    return await res.json();
  }
}
