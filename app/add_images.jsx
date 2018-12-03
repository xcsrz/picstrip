import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone'

const myURL = window.URL || window.webkitURL
const AddImages = (props, context ) => {

  const addPicsFromForm = (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      console.log("files:", event.target.files[i])
      if (!event.target.files[i].type.match(/image.*/)) {
        alert("Could not add " + file.name + " because it it not a valid file.")
        continue
      }
      processPic(event.target.files[i])
    }
    props.close()
  }

  const processPic = (pic) => {
    const source = myURL.createObjectURL(pic)
    context.addFile(pic.name, source)
  }  

  const addPicsFromDrop = (files) => {
    files.forEach( file => {
      processPic(file)
    })
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
          }} multiple onChange={ addPicsFromForm } />
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
          <Dropzone onDrop={addPicsFromDrop} />
        </Dialog>
    )
}

AddImages.contextTypes = {
  addFile: React.PropTypes.func.isRequired,
  images: React.PropTypes.array.isRequired,
}


export default AddImages