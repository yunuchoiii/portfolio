const Background = () => {
  return <div className="fixed w-screen h-screen -z-10">
    <div className="bg-circle-1"></div>
    <div className="bg-circle-2"></div>
    <div className="bg-circle-3"></div>  
    <div className="w-screen h-screen absolute top-0 left-0 bg-white bg-opacity-[0.01] 2xl:backdrop-blur-[150px] lg:backdrop-blur-[110px] sm:backdrop-blur-[90px] backdrop-blur-[70px] 2xl:dark:backdrop-blur-[200px] lg:dark:backdrop-blur-[150px] sm:dark:backdrop-blur-[115px] dark:backdrop-blur-[80px]"/>
  </div>
}

export default Background;