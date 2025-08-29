import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import HomeCore from './cores/HomeCore';
import Footer from './components/Footer';

function Root() {
    return (
        <div className='flex flex-col h-full'>
            <Header/>
            <HomeCore/>
            <Footer/>
        </div>
    );
}
//<Footer/>
ReactDOM.createRoot(document.getElementById('react-root')).render(<Root />);
