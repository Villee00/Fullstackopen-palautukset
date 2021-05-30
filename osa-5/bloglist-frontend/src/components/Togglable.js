import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [hidden, setHidden] = useState(false)

  const hideWhenShown = { display: hidden ? 'none' : '' }
  const showWhenHidden = { display: hidden ?  '': 'none' }

  const toggleHidden = () => {
    setHidden(!hidden)
  }

  useImperativeHandle(ref, () => {
    return{
      toggleHidden
    }
  })
  return(
    <div>
      <div style={hideWhenShown} onClick={toggleHidden}>
        <button >{props.buttonText}</button>
      </div>
      <div style={showWhenHidden}>
        {props.children}
        <button onClick={toggleHidden}>Cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName= 'Togglable'
Togglable.propTypes ={
  buttonText: PropTypes.string.isRequired
}

export default Togglable
