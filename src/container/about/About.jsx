import React from 'react'
import { About_img, LogoName } from '../../asset'

const About = () => {
  return (
    <div id='about' className="about  text-center p-[var(--spmob)] md:p-[var(--sp)]  py-8  ">
        <header>
            <h1 className='mont text-xl md:tex-2xl font-bold text-white relative  '>About</h1>
            <div className='flex mb-4'>
                <div className='bg-[var(--coral)] h-[6px] w-[10%] lg:w-[3%]   rounded-2xl absolute left-[42%] lg:left-[48%]   '  />
                <div className='bg-[var(--coral)] h-[6px] w-[5%] rounded-2xl absolute left-[53%] lg:w-[1%] lg:left-[51.3%]   ' />
            </div>
        </header>

<div className='flex flex-col-reverse gap-3'>
        <div className="left">
              <img src={About_img} alt="" />
        </div>

        <div className="right">
            <h4 className='about__text merri text-base text-white   ' >
            <img src={LogoName} alt="" className='max-w-11 mx-1 ' />is a platform that allows user to easily share URLs, files, or content across various devices or with other users. The app typically provides features that make the sharing process seamless and efficient, whether for personal use or in a collaborative setting.
            </h4>
        </div>

</div>
    </div>
  )
}

export default About