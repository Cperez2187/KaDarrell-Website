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

// TODO: Need to add uploading state and use modal to display uploading state
class CreateBlog extends Component {
  state = {
    category: '',
    title: '',
    subtitle: '',
    authoredBy: '',
    body: '',
    date: '',
    imageUrl: '',
    uploadedImage: '',
    isUploading: false,
  }

  onImageDrop = files => {
    this.setState({uploadedImage: files[0].name});

    this.handleImageUpload(files[0]);
  }

  // Upload image to Cloudinary
  handleImageUpload = file => {
    const upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.then(res => {
      if (res.body.secure_url) {
        this.setState({ imageUrl: res.body.secure_url });
      }

    }).catch(err => {
      console.log('err', err);
    });
  }

  onBlogSubmit = event => {
    event.preventDefault();

    const { title, body, date, imageUrl } = this.state;
    const { uploadBlog } = this.props;
    uploadBlog({ title, body, date, imageUrl });
  }

  onFieldChange = event => {
    const { name, value } = event.target;
    
    this.setState({ [name]: value });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography variant="h5" component="h3" className={classes.typography}>
            Blog Post
          </Typography>
          <ImageDrop onImageDrop={this.onImageDrop}/>
          <br/>
          {this.state.imageUrl === ''
            ? null
            : <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={this.state.imageUrl}
                  alt="Anthony Thigpen, Anthony Kadarrell Thigpen"
                  title={this.state.uploadedImage.name}/>
              </Card>
          }
          <form>
            <TextField
              label="Category"
              name="category"
              margin="normal"
              id="with-placeholder"
              variant="outlined"
              className={classes.textField}
              onChange={this.onFieldChange}
            />
            <TextField
              type="date"
              name="date"
              margin="normal"
              id="outlined"
              variant="outlined"
              className={classes.textField}
              onChange={this.onFieldChange}
            />
            <TextField
              label="Title"
              name="title"
              margin="normal"
              style={{ width: '50%' }}
              id="with-placeholder"
              variant="outlined"
              className={classes.textField}
              onChange={this.onFieldChange}
            />
            <TextField
              label="Subtitle"
              name="subtitle"
              margin="normal"
              style={{ width: '50%' }}
              id="with-placeholder"
              variant="outlined"
              className={classes.textField}
              onChange={this.onFieldChange}
            />
            <TextField
              label="Write blog post here"
              name="body"
              multiline
              rows="20"
              rowsMax="100"
              margin="normal"
              style={{ width: '98%' }}
              id="outlined-textarea"
              variant="outlined"
              className={classes.textField}
              onChange={this.onFieldChange}
            />
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={this.onBlogSubmit}
            >
              Upload
              <CloudUploadIcon className={classes.rightIcon}/>
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

CreateBlog.propTypes = {
  classes: PropTypes.object.isRequired,
  uploadBlog: PropTypes.func.isRequired
};

export default withStyles(styles)(CreateBlog);
