import Layout from "@/components/layout";
import UploadInput from "@/components/uploadinput";
import {
  Title,
  Box,
  Stack,
  Button,
  Group,
  ActionIcon,
} from "@mantine/core";
import { Download,Upload } from "tabler-icons-react";

export default function Index() {
  return (
    <Layout role={"instructor"}>
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
          UPLOAD AN APPLICATION FORM
        </Title>
        <Box
          pl={"3rem"}
          pr={"3rem"}
          pt={"1.5rem"}
          pb={"1.5rem"}
          sx={{
            backgroundColor: "white",
            borderRadius: 50,
            marginBottom: "50px",
            minHeight: "20vh",
            textAlign: "left",
            justifyContent: "center",
            alignItems:"center",
            display: "flex",
          }}
        >
          <Stack sx={{ width: "100%", alignItems: "center" }}>
            <Group spacing={2} sx={{ width: "100%", alignItems: "end", justifyContent:"center" }}>
              <UploadInput 
              clearable           
                variant="filled"
                icon={<Upload size={"1.1rem"} />}
                placeholder="Upload an Application Form"
                label={"Application Form"}
                radius={"xl"}
                sx={{ width: "100%", maxWidth:"300px" }}
              />
              <ActionIcon mb={"0.3rem"} radius={"xl"}>
                <Download size={"1.3rem"} />
              </ActionIcon>
            </Group>
            <Button radius={"xl"} sx={{ width: "fit-content" }}>
              Upload
            </Button>
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
}
