import React from "react"

function WriteComponent(props){
  return(
    <>
      <header>
        <h2>게시판 - 작성</h2>
      </header>
      <nav>
        <a href="/" onClick={(e) => {
          e.preventDefault();
          props.changeMode('list')
        }}>목록</a>&nbsp;
      </nav>
      <article>
        <form>
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
                <td><input type="contents" cols="22" rows="3" /></td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="전송" />
        </form>
      </article>
    </>
  );
}

export default WriteComponent;