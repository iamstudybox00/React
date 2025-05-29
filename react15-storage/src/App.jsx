import { deleteObject, getDownloadURL, listAll, ref } from 'firebase/storage'
import './App.css'
import { storage } from './storageConfig'
import { useEffect, useState } from 'react';

function App() {
  const listRef = ref(storage, '');
  const [fileLists, setFileLists] = useState([]);
  const [renderFlag, setRenderFlag] = useState(false);

  useEffect(() => {
    let fileRows = [];
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          console.log('폴더', folderRef);
        });

        res.items.forEach((itemRef) => {
          const deleteRef = ref(storage, itemRef.fullPath);

          console.log('파일명', itemRef.name);
          
          getDownloadURL(ref(storage, itemRef.name))
            .then((url) => {
              console.log('파일 URL 다운로드');
              const img = document.getElementById(`img_${itemRef.name}`);
              img.setAttribute('src', url);
              img.setAttribute('width', '200');
            })
            .catch((error) => {
              console.log('이미지 다운로드 중 에러', error);
            });

          fileRows.push(
            <tr key={itemRef.name}>
              <td>{itemRef.bucket}</td>
              <td>{itemRef.fullPath}</td>
              <td>{itemRef.name}</td>
              <td><button type='button' onClick={(e) => {
                if(window.confirm('삭제할까요?')) {
                  deleteObject(deleteRef).then(() => {
                    console.log('파일 삭제 성공');
                    setRenderFlag(!renderFlag);
                  })
                  .catch((error) => {
                    console.log('파일 삭제 실패', error);
                  });
                }
              }}>삭제</button></td>
            </tr>
          );
        });
        setFileLists(fileRows);
      })
      .catch((error) => {
        console.log('파일 목록 출력중 에러발생', error);
      });
  }, []);

  console.log('렌더링');
  return (
    <div className='App'>
      <h2>Firebase - Storage App</h2>
      <h3>파일 목록 및 이미지 다운로드</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>bucket</th>
            <th>fullPath</th>
            <th>name</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {fileLists}
        </tbody>
      </table>
    </div>
  )
}

export default App