import { useEffect, useState } from 'react';
import '../App.css';
import TrashCan from '../assets/trashcan.png';
import Pen from '../assets/pen.png'
import { TagType } from '../types'
import { tagAPI } from '../api/tags';

export const Tags = () => {
  const [modal, setModal] = useState<"create" | "edit" | "delete" | null>(null);
  const [editingTag, setEditingTag] = useState({ Id: 0, Name: "" });
  const [tags, setTags] = useState<TagType[]>([]);
  const [loading, setLoading] = useState(true);
  const [needsUpdate, setNeedsUpdate] = useState(false);

  const loadTags = async () => {
    try {
      const res = await tagAPI.showTag();
      setTags(res.data.data);
    } catch (error) {
      console.log("failed to fetch tags");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTags();
  }, [needsUpdate]);

  async function addTag(userId: number, name: string) {
    try {
      const response = await tagAPI.createTag(userId, name);
      console.log("Tag created:", response.data);

      setNeedsUpdate((prev) => !prev);
    } catch (error) {
      console.error("Error creating tag:", error);
    }

    setModal(null);
  };

  // const mockTags = [
  //   { id: 1, name: "サンプルタグ" },
  //   { id: 2, name: "サンプルタグ2" },
  //   { id: 3, name: "サンプルタグ3" },
  //   { id: 4, name: "サンプルタグ4" }
  // ];

  const lordmessage = (loading || !tags) && (
    <div>
      <p>Loading...</p>
    </div>
  );

  const list = tags.length > 0 ? tags.map((tag) => {
    return (
      <div key={tag.Id} className='flex justify-start gap-2 mb-2'>
        <p>{tag.Id} {tag.Name}</p>
        <div onClick={() => { setModal("edit"); setEditingTag({ Id: tag.Id, Name: tag.Name }) }}><img src={Pen} alt="Edit" className='editIcon' /></div>
        <div onClick={() => { setModal("delete"); setEditingTag({ Id: tag.Id, Name: tag.Name }) }}><img src={TrashCan} alt="Delete" className='editIcon' /></div>
      </div>
    )
  }) : (
    <div>
      <p>No data available</p>
    </div>
  );

  // const tagList = mockTags.map((tag) => {
  //   return (
  //     <div key={tag.id} className='flex justify-start gap-2 mb-2'>
  //       <p>{tag.name}</p>
  //       <div onClick={() => { setModal("edit"); setEditingTag({ id: tag.id, name: tag.name }) }}><img src={Pen} alt="Edit" className='editIcon' /></div>
  //       <div onClick={() => { setModal("delete"); setEditingTag({ id: tag.id, name: tag.name }) }}><img src={TrashCan} alt="Delete" className='editIcon' /></div>
  //     </div>
  //   )
  // });

  const tagModal = (
    <div className="modalContainer">
      <div className='modalContent'>
        <p className='pb-3'>{modal == "create" ? "タグを新規作成" : "タグを編集"}</p>
        <input type="text" placeholder='名前を入力' value={editingTag.Name}
          onChange={(e) => setEditingTag({ ...editingTag, Name: e.target.value })}
          className='p-1 m-2 border border-primaryLight rounded-md' />
        <button className='btn btn-primary mb-2' onClick={() => addTag(1, editingTag.Name)}>保存</button>
        <button className='btn btn-cancel' onClick={() => { setModal(null); setEditingTag({ Id: 0, Name: "" }) }}>閉じる</button>

      </div>
    </div>
  );

  const deleteModal = (
    <div className="modalContainer">
      <div className='modalContent'>
        <p className='pb-3'>「{editingTag.Name}」を削除しますか？<br />この操作は取り消すことができません。</p>
        <div className='w-40 m-auto'>
          <button className='btn btn-primary mb-2' >削除する</button>
          <button className='btn btn-cancel' onClick={() => { setModal(null); setEditingTag({ Id: 0, Name: "" }) }}>閉じる</button>
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
          {lordmessage}
          {list}
        </div>
        {(modal == "create" || modal == "edit") && tagModal}
        {modal == "delete" && deleteModal}


      </div>

    </div>
  )
}

export default Tags
