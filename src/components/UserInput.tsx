import React from 'react'

interface UserInputProps {
	inputRef: React.RefObject<HTMLInputElement>;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserInput: React.FC<UserInputProps> = ({ 
	inputRef,
	handleChange 
}) => {
	return (
		<input type="text" className='absolute z-[-999] opacity-0' ref={inputRef} onChange={handleChange} />
	);
}

export default UserInput;