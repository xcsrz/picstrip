
import React from 'react'
import { render } from 'react-dom'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import Subheader from 'material-ui/Subheader';
import { TwitterPicker } from 'react-color';
import saveAs from 'file-saver';

import Wrapper from './wrapper'
import Files from './files'
import Display from './display'
import AddImages from './add_images'
import ImagePaster from './image_paster'

const canvas = document.createElement('canvas')

class App extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            imagesDialogOpen: false,
            images: [],
            color: "#ffffff",
            margin: 10,
            direction: "vertical",
        }

        this.constructor.childContextTypes = {
            images: React.PropTypes.array,
            direction: React.PropTypes.string,
            margin: React.PropTypes.number,
            color: React.PropTypes.string,
            canvas: React.PropTypes.object,

            addFile: React.PropTypes.func,
            moveFile: React.PropTypes.func,
            removeFile: React.PropTypes.func,
            rotateImage: React.PropTypes.func,
            setDirection: React.PropTypes.func,
            setMargin: React.PropTypes.func,
            setColor: React.PropTypes.func,
            saveImage: React.PropTypes.func,
            openAddImages: React.PropTypes.func,
        }

        this.onChange = this.onChange.bind(this)
        this.marginChange = this.marginChange.bind(this)
        this.colorChange = this.colorChange.bind(this)
        this.addFile = this.addFile.bind(this)
        this.moveFile = this.moveFile.bind(this)
        this.removeFile = this.removeFile.bind(this)
        this.rotateImage = this.rotateImage.bind(this)
        this.setDirection = this.setDirection.bind(this)
        this.setMargin = this.setMargin.bind(this)
        this.setColor = this.setColor.bind(this)
        this.saveImage = this.saveImage.bind(this)
        this.openAddImages = this.openAddImages.bind(this)
        this.closeAddImages = this.closeAddImages.bind(this)

    }

    getChildContext() {
        return {
            images: this.state.images,
            direction: this.state.direction,
            margin: this.state.margin,
            color: this.state.color,
            canvas: canvas,

            addFile: this.addFile,
            moveFile: this.moveFile,
            removeFile: this.removeFile,
            rotateImage: this.rotateImage,
            setDirection: this.setDirection,
            setMargin: this.setMargin,
            setColor: this.setColor,
            saveImage: this.saveImage,
            openAddImages: this.openAddImages,
        }
    }

    openAddImages() {
        this.setState({imagesDialogOpen: true})
    }

    closeAddImages() {
        this.setState({imagesDialogOpen: false})
    }

    onChange(event, value) {
        let newState = {}
        newState[event.target.name] = value
        this.setState(newState)
    }

    setDirection(direction) {
        this.setState({direction: direction})
    }

    setMargin(margin) {
        this.setState({margin: margin})
    }

    setColor(color) {
        this.setState({color: color})
    }

    marginChange(event, value) {
        let newState = {
            margin: value
        }
        this.setState(newState)
    }

    newImage(source) {
        let img = new Image()
        img.onload = function() {
            this.setAttribute("rel", "loaded")
            console.log("image size:", this.width, this.height)
        }
        img.src = source
        return img
    }

    addFile(name, source) {
        let file = {
            name: name,
            image: this.newImage(source),

        }

        let curFiles = this.state.images
        curFiles.push(file)
        this.setState({images: curFiles})
    }

    moveFile(idx, delta) {
        let curFiles = this.state.images;
        [curFiles[idx], curFiles[idx+delta]] = [curFiles[idx+delta], curFiles[idx]]
        this.setState({images: curFiles})
    }

    rotateImage(idx, deg) {
        let img = this.state.images[idx]
        let tmpCanvas = document.createElement('canvas')
        tmpCanvas.width = img.image.height
        tmpCanvas.height = img.image.width
        const ctx = tmpCanvas.getContext('2d')
        ctx.translate(tmpCanvas.width/2,tmpCanvas.height/2)
        ctx.rotate(deg*Math.PI/180)
        ctx.drawImage(img.image,-img.image.width/2,-img.image.height/2)
        img.image = this.newImage(tmpCanvas.toDataURL('image/png'))
        let curFiles = this.state.images
        curFiles[idx] = img
        this.setState({images: curFiles})
    }

    removeFile(idx) {
        let files = this.state.images;
        files.splice(idx, 1)
        this.setState({images: files})
    }

    colorChange(color) {
        this.setState({ color: color.hex })
        this.forceUpdate()
    }

    saveImage(event) {
        // let dt = canvas.toDataURL('image/png')
        // dt = dt.replace("image/png", "application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png")
        // // top.location.href = dt
        // window.open(dt)
        canvas.toBlob((blob) => {
            saveAs(blob, "" + this.state.images.length + "fotostrip-" + this.state.direction + ".png");
        });
    }

    componentWillMount() {
        if(this.state.images.length == 0) {
            this.setState({imagesDialogOpen: true})
        }
    }

    render() {
        return (
            <Wrapper images={this.state.images} >
                <AddImages open={this.state.imagesDialogOpen} close={this.closeAddImages} />
                <Display settings={this.state} canvas={canvas} />
                <ImagePaster/>
            </Wrapper>
            )
    }

}



// document.writeln('<div id="photo-stitcher-app-container"></div>')

// render(
//     <App />,
//     document.getElementById('photo-stitcher-app-container'))


window.initiatePhotoStitch = function(ele) {
    render(
        <App />,
        ele
    )
}