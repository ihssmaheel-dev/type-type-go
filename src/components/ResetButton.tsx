import React from 'react'
import { MdRefresh } from 'react-icons/md';

interface ResetButtonProps {
	reset: () => void;
}
const ResetButton: React.FC<ResetButtonProps> = ({ reset }) => {
	return (
		<button type='button' className='px-3 py-2 outline-none border border-solid border-gray-400 bg-slate-900 rounded-md cursor-pointer text-white text-base transition-all duration-500 hover:bg-slate-800' onClick={reset}>
			<MdRefresh />
		</button>
	)
}

export default ResetButton