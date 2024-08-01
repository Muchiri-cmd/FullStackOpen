import { useState } from 'react'

const Toggle = (props) => {
  const [visible, setVisible] = useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return(
    <>
      <div style={hide}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={show}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
}

export default Toggle