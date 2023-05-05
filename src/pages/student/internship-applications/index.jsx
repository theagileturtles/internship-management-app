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

function DetailsTitle(props){
    return(
        <Text size={"xs"} {...props}/>
    )
}

function DetailsText(props){
    return (
        <Text size={"sm"} fw={700} {...props}/>
    )
}

function TableText(props){
    return (
        <Text fw={700} ta={"center"} {...props}/>
    )
}

function TableHeader(props){
    return (
        <Text ta={"center"} {...props}/>
    )
}

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
                <TableHeader >Created at</TableHeader>
              </Grid.Col>
              <Grid.Col xs={4}>
                <TableHeader>Internship Type</TableHeader>
              </Grid.Col>
              <Grid.Col xs={4}>
                <TableHeader >Status</TableHeader>
              </Grid.Col>
            </Grid>
            <Accordion color="mainBlue" variant="filled" chevronPosition="left">
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
