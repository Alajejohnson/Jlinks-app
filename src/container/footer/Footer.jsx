import React from 'react'

const Footer = () => {
  const today = new Date();
  const year =  today.getFullYear();
  return (
    <div className="footer  text-center p-[var(--spmob)] md:p-[var(--sp)] text-white mont text-sm md:text-base py-8  ">
        <h5> Copyright &copy; {year} Johnny_ d. All right reserved </h5>
    </div>
  )
}

export default Footer