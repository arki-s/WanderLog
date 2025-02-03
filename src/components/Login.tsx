import { useState } from "react"

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  return (
    <div className='relative w-screen pt-20 md:pt-16'>
      <div className='my-5 mx-auto' style={{ width: '80%' }}>
        <h1 className='font-bold mb-5'>Login</h1>
        <div className="pb-3">
          <input type="text" onChange={(e) => { setUser({ ...user, email: e.target.value }) }} placeholder='メールアドレスを入力' className="border border-gray-400 px-3 py-2 rounded-lg" />
        </div>

        <div className="pb-4">
          <input type="password" onChange={(e) => { setUser({ ...user, email: e.target.value }) }} placeholder='パスワードを入力' className="border border-gray-400 px-3 py-2 rounded-lg" />
        </div>

        <div className="w-1/4 p-2">
          <div className='btn btn-primary'>
            ログイン
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login
