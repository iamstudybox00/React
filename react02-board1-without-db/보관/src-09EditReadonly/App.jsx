import { useState } from 'react';
import './App.css'
import NavList from './components/navigation/NavList';
import NavView from './components/navigation/NavView';
import NavWrite from './components/navigation/NavWrite';
import ArticleList from './components/article/ArticleList';
import ArticleView from './components/article/ArticleView';
import ArticleWrite from './components/article/ArticleWrite';
import NavEdit from './components/navigation/NavEdit';
import ArticleEdit from './components/article/ArticleEdit';

function ReadyComp(){
  return(
    <div>
      <h3>컴포넌트 준비중입니다.^^*</h3>
      <a href="/">Home 바로가기</a>
    </div>
  );
}

function Header(props){
  console.log('props', props.title);
  return(
    <header>
      <h2>게시판 - 목록</h2>
    </header>
  );
}

function App() {
  const [boardData, setBoardData] = useState([
    {no : 1, title : '오늘은 React 공부하는 날', writer : '홍길동', date : '2025-03-31', contents : 'React를 뽀개봅시다.'},
    {no : 2, title : '어제는 Javascript 공부했슴', writer : '임꺽정', date : '2025-05-21', contents : 'Javascript는 할께 너무 많아요.'},
    {no : 3, title : '내일은 Project 해야함.', writer : '손오공', date : '2025-07-21', contents : 'Project는 뭘 만들어볼까?'}]);

    const [mode, setMode] = useState('list');

    const [no, setNo] = useState(null);

    const [nextNo, setNextNo] = useState(4);

    let articleComp, navComp, titleVar, selectRow;
    if(mode === 'list'){
      titleVar = '게시판 - 목록(props)';
      navComp = <NavList onChangeMode={()=>{
        setMode('write');
      }}></NavList>
      articleComp = <ArticleList boardData={boardData} onChangeMode={(no) =>{
        console.log('선택한 게시물 번호 : ' + no);
        setMode('view');
        setNo(no);
      }}></ArticleList>
    } else if(mode === 'view'){
      titleVar = '게시판 - 읽기(props)';
      navComp = <NavView onChangeMode={(pmode) =>{
        setMode(pmode);
      }}></NavView>
      console.log("현재no : ", no, typeof(no));
      for(let i = 0; i < boardData.length; i++){
        if(no === boardData[i].no){
          selectRow = boardData[i];
        }
      }
      articleComp = <ArticleView selectRow={selectRow}></ArticleView>;
    } else if(mode === 'write'){
      titleVar = '게시판 - 쓰기(props)';
      navComp = <NavWrite onChangeMode={() =>{
        setMode('list');
      }}></NavWrite>
      articleComp = <ArticleWrite writeAction={(t, w, c) =>{
        console.log("App.jsx", t, w, c);

        let dateObj = new Date();
        var year = dateObj.getFullYear();
        var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
        var day = ("0" + dateObj.getDate()).slice(-2);

        let nowDate = year + "-" + month + "-" + day;
        let addBoardData = {no : nextNo, title : t, writer : w, contents : c, date : nowDate};

        let copyBoardData = [...boardData];
        copyBoardData.push(addBoardData);

        setBoardData(copyBoardData);

        // boardData.push(addBoardData);
        // console.log(boardData)
        // setBoardData(boardData);

        setNextNo(nextNo + 1);
        setMode('list');
      }}></ArticleWrite>;
    } else if(mode === 'delete'){
      let newBoardData = [];

      for(let i = 0; i < boardData.length; i++){
        if(no !== boardData[i].no){
          newBoardData.push(boardData[i]);
        }
      }

      setBoardData(newBoardData);

      //요런게 또 있단다
      // for(let i = 0; i < boardData.length; i++){
      //   if(no === boardData[i].no){
      //     boardData.splice(i, 1);
      //   }
      // }
      // setBoardData(boardData);

      setMode('list');
    } else if(mode === 'edit'){
      titleVar = '게시판 - 수정(props)';

      navComp = <NavEdit onChangeMode={() => {
        setMode('list');
      }} onBack={() => {
        setMode('view');
        setNo(no);
      }}></NavEdit>

      for(let i = 0; i < boardData.length; i++){
        if(no === boardData[i].no){
          selectRow = boardData[i];
        }
      }

      articleComp = <ArticleEdit selectRow = {selectRow}></ArticleEdit>
    } else{
      navComp = <ReadyComp></ReadyComp>;
      articleComp = '';
    }
  return (
    <div className='App'>
      <Header title={titleVar}></Header>
      {navComp}
      {articleComp}
    </div>
  )
}

export default App
