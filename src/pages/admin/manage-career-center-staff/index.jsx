import Layout from "@/components/layout";
import {
  Avatar,
  Box,
  Center,
  Flex,
  Grid,
  Group,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";

function TableHeader(props) {
  return <Text ta={"center"} {...props} />;
}

function TableText(props) {
  return <Text fw={700} ta={"center"} {...props} />;
}

export default function Index({ data }) {
  const [values, setValues] = useState(data);
  const selectData = [
    { value: "career_center", label: "Career Center" },
    { value: "employee", label: "Employee" },
  ];

  return (
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
          MANAGE CAREER CENTER STAFF
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
              <Grid.Col xs={6} md={4} lg={3}>
                <TableHeader>Instructor</TableHeader>
              </Grid.Col>
              <Grid.Col xs={6} md={4} lg={4}>
                <TableHeader>Role</TableHeader>
              </Grid.Col>
              <Grid.Col xs={6} md={2} lg={2}>
                <TableHeader>Created at</TableHeader>
              </Grid.Col>
              <Grid.Col xs={6} md={2} lg={2}>
                <TableHeader>Last Login</TableHeader>
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
                <Grid.Col xs={6} md={4} lg={3}>
                  <TableText>{`${element.firstName} ${element.lastName}`}</TableText>
                </Grid.Col>
                <Grid.Col xs={6} md={4} lg={4}>
                  <Select
                    placeholder="Role"
                    data={selectData}
                    defaultValue={element.role || "employee"}
                  />
                </Grid.Col>
                <Grid.Col xs={6} md={2} lg={2}>
                  <TableText>{element.createdAt}</TableText>
                </Grid.Col>
                <Grid.Col xs={6} md={2} lg={2}>
                  <TableText>{element.lastLogin}</TableText>
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps() {
  //const data = await fetchData()

  const data = [
    {
      UUID: "1231",
      createdAt: "12.03.2013",
      lastLogin: "12.13.2013",
      firstName: "Recep",
      lastName: "Niyaz",
      role: "career_center",
    },
    {
      UUID: "121",
      createdAt: "12.03.2013",
      lastLogin: "12.13.2013",
      firstName: "Gökhan Süzen",
      lastName: "Pektaş",
    },
    {
      UUID: "12",
      createdAt: "12.03.2013",
      lastLogin: "12.13.2013",
      firstName: "Hasan",
      lastName: "Türk",
    },
  ];
  return { props: { data } };
}
