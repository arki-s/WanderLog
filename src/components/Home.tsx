import React from 'react'
import { Link } from 'react-router-dom'
import theme from '../theme'


const Home = () => {
  return (
    <div style={{backgroundColor:theme.colors.primary}}>
      <h1>Home　ホーム</h1>
      <div><Link to="/index">Index</Link></div>
      <div><Link to="/details/1">Details</Link></div>
    </div>
  )
}

export default Home
