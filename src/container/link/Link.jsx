import React from 'react'

const Link = () => {
  return (
    <div className="link   appbg p-[var(--spmob)] md:p-[var(--sp)] ">
        <div className='bg-white rounded-lg py-4 px-3 text-start flex flex-col gap-5  '>
            <div>
                <h2 className='mont text-lg md:text-xl font-semibold  ' >Customize your links </h2>
                <p className='merri text-sm md:text-base my-3  ' >Add/edit/remove links below and then share all your profiles with the world!</p>

                <button className=' border-[1px] border-[var(--blue)] rounded-lg text-base md:text-lg mont font-medium mt-4 px-4 py-2 w-full text-[var(--blue)] hover:bg-[var(--blue)] hover:text-white ' >+ Add new link </button>
            </div>
        </div>
    </div>
  )
}

export default Link