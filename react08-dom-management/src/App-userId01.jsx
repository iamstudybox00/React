import { useId } from 'react';
import './App.css'

function App() {

  const myId = useId();
  console.log("myId", myId);
  return (
    <div className='App'>
      <h1>React 기본형</h1>
    </div>
  )
}

function MyInput(){
  const ageId = useId();
  console.log("ageId", ageId);

  return(
    <div>
      <label htmlFor='name' >이름</label>
      <input type="text" id='name' />
      <br/>
      <label htmlFor={ageId} >나이</label>
      <input type="text" id={ageId} />
    </div>
  );
}

export default App