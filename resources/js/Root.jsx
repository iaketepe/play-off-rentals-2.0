import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import HomeCore from './cores/HomeCore';
import RentCore from './cores/RentCore';
import Footer from './components/Footer';

import "./i18n";

const rootDiv = document.getElementById('react-root');
const page = rootDiv ? rootDiv.dataset.page : 'home';

function Root() {

    const cores = {
        home: <HomeCore/>,
        rent: <RentCore/>,
        //contact: <ContactCore/>
    };

    const Core = cores[page] ?? cores.home;

    return (
        <div className='flex flex-col h-full'>
            <Header/>
            {Core}
            <Footer/>
        </div>
    );
}
//<Footer/>
ReactDOM.createRoot(document.getElementById('react-root')).render(<Root page={page}/>);
