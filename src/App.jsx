import { useEffect, useRef, useState } from "react"

const App = () => {

    const leftEye = useRef(null)
    const rightEye = useRef(null)
    const follower = useRef(null)
    const [moved, setMoved] = useState({x:0,y:0})

    useEffect( () => {
        
        const handleMove = (e) => {
            const x = e.clientX/30
            const y = e.clientY/25
            setMoved({x: x, y: y})
        }

        window.addEventListener("mousemove", handleMove)

        return () => {
            window.removeEventListener("mousemove", handleMove)
        }
    }, [])

    useEffect( () => {
        if(leftEye.current && rightEye.current && follower.current){
            leftEye.current.style.left = moved.x - 25 + "px"
            leftEye.current.style.top = moved.y - 15 + "px"
            leftEye.current.style.right = moved.x + 25 + "px"
            leftEye.current.style.bottom = moved.y + 15 + "px"
            rightEye.current.style.left = moved.x - 25 + "px"
            rightEye.current.style.top = moved.y - 15 + "px"
            rightEye.current.style.right = moved.x - 25 + "px"
            rightEye.current.style.bottom = moved.y - 15 + "px"
            follower.current.style.left = moved.x * 30 + "px"
            follower.current.style.top = moved.y * 25 + "px"
        }
    }, [moved])

    return(
        <div className='flex justify-center items-center h-screen cursor-pointer bg-[#222222]'>
            <div ref={follower} className="w-10 h-10 bg-white absolute z-10 filter blur-md transition-all ease-linear duration-500"></div>
            <div className='rounded-full relative group flex justify-around'>
                <img src="./owl.png" alt="owl pic" />
                <div className="absolute flex justify-evenly w-full px-8 left-[0.17rem] top-[3.8rem]">
                    <div className=" bg-white w-[3.15rem] h-[3.15rem] rounded-full overflow-hidden border-2 border-black flex justify-center items-center">
                        <div ref={leftEye} className="w-5 h-5 bg-black rounded-full relative">
                            <div className="w-2 h-2 bg-white rounded-full absolute" style={{filter:"blur(1.5px)"}}></div>
                        </div>
                    </div>
                    <div className="relative w-[3.15rem] h-[3.15rem] bg-white rounded-full border-2 overflow-hidden border-black flex justify-center items-center">
                        <div ref={rightEye} className="w-5 h-5 bg-black rounded-full relative">
                            <div className="w-2 h-2 bg-white rounded-full absolute" style={{filter:"blur(1.5px)"}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
