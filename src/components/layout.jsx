import { Grid } from "@mantine/core";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import { useSession } from "next-auth/react";

export default function Layout({ children,role }) {
  const { data: session } = useSession();
  return (
      <Grid sx={{height:"100vh"}} gutter={0}>
        <Grid.Col  xs={12} sm={4} md={3} xl={2}>
          <Sidebar role={session?.user?.roleID}/>
        </Grid.Col>
        <Grid.Col bg={"#f2f2f2"} xs={12} sm={8} md={9} xl={10}>
            <Header></Header>
            <main style={{margin:0, minHeight:"calc(100vh - 85px - 180px)"}}>{children}</main>
            <Footer/>
        </Grid.Col>
      </Grid>

  );
}