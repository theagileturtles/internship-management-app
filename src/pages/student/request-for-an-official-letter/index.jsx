import Layout from "@/components/layout";
import {
  Box,
  Title,
  Stack,
  Text,
  useMantineTheme,
  Button,
  Anchor,
  TextInput,
  Radio,
  Grid,
  FileInput,
  Center,
  Textarea,
} from "@mantine/core";
import { Checkbox, Download, Upload } from "tabler-icons-react";

export default function Index() {
  const theme = useMantineTheme();
  return (
    <Layout>
      <Box
        sx={{
          minHeight: "100%",
          width: "100%",
          paddingLeft: "5vw",
          paddingRight: "5vw",
        }}
      >
        {/* Title for the page. pb means padding bottom which creates space between bottom part. ta means text align. Also you can define
        these features in sx prop which helps to create custom css on the specific mantine component*/}
        <Title pb={5} ta={"left"} color="text">
          REQUEST FOR AN OFFICIAL LETTER
        </Title>
        <Box
          pl={"3rem"}
          pr={"3rem"}
          pt={"1.5rem"}
          pb={"1.5rem"}
          sx={{
            backgroundColor: "white",
            borderRadius: 50,
            width: "100%",
            minHeight: "50vh",
            textAlign: "left",
            display: "flex",
          }}
        >
          <Grid gutter={"xl"}>
            <Grid.Col span={12}>
              <TextInput
                sx={{ maxWidth: 250 }}
                radius={"xl"}
                placeholder="Company Name You Applied"
                label="Company Name"
                withAsterisk
              />
            </Grid.Col>

            <Grid.Col xs={12} sm={12} lg={6} xl={6}>
              <Radio.Group
                name="typeOfInternship"
                label="Choose Internship Type"
                withAsterisk
              >
                <Stack mt="xs">
                  <Radio value="compulsary1" label="Compulsary-1" />
                  <Radio value="compulsary2" label="Compulsary-2" />
                  <Radio value="voluntary" label="Voluntary" />
                </Stack>
              </Radio.Group>
            </Grid.Col>
            <Grid.Col xs={12} sm={12} lg={6} xl={6}>
              <Textarea  autosize minRows={6} maxRows={6} radius={"xl"} placeholder="Additional Information" label="Message" />
            </Grid.Col>
            <Grid.Col xl={12}>
              <Center>
                <Button sx={{ width: "100%", maxWidth: 200 }} radius={"xl"}>
                  Create
                </Button>
              </Center>
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
}
