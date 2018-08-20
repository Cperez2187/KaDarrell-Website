import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const PermanentDrawer = (props) => (
  <Drawer
    variant={props.variant}
    classes={{
    paper: props.classes.drawerPaper
  }}
    anchor={props.anchor}>
    <div className={props.classes.toolbar}/>
    <Divider/>
    {/* Replace with list items */}
    <List component="nav">
      <ListItem button>
        <ListItemText primary="Blog Post" secondary="June 7, 2018" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Blog Post" secondary="June 14, 2018" />
      </ListItem>
    </List>
    <Divider/>
    <List component="nav">
      <ListItem button>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  </Drawer>
);

PermanentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default PermanentDrawer;