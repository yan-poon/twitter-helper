import React from 'react';
import './SummaryContainer.css';

const SummaryContainer = ({ summary }) => {
    return (
        <div className="summary-container">
            <h3>New Insight</h3>
            {summary.newInsight.map((paragraph, index) => (<p key={index}>{paragraph}</p>))}
            <h3>Summary</h3>
            {summary.summary.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </div>
    );
};

export default SummaryContainer;