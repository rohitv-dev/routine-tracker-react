import React, { useState, useEffect } from 'react'
import RoutineCard from '../../components/RoutineCard/RoutineCard';
import useStore from './../../services/store';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getDate } from './../../services/functions';
import { Button, Box, Divider, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  title: {
    color: "white",
  },
  box: {
    margin: "1rem 0.5rem"
  },
  gridItem: {
    height: "100%"
  },
  list: {
    color: "black",
    background: "white"
  },
  listItem: {

  },
  listItemText: {

  },
  button: {
    marginRight: "1rem"
  }
})

function Routines() {
  const routines = useStore(state => state.routines)
  const [dates, setDates] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [date, setDate] = useState(getDate())
  const classes = useStyles()

  const handleListItemClick = (index: number, _date: string) => {
    setSelectedIndex(index)
    setDate(_date)
  };

  useEffect(() => {
    setDates(Object.keys(routines).reverse())
  }, [routines])

  return (
    <Container fixed>
      <Box display="flex" justifyContent="space-between" className={classes.box}>
        <Typography className={classes.title} variant="h6">Routines</Typography>
        <Box>
          <Button
            component={Link}
            to={`/add-routine/${date}`}
            className={classes.button}
            variant="contained"
            color="primary"
          >Add</Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item md={2} sm={12} xs={12}>
          <List className={classes.list}>
            {dates.map((_date, idx) => {
              return <>
                <ListItem
                  button
                  key={idx}
                  selected={selectedIndex === idx}
                  onClick={() => handleListItemClick(idx, _date)}
                >
                  <ListItemText className={classes.listItemText}>{_date}</ListItemText>
                </ListItem>
                <Divider />
              </>
            })}
          </List>
        </Grid>
        <Grid item md={10} sm={12} xs={12}>
          <RoutineCard date={date} />
        </Grid>
      </Grid>

      {/* <Grid container spacing={3} alignItems="center" justify="center">
        { dates.map((_date, idx) => {
          return <Grid item key={idx} className={classes.gridItem} xs={12} md={4} lg={2}>
            <RoutineCard date={_date} />
          </Grid>
        })  }
      </Grid>       */}
    </Container>
  )
}

export default Routines
