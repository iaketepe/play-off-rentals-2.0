import mainArcade from '../../imgs/HomeArcade.webp';

function HomeCore() {
    return (
        <div className="flex flex-col flex-1">
            <section className="border-black border-2 h-[20rem] flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold">Play-Off Rentals</h1>
                    <h2 className="text-3xl font-light">Your Way to the Arcade</h2>
                </div>
            </section>

            <section className="border-black border-2">
                <div className="flex h-full gap-10 p-5 justify-center items-center">
                    <img src={mainArcade} className="basis-1/2 min-w-0 max-w-[40rem] h-auto object-contain" alt="Stream of Arcade Machines"/>
                    <div className="basis-1/2">
                        <h3>About Us</h3>
                        
                        <p>Welcome to Play Off Rentals, your premier destination for rental arcade games! We specialize in providing a wide variety of classic and modern arcade games for all types of events and gatherings. Whether you're hosting a corporate event, birthday party, wedding, or any other special occasion, we have the perfect arcade games to bring fun and excitement to your guests.
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