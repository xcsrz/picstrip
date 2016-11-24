import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import ImagePaster from './image_paster'

const AddImages = (props, context ) => {

  const addpics = (event) => {
    let myURL = window.URL || window.webkitURL
    for (let i = 0; i < event.target.files.length; i++) {
      if (!event.target.files[i].type.match(/image.*/)) {
        alert("Could not add " + file.name + " because it it not a valid file.")
        continue
      }
      // let img = document.createElement("img");
      let source = myURL.createObjectURL(event.target.files[i])
      context.addFile(event.target.files[i].name, source)
    }
    props.close()
  }

    const actions = [
      <FlatButton
        label="Or Choose Files"
        labelPosition="before"
      >
        <input type="file" style={{
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
          }} multiple onChange={ addpics } />
      </FlatButton>
    ]
    let inststr = (context.images.length > 0) ? "Paste an image." : "To start off paste an image here."
    return (
        <Dialog
          title="Add Images"
          actions={actions}
          modal={false}
          open={props.open}
          onRequestClose={props.close}
        >
          <p>{inststr}</p>
          <ImagePaster/>
        </Dialog>
    )
}

AddImages.contextTypes = {
  addFile: React.PropTypes.func.isRequired,
  images: React.PropTypes.array.isRequired,
}


export default AddImages