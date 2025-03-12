import { useNavigate } from "react-router-dom";

import {
  IconHome2,
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconUser,
} from "@tabler/icons-react";
import { Center, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./css/Navbar.module.css";

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active }: NavbarLinkProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(label.toLowerCase() === "home" ? "/" : `/${label.toLowerCase()}`);
  };

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={handleClick}
        className={`${classes.link} ${active ? classes.active : ""}`}
      >
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const linkData = [
  { icon: IconHome2, label: "Home" },
  { icon: IconUser, label: "Users" },
  { icon: IconSettings, label: "Settings" },
];

export function Navbar() {
  const links = linkData.map((link) => (
    <NavbarLink {...link} key={link.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <MantineLogo type="mark" size={30} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </nav>
  );
}
