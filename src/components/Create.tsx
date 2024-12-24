import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Create = () => {
  const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>([undefined, undefined]);
  const [startDate, endDate] = dateRange;
  // フォームに含める内容
  // 開始日、終了日
  // 場所（地図入力+手動入力）
  // 写真アップロード(5枚まで。プレビュー表示)
  // コスト
  // 評価(星五段階)
  // タグ選択(最大5個)
  // 感想(1000文字以内)
  return (
    <div className='relative h-screen pt-16'>
      <div className='m-5'>
        <h1>Add New Log</h1>
        <div className="pt-10">
          <div className="pb-4">
            <label>旅行期間：
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
            </label>
          </div>

          <div className="pb-4">
            <label>場所：
              <input type="text" placeholder='場所、住所等' className="border border-gray-400 px-2 py-1 rounded-lg" />
            </label>
          </div>

          <div className="pb-4">
            <label>写真アップロード</label>
          </div>

          <div className="pb-4">
            <label>コスト：
              <input type="number" min="0" placeholder='円' className="border border-gray-400 px-2 py-1 rounded-lg" />
            </label>
          </div>

          <div>
            <label>評価：</label>
          </div>

          <div>
            <label>
              感想
              <p>
                <textarea cols={100} rows={10} className="border border-gray-400 px-2 py-1 rounded-lg">
                  感じたこと、やったこと、なんでも記録に残しておきましょう！
                </textarea>
              </p>
            </label>

          </div>


        </div>

      </div>
    </div>
  )
}

export default Create