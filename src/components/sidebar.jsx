import {
  Box,
  Button,
  NavLink,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Files,CircleCheck,Briefcase,FilePlus, File, FileCheck, Mail, MailForward, FileDescription, FileExport, Tie } from 'tabler-icons-react';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Sidebar({role}) {
  const theme = useMantineTheme();
  const router = useRouter()
  const studentAnchors = [
    {
      category: "Dashboard",
      items: [
        { title: "Internship Applications", icon: <File/>, href: "/student/internship-applications"},
       // { title: "Completed Internships", icon: <CircleCheck/>, href: "/student/completed-internships"},
       { title: "Official Letter Requests", icon: <Mail/>, href:"/student/official-letter-requests"},
        { title: "Internship Opportunities", icon: <Briefcase/>, href:"/student/internship-opportunities"},
      ],
    },
    {
      category: "Management",
      items: [
        { title: "Create an Application", icon: <FilePlus/>, id: 4, href:"/student/create-an-application"},
        { title: "Request for an Official Letter", icon: <FilePlus/>, id: 5, href:"/student/request-for-an-official-letter"},
      ],
    },
  ];

  const instructorAnchors =[
    {
      category: "Dashboard",
      items: [
       
        { title: "Completed Internship Applications", icon: <FileExport/>, href: "/instructor/completed-internship-applications"},
        { title: "Completed Official Letter Requests", icon: <MailForward/>, href: "/instructor/completed-official-letter-requests"},
      ],
    },
    {
      category: "Management",
      items: [
        { title: "Manage Internship Applications", icon: <File/>, href: "/instructor/manage-internship-applications"},
        { title: "Manage Official Letter Requests", icon: <Mail/>, href: "/instructor/manage-official-letter-requests"},
        { title: "Upload an Internship Application Form", icon: <FilePlus/>, href:"/instructor/upload-an-internship-application-form"},
      ],
    },
  ];

  const careerCenterAnchors =[
    {
      category: "Dashboard",
      items: [
       
        { title: "Completed Internship Applications", icon: <FileExport/>, href: "/career-center/completed-internship-applications"},
        { title: "Internship Opportunuties", icon: <Briefcase/>, href: "/career-center/internship-opportunities"},
      ],
    },
    {
      category: "Management",
      items: [
        { title: "Manage Internship Applications", icon: <File/>, href: "/career-center/manage-internship-applications"},
        { title: "Publish Internship Opportunity", icon: <Tie/>, href: "/career-center/publish-internship-opportunity"},
      ],
    },
  ];

  const adminAnchors = [
    {
      category: "Management",
      items: [
        { title: "Manage Instructors", icon: <File/>, href: "/admin/manage-instructors"},
        { title: "Manage Career Center Staff", icon: <Tie/>, href: "/admin/manage-career-center-staff"},
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
    case "career_center":
      anchors = [...careerCenterAnchors];
      break;
    case "admin":
      anchors = [...adminAnchors];
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
