import { useState } from 'react';
import './App.css'

const Page = ({ isDark, setIsDark }) => {
  return(
    <div className='page'>
      <Header isDark={isDark}></Header>
      <Content isDark={isDark}></Content>
      <Footer isDark={isDark} setIsDark={setIsDark}></Footer>
    </div>
  );
}

const Header = ({isDark}) => {
  return (
    <header className="header"
      style={{
        backgroundColor : isDark ? 'black' : 'lightgray',
        color : isDark ? 'white' : 'black',
      }}>
        <h1>Welcome 홍길동</h1>
      </header>
  );
}

const Content = ({isDark}) => {
  return (
    <div className="content"
      style={{
        backgroundColor : isDark ? 'black' : 'lightgray',
        color : isDark ? 'white' : 'black',
      }}>
        <h1>홍길동 반가워..ㅋㅋ</h1>
    </div>
  );
}

const Footer = ({isDark, setIsDark}) => {
  const toggleTheme = () => {
    setIsDark(!isDark);
  }
  return (
    <div className="footer"
      style={{
        backgroundColor : isDark ? 'black' : 'lightgray',
      }}>
        <input type="button" value="Dark Mode" className='button'
          onClick={toggleTheme} ></input>
    </div>
  );
}

function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <div className='App'>
      <h1>React 기본형</h1>
      <Page isDark={isDark} setIsDark={setIsDark}></Page>
    </div>
  )
}

export default App