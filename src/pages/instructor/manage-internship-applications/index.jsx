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
  Button,
  Group,
  Pagination,
  Tooltip,
} from "@mantine/core";

import { Download } from "tabler-icons-react";

function DetailsTitle(props) {
  return <Text size={"xs"} {...props} />;
}

function DetailsText(props) {
  return <Text size={"sm"} fw={700} {...props} />;
}

function TableText(props) {
  return <Text fw={700} ta={"center"} {...props} />;
}

function TableHeader(props) {
  return <Text ta={"center"} {...props} />;
}

export default function Index({ data }) {
  const theme = useMantineTheme();

  return (
    <Layout role={"instructor"}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          paddingLeft: "5vw",
          paddingRight: "5vw",
        }}
      >
        <Title pb={5} ta={"left"} color="text">
        MANAGE INTERNSHIP APPLICATIONS
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
            <Grid pl={"2.875rem"} pr={"1rem"} pt={15}>
              <Grid.Col xs={6} md={3}>
                <TableHeader>Created at</TableHeader>
              </Grid.Col>
              <Grid.Col xs={6} md={3}>
                <TableHeader>Student</TableHeader>
              </Grid.Col>
              <Grid.Col xs={6} md={3}>
                <TableHeader>Company</TableHeader>
              </Grid.Col>
              <Grid.Col xs={6} md={3}>
                <TableHeader>Internship Type</TableHeader>
              </Grid.Col>
            </Grid>
            <Accordion color="mainBlue" variant="filled" chevronPosition="left">
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
                    <Grid>
                    <Tooltip label={new Date(element.createdAt).toLocaleString()}>
                      <Grid.Col xs={6} md={3}>
                        <TableText>{new Date(element.createdAt).toLocaleDateString()}</TableText>
                      </Grid.Col>
                      </Tooltip>
                      <Grid.Col xs={6} md={3}>
                        <TableText>
                          {element.firstName + " " + element.lastName}
                        </TableText>
                      </Grid.Col>
                      <Grid.Col xs={6} md={3}>
                        <TableText>{element.company}</TableText>
                      </Grid.Col>
                      <Grid.Col xs={6} md={3}>
                        <TableText>{element.type.label}</TableText>
                      </Grid.Col>
                    </Grid>
                  </Accordion.Control>
                  <Accordion.Panel
                    pl={"2.875rem"}
                    pr={"1rem"}
                    sx={{ color: theme.colors.mainBlue[6] }}
                  >
                    <Grid pb={15} grow columns={12}>
                      <Grid.Col
                        sx={{
                          justifyContent: "center",
                          display: "flex",
                        }}
                        span={4}
                      >
                        <Stack
                          spacing={0}
                          sx={{
                            textAlign: "center",
                            color: "inherit",
                          }}
                        >
                          <DetailsTitle>Files</DetailsTitle>

                          {element.files?.map((file) => (
                            <Anchor
                              sx={{ justifyContent: "center", display: "flex" }}
                              key={element.uuid + "_file_" + file.name}
                              target="_blank"
                              href={file.link}
                              download
                            >
                              <Flex gap={3} direction={"row"}>
                                <Download size={18} />
                                <DetailsText>{file.name}</DetailsText>
                              </Flex>
                            </Anchor>
                          ))}
                        </Stack>
                      </Grid.Col>
                      {/* <Grid.Col
                        sx={{
                          justifyContent: "center",
                          display: "flex",
                          minWidth: "fit-content",
                        }}
                        span={4}
                      >
                        <Stack spacing={0} ta={"center"}>
                          <DetailsTitle>Logs</DetailsTitle>
                          {element.logs?.map((log, index) => (
                            <DetailsText
                              sx={{ color: "inherit" }}
                              key={element.uuid + "_log_" + index}
                            >
                              {log}
                            </DetailsText>
                          ))}
                        </Stack>
                      </Grid.Col> */}
                      <Grid.Col
                        sx={{
                          justifyContent: "center",
                          display: "flex",
                          minWidth: "fit-content",
                        }}
                        span={4}
                      >
                        <Box ta={"center"}>
                          <DetailsTitle>Student No</DetailsTitle>
                          <DetailsText>{element.studentID}</DetailsText>
                        </Box>
                      </Grid.Col>
                    </Grid>
                    <Flex sx={{ justifyContent: "center" }}>
                      <Group>
                        <Button
                          radius={"xl"}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                          sx={{ width: "100px" }}
                        >
                          Approve
                        </Button>
                        <Button
                          color="red"
                          radius={"xl"}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                          sx={{ width: "100px" }}
                        >
                          Reject
                        </Button>
                      </Group>
                    </Flex>
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

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/instructor/get/internship-applications?status=pending_for_coordinator").then((res)=>res.json())
  
  const data = [...response.data];
  return { props: { data } };
}
