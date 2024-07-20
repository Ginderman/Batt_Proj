import './stockMechBox.css'
import { useState, useEffect } from 'react';
import MechDisplay from '../MechDisplay/mechdisplay';


export default function StockMechBox ({stockMechArray}) {
    const [stockArrayState, setStockArrayState] = useState([])
    const [popupState, setPopupState] = useState(false)
    const [selectedMech, setSelectedMech] = useState("")

    useEffect(() => {
       setStockArrayState(stockMechArray);
      }, [stockMechArray]);

    function showMech(mech) {
        setPopupState(!popupState);
        setSelectedMech(mech)
        console.log(selectedMech)
        
    }
    function closePopup() {
        setPopupState(false);
        setSelectedMech(null);
    }


   function showArray () {
        console.log(stockArrayState);
    };



    return (
        <div className='StockBox'>
            <div className='StockMechBoxTitle' onClick={showArray}>Stock Mechs</div>
            <div className='StockMechBox'> { stockArrayState.map((mech) => 
                {return (
                        <div className='StockMechCard' onClick={() => showMech(mech)}>
                            <div className="container">
                                <div className='StockMechCardName' >{mech.Name}</div>
                                <div className='StockMechCardValue' >Point Cost: {mech.BattleValue}</div>
                            </div>
                            {popupState && (
                            <div className='popup-overlay' onClick={closePopup}>
                                 <div className='popup-content' onClick={(e) => e.stopPropagation()}>
                                    <MechDisplay mech={selectedMech}></MechDisplay>
                                    <button onClick={closePopup}>Close</button>
                                </div>
                            </div>
                            )}
                        </div> 

                        


                )})} </div>
                
        </div>
            

    )
}