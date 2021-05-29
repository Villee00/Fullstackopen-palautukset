import React, {useState, useImperativeHandle} from 'react'


const Togglable = React.forwardRef((props, ref) =>{
    const [hidden, setHidden] = useState(false)

    const hideWhenShown = {display: hidden ? 'none' : '' }
    const showWhenHidden = {display: hidden ?  '': 'none'}

    const toggleHidden = () =>{
        setHidden(!hidden)
    }

    useImperativeHandle(ref, ()=> {
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


export default Togglable
