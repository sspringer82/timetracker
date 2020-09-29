import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import * as React from 'react';
import {useEffect, useState} from 'react';
import useLog from './useLog';

const Form: React.FC = () => {
  const {getProjects} = useLog();
  const [projects, setProjects] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      setProjects(await getProjects());
    })();
  }, [getProjects]);

  return  <form noValidate autoComplete="off">
      <Grid container spacing={1}>
      <Grid item xs={12} md={2}>
        <TextField id="date" label="Date" />
      </Grid>
      <Grid item xs={12} md={2}>
      <TextField id="until" label="From" />
      </Grid>
      <Grid item xs={12} md={2}>
      <TextField id="from" label="Until" />
      </Grid>
      <Grid item xs={12} md={2}>
      <FormControl>
        <InputLabel id="project-label">Project</InputLabel>
        <Select
          labelId="project-label"
          id="project"
          value={''}
          onChange={() => {}}
        >
          {projects.map((project) => <MenuItem key={project} value={project}>{project}</MenuItem>)}
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
      <TextField id="comment" label="Comment" />
      </Grid>
      <Grid item xs={12} md={2}>
      <Button variant="contained" color="primary">
        Save
      </Button>
      <Button variant="contained" color="secondary">
        Reset
      </Button>
      </Grid>
  </Grid>
    </form>
};

export default Form;