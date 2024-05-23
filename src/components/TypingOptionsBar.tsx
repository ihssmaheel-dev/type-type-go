import React from 'react';
import { FaAt, FaHashtag } from 'react-icons/fa'

interface TypingOptionsBarProps {
	isPuncEnabled: Boolean;
	isNumEnabled: Boolean;
	togglePunc: () => void;
	toggleNum: () => void;
}


const TypingOptionsBar: React.FC<TypingOptionsBarProps> = ({ isPuncEnabled, isNumEnabled, togglePunc, toggleNum }) => {

	return (
		<div className='bg-gray-200 rounded-lg px-8 py-2 flex items-center justify-between mr-4'>
			<button className={`flex items-center ${isPuncEnabled ? 'text-slate-900' : ''}`} onClick={togglePunc}>
				<FaAt className="mr-2" /> punctuation
			</button>
			<span className="text-slate-600 mx-6"></span>
			<button className={`flex items-center ${isNumEnabled ? 'text-slate-900' : ''}`} onClick={toggleNum}>
				<FaHashtag className="mr-2" /> numbers
			</button>
		</div>
	)
}

export default TypingOptionsBar