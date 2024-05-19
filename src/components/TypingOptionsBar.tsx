import { FaAt, FaHashtag } from 'react-icons/fa'

const TypingOptionsBar = () => {
	return (
		<div className='bg-gray-200 rounded-lg px-8 py-2 flex items-center justify-between mr-4'>
			<button className="flex items-center">
				<FaAt className="mr-2" /> punctuation
			</button>
			<span className="text-slate-600 mx-6"></span>
			<button className="flex items-center">
				<FaHashtag className="mr-2" /> numbers
			</button>
		</div>
	)
}

export default TypingOptionsBar