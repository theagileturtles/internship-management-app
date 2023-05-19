import React from "react";
import { Mail, Bell } from "tabler-icons-react";
import { ActionIcon, Avatar, Text } from "@mantine/core";
import { useRouter } from "next/router";

function Header(props) {
  const router = useRouter()
  const headerStyle = {
    paddingTop: "10px",
    paddingBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "85px",
    paddingRight: "20px",
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

  return (
    <header style={headerStyle}>
      <div style={leftStyle}></div>
      <div style={rightStyle}>
        <div style={messageStyle}>
          <ActionIcon
              component="a"
              href="/messages/incoming"
            color="text"
            variant={
              router.pathname.includes("/messages/")
                  ? "filled"
                  : "subtle"
            }
            radius={"xl"}
          >
            <Mail />
          </ActionIcon>
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
          <div style={nameStyle}>
            <Text>{props.userName}</Text>
            <div style={idStyle}>
              <Text>{props.userId}</Text>
            </div>
          </div>
          <div style={avatarContainerStyle}>
            <Avatar color="dark" sx={avatarStyle} alt={props.userName} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
