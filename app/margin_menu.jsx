import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import Slider from 'material-ui/Slider';
import { SliderPicker } from 'react-color';



class MarginMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.handleTouchTap = this.handleTouchTap.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.setMargin = this.setMargin.bind(this)
    this.setColor = this.setColor.bind(this)
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  setMargin(_, margin) {
    this.context.setMargin(margin)
  }

  setColor(color) {
    this.context.setColor(color.hex)
  }

  darkColor(color) {
    let codes = {
      "0": 1,
      "1": 2,
      "2": 3,
      "3": 4,
      "4": 5,
      "5": 6,
      "6": 7,
      "7": 8,
      "8": 9,
      "9": 10,
      "a": 11,
      "b": 12,
      "c": 13,
      "d": 14,
      "e": 15,
      "f": 16,
    }
    let val = 0
    for (let i = 1; i < 6; i+=2) {
      val += (codes[color[i]] * codes[color[i+1]])
    }
    return (val < (255*3)/2)
  }

  render() {
    return (
      <div style={{height: "auto", padding: "0.8em 0"}}>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          label="Margin"
          labelPosition="before"
          icon={ <Badge badgeContent={this.context.margin}
                    badgeStyle={{top: 5, left: 0, right: 0, backgroundColor: this.context.color, color: this.darkColor(this.context.color) ? "white" : "black" }}/> }
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}

        >
          <div style={{padding: "2em"}}>
            <Slider style={{width: "200px"}} name="margin" onChange={this.setMargin} step={1} value={this.context.margin} max={50} />
            <SliderPicker onChange={this.setColor} color={this.context.color} />
          </div>
        </Popover>
      </div>
    );
  }
}

MarginMenu.contextTypes = {
  color: React.PropTypes.string.isRequired,
  margin: React.PropTypes.number.isRequired,

  setMargin: React.PropTypes.func.isRequired,
  setColor: React.PropTypes.func.isRequired,
}

export default MarginMenu