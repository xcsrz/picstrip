import React from 'react';

export default (props, context) => {
    return (
        <div style={{height: "auto", padding: "0.8em 0"}}>
            {props.children}
        </div>
    )
}
