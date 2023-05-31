import Layout from "../../../components/layout";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Notification,
  Select,
  Stack,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import { useState } from "react";
import { Check, X } from "tabler-icons-react";

function TableHeader(props) {
  return <Text ta={"center"} {...props} />;
}

function TableText(props) {
  return <Text fw={700} ta={"center"} {...props} />;
}

export default function Index({ data, selectData }) {
  const [values, setValues] = useState(data);
  const [updateds, setUpdates] = useState({});
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationData, setNotificationData] = useState({
    title: "",
    description: "",
    icon: <Check />,
  });
  const [saveLoader, setSaveLoader] = useState(false);


  function selectHandler(event, uuid) {
    let temp = updateds;
    let tempValues = values;
    let response = [];
    tempValues = values.map((element) => {
      if (element.UUID === uuid) {
        if (element.departmentID === event) {
          delete temp[uuid];
          response.push(element);
        }
        return { ...element, departmentID: event };
      } else {
        return element;
      }
    });
    if (response.length === 0) {
      temp[uuid] = event;
    }
    setUpdates(temp);
    setValues(tempValues);
  }

  function cancelHandler() {
    setValues(data);
    setUpdates({});
  }

  async function saveHandler() {
    setSaveLoader(true)
    const body = Object.entries(updateds).map(([key, value]) => {
      return {
        UUID: key,
        departmentID: value,
      };
    });
    await fetch("http://localhost:3000/api/admin/manage_instructors", {
      method: "PUT",
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.status===200) {
        data = values;
        setUpdates({})
        setNotificationData({
          title: "Saved Successfully!",
          icon: <Check />,
        })
      }else{
        setNotificationData({
          title: "Error Occured",
          description:"Please try again later.",
          color:"red",
          icon: <X />,
        })
      }
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      setNotificationVisible(true);
      setSaveLoader(false)
    });
  }

  return (
    <>
    <Layout role={"admin"}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          paddingLeft: "5vw",
          paddingRight: "5vw",
        }}
      >
        <Title pb={5} ta={"left"} color="text">
          MANAGE INSTRUCTORS
        </Title>

        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 50,
            marginBottom: "50px",
            minHeight: "50vh",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack pb={20} sx={{ minHeight: "45vh", width: "100%" }}>
            <Grid pl={"1rem"} pr={"1rem"} pt={15}>
              <Grid.Col span={1}></Grid.Col>
              <Grid.Col xs={12} md={4} lg={3}>
                <TableHeader>Instructor</TableHeader>
              </Grid.Col>
              <Grid.Col xs={12} md={4} lg={4}>
                <TableHeader>Department</TableHeader>
              </Grid.Col>
              <Grid.Col xs={12} md={3} lg={4}>
                <TableHeader>Created at</TableHeader>
              </Grid.Col>
            </Grid>
            {values.map((element) => (
              <Grid
                justify="center"
                align="center"
                pl={"1rem"}
                pr={"1rem"}
                key={"user_admin" + element.UUID}
              >
                <Grid.Col span={1}>
                  <Center>
                    <Avatar></Avatar>
                  </Center>
                </Grid.Col>
                <Grid.Col xs={12} md={4} lg={3}>
                  <TableText>{element.label}</TableText>
                </Grid.Col>
                <Grid.Col xs={12} md={4} lg={4}>
                  <Select
                    placeholder="Department"
                    data={selectData}
                    onChange={(event) => selectHandler(event, element.UUID)}
                    value={element.departmentID}
                  />
                </Grid.Col>
                <Grid.Col xs={12} md={3} lg={4}>
                  <TableText>
                    {new Date(element.createdAt).toLocaleString()}
                  </TableText>
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
          <Center>
            <Group>
              <Button
                onClick={saveHandler}
                disabled={Object.keys(updateds).length === 0}
                radius={"xl"}
                sx={{ width: "fit-content" }}
                loading={saveLoader}
              >
                Save the Changes
              </Button>
              {Object.keys(updateds).length !== 0 ? (
                <Button
                  color="gray"
                  radius={"xl"}
                  sx={{ width: "fit-content" }}
                  onClick={cancelHandler}
                >
                  Cancel
                </Button>
              ) : (
                <></>
              )}
            </Group>
          </Center>
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

export async function getServerSideProps(context) {
  const data = await fetch("http://localhost:3000/api/admin/get-instructors",{
    headers:{
      "Cookie": context.req.headers.cookie||"",
    }
  })
    .then((res) => res.json())
    .then((res) => res.data);
  const selectData = await fetch(
    "http://localhost:3000/api/admin/get-departments"
  )
    .then((res) => res.json())
    .then((res) => res.data);

  return { props: { data, selectData } };
}
