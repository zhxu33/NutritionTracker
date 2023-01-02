import { useState, useEffect } from "react";
import { Button, Grid, Container, Typography } from "@mui/material";
import useStyles from "../styles/style";
import axios from "axios";
import List from "../components/List";

function Dashboard() {
  const classes = useStyles();

  const [lists, setLists] = useState([]);

  let userData;

  if (!localStorage.getItem("user")) {
    window.location.replace("/login");
  } else {
    userData = JSON.parse(localStorage.getItem("user"));
  }

  useEffect(() => {
    const API_URL = "/api/lists";
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    axios
      .get(API_URL, config)
      .then((response) => {
        setLists(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData.token]);

  const updateLists = () => {
    const API_URL = "/api/lists";
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    axios.get(API_URL, config).then((response) => {
      setLists(response.data);
    });
  };

  const addList = () => {
    const API_URL = "/api/lists";
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    const listData = {
      name: "Meal Plan",
    };
    axios.post(API_URL, listData, config).then(() => {
      axios.get(API_URL, config).then((response) => {
        setLists(response.data);
      });
    });
  };

  return (
    <main>
      <div className={classes.container}>
        <Container maxWidth="sm">
          <Typography align="center" variant="h4">
            Welcome, {userData.firstname}!
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Start tracking your meals and nutrition data
          </Typography>
        </Container>
      </div>
      <div className={classes.button}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button onClick={addList} variant="contained">
              Add Meal Plan
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary">
              Create Random Meal Plan
            </Button>
          </Grid>
        </Grid>
      </div>
      <Container className={classes.cardGrid} maxWidth="mid">
        <Grid container spacing={4}>
          {lists
            .slice(0)
            .reverse()
            .map((list) => (
              <List
                key={list._id}
                list={list}
                userData={userData}
                updateLists={updateLists}
              />
            ))}
        </Grid>
      </Container>
    </main>
  );
}

export default Dashboard;