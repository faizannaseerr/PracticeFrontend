import React from 'react'

const index = ({ index, title, setModal }: { index: number, title: string, setModal: (modal: { active: boolean, index: number }) => void }) => {
    return (
        <div className='flex items-center justify-between border-t border-gray-200 py-12 px-8 hover:opacity-50 group mx-8
            transition-all duration-200 cursor-pointer' onMouseEnter={() => setModal({ active: true, index })}
            onMouseLeave={() => setModal({ active: false, index })}>
            <h2 className='text-5xl group-hover:-translate-x-2 transition-all duration-300'>{title}</h2>
            <p className='text-sm group-hover:translate-x-2 transition-all duration-300'>Design & Development</p>
        </div>

    )
}

export default index