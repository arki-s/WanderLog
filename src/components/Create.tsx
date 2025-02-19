import { useCallback, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Stars from './Stars';
import { useDropzone } from 'react-dropzone';

const Create = () => {
  const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
  const [startDate, endDate] = dateRange;
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [newLog, setNewLog] = useState({
    userId: 0,
    address: "",
    cost: 0,
    rating: 0,
    comment: "",
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedImages(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: true,
  });

  function saveNewLog() {
    if (dateRange.includes(undefined)) return;
    setNewLog({ ...newLog, userId: 1 });

    console.log(newLog);
  }

  console.log(newLog);

  return (
    <div className='relative h-screen w-screen pt-20 md:pt-16'>
      <div className='my-5 mx-auto' style={{ width: '80%' }}>
        <div>
          <h1>Add New Log</h1>
          <div className="pt-10">
            <div className="pb-4 flex justify-between items-center">
              <label>旅行期間：</label>
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update: [Date | null, Date | null]) => {
                  const convertedUpdate: [Date | undefined, Date | undefined] = [
                    update[0] ?? undefined,
                    update[1] ?? undefined,
                  ];
                  setDateRange(convertedUpdate);
                }}
                isClearable={true}
                className='custom-datepicker'
              />
            </div>

            <div className="pb-4 flex justify-between items-center">
              <label>場所：</label>
              <input type="text" onChange={(e) => setNewLog({ ...newLog, address: e.target.value })} placeholder='場所、住所等' className="border border-gray-400 px-3 py-2 rounded-lg" />
            </div>

            <div className="pb-4">
              <label>旅の写真：</label>
              <div
                {...getRootProps()}
                style={{
                  border: '2px dashed #ccc',
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                <input {...getInputProps()} />
                <p>ドラッグ＆ドロップ、またはクリックして画像を選択</p>
                <div>
                  {selectedImages.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      style={{ width: '100px', margin: '10px' }}
                    />
                  ))}
                </div>
              </div>

            </div>

            <div className="pb-4 flex justify-between items-center">
              <label>コスト：</label>
              <input type="number" min="0" placeholder='円' onChange={(e) => setNewLog({ ...newLog, cost: parseInt(e.target.value) })} className="border border-gray-400 px-2 py-1 rounded-lg" />
            </div>

            <div className="pb-4 flex justify-between items-center">
              <label>評価：</label>
              <Stars iconSize={50} defaultRating={newLog.rating}
                onChange={(rating) => setNewLog((prev) => ({ ...prev, rating }))} />
            </div>

            <div>
              <label>感想:
              </label>
              <p>
                <textarea onChange={(e) => { setNewLog({ ...newLog, comment: e.target.value }) }} rows={10} className="w-full border border-gray-400 px-2 py-1 rounded-lg">
                  感じたこと、やったこと、なんでも記録に残しておきましょう！
                </textarea>
              </p>

            </div>

            <div className="w-1/4 p-2">
              <div className='btn btn-primary'>
                保存する
              </div>

            </div>


          </div>
        </div>

      </div>
    </div>
  )
}

export default Create
