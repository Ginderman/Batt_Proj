import "./registerPage.css"
import { useState } from "react";
import axios from "axios";

export default function RegisterPage({updateCurrentPage, updateUserState} ){

    const [popUpState, setPopUpState] = useState(true);

    function changePopUpState() {
        setPopUpState(false)
        updateCurrentPage('stockMechs')

    }
    function sendToLogin() {
        setPopUpState(false)
        updateCurrentPage('login')

    }

    const createAccount =(e) => {
        e.preventDefault();
        const user = {
            userName: e.target[0].value,    
            passWord: e.target[1].value
        }
       
        localStorage.setItem("user", JSON.stringify(user))
        // axios.post() //TO DO LOGIN WITH AXIOS TO THE BACKEND
        sendToLogin()

    }

 

    return(
        popUpState && (
            <div className="RegisterPageBackground" onClick={changePopUpState}>
                <div className="RegisterPagePopup" onClick={(e) => e.stopPropagation()}>
                    
                    <form onSubmit={createAccount}>
                        <label htmlFor="usernameBox">Enter a username: </label>
                        <input type="text" placeholder="Username"></input>
                        <label htmlFor="passwordBox">Enter a password: </label>
                        <input type="text" placeholder="Password"></input>
                        <button type="submit">Register</button> 

                        
                    </form>
                   
                </div>

             </div>
        )
    )
    
    
}

