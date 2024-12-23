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
        <div>
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

      </div>
    </div>
  )
}

export default Create
