import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PermanentDrawer from './PermanentDrawer';
import CreateBlog from './CreateBlog';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`
  },
  'appBar-left': {
    marginLeft: drawerWidth
  },
  'appBar-right': {
    marginRight: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  toolbarFlex: {
    display: 'flex',
    justifyContent: 'space-between' 
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit
  }
});

class Main extends Component {
  state = {
    anchor: 'left'
  };

  render() {
    const {classes} = this.props;
    const {anchor} = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, classes[`appBar-${anchor}`])}>
            <Toolbar className={classes.toolbarFlex}>
              <Typography variant="title" color="inherit" noWrap>
                Anthony's Blog Posts
              </Typography>
              <Button
                variant="fab"
                mini
                color="secondary"
                aria-label="Add"
                className={classes.button}>
                <AddIcon/>
              </Button>
            </Toolbar>
          </AppBar>
          <PermanentDrawer variant="permanent" anchor={anchor}/> {/* Main content */}
          <main className={classes.content}>
            <div className={classes.toolbar}/>
            <CreateBlog/>
          </main>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
