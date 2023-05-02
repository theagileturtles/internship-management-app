import { Anchor, Text } from "@mantine/core";
import Logo from "../assets/uulogo.png";
import Image from "next/image";
import React from "react";

function Footer() {
  const footerStyle = {
    backgroundColor: "#034240",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2vw 3vw",
    position: "absolute",
    width:"-webkit-fill-available",
    bottom: 0,
  };

  const leftStyle = {
    display: "flex",
    alignItems: "center",
  };

  const logoStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    marginRight: "20px",
  };

  const titleStyle = {
    fontWeight: "bold",
    fontSize: "24px",
  };

  const rightStyle = {
    marginTop: "0",
    display: "flex",
    alignItems: "center",
  };

  const separatorStyle = {
    height: "70px",
    borderRight: "1px solid #fff",
    margin: "0 20px",
  };

  const linkStyle = {
    marginTop: "-40px",
    marginLeft: "20px",
    fontSize: "14px",
    textDecoration: "none",
    color: "#fff",
  };

  const copyrightStyle = {
    fontSize: "12px",
    textAlign: "center",
    marginBottom: "-50px",
  };

  return (
    <footer style={footerStyle}>
      <div style={leftStyle}>
        <div>
          <Text style={titleStyle}>IMA</Text>
          <Text sx={{ lineHeight: 1.4 }}>
            Internship
            <br />
            Management
            <br />
            App
          </Text>
        </div>
        <div style={separatorStyle}></div>
        <Anchor href="https://uskudar.edu.tr">
          <Image src={Logo} style={logoStyle} alt="logo" />
        </Anchor>
      </div>
      <div style={copyrightStyle}>
        <Text>© 2023 Agile Turtles</Text>
      </div>
      <div style={rightStyle}>
        <div style={linkStyle}>
          <Text
            style={{ textDecoration: "none", color: "#fff" }}
            component="a"
            href="#"
          >
            Info
          </Text>
        </div>
        <div style={linkStyle}>
          <Text
            style={{ textDecoration: "none", color: "#fff" }}
            component="a"
            href="#"
          >
            Privacy Policy
          </Text>
        </div>
        <div style={linkStyle}>
          <Text
            style={{ textDecoration: "none", color: "#fff" }}
            component="a"
            href="#"
          >
            Term of Use
          </Text>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
