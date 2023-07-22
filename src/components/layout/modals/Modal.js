import React from "react";
import { Modalize } from "react-native-modalize";


const Modal = ({ children, onClose }, ref) => {
  return (
    <Modalize
      ref={ref}
      adjustToContentHeight={true}
      disableScrollIfPossible={false}
      handlePosition="inside"
      onClose={onClose}>
      {children}
    </Modalize>
  );
};

export default React.forwardRef(Modal);
//wrap in a view use dimensions to get device height and use that for the view height
//wherever used import Modalize and make sure to set a ref and set up open and close functions