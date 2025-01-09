import { useState } from 'react';
import '../App.css';

export const Tags = () => {
  const [modal, setModal] = useState(false);
  const mockTags = [
    { id: 1, name: "サンプルタグ" },
    { id: 2, name: "サンプルタグ2" },
    { id: 3, name: "サンプルタグ3" },
    { id: 4, name: "サンプルタグ4" }
  ];

  const tagList = mockTags.map((tag) => {
    return (
      <div key={tag.id} className='flex justify-start gap-2 mb-2'>
        <p>{tag.name}</p>
        <button className='btn btn-primary'>編集</button>
        <button className='btn btn-cancel'>削除</button>
      </div>
    )
  });

  const tagModal = (
    <div className="modalContainer">
      <div className='modalContent'>
        <p className='pb-3'>タグを新規追加</p>
        <input type="text" placeholder='名前を入力' className='p-1 m-2 border border-primaryLight rounded-md' />
        <button className='btn btn-primary mb-2' onClick={() => setModal(false)}>保存</button>
        <button className='btn btn-cancel' onClick={() => setModal(false)}>閉じる</button>

      </div>
    </div>
  );



  return (
    <div className='relative h-screen pt-16'>
      <div className="p-1 md:p-3">
        <h1 className='pb-5'>Tags</h1>
        <button className='btn btn-primary' onClick={() => setModal(true)}>新しいタグを作成</button>
        <div className='py-2'>
          {tagList}
        </div>
        {modal && tagModal}

      </div>

    </div>
  )
}

export default Tags
