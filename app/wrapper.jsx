import React from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

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


const Wrapper = (props, context ) => {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(MyTheme)}>
            <Paper>
                <AppBar
                    title="Photo Strip"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    />
                { props.children }
            </Paper>
        </MuiThemeProvider>
    )
}

export default Wrapper