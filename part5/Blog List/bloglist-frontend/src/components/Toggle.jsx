import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggle = forwardRef((props,refs) => {
  const [visible, setVisible] = useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs,() => {
    return {
      toggleVisibility
    } 
  })
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
})

export default Toggle