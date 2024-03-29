import React, {useState, useEffect} from 'react'
import localFont from 'next/font/local'

const myFont = localFont({ src: '../app/TacOne-Regular.ttf' })

const NavBar = () => {
    const [show, handleShow] = useState(false);


  const transitionNavBar = () => {
    if (window.scrollY > 150) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    //Everytime a scroll event is triggered, the function transitionNavBar will also
    //be triggered
    window.addEventListener("scroll", transitionNavBar);

    //We also need to remove the event listener in order to clean up. This will be done by the
    //function below

    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);
  return (
    <div className={`${myFont.className} text-xl w-full justify-between pl-5 pr-5 flex ${show ? "bg-transparent backdrop-blur-lg" : "bg-slate-900"} h-14 text-white items-center fixed top-0 shadow z-10 rounded-bl-md rounded-br-md`}>
        <div>
                SimSongs
        </div>
    </div>
  )
}

export default NavBar