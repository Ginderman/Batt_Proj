import { useEffect, useState } from 'react'
import './CreateCustomArmy.css'
import StockMechBox from '../StockMech/StockMechBox';

export default function CreateCustomArmy ({stockMechArray}) {

    const[hasArmies, sethasArmies] = useState([]);
    const[currentArmy, setCurrentArmy] = useState([]);
    const[currentArmyEditeState, setCurrentArmyEditeState]= useState(false);
    const[addMechsState, setAddMechsState] = useState(false);
    const[ccaCreateState, setCcaCreateState]= useState(false);
    const addable = true;

    const saveArmy =(e) => {
        e.preventDefault();
        let army = {
            Name: e.target[0].value,
            BattlePointTotal : e.target[1].value,
            CompanyImage: e.target[2].value
         }
        // console.log(JSON.stringify(army))

        localStorage.setItem("temp", JSON.stringify(army))
        setCcaCreateState(false);
        setCurrentArmyEditeState(false)
        setAddMechsState(true)
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

    const setCurrentArmyFunc = (army) =>{
        setCurrentArmyEditeState(true)
        console.log(army)
        setCurrentArmy(army)
        
    }
    
    return(
        <div className='ccaBox'>
             {!ccaCreateState && !currentArmyEditeState && !addMechsState && (
                <>
                {(hasArmies.length > 0) && (
                    hasArmies.map((army,index) => {
                        return <div onClick={() => setCurrentArmyFunc(army)}><img src={army.CompanyImage}></img></div>
                    })
                )}

                <div>
                    <button onClick={() => {setCcaCreateState(true)}} className="addArmyButton"></button>
                    <button onClick={getTempStorage}>GetTempStorage</button>
                 </div>
                 </>
                )
            }{currentArmyEditeState && (
                <div className='editArmyBackground' onClick={() => {setCurrentArmyEditeState(false)}}>
                    <div className='editArmyCreatePagePopup' onClick={(e) => e.stopPropagation()}>
                        <form encType="multipart/form-data" onSubmit={saveArmy}>

                            <p>EDIT YOUR CUSTOM ARMY!</p>
                            <label htmlFor='armyName'>Enter a new army name </label>
                            <input type='text' id='armyName' placeholder={currentArmy.Name}></input>
                            <br></br>
                            <label htmlFor='armyPoints'>Enter a new army point total </label>
                            <input type='number'id='armyPoints' placeholder={currentArmy.BattlePointTotal}></input>
                        </form>
                    </div>
                </div>)
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
                            <label htmlFor="UploadImage">Link to company image </label>
                            <input type="string" id='UploadImage' className='UploadImage'  />
                            <button type="submit">Submit</button> 
                        </form>
                    </div>
                </div>)
            }
            {addMechsState && (
                <div className='addMechBackground' onClick={() => {setAddMechsState(false)}}>
                    <div className='addMechPagePopup' onClick={(e) => e.stopPropagation()}>
                        <div>Add Mechs to Army</div>
                        <StockMechBox stockMechArray={stockMechArray} addable={addable}></StockMechBox>
                    </div>
                </div>)
            }

        </div>

    )
}