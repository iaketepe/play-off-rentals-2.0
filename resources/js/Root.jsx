import './bootstrap';
import { React, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import HomeCore from './cores/HomeCore';
import Header from './components/Header';
import Footer from './components/Footer';

import "./i18n";

const RentCore = lazy(() => import('./cores/RentCore'));

const rootDiv = document.getElementById('react-root');
const page = rootDiv ? rootDiv.dataset.page : 'home';

function Root() {

    const cores = {
        home: HomeCore,
        rent: RentCore,
        //contact: <ContactCore/>
    };

    const Core = cores[page] ?? cores.home;

    return (
        <div className='flex flex-col h-full'>
            <Header/>
            <div className="flex-1 text-black">
                <Suspense fallback={<div>Loading...</div>}>
                    <Core/>
                </Suspense>
            </div>
            <Footer/>
        </div>
    );
}
//<Footer/>
ReactDOM.createRoot(document.getElementById('react-root')).render(<Root page={page}/>);
