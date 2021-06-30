import React, { useState, useEffect } from 'react';
import useStore  from './services/store';
import { HashRouter, Switch, Route, NavLink } from 'react-router-dom';
import Routines from './screens/Routines/Routines';
import AddRoutine from './screens/AddRoutine/AddRoutine';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    color: "white",
    display: "flex",
    flexGrow: 1
  },
  navlink: {
    marginLeft: "1rem"
  },
  [theme.breakpoints.down('sm')]: {
    navlink: {
      display: "none"
    },
    appBarTitle: {
      fontSize: 16
    }
  }
}))

function App() {
  const routines = useStore(state => state.routines)
  const addDate = useStore(state => state.addDate)
  const date = useStore(state => state.date)
  const classes = useStyles()

  useEffect(() => {
    if (!(date in routines)) {
      addDate(date)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.root}>
      <HashRouter>
        <AppBar position="static" color="transparent" className={classes.appBar}>
          <Toolbar>
            <Box display="flex" justifyContent="space-between" alignItems="center" style={{width: "100%"}}>
              <Box><Typography className={classes.appBarTitle} variant="h5">Routine Tracker</Typography></Box>
              <Box display="flex" justifyContent="flex-end">
                <NavLink className={classes.navlink} activeStyle={{fontWeight: 600}} style={{textDecoration: "none", color: "white"}} to="/">
                  <Typography variant="body1">Home</Typography>
                </NavLink>
                <NavLink className={classes.navlink} activeStyle={{fontWeight: 600}} style={{textDecoration: "none", color: "white"}} to="/add-routine">
                  <Typography variant="body1">Add Routine</Typography>
                </NavLink>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/">
            <Routines />
          </Route>
          <Route path="/add-routine/:date">
            <AddRoutine />
          </Route>
          <Route path="/edit-routine/:date/:idx">
            <AddRoutine />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
