import { Grid } from "@mantine/core";
import Header from "./header";
import Sidebar from "./sidebar";

export default function Layout({ children }) {
  return (
    <>
      <Grid>
        <Grid.Col span={12} xs={12} sm={4} md={3} lg={2}>
          <Sidebar />
        </Grid.Col>
        <Grid.Col span={12} xs={12} sm={8} md={9} lg={10}>
          <Header />
          <main>{children}</main>
        </Grid.Col>
      </Grid>
    </>
  );
}
