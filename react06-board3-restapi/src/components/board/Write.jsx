import { Link, useNavigate } from 'react-router-dom';

function Write(props){
  console.log(props);
  const navigate = useNavigate();

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
          console.log(w, t, c);
          fetch('http://nakja.co.kr/APIs/php7/boardWriteJSON.php', {
            method : 'POST',
            header : {
              'Content-type' : 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams({
              apikey : '55a897913f7fe3e8d54f6346c07ccd4b',
              tname : 'nboard_news',
              id : 'jsonAPI',
              name : w,
              subject : t,
              content : c,
            }),
          })
          .then((response) => response.json())
          .then((json) => console.log(json));

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
        <input type="submit" value="전송" />
      </form>
    </article>
  </>);
}

export default Write;