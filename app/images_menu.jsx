import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

import IconAdd from 'material-ui/svg-icons/av/library-add';
import IconDelete from 'material-ui/svg-icons/action/delete-forever';
import IconUp from 'material-ui/svg-icons/navigation/arrow-upward';
import IconDown from 'material-ui/svg-icons/navigation/arrow-downward';
import IconRotateLeft from 'material-ui/svg-icons/image/rotate-left';
import IconRotateRight from 'material-ui/svg-icons/image/rotate-right';

import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const iconButtonElement = (
  <IconButton
    style={{marginLeft: "3em"}}
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class ImagesMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.handleTouchTap = this.handleTouchTap.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.setDirection = this.setDirection.bind(this)
    this.handleAddImages = this.handleAddImages.bind(this)
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

  handleAddImages(event) {
    this.setState({
      open: false,
    }, () => {
      this.context.openAddImages(event)
    });
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
              return (<MenuItem 
                        key={"images-select-menu-" + idx}
                        primaryText={img.name}
                        rightIconButton={
                          <IconMenu iconButtonElement={iconButtonElement}>
                            {idx > 0 && (
                              <MenuItem onClick={()=>{
                                  this.context.moveFile(idx, -1)
                                }}
                                leftIcon={<IconUp/>}
                              >
                                Move Up
                              </MenuItem>
                            )}
                            {idx < this.props.images.length-1 && (
                              <MenuItem onClick={()=>{
                                  this.context.moveFile(idx, 1)
                                }}
                                leftIcon={<IconDown/>}
                              >
                                Move Down
                              </MenuItem>
                            )}
                            <MenuItem onClick={()=>{
                                this.context.removeFile(idx)
                              }}
                              leftIcon={<IconDelete/>}
                            >
                              Delete
                            </MenuItem>
                            <MenuItem onClick={()=>{
                                this.context.rotateImage(idx,-90)
                              }}
                              leftIcon={<IconRotateLeft/>}
                            >
                              Rotate Left
                            </MenuItem>
                            <MenuItem onClick={()=>{
                                this.context.rotateImage(idx,90)
                              }}
                              leftIcon={<IconRotateRight/>}
                            >
                              Rotate Right
                            </MenuItem>
                          </IconMenu>
                        } 
                      />)
            })}
            { this.props.images.length > 0 && <Divider /> }
            <MenuItem>
              <FlatButton label="Add Images" icon={<IconAdd />} onTouchTap={this.handleAddImages} />
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
  moveFile: React.PropTypes.func.isRequired,
  removeFile: React.PropTypes.func.isRequired,
  rotateImage: React.PropTypes.func.isRequired,
  setDirection: React.PropTypes.func.isRequired,
  openAddImages: React.PropTypes.func.isRequired,
}

export default ImagesMenu