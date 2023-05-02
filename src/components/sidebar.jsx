import {
  Box,
  Button,
  NavLink,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Files,CircleCheck,Briefcase,FilePlus } from 'tabler-icons-react';
import { useState } from "react";

export default function Sidebar() {
  const theme = useMantineTheme();
  const [selectedItem, setSelectedItem] = useState(1);

  function selectedItemHandler(itemID){
    setSelectedItem(itemID);
  }
  const anchors = [
    {
      category: "Dashboard",
      items: [
        { title: "Internship Applications", icon: <Files/>, id: 1 },
        { title: "Completed Internship", icon: <CircleCheck/>, id: 2 },
        { title: "Internship Opportunuties", icon: <Briefcase/>, id: 3 },
      ],
    },
    {
      category: "Management",
      items: [
        { title: "Create an Application", icon: <FilePlus/>, id: 4 },
        ,
        { title: "Request for an Official Letter", icon: <FilePlus/>, id: 5 },
      ],
    },
  ];
  return (
    <Box
      sx={{
        paddingRight: 20,
        paddingLeft: 30,
        paddingTop: 40,
        paddingBottom:20
      }}
    >
      <Box pb={50}>
        <Title color={theme.colors.mainBlue} order={1}>
          IMA
        </Title>
        <Text color={theme.colors.mainBlue} order={5}>
          Internship Management App
        </Text>
      </Box>
      <Stack spacing={30}>
        {anchors.map((element) => (
          <Stack spacing={10} key={"sidebar-dashboard" + element.category.toLowerCase()}>
            <Text color={theme.colors.mainBlue}>{element.category}</Text>
            <Stack spacing={5}>
              {element.items.map((subElement) => (
                <NavLink
                 icon={subElement.icon}
                  onClick={()=>{selectedItemHandler(subElement.id)}}
                  active={subElement.id === selectedItem}
                  label={subElement.title}
                  key={"sidebar-dashboard-element-" + subElement.id}
                  color={"cyan"}
                  sx={{transition:"0.1s"}}
                />
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
