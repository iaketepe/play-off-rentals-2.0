import mainArcade from '../../imgs/HomeArcade.webp';
import { useEffect } from 'react';

function HomeCore() {

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const status = params.get('redirect_status');
        if (status === 'succeeded') {
        console.log('Payment successful!');
        }
        window.history.replaceState({}, document.title, '/');
    }, []);


    return (
        <div className="w-full h-full flex flex-col">
            <section className="h-[clamp(10rem,8vw+6rem,20rem)] flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold">Play-Off Rentals</h1>
                    <h2 className="text-3xl font-light">Your Way to the Arcade</h2>
                </div>
            </section>

            <section className="w-full p-4 flex justify-center items-center">
                <div className="flex flex-col w-full max-w-[80rem] gap-10 lg:flex-row">
                    <img src={mainArcade} className="aspect-[4/3] w-full min-w-0 max-w-[40rem] m-auto rounded-lg lg:m-0" alt="Stream of Arcade Machines"/>
                    <div className="basis-1/2 space-y-5">
                        <h3 className='text-3xl font-semibold'>About Us</h3>
                        
                        <p className='max-h-[20rem] overflow-y-auto lg:max-h-[25rem]'>Welcome to Play Off Rentals, your premier destination for rental arcade games! We specialize in providing a wide variety of classic and modern arcade games for all types of events and gatherings. Whether you're hosting a corporate event, birthday party, wedding, or any other special occasion, we have the perfect arcade games to bring fun and excitement to your guests.
                        <br /> <br /> At Play Off Rentals, we believe in creating memorable experiences through the joy of gaming. Our extensive selection includes everything from timeless classics like Pac-Man and Donkey Kong to the latest and greatest in arcade gaming. Each game is carefully maintained and regularly serviced to ensure the best possible experience for our clients.
                        <br /> <br /> Our team is dedicated to delivering exceptional customer service and ensuring that your event is a resounding success. We offer flexible rental packages tailored to meet your specific needs and budget. From delivery and setup to on-site support, we handle all the details so you can focus on enjoying the festivities.
                        <br /> <br /> Thank you for considering Play Off Rentals for your arcade game rental needs. We look forward to helping you create an unforgettable event!
                        </p>

                    </div>
                </div>
            </section>
        </div>
    )
}



export default HomeCore;