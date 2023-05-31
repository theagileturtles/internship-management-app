import Layout from '../../../components/layout';
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
  FileInput,
  Tooltip,
} from "@mantine/core";
import moment from "moment";

import { Download, Upload } from "tabler-icons-react";

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
    <Layout role={"student"}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          paddingLeft: "5vw",
          paddingRight: "5vw",
        }}
      >
        <Title pb={5} ta={"left"} color="text">
          OFFICIAL LETTER REQUESTS
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
                <TableHeader>Company</TableHeader>
              </Grid.Col>
              <Grid.Col xs={6} md={3}>
                <TableHeader>Internship Type</TableHeader>
              </Grid.Col>
              <Grid.Col xs={6} md={3}>
                <TableHeader>Status</TableHeader>
              </Grid.Col>
            </Grid>
            <Accordion color="mainBlue" variant="filled" chevronPosition="left">
              {data.length > 0 ? (
                data.map((element, index) => (
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
                        <Tooltip
                          label={new Date(element.createdAt).toLocaleString()}
                        >
                          <Grid.Col xs={6} md={3}>
                            <TableText>
                              {moment(element.createdAt).fromNow()}
                            </TableText>
                          </Grid.Col>
                        </Tooltip>
                        <Grid.Col xs={6} md={3}>
                          <TableText>{element.company}</TableText>
                        </Grid.Col>
                        <Grid.Col xs={6} md={3}>
                          <TableText>{element.type.label}</TableText>
                        </Grid.Col>
                        <Grid.Col xs={6} md={3}>
                          <TableText>{element.status.label}</TableText>
                        </Grid.Col>
                      </Grid>
                    </Accordion.Control>
                    <Accordion.Panel
                      pl={"2.875rem"}
                      pr={"1rem"}
                      sx={{ color: theme.colors.mainBlue[6] }}
                    >
                      <Grid grow columns={12}>
                        <Grid.Col
                          sx={{
                            justifyContent: "center",
                            display: "flex",
                          }}
                          md={6}
                        >
                          <Stack
                            spacing={0}
                            sx={{
                              textAlign: "center",
                              color: "inherit",
                            }}
                          >
                            <DetailsTitle>Files</DetailsTitle>

                            {element.files.map((file) => (
                              <Anchor
                                sx={{
                                  justifyContent: "center",
                                  display: "flex",
                                }}
                                key={element.uuid + "_file_" + file.label}
                                target="_blank"
                                href={file.href}
                                download
                              >
                                <Flex gap={3} direction={"row"}>
                                  <Download size={18} />
                                  <DetailsText>{file.label}</DetailsText>
                                </Flex>
                              </Anchor>
                            ))}
                          </Stack>
                        </Grid.Col>
                        {element.message.length>0 ? <Grid.Col
                          sx={{
                            justifyContent: "center",
                            display: "flex",
                            minWidth: "fit-content",
                          }}
                          span={12}
                        >
                          <Box ta={"center"}>
                            <DetailsTitle>Message</DetailsTitle>
                            <DetailsText>
                              {element.message}
                            </DetailsText>
                          </Box>
                        </Grid.Col> :<></>}
                        {element.officialLetter ? <Grid.Col span={12}>
                          <Group
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              download={"official-letter"}
                              component="a"
                              target="_blank"
                              href={element.officialLetter}
                              radius={"xl"}
                              leftIcon={<Download size={"1.2rem"} />}
                            >
                              Official Letter
                            </Button>
                          </Group>
                        </Grid.Col> : <></>} 
                      </Grid>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))
              ) : (
                <Text fs={"italic"} ta={"center"}>
                  There are no any official letter requests now.
                </Text>
              )}
            </Accordion>
          </Stack>
          <Pagination mb={"sm"} sx={{ alignSelf: "center" }} total={1} />
        </Box>
      </Box>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "http://localhost:3000/api/student/getOfficialLetterRequest"
  );
  const data = await res.json();

  return { props: { data } };
}
