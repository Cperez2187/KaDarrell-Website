import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PermanentDrawer from './PermanentDrawer';
import CreateBlog from './CreateBlog';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class Main extends Component {
  state = {
    anchor: 'left',
  };

  render() {
    const { classes } = this.props;
    const { anchor } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, classes[`appBar-${anchor}`])}
          >
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                Permanent drawer
              </Typography>
            </Toolbar>
          </AppBar>
          <PermanentDrawer
            variant="permanent"
            classes={classes}
            anchor={anchor} 
          />
          {/* Main content */}
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <CreateBlog />
          </main>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);
