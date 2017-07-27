import * as React from 'react'
import { Component } from 'react'
import { observer } from 'mobx-react'
import { View } from 'react-native'
import { ViewStyle } from 'react-native'

import { Position } from './Position'
import { Size } from './Size'

interface Props {
  isHovered: boolean
  position: Position
  size: Size
}

@observer
export class EmptyCell extends Component<Props, {}> {
  public render() {
    const emptyCellStyle: ViewStyle = {
      borderColor: 'black',
      borderRadius: 5,
      borderStyle: this.props.isHovered ? 'solid' : 'dashed',
      borderWidth: 1,
      height: this.props.size.height,
      left: this.props.position.left,
      position: 'absolute',
      top: this.props.position.top,
      width: this.props.size.width
    }

    return (
      <View
        style={emptyCellStyle}
      />
    )
  }
}