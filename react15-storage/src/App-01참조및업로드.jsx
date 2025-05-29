import { ref, uploadBytes } from 'firebase/storage';
import './App.css'
import { storage } from './storageConfig';

function App() {

  const storageRef = ref(storage);
  console.log('storageREf', storageRef);

  const imageRef1 = ref(storage, 'images');
  const imageRef2 = ref(storage, 'images/myFile.jpg');
  const imageRef3 = imageRef2.parent;
  const imageRef4 = imageRef2.root;
  
  console.log('ref 객체', imageRef1);
  console.log('경로1', imageRef1.fullPath);
  console.log('경로2', imageRef2.fullPath, imageRef2.name);
  console.log('경로3', imageRef3.fullPath);
  console.log('경로4', imageRef4.fullPath);
  return (
    <div className='App'>
      <h2>Firebase - Storage App</h2>
      <h3>스토리지 접속 및 파일 업로드</h3>
      <p>파일을 선택하면 즉시 업로드 됩니다.</p>
      <input type="file" name='myfile' onChange={(e) => {
        console.log('files 프로퍼티', e.target.files);
        console.log('0번째 파일객체', e.target.files[0].name)
        const imageRef = ref(storage, e.target.files[0].name);
        uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
          console.log('업로드성공', snapshot);
        });
      }} />
    </div>
  )
}

export default App