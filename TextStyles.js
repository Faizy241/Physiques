import { Text as RNText } from 'react-native';

export const Text = (props) => {
  // Set allowFontScaling prop to false by default
  const defaultProps = {
    allowFontScaling: false,
    ...props,
  };

  return <RNText {...defaultProps} />;
};
