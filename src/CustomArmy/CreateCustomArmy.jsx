import { useEffect, useState } from 'react'
import './CreateCustomArmy.css'

export default function CreateCustomArmy () {

    const[hasArmies, sethasArmies] = useState([]);
    const[ccaCreateState, setCcaCreateState]= useState(false);

    const saveArmy =(e) => {
        e.preventDefault();
        let army = {
            Name: e.target[0].value,
            BattlePointTotal : e.target[1].value,
            CompanyImage: e.target[2].value
         }
        // console.log(JSON.stringify(army))

        localStorage.setItem("temp", JSON.stringify(army))
    }

    const getTempStorage = () => {
        const storedArmy = localStorage.getItem("temp")
        if(storedArmy){
            const convertedArmy = JSON.parse(storedArmy)
            console.log("Army")
            console.log(convertedArmy)
           

            
        }
    }

    useEffect(() => {

        const storedArmy = localStorage.getItem("temp")
        if(storedArmy){
            const convertedArmy = JSON.parse(storedArmy)
            console.log("Army")
            console.log(convertedArmy)
            sethasArmies(prevState => {
                let newArr = [...prevState]
                newArr.push(convertedArmy)
                return newArr
            })
            
        }
    }, [])
    
    return(
        <div className='ccaBox'>
             {!ccaCreateState && (
                <>
                {(hasArmies.length > 0) && (
                    hasArmies.map((army,index) => {
                        return <div>Army!</div>
                    })



                )}

                <div>
                    <button onClick={() => {setCcaCreateState(true)}} className="addArmyButton"></button>
                    <button onClick={getTempStorage}>GetTempStorage</button>
                 </div>
                 </>
                )
            }
            {ccaCreateState && (
                <div className='ccaCreatePageBackground' onClick={() => {setCcaCreateState(false)}}>
                    <div className='ccaCreatePagePopup' onClick={(e) => e.stopPropagation()}>
                        <form encType="multipart/form-data" onSubmit={saveArmy}>

                            <p>Create your custom army!</p>
                            <label htmlFor="NameInputBox">Enter a company name </label>
                            <input type="text" id='NameInputBox' className='NameInputBox'/>
                            <label htmlFor="BVInputBox">Enter a Battle Point Total </label>
                            <input type="number" id='BVInputBox' className='BVInputBox'/>
                            <label htmlFor="UploadImage">Upload company image </label>
                            <input type="file" id='UploadImage' className='UploadImage'  accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"/>
                            <button type="submit">Submit</button> 
                        </form>
                       

                    </div>
                </div>)

            }

        </div>

    )
}