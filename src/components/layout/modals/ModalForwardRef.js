import React, { forwardRef } from "react";
import Modal from "./Modal";


const ForwardedModal = forwardRef((props, ref) => (
  <Modal {...props} ref={ref} />
));

export default ForwardedModal;
