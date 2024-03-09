const Background = () => {
  return <div className="fixed w-screen h-screen -z-10">
    <div className="bg-circle-1"></div>
    <div className="bg-circle-2"></div>
    <div className="bg-circle-3"></div>  
    <div className="w-screen h-screen absolute top-0 left-0 bg-white bg-opacity-[0.01] backdrop-blur-[120px] dark:backdrop-blur-[150px]"></div>   
  </div>
}

export default Background;