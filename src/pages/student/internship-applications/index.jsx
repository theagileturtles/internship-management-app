import Layout from "@/components/layout";
import {
  Accordion,
  Box,
  Grid,
  Text,
  Title,
  Stack,
  useMantineTheme,
} from "@mantine/core";

export default function Index({ data }) {
  const theme = useMantineTheme();

  return (
    <Layout>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          paddingLeft: "5vw",
          paddingRight: "5vw",
        }}
      >
        <Title pb={5} ta={"left"} color="text">
          INTERNSHIP APPLICATIONS
        </Title>
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
          <Stack sx={{ width: "100%" }}>
            <Grid pl={"2.875rem"} pr={"1rem"} pt={15}>
              <Grid.Col xs={4}>
                <Title ta={"center"} order={5}>
                  Created at
                </Title>
              </Grid.Col>
              <Grid.Col xs={4}>
                <Title ta={"center"} order={5}>
                  Internship Type
                </Title>
              </Grid.Col>
              <Grid.Col xs={4}>
                <Title ta={"center"} order={5}>
                  Status
                </Title>
              </Grid.Col>
            </Grid>
            <Accordion color="mainBlue" variant="filled" chevronPosition="left">
              {data.map((element,index) => (
                <>
                  <Accordion.Item key={"accordion_item_"+index}
                    sx={{
                        width:"100%",
                      transition: "0.3s",
                      ":hover": {
                        backgroundColor: "#f9f9f9",
                      },
                      "&[data-active]": {
                        backgroundColor: theme.colors.mainBlue[0],
                      },
                    }}
                    value={"accordion_item_"+index}
                  >
                    <Accordion.Control>
                      <Grid>
                        <Grid.Col xs={4}>
                          <Text ta={"center"} order={5}>
                            {element.createdAt}
                          </Text>
                        </Grid.Col>
                        <Grid.Col xs={4}>
                          <Text ta={"center"} order={5}>
                          {element.type}
                          </Text>
                        </Grid.Col>
                        <Grid.Col xs={4}>
                          <Text ta={"center"} order={5}>
                          {element.status}
                          </Text>
                        </Grid.Col>
                      </Grid>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Grid sx={{width:"100%", justifyContent:"center", display:"flex"}}>
                            <Grid.Col xs={6}>
                                <Text>Files</Text>
                                
                            </Grid.Col>
                            <Grid.Col xs={6}>
                            <Text>Logs</Text>
                            </Grid.Col>
                        </Grid>
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

export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();

  const data = [
    {
      createdAt: "15.04.2023",
      type: "Voluntary",
      status: "Pending for SGK Entry",
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
