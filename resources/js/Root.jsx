import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Footer from './components/Footer';

function Root() {
    return (
        <div>
            <Header/>
            
        </div>
    );
}
//<Footer/>
ReactDOM.createRoot(document.getElementById('react-root')).render(<Root />);
