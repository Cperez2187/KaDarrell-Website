import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ImageDrop from './ImageDrop';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'dv9plflx';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/justcodeit/image/upload';

const styles = theme => ({
  root: theme
    .mixins
    .gutters({
      paddingTop: 16,
      paddingBottom: 16,
      marginTop: theme.spacing.unit * 3
    }),
  typography: {
    marginBottom: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
});

// Make stateful to handle children state
class CreateBlog extends Component {
  state = {
    title: '',
    text: '',
    uploadedImage: '',
    uploadedFileCloudinaryUrl: ''
  }

  onImageDrop = files => {
    this.setState({uploadedImage: files[0]});

    this.handleImageUpload(files[0]);
  }

  // Upload image to Cloudinary
  handleImageUpload = file => {
    const upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.log(err);
      }

      if (response.body.secure_url) {
        this.setState({uploadedFileCloudinaryUrl: response.body.secure_url});
      }
    })
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="headline" component="h3" className={classes.typography}>
            Blog Post
          </Typography>
          <ImageDrop onImageDrop={this.onImageDrop}/>
          <br/> {this.state.uploadedFileCloudinaryUrl === ''
            ? null
            : <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={this.state.uploadedFileCloudinaryUrl}
                alt="Anthony Thigpen, Anthony Kadarrell Thigpen"
                title={this.state.uploadedImage.name}/>
            </Card>
}
          <TextField
            id="with-placeholder"
            label="Title"
            className={classes.textField}
            margin="normal"
            style={{
            width: '50%'
          }}/>
          <TextField
            id="textarea"
            label="Write blog post here"
            multiline
            className={classes.textField}
            margin="normal"
            style={{
            width: '98%'
          }}/>
          <Button variant="contained" color="default" className={classes.button}>
            Upload
            <CloudUploadIcon className={classes.rightIcon}/>
          </Button>
        </Paper>
      </div>
    );
  }
}

CreateBlog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateBlog);
