import React from 'react'

interface UserInputProps {
	inputRef: React.RefObject<HTMLInputElement>;
	handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const UserInput: React.FC<UserInputProps> = ({ 
	inputRef,
	handleKeyDown
}) => {

	return (
		<input type="text" className='absolute z-[-999] opacity-0' ref={inputRef} onKeyDown={handleKeyDown} />
	);
}

export default UserInput;