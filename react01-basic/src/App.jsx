import './App.css'

function App() {
  const mystyle = {
    color : "white",
    backgroundColor : "DodgerBlue",
    padding : "10px",
    fontfamily : "Verdana"
  };

  return (
    <div className='App'>
      <h1>React - Style 지정하기</h1>
      <ol>
        <li style={{color : "red"}}>프론트엔드</li>
          <ul style={mystyle}>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>Javascript</li>
            <li>JQuery</li>
          </ul>
        <li className='backEnd'>백엔드</li>
        <ul>
          <li id='backEndSub'>Java</li>
          {/* <li class='warnings'>Oracle</li> */}
          <li className='warnings'>Oracle</li>
          <li>JSP</li>
          <li>Spring boot</li>
        </ul>
      </ol>
    </div>
  )
}

export default App
