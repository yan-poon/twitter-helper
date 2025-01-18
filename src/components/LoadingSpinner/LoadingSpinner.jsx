import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingSpinner = ({loading}) => {
    return (
        <div>
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
    );
};

export default LoadingSpinner;