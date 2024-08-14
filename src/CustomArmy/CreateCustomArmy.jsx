import { useEffect, useState } from 'react'
import './CreateCustomArmy.css'
import StockMechBox from '../StockMech/StockMechBox';

export default function CreateCustomArmy ({stockMechArray}) {

    const[hasArmies, sethasArmies] = useState([]);
    const[currentArmy, setCurrentArmy] = useState([]);
    const[currentArmyIndex, setCurrentArmyIndex] = useState(0);
    const[currentArmyEditeState, setCurrentArmyEditeState]= useState(false);
    const[viewCurrentArmyState, setViewCurrentArmyState]= useState(false);
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
        let copyArmy = [...hasArmies]
        copyArmy.push(army)
        //Save to db and state
        localStorage.setItem("temp", JSON.stringify(copyArmy))
        sethasArmies(prevState => {
            let newArr = [...prevState]
            newArr.push(army)
            return newArr
        })
        setCcaCreateState(false);
        setCurrentArmyEditeState(false)
    }
    const editSavedArmy =(e) => {
        e.preventDefault();
        let newArmy = {
            Name: e.target[0].value,
            BattlePointTotal : e.target[1].value,
            CompanyImage: e.target[2].value
         }

         sethasArmies(prevState => {
            let newArr = [...prevState]
            newArr[currentArmyIndex]= newArmy
            return newArr
        })
       

        //Save to db and state
        // localStorage.setItem("temp", JSON.stringify(copyArmy))
        // sethasArmies(prevState => {
        //     let newArr = [...prevState]
        //     newArr.push(army)
        //     return newArr
        // })
        // setCcaCreateState(false);
         setCurrentArmy(newArmy)
         setCurrentArmyEditeState(false)
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
               
                if(Array.isArray(convertedArmy)){
                    sethasArmies(convertedArmy)
                }
                else if(typeof convertedArmy === "object"){
                    sethasArmies(prevState => {
                        let newArr = []
                        newArr.push(convertedArmy)
                        return newArr
                    })
                }
                
            }
        }, [])

    const setCurrentArmyFunc = (army, index) =>{
        setViewCurrentArmyState(true)
        setCurrentArmy(army)
        setCurrentArmyIndex(index)
       
    }

    const addMech = () => {
    setAddMechsState(true)

    }

    const addToArmy = (mech, index) => {
        //console.log(mech);
        const storedArmies = localStorage.getItem("temp");
       // console.log(index)
        //console.log(storedArmies)
        if(storedArmies){
            const convertedArmy = JSON.parse(storedArmies)
            let army = convertedArmy[index]
            if (army && !convertedArmy[index].Mechs) {
                convertedArmy[index].Mechs = [mech];
                console.log(convertedArmy);
            }
           
            else{
                convertedArmy[index].Mechs.push(mech)
            }
            localStorage.setItem("temp", JSON.stringify(convertedArmy));
        }
    }
    const deleteCompany = (currentArmyIndex) => {
        const storedArmy = localStorage.getItem("temp")
        if(storedArmy){
            const convertedArmy = JSON.parse(storedArmy)
            convertedArmy.splice(currentArmyIndex, 1)
            localStorage.setItem("temp", JSON.stringify(convertedArmy));
            sethasArmies(convertedArmy);
            setViewCurrentArmyState(false);
        }
    }
    
    return(
        <div className='ccaBox'>
             {!ccaCreateState && !currentArmyEditeState && !addMechsState && !viewCurrentArmyState &&  (
                <>
                {(hasArmies.length > 0) && (
                    hasArmies.map((army,index) => {
                        return <div onClick={() => setCurrentArmyFunc(army, index)}><img src={army.CompanyImage}></img>
                        <p>{army.Name}</p>
                        </div>
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
                            <label htmlFor="UploadImage">Link to company image </label>
                            <input type="string" id='UploadImage' className='UploadImage'  />
                            <button type="submit">Submit</button> 
                        </form>
                    </div>
                </div>)
            }
            {viewCurrentArmyState && (
                <div className='viewArmyBackground' onClick={() => {setViewCurrentArmyState(false)}}>
                    <div className='viewArmyCreatePagePopup' onClick={(e) => e.stopPropagation()}>
                            <label htmlFor='armyName'>Army Name: </label>
                            <h3>{currentArmy.Name}</h3>
                            <br></br>
                            <label htmlFor='armyName'>Army Points: </label>
                            <h3>{currentArmy.BattlePointTotal}</h3>

                            <button onClick={() => {setCurrentArmyEditeState(true)}}>Edit Company</button>
                            <button onClick= {addMech}>Add Mechs</button>
                            <button onClick={() => {deleteCompany(currentArmyIndex)}}>Delete Company</button>

                       
                    </div>
                </div>)
            }
            {currentArmyEditeState && (
                <div className='editArmyBackground' onClick={() => {setCurrentArmyEditeState(false)}}>
                    <div className='editArmyCreatePagePopup' onClick={(e) => e.stopPropagation()}>
                        <form encType="multipart/form-data" onSubmit={editSavedArmy}>

                            <p>EDIT YOUR CUSTOM COMPANY!</p>
                            <label htmlFor='armyName'>Enter a new army name </label>
                            <input type='text' id='armyName' placeholder={currentArmy.Name}></input>
                            <br></br>
                            <label htmlFor='armyPoints'>Enter a new army point total </label>
                            <input type='number'id='armyPoints' placeholder={currentArmy.BattlePointTotal}></input>
                            <button type='submit'>Update Company</button>

                        </form>
                    </div>
                </div>)
            }
            {addMechsState && (
                <div className='addMechBackground' onClick={() => {setAddMechsState(false)}}>
                    <div className='addMechPagePopup' onClick={(e) => e.stopPropagation()}>
                        <div>Add Mechs to Army</div>
                        <StockMechBox stockMechArray={stockMechArray} addable={addable} addMechFunc={addToArmy} currentArmyIndex= {currentArmyIndex}  ></StockMechBox>
                    </div>
                </div>)
            }

        </div>

    )
}