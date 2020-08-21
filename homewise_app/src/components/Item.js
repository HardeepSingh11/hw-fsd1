import React from 'react'
import {Link} from 'react-router-dom'

function Item(props) { 
    return (

    <h1>
        <Link to={`/users/${props.data}`}>
            {props.data}
        </Link>
    </h1>
    )
}

export default Item