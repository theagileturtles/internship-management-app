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

export default function Index() {
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
              <Accordion.Item
                sx={{transition:"0.3s",
                  ":hover": {
                    backgroundColor: "#f9f9f9",
                  },
                  "&[data-active]": {
                    backgroundColor: theme.colors.mainBlue[0],
                  },
                }}
                value="item-1"
              >
                <Accordion.Control>
                  <Grid>
                    <Grid.Col xs={4}>
                      <Text ta={"center"} order={5}>
                        05.05.2023
                      </Text>
                    </Grid.Col>
                    <Grid.Col xs={4}>
                      <Text ta={"center"} order={5}>
                        Voluntary
                      </Text>
                    </Grid.Col>
                    <Grid.Col xs={4}>
                      <Text ta={"center"} order={5}>
                        Pending for SGK Entry
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Accordion.Control>
                <Accordion.Panel>Panel 1</Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
}
