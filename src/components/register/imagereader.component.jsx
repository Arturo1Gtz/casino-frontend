import React, { Component } from 'react';
import {Button, Input} from 'semantic-ui-react'
 
class ImageInput extends Component {
  state =  {
    selectedFile: null,
    imagePreviewUrl: null
  };
 
  fileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
 
    let reader = new FileReader();
     
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    }
 
    reader.readAsDataURL(event.target.files[0])
 
  }
 
  submit = () => {
 
    var fd = new FormData();
 
    fd.append('file', this.state.selectedFile);
 
    var request = new XMLHttpRequest();
 
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        alert('Uploaded!');
      }
    };
    request.open("POST", "https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload", true);
    request.send(fd);
  }
 
  render() {
 
    let $imagePreview = (<div className="previewText image-container">Please select an Image for Preview</div>);
    if (this.state.imagePreviewUrl) {
      $imagePreview = (<div className="image-container" ><img src={this.state.imagePreviewUrl} alt="icon" width="200" /> </div>);
    }
 
    return (
      <div className="App">
         <Input type="file" name="avatar" onChange={this.fileChangedHandler} />
         <Button  onClick={this.submit} > Upload </Button>
         { $imagePreview }
      </div>
    );
  }
}
 
export default ImageInput;