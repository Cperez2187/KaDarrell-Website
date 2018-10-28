import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MuiThemeProvider, createMuiTheme, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PermanentDrawer from './PermanentDrawer';
import CreateBlog from './CreateBlog';
import {db} from '../config/Fire';

const drawerWidth = 240;

const theme = createMuiTheme({
  // Used for migrating to upcoming Material-UI v4.0.0
  typography: {
    useNextVariants: true
  }
})

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
    anchor: 'left',
    blogPosts: []
  };

  componentDidMount() {
    db
      .collection('blogPost')
      .orderBy('date', 'desc')
      .get()
      .then(querySnapshot => {
        // doc.data() is never undefined for query doc snapshots
        const blogPosts = querySnapshot.docs.map(doc => doc.data());

        this.setState({ blogPosts });
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  uploadBlog = (blog) => {
    const docId = blog
      .title
      .toLowerCase()
      .replace(/\s/g, '-');
    db
      .collection('blogPost')
      .doc(docId)
      .set(blog, {merge: true})
      .then(() => {
        console.log('Blogpost upload sucessfully');
      })
      .catch(err => {
        console.log('Error adding blogpost: ', err);
      });
  }

  render() {
    const {classes} = this.props;
    const {anchor, blogPosts } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar
              position="absolute"
              className={classNames(classes.appBar, classes[`appBar-${anchor}`])}>
              <Toolbar className={classes.toolbarFlex}>
                <Typography variant="h6" color="inherit" noWrap>
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
            <PermanentDrawer variant="permanent" anchor={anchor} blogPosts={blogPosts} />
            <main className={classes.content}>
              <div className={classes.toolbar}/>
              <CreateBlog uploadBlog={this.uploadBlog}/>
            </main>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
