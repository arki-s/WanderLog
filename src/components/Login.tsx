import { useState } from "react"
import { authAPI } from "../api/auth";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [modal, setModal] = useState<"success" | "fail" | null>(null);

  async function fetchUserInfo() {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await authAPI.getUser();

    } catch (error) {
      console.error("Error fetching user info:", error);

    }
  };

  async function handleLogin() {
    if (user.email == "" || user.password == "") {
      console.log("user info is empty")
      return null;
    }
    try {
      console.log("送信データ:", { email: user.email, password: user.password });
      const response = await authAPI.login(user.email, user.password);
      console.log("レスポンス:", response.data);
      const token = response.data.token;
      localStorage.setItem("authToken", token);

      setModal("success");
      fetchUserInfo();

    } catch (error) {
      console.error("Error login:", error);
      setModal("fail");
    }
  };

  const completeModal = (
    <div className="modalContainer">
      <div className='modalContent'>
        <p className='pb-3'>{modal == "success" ? "ログインしました。" : "ログインに失敗しました。"}</p>

        <button className='btn btn-cancel' onClick={() => { setModal(null) }}>閉じる</button>

      </div>
    </div>
  );

  return (
    <div className='relative w-screen pt-20 md:pt-16'>
      <div className='my-5 mx-auto' style={{ width: '80%' }}>
        <h1 className='font-bold mb-5'>Login</h1>
        <div className="pb-3">
          <input type="text" onChange={(e) => { setUser({ ...user, email: e.target.value }) }} placeholder='メールアドレスを入力' className="border border-gray-400 px-3 py-2 rounded-lg" />
        </div>

        <div className="pb-4">
          <input type="password" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} placeholder='パスワードを入力' className="border border-gray-400 px-3 py-2 rounded-lg" />
        </div>

        <div className="w-1/4 p-2">
          <div className='btn btn-primary' onClick={() => handleLogin()}>
            ログイン
          </div>

        </div>

      </div>
      {modal != null && completeModal}
    </div>
  )
}

export default Login
