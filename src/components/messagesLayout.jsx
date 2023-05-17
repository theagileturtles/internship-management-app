import { Grid, Stack, Title } from "@mantine/core";
import Layout from "./layout";
import MessagesSidebar from "./messagesSidebar";

export default function MessagesLayout({ children, title }) {
  return (
    <Layout role={"instructor"}>
      <Stack spacing={0}>
        <Grid sx={{ paddingLeft: "2vw", paddingRight: "5vw" }} gutter={0}>
          <Grid.Col md={3.2}></Grid.Col>
          <Grid.Col md={8.8}>
            <Title>{title}</Title>
          </Grid.Col>
        </Grid>
        <Grid sx={{ paddingLeft: "2vw", paddingRight: "5vw" }} gutter={0}>
          <Grid.Col pb={"1.5rem"} md={3}>
            <MessagesSidebar />
          </Grid.Col>
          <Grid.Col md={0.2}></Grid.Col>
          <Grid.Col md={8.8}>{children}</Grid.Col>
        </Grid>
      </Stack>
    </Layout>
  );
}
