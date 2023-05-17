import { Button, Stack, Box, Text, NavLink, Group, Badge } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { Message, MessageForward } from "tabler-icons-react";

export default function MessagesSidebar({unreadMessage=0}) {
  const router = useRouter();
  const anchors = [
    {
      icon: <Message />,
      label: "Incoming Messages",
      href: "/messages/incoming",
      rightSection:  unreadMessage !== 0 ?  <Badge variant="filled">{unreadMessage}</Badge> : undefined
    },
    {
      icon: <MessageForward />,
      label: "Outgoing Messages",
      href: "/messages/outgoing",
    },
  ];
  return (
    <Stack
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={{ backgroundColor: "white", borderRadius: 5, width: "100%" }}>
        <Text p={10} color="mainBlue" ta={"center"}>
          My Messages
        </Text>
        <Stack spacing={5}>
          {anchors.map((element) => (
            <Link
              href={element.href}
              key={"message_sidebar_" + element.href}
              style={{ textDecoration: "none" }}
            >
                <NavLink
                  icon={element.icon}
                  label={element.label}
                  active={router.pathname.includes(element.href)}
                  rightSection={element.rightSection}
                ></NavLink>

            </Link>
          ))}
        </Stack>
      </Box>
      <Button
        sx={{ width: "fit-content" }}
        radius={"xl"}
        component="a"
        href="/messages/new-message"
      >
        New Message
      </Button>
    </Stack>
  );
}
