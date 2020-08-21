import React, {useState, useEffect} from 'react'


function ItemDetail(props) { 
    const [user, setUser] = useState({details: {}})

    useEffect(() => {
        fetchItem()
    }, [])



    const fetchItem = async () => {
        //const data = await fetch(`http://localhost:8081/dev/id/${props.match.params.id}`).then(response => response.json())
        const data = await fetch(`https://jjjipg9v15.execute-api.us-east-1.amazonaws.com/dev/id/${props.match.params.id}`).then(response => response.json())
        setUser(data)
    }
    console.log(user)
    return (
        <div>
            <div>
                <h1>Details of User ID <div className="data">{props.match.params.id}</div></h1>
            </div>
            <div className="details">
                <h3>
                    <div className="title">First Name </div> 
                    <div className="data">{user.details.firstName}</div>
                </h3>
                <h3>
                <div className="title">Last Name</div>
                    <div className="data">{user.details.lastName}</div>
                </h3>
                <h3><div className="title">Phone Number</div>
                    <div className="data">{user.details.phone}</div>
                </h3>
            </div>
        </div>
    )
}
export default ItemDetail