import * as React from "react";
import { NextPage } from "next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ActionButton } from "../../components/ActionButton";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';

const Home: NextPage = () => {

  const handleClick = async () => {
    console.log("clicked");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 15, mb: 15 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ActionButton href="#" text="Knowledge Base" Icon={LibraryBooksOutlinedIcon} />
              <ActionButton href="/tickets" text="Tickets" Icon={SupportAgentIcon} />
              <ActionButton href="#" text="FAQ Insights" Icon={LightbulbOutlinedIcon} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
