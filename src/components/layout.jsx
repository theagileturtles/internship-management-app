import { Grid } from "@mantine/core";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (

      <Grid grow gutter={0}>
        <Grid.Col xs={12} sm={4} md={3} xl={2}>
          <Sidebar/>
        </Grid.Col>
        <Grid.Col xs={12} sm={8} md={9} xl={10}>
            <Header userName="Sinan Sensev" userId="200209013"></Header>
            <main>{children}</main>
            <Footer/>
        </Grid.Col>
      </Grid>

  );
}
