import "./LoginPage.css"
import { useState } from "react";
import axios from "axios";

export default function LoginPage({updateCurrentPage, updateUserState} ){

    const [popUpState, setPopUpState] = useState(true);

    function changePopUpState() {
        setPopUpState(false)
        updateCurrentPage('stockMechs')

    }

    const loginFunc =(e) => {
        e.preventDefault();
        const userName = e.target[0].value;
        const passWord = e.target[1].value;
        // axios.post() //TO DO LOGIN WITH AXIOS TO THE BACKEND
        
        updateUserState(true)
        changePopUpState()

    }


    return(
        popUpState && (
            <div className="LoginPageBackground" onClick={changePopUpState}>
                <div className="LoginPagePopup" onClick={(e) => e.stopPropagation()}>
                    <form onSubmit={loginFunc}>
                        <label htmlFor="usernameBox">Enter a username: </label>
                        <input type="text" placeholder="Username"></input>
                        <label htmlFor="passwordBox">Enter a password: </label>
                        <input type="text" placeholder="Password"></input>
                        <button type="submit">Login</button> 
                        
                    </form>
                </div>

             </div>
        )
    )
    
    
}

