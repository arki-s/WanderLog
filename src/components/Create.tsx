import { useCallback, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Stars from './Stars';
import { useDropzone } from 'react-dropzone';

const Create = () => {
  const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
  const [startDate, endDate] = dateRange;
  const defaultRating = localStorage.getItem("starRating");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedImages(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

  // フォームに含める内容
  // 開始日、終了日
  // 場所（地図入力+手動入力）
  // 写真アップロード(5枚まで。プレビュー表示)
  // コスト
  // 評価(星五段階)
  // タグ選択(最大5個)
  // 感想(1000文字以内)
  return (
    <div className='relative h-screen w-screen pt-16'>
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
              <input type="text" placeholder='場所、住所等' className="border border-gray-400 px-3 py-2 rounded-lg" />
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
              <input type="number" min="0" placeholder='円' className="border border-gray-400 px-2 py-1 rounded-lg" />
            </div>

            <div className="pb-4 flex justify-between items-center">
              <label>評価：</label>
              <Stars iconSize={50} defaultRating={defaultRating} />
            </div>

            <div>
              <label>感想:
              </label>
              <p>
                <textarea rows={10} className="w-full border border-gray-400 px-2 py-1 rounded-lg">
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
