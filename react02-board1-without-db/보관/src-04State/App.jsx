import { useState } from 'react';
import './App.css'

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

function NavList(props){
  return(
    <nav>
      <a href="/" onClick={function (event){
        event.preventDefault();
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  );
}

function NavView(props){
  return(
    <nav>
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode('list');
      }}>목록</a>&nbsp;
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode('edit');
      }}>수정</a>&nbsp;
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode('delete');
      }}>삭제</a>&nbsp;
    </nav>
  );
}

function NavWrite(props){
  return(
    <nav>
      <a href="/" onClick={function (event){
        event.preventDefault();
        props.onChangeMode();
      }}>목록</a>
    </nav>
  );
}

function ArticleList(props){
  const lists = [];
  for(let i = 0; i < props.boardData.length; i++){
    let row = props.boardData[i];
    lists.push(
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        <td><a href={'/read/' + row.no} onClick={(event) => {
          event.preventDefault();
          props.onChangeMode(row.no);
        }}>{row.title}</a></td>
        <td className="cen">{row.writer}</td>
        <td className="cen">{row.date}</td>
      </tr>
    );
  }
  return(
    <article>
      <table id="boardTable">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {lists}
        </tbody>
      </table>
    </article>
  );
}

function ArticleView(){
  return(
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="20%" /><col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td>성유겸</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>오늘은 React공부하는날</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>2025-05-21</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>열심히 해봅시당<br/>열공 합시당</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}

function ArticleWrite(){
  return(
    <article>
      <form>
        <table id="boardTable">
          <tbody>
            <tr>
              <td>작성자</td>
              <td><input type="text" name="writer" /></td>
            </tr>
            <tr>
              <td>제목</td>
              <td><input type="text" name="title" /></td>
            </tr>
            <tr>
              <td>내용</td>
              <td><textarea name="contents" rows="3" ></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type='submit' value="전송"></input>
      </form>
    </article>
  );
}

function App() {
  const boardData = [
    {no : 1, title : '오늘은 React 공부하는 날', writer : '홍길동', date : '2025-03-31', contents : 'React를 뽀개봅시다.'},
    {no : 2, title : '어제는 Javascript 공부했슴', writer : '임꺽정', date : '2025-05-21', contents : 'Javascript는 할께 너무 많아요.'},
    {no : 3, title : '내일은 Project 해야함.', writer : '손오공', date : '2025-07-21', contents : 'Project는 뭘 만들어볼까?'},
    {no : 4, title : '추가 내일은 Project 해야함.', writer : '손오공', date : '2025-07-21', contents : 'Project는 뭘 만들어볼까?'}
  ];

    const [mode, setMode] = useState('list');

    let articleComp, navComp, titleVar;
    if(mode === 'list'){
      titleVar = '게시판 - 목록(props)';
      navComp = <NavList onChangeMode={()=>{
        setMode('write');
      }}></NavList>
      articleComp = <ArticleList boardData={boardData} onChangeMode={(no) =>{
        console.log('선택한 게시물 번호 : ' + no);
        setMode('view');
      }}></ArticleList>
    } else if(mode === 'view'){
      titleVar = '게시판 - 읽기(props)';
      navComp = <NavView onChangeMode={(pmode) =>{
        setMode(pmode);
      }}></NavView>
      articleComp = <ArticleView></ArticleView>;
    } else if(mode === 'write'){
      titleVar = '게시판 - 쓰기(props)';
      navComp = <NavWrite onChangeMode={() =>{
        setMode('list');
      }}></NavWrite>
      articleComp = <ArticleWrite></ArticleWrite>;
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
