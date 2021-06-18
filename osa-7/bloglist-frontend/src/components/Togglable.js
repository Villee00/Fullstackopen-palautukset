import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

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
      <div id={props.id} style={hideWhenShown} onClick={toggleHidden}>
        <Button variant="contained" color="primary">{props.buttonText}</Button>
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
