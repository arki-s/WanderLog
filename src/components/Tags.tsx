import { useState } from 'react';
import '../App.css';
import TrashCan from '../assets/trashcan.png';
import Pen from '../assets/pen.png'

export const Tags = () => {
  const [modal, setModal] = useState<"create" | "edit" | "delete" | null>(null);
  const [editingTag, setEditingTag] = useState({ id: 0, name: "" });
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
        <div onClick={() => { setModal("edit"); setEditingTag({ id: tag.id, name: tag.name }) }}><img src={Pen} alt="Edit" className='editIcon' /></div>
        <div onClick={() => { setModal("delete"); setEditingTag({ id: tag.id, name: tag.name }) }}><img src={TrashCan} alt="Delete" className='editIcon' /></div>
      </div>
    )
  });

  const tagModal = (
    <div className="modalContainer">
      <div className='modalContent'>
        <p className='pb-3'>{modal == "create" ? "タグを新規作成" : "タグを編集"}</p>
        <input type="text" placeholder='名前を入力' value={modal == "edit" ? editingTag.name : ""} className='p-1 m-2 border border-primaryLight rounded-md' />
        <button className='btn btn-primary mb-2' >保存</button>
        <button className='btn btn-cancel' onClick={() => { setModal(null); setEditingTag({ id: 0, name: "" }) }}>閉じる</button>

      </div>
    </div>
  );

  const deleteModal = (
    <div className="modalContainer">
      <div className='modalContent'>
        <p className='pb-3'>「{editingTag.name}」を削除しますか？<br />この操作は取り消すことができません。</p>
        <div className='w-40 m-auto'>
          <button className='btn btn-primary mb-2' >削除する</button>
          <button className='btn btn-cancel' onClick={() => { setModal(null); setEditingTag({ id: 0, name: "" }) }}>閉じる</button>
        </div>
      </div>
    </div>
  );


  return (
    <div className='relative h-screen pt-16'>
      <div className="p-1 md:p-3">
        <h1 className='pb-5'>Tags</h1>
        <button className='btn btn-primary' onClick={() => setModal("create")}>新しいタグを作成</button>
        <div className='py-2'>
          {tagList}
        </div>
        {(modal == "create" || modal == "edit") && tagModal}
        {modal == "delete" && deleteModal}


      </div>

    </div>
  )
}

export default Tags
