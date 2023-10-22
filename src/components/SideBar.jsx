import React from 'react'

const SideBar = () => {
  return (
    <div className='w-full h-full'>
      <ul className='w-full h-full flex flex-col bg-yellow-3 divide-y divide-yellow-2'>
        <a className='w-full h-max' href='/'>
          <li className='w-full h-12 flex justify-center items-center'>H</li>
        </a>
        <a href='/ventas'>
          <li className='w-full h-12 flex justify-center items-center'>V</li>
        </a>
        <a href='/creara'>
          <li className='w-full h-12 flex justify-center items-center'>C</li>
        </a>
        <a href='/modificar'>
          <li className='w-full h-12 flex justify-center items-center'>M</li>
        </a>
      </ul>
    </div>
  )
}

export default SideBar
