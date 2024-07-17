import { useState, useEffect, useRef } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie';
import StockMechNavbar from '../StockMechNavbar'
import StockMechBox from '../StockMechBox';
import CreateCustomArmy from '../CreateCustomArmy';
import { MechArray3025 } from "../Utility/3025DefaultMechs";
import LoginPage from '../loginPage';
import './App.css'
import axios from 'axios';
import Stack from '@mui/material/Stack'

function App() {
  const [state, setState] = useState({})
  const [cookies, setCookie] = useCookies(['user'])
  const [userState, setUserState] = useState(false)
  const [currentPage, setCurrentPage] = useState('stockMechs');
  
  const [pageState, setPageState] = useState('')
  const [stockMechArray, setStockMechArray] = useState([])

  useEffect(()=> 
    {
      axios.get(`http://localhost:3050/stockMechList`, {
        withCredentials: true,
      })
      .then( response => {
        console.log(response.data);
        setStockMechArray(response.data)
      })}, [])

 const updateLoginState = (newState) => {
    setUserState(prevState => (!prevState));
  }



  const onChange = (e) => {
   setState(e.target.value)
   console.log(state);
    
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3050/${e.target[0].value}`, 
      {
        Username: e.target[1].value,
        Password: e.target[2].value,
        Test1 : 'Test1'
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        params:{
          mechID:  "derp"
        },
        withCredentials: true
      }
    )
    .then( response => {
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  const LoginButton = () => {
    axios.get(`http://localhost:3050/login`, {
      withCredentials: true,
    })
    .then( response => {
      console.log(response.data)
      setState(response.data)
    })
    .catch( function (error) {
      console.log(error);
    })
  }



  return (
    <>
    <Stack spacing={2}>
    <StockMechNavbar userState={userState} currentPage={currentPage} updateCurrentPage={setCurrentPage}  updateLoginStateFunc={updateLoginState} ></StockMechNavbar> 
    {currentPage === "home"? 
    <div>
      <p>THANK U COME AGAIN </p>
      </div> 
      : 
      null

    }
    {currentPage === "stockMechs"? 
      <div>
       <StockMechBox stockMechArray={stockMechArray}></StockMechBox>
      </div>
      : 
      null
    }
      {currentPage === "cca"? 
    <div>
      <CreateCustomArmy></CreateCustomArmy>
      </div> 
      : 
      null

    }
      {currentPage === "vca"? 
    <div>
       <p>VIEW CUSTOM ARMIES</p>
      </div> 
      : 
      null

    }
    {currentPage === "login"? 
    <LoginPage updateCurrentPage={setCurrentPage} updateUserState={setUserState}></LoginPage> 
      : 
      null

    }
     
        {/* <form onSubmit={onSubmit}>
        <input type="text" className="inputText1" placeholder='Mech Name'></input>
          <input type="text" className="inputText2" placeholder='UserName'></input>
          <input type="text" className="inputText3" placeholder='Password'></input>

          
          <button type="submit">Submit</button>
        </form>

        <button onClick={LoginButton}>Login</button>

        <p>Name: {state.name}  Password:{state.password}  Id:{state._id}</p> */}
      </Stack>
      {/* <button onClick={onClick}>Click Me!</button> */}
    </>
  )
}

export default App
