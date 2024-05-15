import React from 'react'

interface UserInputProps {
	inputRef: React.RefObject<HTMLInputElement>;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const isKeyboardCodeRestricted = (code: string) => code.startsWith("Arrow");

const UserInput: React.FC<UserInputProps> = ({ 
	inputRef,
	handleChange
}) => {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if(isKeyboardCodeRestricted(e.code)) {
			e.preventDefault();
		}
	};

	return (
		<input type="text" className='' ref={inputRef} onChange={handleChange} onKeyDown={handleKeyDown} />
	);
}

export default UserInput;