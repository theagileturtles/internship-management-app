import { Grid } from "@mantine/core";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
      <Grid sx={{height:"100vh"}} gutter={0}>
        <Grid.Col  xs={12} sm={4} md={3} xl={2}>
          <Sidebar/>
        </Grid.Col>
        <Grid.Col bg={"#f2f2f2"} xs={12} sm={8} md={9} xl={10}>
            <Header userName="Sinan Sensev" userId="200209013"></Header>
            <main style={{margin:0, minHeight:"calc(100vh - 85px - 180px)"}}>{children}</main>
            <Footer/>
        </Grid.Col>
      </Grid>

  );
}
