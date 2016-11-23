
import React from 'react'
import { render } from 'react-dom'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import Subheader from 'material-ui/Subheader';
import { TwitterPicker } from 'react-color';

import Wrapper from './wrapper'
import Files from './files'
import Display from './display'


class App extends React.Component {


    constructor(props) {
        super(props);
        
        this.state = {
            images: [],
            color: "#ffffff",
            margin: 10,
            direction: "vertical",
        }

        this.constructor.childContextTypes = {
        }

        this.onChange = this.onChange.bind(this)
        this.marginChange = this.marginChange.bind(this)
        this.colorChange = this.colorChange.bind(this)
        this.addFile = this.addFile.bind(this)

    }

    getChildContext() {
        return {
        }
    }

    onChange(event, value) {
        console.log(event.target, value)
        let newState = {}
        newState[event.target.name] = value
        this.setState(newState)
    }

    marginChange(event, value) {
        let newState = {
            margin: value
        }
        this.setState(newState)
    }

    addFile(file) {
        let curFiles = this.state.images
        curFiles.push(file)
        this.setState({images: curFiles})
    }

    colorChange(color) {
        this.setState({ color: color.hex })
        this.forceUpdate()
    }

                            // <div>
                            //     <pre> { JSON.stringify(this.state, null, 4) } </pre>
                            // </div>
    render() {
        return (
            <Wrapper>
                <div className="container">
                    <div className="row">
                        <div className="nine columns">
                            <Display settings={this.state} />
                        </div>
                        <div className="three columns">
                            <div>
                                <Subheader> Direction </Subheader>
                                <RadioButtonGroup name="direction" onChange={this.onChange} valueSelected={this.state.direction}>
                                    <RadioButton
                                        value="horizontal"
                                        label="Horizontal"
                                        />
                                    <RadioButton
                                        value="vertical"
                                        label="Vertical"
                                        />
                                </RadioButtonGroup>
                                <Subheader> Margin </Subheader>
                                <Slider name="margin" onChange={this.marginChange} step={1} value={this.state.margin} max={50} />
                                <TwitterPicker width="100%" triangle="hide" onChange={this.colorChange} color={this.state.color} />
                                <Files add={ this.addFile } files={this.state.images} />
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
            )
    }

}








document.writeln('<div id="photo-stitcher-app-container"></div>')

render(
    <App />,
    document.getElementById('photo-stitcher-app-container'))
