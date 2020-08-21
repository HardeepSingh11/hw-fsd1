import React, {useState, useEffect} from 'react'
import Item from './Item'

function ItemList() { 
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        //const data = await fetch("http://localhost:8081/dev/id").then(response => response.json())
        const data = await fetch("https://jjjipg9v15.execute-api.us-east-1.amazonaws.com/dev/id").then(response => response.json())
        setUsers(data)
        await console.log(data)
    }
    return (
        <div>
            <h1>All User ID's</h1>
            <h5>Select a User to View Details</h5>
            <div className="userList">
                {users.map(user => <Item key={user} data={user}/>)}
            </div>
        </div>
    )
}
export default ItemList