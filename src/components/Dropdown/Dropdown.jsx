import React, { useState } from 'react'

const Dropdown = ({setTime,title,options,color,textColor}) => {
    const [toggle,setToggle] = useState(false);
    if(!color){
      color = '#f54242'
    }
    if(!textColor){
      textColor = '#FFFFFF'
    }
    
  return (
    <div className='relative'>
        <button id="dropdownDefaultButton" onClick={()=>setToggle(!toggle)} data-dropdown-toggle="dropdown" 
        class={`  focus:outline-none  font-medium rounded-lg 
        text-sm px-5 py-2.5 text-center inline-flex items-center  `} style={{backgroundColor: color, color: textColor}}
        type="button">{title} <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

{/* <!-- Dropdown menu --> */}
<div id="dropdown" class={`z-10 ${!toggle && 'hidden'} bg-white divide-y divide-gray-100 rounded-lg absolute shadow w-44 dark:bg-gray-700`}>
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
      {options.map( time =>(
        <li>
        <div onClick={()=>{setTime(time);setToggle(!toggle)}} class="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{time}</div>
      </li>
      ))}

    </ul>
</div>
    </div>
  )
}

export default Dropdown