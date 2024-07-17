import { useEffect, useState } from 'react'
import './CreateCustomArmy.css'

export default function CreateCustomArmy () {

    const[hasArmies, sethasArmies] = useState(false)

    const SaveArmy =() => {
        localStorage.setItem("temp", "Test")
    }

    useEffect(() => {
        const storedArmy = localStorage.getItem("temp")
        if(storedArmy){
            alert(storedArmy)
        }
    }, [])
    return(
        <div className='ccaBox'>
            <button onClick={() => {SaveArmy()}} className="addArmyButton"></button>

        </div>

    )
}