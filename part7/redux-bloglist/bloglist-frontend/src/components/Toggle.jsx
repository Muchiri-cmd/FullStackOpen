import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from 'react-bootstrap'

const Toggle = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hide = { display: visible ? "none" : "" };
  const show = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });
  return (
    <>
      <div style={hide}>
        <Button onClick={toggleVisibility} className="my-2" variant="primary">{props.buttonLabel}</Button>
      </div>
      <div style={show}>
        {props.children}
        <Button onClick={toggleVisibility} className="my-2" variant="secondary">Close Form</Button>
      </div>
    </>
  );
});
Toggle.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
Toggle.displayName = "Toggle";

export default Toggle;
