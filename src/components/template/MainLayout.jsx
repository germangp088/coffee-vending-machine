import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
}));

const MainLayout = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <Container component="main" className={classes.main} maxWidth="lg">
          {children}
        </Container>
      </div>
  );
}

export default MainLayout;