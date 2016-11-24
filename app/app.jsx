
import React from 'react'
import { render } from 'react-dom'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import Subheader from 'material-ui/Subheader';
import { TwitterPicker } from 'react-color';

import Wrapper from './wrapper'
import Files from './files'
import Display from './display'
import AddImages from './add_images'

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

    addFile(name, source) {
        let img = new Image()
        img.onload = function() {
            this.setAttribute("rel", "loaded")
        }
        img.src = source

        let file = {
            name: name,
            image: img,

        }

        let curFiles = this.state.images
        curFiles.push(file)
        this.setState({images: curFiles})
    }

    colorChange(color) {
        this.setState({ color: color.hex })
        this.forceUpdate()
    }

    saveImage(event) {
        let dt = canvas.toDataURL('image/png')
        dt = dt.replace("image/png", "application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png")
        console.log(dt)
        top.location.href = dt
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
            </Wrapper>
            )
    }

}


document.writeln('<div id="photo-stitcher-app-container"></div>')

render(
    <App />,
    document.getElementById('photo-stitcher-app-container'))
