import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class ImagesMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.handleTouchTap = this.handleTouchTap.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.setDirection = this.setDirection.bind(this)
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

  setDirection(_, value) {
    this.context.setDirection(value)
  }

  render() {
    return (
      <div style={{height: "auto", padding: "0.8em 0"}}>
        <RaisedButton
          onTouchTap={this.handleTouchTap}
          label="Images"
          labelPosition="before"
          icon={<Badge primary={true} badgeStyle={{top: 5, left: 0, right: 0}} badgeContent={this.props.images.length} />}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            {this.props.images.map((img,idx)=>{
              return <MenuItem key={"images-select-menu-" + idx} primaryText={img.name} />
            })}
            <MenuItem>
              <FlatButton label="Add Images" onTouchTap={this.context.openAddImages} />
            </MenuItem>
          </Menu>
        </Popover>
      </div>
    );
  }
}

ImagesMenu.contextTypes = {
  images: React.PropTypes.array.isRequired,

  direction: React.PropTypes.string.isRequired,
  addFile: React.PropTypes.func.isRequired,
  setDirection: React.PropTypes.func.isRequired,
  openAddImages: React.PropTypes.func.isRequired,
}

export default ImagesMenu