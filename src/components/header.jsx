import React, { useEffect, useState } from "react";
import { Mail, Bell,Logout } from "tabler-icons-react";
import {
  ActionIcon,
  Avatar,
  Text,
  Badge,
  Indicator,
  Loader,Menu, Center, Stack, Title
} from "@mantine/core";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function Header(props) {
  const router = useRouter();
  const { data: session } = useSession();
  let user;
  if (session) {
    user = session.user;
  }

  const headerStyle = {
    paddingTop: "10px",
    paddingBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "85px",
    paddingRight: "5vw",
  };

  const leftStyle = {
    fontWeight: "bold",
  };

  const rightStyle = {
    display: "flex",
    alignItems: "center",
  };

  const messageStyle = {
    marginRight: "20px",
  };

  const notificationStyle = {
    marginRight: "20px",
  };

  const userInfoStyle = {
    marginRight: "14px",
    display: "flex",
    alignItems: "center",
  };

  const avatarContainerStyle = {
    cursor:"pointer",
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
  };

  const avatarStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginLeft: "10px",
    objectFit: "cover",
  };

  const nameStyle = {
    fontFamily: "Roboto Flex",
    fontSize: "20px",
    marginTop: "10px",
    fontWeight: "bold",
    color: "#333",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };

  const idStyle = {
    color: "#999",
    marginLeft: "10px",
    fontSize: "15px",
    fontWeight: "normal",
  };

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(
        "http://localhost:3000/api/messages/unread-counter"
      )
        .then((res) => res.json())
        .then((res) => {
          setCounter(res.data.count);
        });
    }
    fetchData();
  }, []);
  return (
    <header style={headerStyle}>
      <div style={leftStyle}></div>
      <div style={rightStyle}>
        <div style={messageStyle}>
          {counter > 0 ? (
            <Indicator inline label={counter} size={16}>
              <ActionIcon
                component="a"
                href="/messages/incoming"
                color="text"
                variant={
                  router.pathname.includes("/messages/") ? "filled" : "subtle"
                }
                radius={"xl"}
              >
                <Mail />
              </ActionIcon>
            </Indicator>
          ) : (
            <ActionIcon
              component="a"
              href="/messages/incoming"
              color="text"
              variant={
                router.pathname.includes("/messages/") ? "filled" : "subtle"
              }
              radius={"xl"}
            >
              <Mail />
            </ActionIcon>
          )}
        </div>
        {/* <div style={notificationStyle}>
          <ActionIcon

            color="text"
            variant={
              router.pathname.includes("/notifications/")
                  ? "filled"
                  : "subtle"
            }
            radius={"xl"}
          >
            <Bell />
          </ActionIcon>
        </div> */}
        <div style={userInfoStyle}>
          <Center>
            <Stack spacing={0}>
            <Title ta={"center"} order={4}>
              {(user?.title ?? "") + " " + user?.firstName + " " + user?.lastName}
            </Title>
            {user?.schoolID ?<Text size={"sm"} ta={"center"}>{user?.schoolID}</Text> :<></>} 
            </Stack>
           
          </Center>
          <div style={avatarContainerStyle}>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar
                  color="dark"
                  sx={avatarStyle}
                  alt={
                    user?.title ??
                    "" + " " + user?.firstName + " " + user?.lastName
                  }
                />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={()=>signOut()} icon={<Logout size={14} />}>Log out</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}

export async function getServerSideProps() {
  const data = await fetch("http://localhost:3000/api/messages/unread-counter")
    .then((res) => res.json())
    .then((res) => res.data);

  return { props: { data } };
}
