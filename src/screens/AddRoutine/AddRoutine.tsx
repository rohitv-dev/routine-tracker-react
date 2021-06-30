import React, { useState, useEffect } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import useStore from '../../services/store';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import Paper from '@material-ui/core/Paper/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { useParams, useLocation } from 'react-router-dom';

type Params = {
  date: string
  idx?: string
}

const useStyles = makeStyles(theme => ({
  title: {
    paddingBottom: 10
  },
  field: {
    display: "block",
    margin: 5,
    marginBottom: 20
  },
  paper: {
    padding: 20,
    display: "block",
    marginLeft: 20,
    marginRight: 20,
  },
  card: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#23a81e",
    color: "white",
    display: "flex",
    justifyContent: "space-between"
  },
  cardContent: {
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
  }
}))

function AddRoutine() {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [descriptions, setDescriptions] = useState<string[]>([])
  const [date, setDate] = useState<string>()
  const routines = useStore(state => state.routines)
  const addToRoutine = useStore(state => state.addToRoutine)
  const classes = useStyles()
  const params: Params = useParams()
  const location = useLocation()

  const submitRoutine = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDescriptions(state => [description, ...state])
    setDescription("")
    //addToRoutine(date, title, [description])
  }

  useEffect(() => {
    let path = location.pathname.split("/")[1]
    setDate(params.date)
    if (path === "edit-routine") {
      const routine = routines[params.date][parseInt(params.idx!)]
      setTitle(routine.title!)
      setDescriptions(routine.content!)
    }
  }, [params])

  return (
    <div>
      <Grid container style={{ marginTop: 20 }} spacing={2}>
        <Grid item xs={12} sm={12} lg={6}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h6">Add Routine</Typography>
            <form onSubmit={submitRoutine}>
              <TextField
                className={classes.field}
                variant="outlined"
                label="Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextareaAutosize
                className={classes.field}
                rowsMin={3}
                placeholder="Description"
                value={description}
                style={{ width: "100%", padding: 10 }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" variant="contained" color="primary">Add Routine</Button>
              </Box>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Preview</Typography>
            <Typography variant="overline" style={{ fontWeight: 600 }}>{title}</Typography>
            <GridList cellHeight={300} cols={1}>
              <Box>
                {descriptions.map((des, idx) => {
                  return <GridListTile>
                    <Card className={classes.card} key={idx}>
                      <Typography className={classes.cardContent} variant="body2">{des}</Typography>
                      <Typography
                        className={classes.cardContent}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          let temp = Array.from(descriptions)
                          let index = descriptions.indexOf(des)
                          temp.splice(index, 1)
                          setDescriptions(temp)
                        }}
                      >X</Typography>
                    </Card>
                  </GridListTile>
                })}
              </Box>
            </GridList>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default AddRoutine
