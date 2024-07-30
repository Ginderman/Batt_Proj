import "./registerPage.css"
import { useState } from "react";
import axios from "axios";

export default function RegisterPage({updateCurrentPage, updateUserState} ){

    const [popUpState, setPopUpState] = useState(true);

    function changePopUpState() {
        setPopUpState(false)
        updateCurrentPage('stockMechs')

    }

    const registerFunc =(e) => {
        e.preventDefault();
        const userName = e.target[0].value;
        const passWord = e.target[1].value;
        // axios.post() //TO DO LOGIN WITH AXIOS TO THE BACKEND
        updateUserState(true)
        changePopUpState()

    }

    const register =() => {
        setPopUpState(false)
        updateCurrentPage('register')
    }


    return(
        popUpState && (
            <div className="RegisterPageBackground" onClick={changePopUpState}>
                <div className="RegisterPagePopup" onClick={(e) => e.stopPropagation()}>
                    YESSSSS!
                    {/* <form onSubmit={loginFunc}>
                        <label htmlFor="usernameBox">Enter a username: </label>
                        <input type="text" placeholder="Username"></input>
                        <label htmlFor="passwordBox">Enter a password: </label>
                        <input type="text" placeholder="Password"></input>
                        <button type="submit">Login</button> 

                        
                    </form>
                    <button onClick={register}>Register Account</button> */}
                </div>

             </div>
        )
    )
    
    
}

