import { FaAt, FaHashtag } from 'react-icons/fa'

const TypingOptionsBar = () => {
	return (
		<>
			<button className="flex items-center">
				<FaAt className="mr-2" /> punctuation
			</button>
			<span className="text-slate-600 mx-6"></span>
			<button className="flex items-center">
				<FaHashtag className="mr-2" /> numbers
			</button>
		</>
	)
}

export default TypingOptionsBar