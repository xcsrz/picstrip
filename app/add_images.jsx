import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone'

import muiThemeable from 'material-ui/styles/muiThemeable'

import Avatar from 'material-ui/Avatar';
import IconPaste from 'material-ui/svg-icons/content/content-paste';

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
  // const inststr = (context.images.length > 0) ? "There are three options to add image files:"
  const titlestr = (context.images.length > 0) ? "Add More Images" : "Add Images"
  return (
      <Dialog
        title={titlestr}
        // actions={actions}
        modal={false}
        open={props.open}
        onRequestClose={props.close}
      >
        <h2 style={{textAlign: 'center'}}> There are three options to add image files: </h2>

        <div style={{ width: '30%', float: 'left', textAlign: 'center', marginRight: '4.9%'}}>
          <h4> Paste an image from your clipboard </h4>
          <div>
            <Avatar
              backgroundColor={props.muiTheme.palette.primary2Color}
              style={{marginTop: '35px'}}
              size={100}
              icon={<IconPaste />}
              />
          </div>
        </div>
        <div style={{ width: '30%', float: 'left', textAlign: 'center', marginRight: '4.9%'}}>
          <h4> Drag 'n Drop </h4>
          <Dropzone onDrop={addPicsFromDrop}
            style={{
              color: props.muiTheme.palette.primary2Color,
              fontSize: '40px',
              paddingTop: '40px',
              paddingBottom: '40px',
              lineHeight: '40px',
              borderRadius: '10px',
              border: `dashed ${props.muiTheme.palette.primary2Color} 2px`
            }}>
            DROP<br/>FILES<br/>HERE
          </Dropzone>
        </div>
        <div style={{ width: '30%', float: 'left', textAlign: 'center'}}>
          <h4> Select an image from your local machine </h4>
          <div>
            <FlatButton
              labelPosition="before"
              backgroundColor={props.muiTheme.palette.primary2Color}
              hoverColor={props.muiTheme.palette.primary3Color}
              style={{
                color: 'white',
                padding: '0.5em',
                marginTop: '45px',
                fontSize: '1.5em',
                height: '4em',
                borderRadius: '0.25em'
              }}
            >
              SELECT <br/>
              FILES
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
          </div>
        </div>
      </Dialog>
  )
}

AddImages.contextTypes = {
  addFile: React.PropTypes.func.isRequired,
  images: React.PropTypes.array.isRequired,
}


export default muiThemeable()(AddImages)