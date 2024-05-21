import React from 'react'
import { FaVolumeMute } from 'react-icons/fa';
import { FaVolumeHigh } from 'react-icons/fa6'


interface SoundToggleButtonProps {
	isSoundEnabled: Boolean;
	toggleSound: () => void;
}
const SoundToggleButton: React.FC<SoundToggleButtonProps> = ({ isSoundEnabled, toggleSound }) => {
	return (
		<button type='button' className='px-3 py-2 outline-none border border-solid border-slate-200 bg-gray-200 rounded-md cursor-pointer text-slate-900 text-base transition-all duration-200 hover:bg-slate-900 hover:text-gray-200 hover:border-gray-200 mr-4' onClick={toggleSound}>
			{ isSoundEnabled ? <FaVolumeHigh/> : <FaVolumeMute/>}
		</button>
	)
}

export default SoundToggleButton