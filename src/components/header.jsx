import React from "react";
import { Mail,Bell } from 'tabler-icons-react';
import { ActionIcon, Avatar, Text } from "@mantine/core";

function Header(props) {
  const headerStyle = {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "60px",
    padding: "0 20px",
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
          <ActionIcon radius={"xl"}>
            <Mail color="#333333"/>
          </ActionIcon>
        </div>
        <div style={notificationStyle}>
          <ActionIcon radius={"xl"}>
          <Bell color="#333333"/>
          </ActionIcon>
        </div>
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
