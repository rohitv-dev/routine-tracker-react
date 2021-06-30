import React from 'react'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useStore, { SubRoutine } from './../../services/store';
import Paper from '@material-ui/core/Paper/Paper';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Link } from 'react-router-dom';

type PropTypes = {
  date: string
}

const useStyles = makeStyles({
  paper: {
    padding: 10
  },
  subRoutine: {
    margin: "0.5rem"
  },
  accordionDetails: {
    display: "block"
  },
  edit: {
    marginRight: "1rem",
    color: "grey",
    cursor: "pointer"
  }
});

function RoutineCard(props: PropTypes) {
  const routines = useStore(state => state.routines)
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography variant="body1">{props.date}</Typography>
      {routines[props.date].map((routine, idx) => {
        return <Box px={2} py={1}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
            >
              <Box display="flex" justifyContent="space-between" style={{ width: "100%" }}>
                <Typography variant="body1" key={idx}>{routine.title}</Typography>
                <Typography
                  className={classes.edit}
                  variant="body2"
                  component={Link}
                  to={`/edit-routine/${props.date}/${idx}`}
                  onClick={(e: any) => {
                    e.stopPropagation()
                  }}
                >Edit</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              {routine.content?.map((con) => {
                return <Box px={2}>
                  <Typography className={classes.subRoutine} variant="body2">{con}</Typography>
                </Box>
              })}
            </AccordionDetails>
          </Accordion>
        </Box>
      })}
    </Paper>
  )
}

export default RoutineCard
