import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Edit(props){
  const navigate = useNavigate();
  let params = useParams();
  console.log('수정idx', params.idx);

  let requestUrl = "http://nakja.co.kr/APIs/php7/boardEditJSON.php";
  let parameter = "apikey=55a897913f7fe3e8d54f6346c07ccd4b&tname=nboard_news&idx=" + params.idx;

  const [write, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  useEffect(function(){
    fetch(requestUrl + "?" + parameter)
      .then((result) => {
        return result.json();
      })
      .then((json) =>{
        console.log(json)
      });
  })

  console.log("파라미터", params.no);
  let pno = Number(params.no);

  let vi = boardData.reduce((prev, curr) =>{
    if(curr.no === pno){
      prev = curr;
    }
    return prev;
  }, {})

  const [title, setTitle] = useState(vi.title);
  const [writer, setWriter] = useState(vi.writer);
  const [contents, setContents] = useState(vi.contents);

  return(<>
    <header>
      <h2>게시판 작성</h2>
    </header>
    <nav>
      {/* <a href="/list">목록</a>&nbsp; */}
      <Link to="/list">목록</Link>&nbsp;
    </nav>
    <article>
      <form onSubmit={
        (event) =>{
          event.preventDefault();

          let w = event.target.writer.value;
          let t = event.target.title.value;
          let c = event.target.contents.value;

          let editBoardData = {no:pno, writer:w, title:t, contents:c, date:nowDate()};

          let copyBoardData = [...boardData];
          for(let i = 0; i < copyBoardData.length; i++){
            if(copyBoardData[i].no === pno){
              copyBoardData[i] = editBoardData;
            }
          }

          setBoardData(copyBoardData);
          navigate("/list");
        }
      }>
        <table id="boardTable">
          <colgroup>
            <col width="30%" /><col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <td>작성자</td>
              <td><input type="text" name="writer" value={writer} onChange={(event) =>{
                setWriter(event.target.value);
              }} /></td>
            </tr>
            <tr>
              <td>제목</td>
              <td><input type="text" name="title" value={title} onChange={(event) =>{
                setTitle(event.target.value);
              }}/></td>
            </tr>
            <tr>
              <td>내용</td>
              <td><textarea name="contents" rows="3" value={contents} onChange={(event) =>{
                setContents(event.target.value);
              }}></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송" />
      </form>
    </article>
  </>);
}

export default Edit;