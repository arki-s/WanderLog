import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div>Home</div>
      <div><Link to="/index">Index</Link></div>
      <div><Link to="/details/1">Details</Link></div>
    </div>
  )
}

export default Home
