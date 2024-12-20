import React from 'react'
import { Link } from 'react-router-dom'
import theme from '../theme'


const Home = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold underline'>Homeホーム</h1>
      <div className="bg-blue-500 text-white text-center p-4">
        Tailwind CSSが動作しています！
      </div>
      <div style={{backgroundColor:theme.colors.primary}}><Link to="/index">Index</Link></div>
      <div><Link to="/details/1">Details</Link></div>
    </div>
  )
}

export default Home
