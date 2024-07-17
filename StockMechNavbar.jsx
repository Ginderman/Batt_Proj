import "./MechNavbar.css"
import { useState, useRef, useEffect } from "react"
import { MechArray3025 } from "./Utility/3025DefaultMechs";


export default function StockMechNavbar ({userState, updateLoginStateFunc, currentPage, updateCurrentPage}) {
    const [searchResults, setSearchResults] = useState([]);
    const queryRef = useRef('')
    const searchRef = useRef([])
    const inputRef = useRef(null)

    useEffect(()=> { searchRef.current = MechArray3025 }, [])

    function Onsearch(e){
       //DATABASE CALL TO DO
        console.log(navState)
    }
    function UpdateQuery(str){
        inputRef.current.value = str
        queryRef.current = str
        setSearchResults([])
    }
    function querySearch(e){
        queryRef.current = e.target.value.toLowerCase();
        console.log(queryRef.current)
        
        const results = queryRef.current.length > 0 ? 
        searchRef.current.map((mech) => {
            if (mech.toLowerCase().includes(queryRef.current)){  
                return <div key={mech} onClick={ () => UpdateQuery(mech)} className="searchDropDownRow">{mech}</div>
            } 
        }) : [];
        setSearchResults(results);  
    }
    function login(){
        
        updateLoginStateFunc();
    }

    function logout(){

        updateLoginStateFunc();
    }


    return (
        <div className="mechNavbar">
            <button onClick={ () => {updateCurrentPage("home")}}>Home</button>
            <button onClick={ () => {updateCurrentPage("stockMechs")}}>Stock Mechs</button>
            {userState === false ? 
            <div>
            
             <button onClick={ () => {updateCurrentPage("login")}}>Login/Register</button>
             </div>
              :
              <div>
             <button onClick={ () => {updateCurrentPage("cca")}}>Create/Edit Custom Army</button>
             
             <button onClick={logout}> Logout</button>
             </div>
             } 

             
           
            {/* <div className="searchBar">
            <input  type="text" id="searchID" placeholder="Search.." onChange={querySearch} ref={inputRef}></input>
            <button type="submit" onClick={Onsearch}><img className="searchIcon" src="./src/assets/magnifying-glass-1280.png"></img></button>
            <div className="searchDropdown">{searchResults}</div> 
             </div> */}
        </div>
    )
}