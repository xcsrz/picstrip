import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import IconTransform from 'material-ui/svg-icons/image/transform';

import AppBarButton from './app_bar_button'

const Directions = (props, context) => {

  const swapDirection = () => {
    if(context.direction == 'vertical') {
      context.setDirection('horizontal')
    } else {
      context.setDirection('vertical')
    }
  }

  let label = context.direction.charAt(0).toUpperCase() + context.direction.slice(1)
  return (
    <AppBarButton>
      <RaisedButton
        label={label}
        labelPosition="before"
        onClick={swapDirection}
        icon={<IconTransform />}
      />
    </AppBarButton>
  )




  return (
    <RadioButtonGroup name="direction" onChange={setDirection} valueSelected={context.direction}>
        <RadioButton
            value="horizontal"
            label="Horizontal"
            />
        <RadioButton
            value="vertical"
            label="Vertical"
            />
    </RadioButtonGroup>
  )
}

Directions.contextTypes = {
  direction: React.PropTypes.string.isRequired,
  setDirection: React.PropTypes.func.isRequired,
}

export default Directions