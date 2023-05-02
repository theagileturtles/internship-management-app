import { Box, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { useState } from "react";

export default function Sidebar() {
  const theme = useMantineTheme();
  const [selectedItem, setSelectedItem] = useState(1);

  const anchors = [
    {
      category: "Dashboard",
      items: [
        { title: "Internship Applications", icon: <></>, id: 1 },
        { title: "Completed Internship", icon: <></>, id: 2 },
        { title: "Internship Opportunuties", icon: <></>, id: 3 },
      ],
    },
    {
      category: "Management",
      items: [
        { title: "Create an Application", icon: <></>, id: 4 },
        ,
        { title: "Request for an Official Letter", icon: <></>, id: 5 },
      ],
    },
  ];
  return (
    <Box
      sx={{
        paddingRight: 20,
        paddingLeft: 30,
        paddingTop: 40,
        height: "100vh",
      }}
    >
      <Box pb={20}>
        <Title color={theme.colors.mainBlue} order={1}>
          IMA
        </Title>
        <Text color={theme.colors.mainBlue} order={5}>
          Internship Management App
        </Text>
      </Box>
      <Stack spacing={30}>
        {anchors.map((element) => (
          <Box key={"sidebar-dashboard" + element.category.toLowerCase()}>
            <Text color={theme.colors.mainBlue}>{element.category}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
