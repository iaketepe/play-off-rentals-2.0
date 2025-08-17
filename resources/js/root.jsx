import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';

function Root() {
    return <h1>Hello from React!</h1>;
}

ReactDOM.createRoot(document.getElementById('react-root')).render(<Root />);
