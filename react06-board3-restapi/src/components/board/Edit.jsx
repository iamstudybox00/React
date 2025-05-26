import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Edit(props){
  console.log(props);
  const navigate = useNavigate();
  let params = useParams();
  console.log('수정idx', params.idx);

  let requestUrl = "http://nakja.co.kr/APIs/php7/boardViewJSON.php";
  let parameter = "apikey=55a897913f7fe3e8d54f6346c07ccd4b&tname=nboard_news&idx=" + params.idx;

  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  useEffect(function(){
    fetch(requestUrl + "?" + parameter)
      .then((result) => {
        return result.json();
      })
      .then((json) =>{
        console.log(json);
        setWriter(json.name);
        setTitle(json.subject);
        setContents(json.content);
      });

      return () => {
        console.log('useEffect실행 ==> 컴포넌트 언마운트');

      }
  }, []);

  return(<>
    <header>
      <h2>게시판-수정</h2>
    </header>
    <nav>
      {/* <a href="/list">목록</a>&nbsp; */}
      <Link to="/list">목록</Link>&nbsp;
    </nav>
    <article>
      <form onSubmit={
        (event) =>{
          event.preventDefault();

          let i = event.target.idx.value;
          let w = event.target.writer.value;
          let t = event.target.title.value;
          let c = event.target.contents.value;

          fetch('http://nakja.co.kr/APIs/php7/boardEditJSON.php', {
            method : 'POST',
            headers : {
              'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams({
              apikey : '55a897913f7fe3e8d54f6346c07ccd4b',
              tname : 'nboard_news',
              id : 'jsonAPI',
              name : w,
              subject : t,
              content : c,
              idx : i,
            }),
          })
          .then((response) => response.json())
          .then((json) => console.log(json));

          navigate("/view/" + params.idx);
        }
      }>
        <input type='hidden' name='idx' value={params.idx} />
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