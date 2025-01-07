import { useState } from 'react';
import '../App.css';

export const Tags = () => {
  const [modal, setModal] = useState(false);

  const tagModal = (
    <div className="modalContainer">
      <div className='modalContent'>
        <p className='pb-3'>タグを新規追加</p>
        <input type="text" placeholder='名前を入力' className='p-1 m-2 border border-primaryLight rounded-md' />
        <button className='btn btn-primary' onClick={() => setModal(false)}>閉じる</button>

      </div>
    </div>
  );



  return (
    <div className='relative h-screen pt-16'>
      <div className="p-1 md:p-3">
        <h1 className='pb-5'>Tags</h1>
        <button className='btn btn-primary' onClick={() => setModal(true)}>新しいタグを作成</button>
        {modal && tagModal}

      </div>

    </div>
  )
}

export default Tags
