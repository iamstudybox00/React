import './App.css';
import {useState} from 'react';

import Board from './commons/Board';
import ComList from './commons/ComList';
import ComWrite from './commons/ComWrite';
import ComEdit from './commons/ComEdit';
  
function nowDateStr(){
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ("0" + dateObj.getMonth()).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}

function App() {
  const [myData, setMyData] = useState([
    {no:1, comment:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2023-01-01'},
    {no:2, comment:'어제는 Javascript공부해씸', writer:'유겸이', date:'2023-03-03'},
    {no:3, comment:'내일은 Project해야징', writer:'개똥이', date:'2023-05-05'},
  ]);

  const [nextVal, setNextVal] = useState(4);

  // 댓글 추가 함수
  const addCommentProces = (writer, comment) => {
    let addComment = { no : nextVal, comment : comment, writer : writer, date : '2025-05-23' };
    let newMyData = [...myData];
    newMyData.push(addComment);
    setMyData(newMyData);
    setNextVal(nextVal + 1);
  }

  // 댓글 삭제 함수
  const deleteCommentProcess = (no) => {
    var newMyData = myData.filter((current) => {
      return current.no !== no;
    });
    setMyData(newMyData);
  }

  const editCommentProcess = (no, writer, comment) => {
    let newMyData = [...myData];
    newMyData.forEach((row) => {
      if(row.no === no){
        row.writer = writer;
        row.comment = comment;
      }
    });
    setMyData(newMyData);
  }
  
  return (
    <div className="App">
      <Board />
      <ComList myData={myData}
        onEditComment = {editCommentProcess}
        onDeleteComment = {deleteCommentProcess}/>
      <ComWrite onWriteComment = {addCommentProces} />
    </div>
  );
}

export default App;