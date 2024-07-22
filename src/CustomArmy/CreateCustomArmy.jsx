import { useEffect, useState } from 'react'
import './CreateCustomArmy.css'

export default function CreateCustomArmy () {

    const[hasArmies, sethasArmies] = useState(false)
    const[ccaCreateState, setCcaCreateState]= useState(false)

    // const SaveArmy =(army) => {
    //     localStorage.setItem("temp", JSON.stringify(army))
    // }

    // useEffect(() => {

    //     const storedArmy = localStorage.getItem("temp")
    //     if(storedArmy){
    //         const convertedArmy = JSON.parse(storedArmy)
    //     }
    // }, [])
    //
    return(
        <div className='ccaBox'>
             {!ccaCreateState && (
                 <button onClick={() => {setCcaCreateState(true)}} className="addArmyButton"></button>)
            }
            {ccaCreateState && (
                <div className='ccaCreatePageBackground' onClick={() => {setCcaCreateState(false)}}>
                    <div className='ccaCreatePagePopup' onClick={(e) => e.stopPropagation()}>
                        <form encType="multipart/form-data" method='post'>
                            <p>Create your custom army!</p>
                            <label for="NameInputBox">Enter a company name </label>
                            <input type="text" id='NameInputBox' className='NameInputBox'/>
                            <label for="BVInputBox">Enter a Battle Point Total </label>
                            <input type="number" id='BVInputBox' className='BVInputBox'/>
                            <label for="UploadImage">Upload company image </label>
                            <input type="file" id='UploadImage' className='UploadImage'  accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"/>
                        </form>
                       

                    </div>
                </div>)

            }

        </div>

    )
}