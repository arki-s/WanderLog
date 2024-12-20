import React from 'react'
import { Link } from 'react-router-dom'

const Index = () => {
  return (<div>
    <h1 className='text-red-600 font-bold'>index</h1>
    <div className='bg-white'><Link to="/">Home</Link></div>
  </div>
  )
}

export default Index
