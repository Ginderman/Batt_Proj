import "./LoginPage.css"
import { useState } from "react";

export default function LoginPage({updateCurrentPage, updateUserState} ){

    const [popUpState, setPopUpState] = useState(true);

    function changePopUpState() {
        setPopUpState(false)
        updateCurrentPage('stockMechs')

    }


    return(
        popUpState && (
            <div className="LoginPageBackground" onClick={changePopUpState}>
                <div className="LoginPagePopup" onClick={(e) => e.stopPropagation()}>
                    <p>Hello World!</p>
                   
                    <button onClick={() => {updateUserState(true); }}>Login</button>
                </div>

             </div>
        )
    )
    
    
}

