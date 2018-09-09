import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
})

const PermanentDrawer = ({ variant, classes, anchor }) => (
  <Drawer
    variant={variant}
    classes={{
    paper: classes.drawerPaper
  }}
    anchor={anchor}>
    <div className={classes.toolbar}/>
    <Divider/> {/* Replace with list items */}
    <List component="nav">
      <ListItem button>
        <ListItemText primary="Blog Post" secondary="June 7, 2018"/>
      </ListItem>
      <ListItem button>
        <ListItemText primary="Blog Post" secondary="June 14, 2018"/>
      </ListItem>
    </List>
    <Divider/>
    <Button color="secondary" className={classes.button}>
      Logout
    </Button>
    {/* <List component="nav">
      <ListItem button>
        <ListItemText primary="Logout" />
      </ListItem>
    </List> */}
  </Drawer>
);

PermanentDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PermanentDrawer);