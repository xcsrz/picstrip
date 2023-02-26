import React from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

// https://github.com/callemall/material-ui/issues/4670
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MyTheme from './theme'

import ImagesMenu from './images_menu'
import MarginMenu from './margin_menu'
import DirectionMenu from './direction_menu'
import AppBarButton from './app_bar_button'

import IconSave from 'material-ui/svg-icons/content/save';


const Wrapper = (props, context ) => {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
            <Paper>
                <AppBar title="Photostrip Generator" showMenuIconButton={false}>
                    <DirectionMenu />
                    <ImagesMenu images={props.images} />
                    <MarginMenu />
                    <AppBarButton>
                      <RaisedButton
                          label="Save Image"
                          onClick={context.saveImage} 
                          icon={<IconSave/>}
                          />
                    </AppBarButton>
                </AppBar>
                { props.children }
            </Paper>
        </MuiThemeProvider>
    )
}


Wrapper.contextTypes = {
  saveImage: React.PropTypes.func.isRequired,
  openAddImages: React.PropTypes.func.isRequired,
}


export default Wrapper