import React from 'react'
import { FaRotateRight } from 'react-icons/fa6';

interface RefreshButtonProps {
	reset: () => void;
}
const RefreshButton: React.FC<RefreshButtonProps> = ({ reset }) => {
	return (
		<button type='button' className='px-3 py-2 outline-none border border-solid border-slate-200 bg-gray-200 rounded-md cursor-pointer text-slate-900 text-base transition-all duration-200 hover:bg-slate-900 hover:text-gray-200 hover:border-gray-200' onClick={reset}>
			<FaRotateRight />
		</button>
	)
}

export default RefreshButton