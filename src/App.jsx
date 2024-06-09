import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [state, setState] = useState("")

  const onChange = (e) => {
   setState(e.target.value)
   console.log(state);
    
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3050/${e.target[0].value}`, {
        firstName: e.target[1].value,
        lastName: e.target[2].value,
        orders: [1, 2, 3],
       
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        params:{
          value:  e.target[0].value
        }
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

  return (
    <>
      <form onSubmit={onSubmit}>
      <input type="text" className="inputText1" ></input>
        <input type="text" className="inputText2" ></input>
        <input type="text" className="inputText3" ></input>

        
        <button type="submit">Submit</button>
      </form>

      {/* <button onClick={onClick}>Click Me!</button> */}
    </>
  )
}

export default App
