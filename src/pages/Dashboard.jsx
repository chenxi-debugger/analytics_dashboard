import React from 'react';
import CircularProgress from '@mui/material/CircularProgress'; // Ensure correct import

function Dashboard() {
    const someValue = 50; // Example value, replace with actual variable

    return (
        <div>
            {/* Ensure `value` is a number */}
            <CircularProgress value={Number(someValue)} />
        </div>
    );
}

// Ensure the component is exported correctly
export default Dashboard;
