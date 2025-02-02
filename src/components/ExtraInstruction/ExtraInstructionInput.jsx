import React from 'react';

const ExtraInstructionInput = ({label ,value, onChange, placeholder }) => {
    return (
        <div className="input-group">
            <label>{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="assistant-type-input"
            />
        </div>
    );
};

export default ExtraInstructionInput;