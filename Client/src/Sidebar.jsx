import {useState} from "react";
import { GiArtificialIntelligence } from "react-icons/gi";
import { PiFilePdfLight } from "react-icons/pi";
import { VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaNewspaper } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa";
function Sidebar() {
  const chats = [ 
            "DSA Notes",
            "DBMS", 
            "Operating Systems", 
            "Computer Networks" ];
  const [isOpen, setIsOpen] = useState(true);
  const [subMenu, setSubMenu] = useState(true);
  return (
    <div className={`bg-gray-950 text-white ${isOpen ? 'w-52' : 'w-20'} duration-300 ease-in-out h-screen relative`}>
      <h1 className={`font-bold flex justify-center duration-300`}>
        <PiFilePdfLight className={`text-red-400 ${isOpen ? 'text-xl left-21 top-11.25' : 'text-sm left-4.75 top-10.25'} duration-300 absolute`} />
        <GiArtificialIntelligence className={`${isOpen&&'rotate-360'} ${isOpen ? 'text-3xl mt-5' : 'text-xl top-6 -left-2'} duration-600 text-green-500 relative`} />
        
        </h1>
      <VscLayoutSidebarLeftOff className={`text-white absolute
      ${ isOpen ? 'right-2 top-2 text-xl' : 'right-2 top-2'} cursor-w-resize`} onClick={() => setIsOpen(!isOpen)} />
      
      <button className={`flex mt-10 cursor-pointer hover:bg-gray-800 w-full
        ${isOpen ? "p-2 mx-0 rounded-full":"p-1 rounded-full"}`}>
         <HiOutlinePencilSquare className={`mt-[3.5px] ${isOpen ? 'mr-0.5 text-lg':"mx-5"}`}/> 
         <h1 className={`text-sm font-medium mt-0.5 ${!isOpen && 'hidden'}`}>New Chat</h1>
      </button>

      <hr className={`m-2 ${!isOpen && "hidden"} bg-white`} />

      <h1 className={`${!isOpen &&"hidden"} flex mx-2`}>
        <FaNewspaper className="mr-1 mt-1" />
        <span className="">Recents</span>
        <FaAngleDown className={`ml-auto ${subMenu ? 'rotate-180' : ''} transition-transform duration-500 cursor-pointer`} onClick={() => setSubMenu(!subMenu)} />
      </h1>
      {subMenu && (
      <ul className="">
        {chats.map((chat, index) => {
          return (
            <li key={index} className={`flex items-center p-2 bg-gray-700 hover:bg-gray-800 cursor-pointer rounded-full mx-7
             m-2 ${!isOpen && "hidden"}`}>
              <span className=" text-sm">{chat}</span>
            </li>
          );
        })}
      </ul>
      )}
    </div>
    
  );
}

export default Sidebar;