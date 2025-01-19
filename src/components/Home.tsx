import Journey from '../assets/Journey.png'

const Home = () => {
  const shadow = "2px 2px 4px rgba(255, 255, 255, 0.8)";
  return (
    <div className='relative h-screen pt-16'>
      <img src={Journey} className='w-full h-full object-cover' alt="Journey" />
      <div className="absolute top-1/4">
        <h1 className='p-3' style={{ textShadow: shadow }}>旅の記憶を</h1>
        <h1 className='p-3' style={{ textShadow: shadow }}>手軽に残そう</h1>
        <h1 className="text-6xl md:text-8xl p-3" style={{ textShadow: shadow }}>WanderLog</h1>
      </div>

    </div>
  )
}

export default Home
