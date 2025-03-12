import { Title } from "@mantine/core";

import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";

import classes from "./css/Home.module.css";

export function Home() {
  return (
    <div className={classes.main}>
      <div className={classes.content}>
        <div className={classes.logoContainer}>
          <a href="https://vite.dev" target="_blank" className={classes.anchor}>
            <img src={viteLogo} className={classes.logo} alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" className={classes.anchor}>
            <img src={reactLogo} className={classes.logo} alt="React logo" />
          </a>
        </div>
        <Title className={classes.title}>
          Welcome to the Example Application
        </Title>
      </div>
    </div>
  );
}
