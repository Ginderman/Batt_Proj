import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [state, setState] = useState("")

  const onClick = () => {
    axios.get('http://localhost:3050/')
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
      <button onClick={onClick}>Click Me!</button>
    </>
  )
}

export default App
