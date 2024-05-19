import React from 'react'
import { MdRefresh } from 'react-icons/md';

interface ResetButtonProps {
	reset: () => void;
}
const ResetButton: React.FC<ResetButtonProps> = ({ reset }) => {
	return (
		<button type='button' className='px-3 py-2 outline-none border border-solid border-slate-200 bg-gray-200 rounded-md cursor-pointer text-slate-900 text-base transition-all duration-200 hover:bg-slate-900 hover:text-gray-200 hover:border-gray-200' onClick={reset}>
			<MdRefresh />
		</button>
	)
}

export default ResetButton