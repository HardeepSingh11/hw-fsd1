import React, {useState, useEffect} from 'react'
const axios = require('axios')

function ItemForm () { 
    useEffect(() => {
    }, [])
    
    const [userObject, setUserObject] = useState({
        firstName: "",
        lastName: "",
        phone: ""
    })
    
    const addItem = (event) => {
        event.preventDefault();
        if(isValid(userObject)){
            alert("Submitting Name")
            console.log(JSON.stringify(userObject))
            //axios.post("http://localhost:8081/dev/save", JSON.stringify(userObject)).then(response => console.log(response))
            axios.post("https://jjjipg9v15.execute-api.us-east-1.amazonaws.com/prod/save", JSON.stringify(userObject))
            //axios.post("https://jjjipg9v15.execute-api.us-east-1.amazonaws.com/dev/hi", JSON.stringify(userObject)).then(response => console.log(response))
            //axios.post("https://jjjipg9v15.execute-api.us-east-1.amazonaws.com/dev/save", JSON.stringify(userObject)).then(response => console.log(response))
        }else{
            alert("Invalid. Please fill out all Feilds.")
        }
    }
    const onChangeText = (event) => {
        setUserObject({...userObject, [event.target.name]: event.target.value})
    }
    
    const isValid = (object) => object.firstName !== "" && object.lastName !== "" && object.phone !== ""

    return (
        <div>
            <form onSubmit={addItem}> 
                <h3>Please Enter Name and Phone Number</h3>
                <input type="text" name="firstName" placeholder="First Name" value={userObject.firstName} onChange={onChangeText}/>
                <input type="text" name="lastName" placeholder= "Last Name" value={userObject.lastName} onChange={onChangeText}/>
                <input type="tel" name="phone" placeholder="(xxx)-xxx-xxxx" value={userObject.phone} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={onChangeText}/>
                <button type="submit" value="Submit">Submit</button>
            </form>
        </div>
    )
}
export default ItemForm