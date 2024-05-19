import React from 'react'

interface UserInputFieldProps {
	inputRef: React.RefObject<HTMLInputElement>;
	handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const UserInputField: React.FC<UserInputFieldProps> = ({ 
	inputRef,
	handleKeyDown
}) => {

	return (
		<input type="text" className='absolute z-[-999] opacity-0' ref={inputRef} onKeyDown={handleKeyDown} />
	);
}

export default UserInputField;