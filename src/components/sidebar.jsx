import {
  Box,
  Button,
  NavLink,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Files,CircleCheck,Briefcase,FilePlus, File, FileCheck, Mail, MailForward, FileDescription, FileExport } from 'tabler-icons-react';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Sidebar({role}) {
  const theme = useMantineTheme();
  const router = useRouter()
  console.log(role)
  const studentAnchors = [
    {
      category: "Dashboard",
      items: [
        { title: "Internship Applications", icon: <File/>, href: "/student/internship-applications"},
       // { title: "Completed Internships", icon: <CircleCheck/>, href: "/student/completed-internships"},
        { title: "Internship Opportunuties", icon: <Briefcase/>, href:"/student/internship-opportunuties"},
      ],
    },
    {
      category: "Management",
      items: [
        { title: "Create an Application", icon: <FilePlus/>, id: 4, href:"/student/create-an-application"},
        ,
        { title: "Request for an Official Letter", icon: <FilePlus/>, id: 5, href:"/student/request-for-an-official-letter"},
      ],
    },
  ];

  const instructorAnchors =[
    {
      category: "Dashboard",
      items: [
        { title: "Recieved Internship Applications", icon: <File/>, href: "/instructor/recieved-internship-applications"},
        { title: "Completed Internship Applications", icon: <FileExport/>, href: "/instructor/completed-internship-applications"},
        { title: "Recieved Official Letter Requests", icon: <Mail/>, href: "/instructor/recieved-official-letter-requests"},
        { title: "Completed Official Letter Requests", icon: <MailForward/>, href: "/instructor/completed-official-letter-requests"},
      ],
    },
    {
      category: "Management",
      items: [
        { title: "Upload an Internship Application Form", icon: <FilePlus/>, id: 4, href:"/instructor/upload-an-internship-application-form"},
      ],
    },
  ];
  let anchors = []
  
  switch (role) {
    case "student":
      anchors = [...studentAnchors];
      break;
    case "instructor":
      anchors = [...instructorAnchors];
      break;
    default:
      break;
  }
  
  return (
    <Box
      sx={{
        paddingRight: 20,
        paddingLeft: 30,
        paddingTop: 40,
        paddingBottom:20
      }}
    >
      <Box sx={{color:theme.colors.mainBlue[6]}} pb={50}>
        <Title  order={1}>
          IMA
        </Title>
        <Text  order={5}>
          Internship Management App
        </Text>
      </Box>
      <Stack sx={{color:theme.colors.mainBlue[6]}} spacing={30}>
        {anchors.map((element) => (
          <Stack spacing={10} key={"sidebar-dashboard" + element.category.toLowerCase()}>
            <Text >{element.category}</Text>
            <Stack spacing={5}>
              {element.items.map((subElement,index) => (
                <Link style={{ textDecoration: 'none' }} href={subElement.href}
                key={"sidebar-dashboard-element-" + subElement.href.replace("/","-")+"-"+index}
                >
                <NavLink
                // component="a"
                 icon={subElement.icon}
                  // href={subElement.href}
                  active={router.pathname.includes(subElement.href)}
                  label={ subElement.title}
                  sx={{transition:"0.1s"}}
                />
                </Link>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
