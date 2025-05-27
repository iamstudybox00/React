import { useState } from 'react';
import './App.css'
import Page from './components/Page';
import { SimpleContext } from '../src-01기본/context/SimpleContext';
import { ThemeContext } from './context/ThemeContext';


function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    // <SimpleContext.Provider value={'Welcome 홍길동'}>
     <ThemeContext.Provider value={{isDark, setIsDark}}>
      <div className='App'>
        <h1>React 기본형</h1>
        <Page></Page>
      </div>
    </ThemeContext.Provider>
    // </SimpleContext.Provider>
  )
}

export default App