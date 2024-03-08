import React from 'react'

const Specs = ({specs,setSpecs,price,setPrice,index}) => {
    const indexation = `${index+1} of ${specs.length}`
     const changeSpecs= (e)=>{
        const newColor = [...specs];
        newColor[index] = e.target.value;
        setSpecs(newColor);
    }
     const changePrice= (e)=>{
        const newColor = [...price];
        newColor[index] = e.target.value;
        setPrice(newColor);
    }

  return (
    <div className='p-5'>
        <label className="">Specs</label>
            <input type="text" required className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 text-white border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
                value={specs[index]}
                onChange={(e)=>{changeSpecs(e)}}
            />
            <label className="">Price</label>
            <input type="number" min='1'  className=" appearance-none mb-5 relative block md:w-full px-3 py-2 border-b-2 text-white border-gray-400 bg-inherit focus:outline-none max-w-[250px] focus:z-10 sm:text-sm"
                value={price[index]}
                onChange={(e)=>{changePrice(e)}}
            />
            <div className=' mt-10 flex justify-between text-slate-500'>
                <div></div>
                <div>{indexation}</div>
            </div>
    </div>
  )
}

export default Specs