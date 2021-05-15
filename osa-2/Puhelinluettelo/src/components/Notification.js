import React from 'react';

const Notification = ({message, error}) =>{
    const notificationStyle = {
        color: 'white',
        backgroundColor:'darkgrey',
        padding: '10px',
        borderStyle: "solid",
        borderColor: "black",
        marginBottom: "5px"
    }
    const errorStyle ={
        color: 'red',
        backgroundColor:'lightblue',
        padding: '10px',
        borderStyle: "solid",
        borderColor: "red",
        marginBottom: "5px"
    }
    
    if(message === "" || message == null){
        return null
    }

    if(error){
        return(
            <div style={errorStyle}>
            {message}
            </div>
        )
    }

    return(
        <div style={notificationStyle}>
        {message}
        </div>
    )
}

export default Notification