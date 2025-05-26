import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function View(props){
  var params = useParams();
  console.log("idx", params.idx);

  const navigate = useNavigate();

  let[boardData, setBoardData] = useState({});
  let requestUrl = "http://nakja.co.kr/APIs/php7/boardViewJSON.php";
  let parameter = "apikey=55a897913f7fe3e8d54f6346c07ccd4b&tname=nboard_news&idx=" + params.idx;

  useEffect(function(){
    fetch(requestUrl + "?" + parameter)
      .then((result) =>{
        return result.json();
      })
      .then((json) => {
        console.log(json);
        setBoardData(json);
      });
      return () => {
        console.log('useEffect실행 ==> 컴포넌트 언마운트');
      }
  }, []);

  return(<>
    <header>
      <h2>게시판 읽기</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>&nbsp;
      <Link to={"/edit/" + params.idx}>수정</Link>&nbsp;
      <Link onClick={() =>{
        console.log('삭제 idx', params.idx)
        fetch("http://nakja.co.kr/APIs/php7/boardDeleteJSON.php", {
            method : 'POST',
            headers : {
              'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams({
              apikey : '55a897913f7fe3e8d54f6346c07ccd4b',
              tname : 'nboard_news',
              idx : params.idx,
            }),
        })
        .then((result) => result.json())
        .then((json) => {
          console.log(json);
          if(json.result === 'success'){
            alert('삭제되었습니다.');
            navigate("/list");
          } else{
            alert('삭제에 실패했습니다.')
          }
        });
      }}>삭제</Link>
    </nav>
    <article>
      <table id="boardTable">
        <colgroup>
          <col width="20%" /><col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <td>작성자</td>
            <td>{boardData.name}</td>
          </tr>
          <tr>
            <td>제목</td>
            <td>{boardData.subject}</td>
          </tr>
          <tr>
            <td>날짜</td>
            <td>{boardData.regdate}</td>
          </tr>
          <tr>
            <td>내용</td>
            <td dangerouslySetInnerHTML={{__html: boardData.content}}></td>
          </tr>
        </tbody>
      </table>
    </article>
  </>);
}

export default View;