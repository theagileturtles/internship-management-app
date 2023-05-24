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
    { value: "se_english", label: "Software Engineering (English)" },
    { value: "ce_english", label: "Computer Engineering (English)" },
    { value: "ie_english", label: "Industrial Engineering (English)" },
    { value: "eee_english", label: "Bioengineering (English)" },
    { value: "be_english", label: "Forensic Science (Turkish)" },
    { value: "mbg_english", label: "Molecular Biology and Genetics (English)" },
    { value: "che_english", label: "Chemical Engineering (English)" },
    { value: "mbg_turkish", label: "Molecular Biology and Genetics (Turkish)" },
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
                <Grid.Col span={1}>

                </Grid.Col>
              <Grid.Col xs={6} md={4} lg={3}>
                <TableHeader>Instructor</TableHeader>
              </Grid.Col>
              <Grid.Col xs={6} md={4} lg={4}>
                <TableHeader>Department</TableHeader>
              </Grid.Col>
              <Grid.Col xs={6} md={2} lg={2}>
                <TableHeader>Created at</TableHeader>
              </Grid.Col>
              <Grid.Col xs={6} md={2} lg={2}>
                <TableHeader>Last Login</TableHeader>
              </Grid.Col>
            </Grid>
            {values.map((element) => (
              <Grid justify="center" align="center" pl={"1rem"} pr={"1rem"} key={"user_admin" + element.UUID}>
                <Grid.Col span={1}>
                    <Center>
                    <Avatar></Avatar>

                    </Center>
                </Grid.Col>
                <Grid.Col xs={6} md={4} lg={3}>

                    <TableText>{`${element.title} ${element.firstName} ${element.lastName}`}</TableText>

                </Grid.Col>
                <Grid.Col xs={6} md={4} lg={4}>
                  <Select
                    placeholder="Department"
                    data={selectData}
                    defaultValue={element.department}
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
      title: "Dr",
      firstName: "Kristin",
      lastName: "Benli",
      department: "se_english",
    },
    {
        UUID: "121",
        createdAt: "12.03.2013",
        lastLogin: "12.13.2013",
        title: "Prof Dr",
        firstName: "Burhan",
        lastName: "Pektaş",
        department: "ce_english",
      },
      {
        UUID: "12",
        createdAt: "12.03.2013",
        lastLogin: "12.13.2013",
        title: "Dr",
        firstName: "Tuğçe",
        lastName: "Ballı",
      },
  ];
  return { props: { data } };
}
