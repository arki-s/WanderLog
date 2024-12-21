import React from 'react'
import { Link } from 'react-router-dom'
import theme from '../theme'


const Home = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold underline'>Homeホーム</h1>
      <div><Link to="/details/1">Details</Link></div>
    </div>
  )
}

export default Home
