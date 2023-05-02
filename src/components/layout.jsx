import { Grid } from "@mantine/core";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Grid>
        <Grid.Col span={12} xs={12}  sm={4} md={3} xl={2}>
          <Sidebar />
        </Grid.Col>
        <Grid.Col span={12} xs={12}  sm={8} md={9} xl={10}>
        <Header userName="Sinan Sensev" userId="200209013"
          <main>{children}</main>
        </Grid.Col>
      </Grid>
    </>
  );
}
