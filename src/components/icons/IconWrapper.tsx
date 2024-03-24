import type { StyleProp, ViewStyle } from 'react-native'
import { Svg, type SvgProps } from 'react-native-svg'

export interface IconWrapperProps extends SvgProps {
  color?: string
  size?: number
  style?: StyleProp<ViewStyle>
  viewBox?: string
}

export const IconWrapper = (props: IconWrapperProps) => {
  const {
    size = 24,
    ...otherProps
  } = props
  return (
    <Svg
      width={size}
      height={size}
      style={props?.style}
      fill='none'
      {...otherProps}
    >
      {otherProps.children}
    </Svg>
  )
}
