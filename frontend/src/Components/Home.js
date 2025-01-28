import "./Home.css";
import home from "./Home.jpg";
import towing from "./towing.jpeg";
import fuel from "./fueldelivery.jpg";
import flat_tire from "./flat_tire.jpeg";
import battery from "./battery.jpeg";
import lockout from "./lockout.png";
import diagnostics from "./diagnostics.avif";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const scrollToServices = () => {
        const servicesSection = document.getElementById("services");
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="home">
            <nav className="navbar">
                <div className="logo">
                    <h1>Breakdown Assist</h1>
                </div>
                <div className="nav-links">
                    <span>Home</span>
                    <span onClick={scrollToServices}>About</span>
                    <span onClick={scrollToContact}>Contact Us</span>
                    <span className="nav-link" onClick={() => navigate('/login')}>Sign In</span>
                    <span className="nav-link" onClick={() => navigate('/register')}>sign Up</span>
                </div>
            </nav>
            <div className="content-section">
                <img
                    src={home}
                    alt="Breakdown Assistance"
                    className="left-image"
                />
                <div className="text-content">
                    <h1>Reliable On Road Vehicle Breakdown Assistance</h1>
                    <p>We provide assistance when your vehicle breaks down, offering fast and reliable services near your location.</p>
                </div>
            </div>

            <div className="services-section" id="services">
                <h2>Our Services</h2>
                <div className="services-container">
                    <div className="service">
                        <img src={towing} alt="Towing Service" className="service-icon" />
                        <h3>Towing Services</h3>
                        <p>We offer towing services to bring your vehicle to the nearest service station.</p>
                    </div>
                    <div className="service">
                        <img src={fuel} alt="Fuel Delivery" className="service-icon" />
                        <h3>Fuel Delivery</h3>
                        <p>If you run out of fuel, we provide fast fuel delivery to get you back on the road.</p>
                    </div>
                    <div className="service">
                        <img src={flat_tire} alt="Flat Tire" className="service-icon" />
                        <h3>Flat Tire Assistance</h3>
                        <p>Our experts will help you replace or repair your flat tire quickly and efficiently.</p>
                    </div>
                </div>
                <div className="services-container">
                    <div className="service">
                        <img src={battery} alt="Battery Jump-Start" className="service-icon" />
                        <h3>Battery Jump-Start</h3>
                        <p>If your car battery dies, we provide jump-start services to get your vehicle running again.</p>
                    </div>
                    <div className="service">
                        <img src={lockout} alt="Lockout Assistance" className="service-icon" />
                        <h3>Lockout Assistance</h3>
                        <p>Locked out of your vehicle? We provide lockout assistance to help you get back in quickly.</p>
                    </div>
                    <div className="service">
                        <img src={diagnostics} alt="Vehicle Diagnostics" className="service-icon" />
                        <h3>Vehicle Diagnostics</h3>
                        <p>We offer on-the-spot vehicle diagnostics to identify and fix any underlying issues.</p>
                    </div>
                </div>
            </div>

            {/* Contact Us Section */}
            <div className="contact-section" id="contact">
                <h2>Contact Us</h2>
                <p>If you have any questions or need assistance, feel free to reach out to us. We are here to help!</p>
                <div className="contact-container">
                    <div className="contact-info">
                        <h3>Email Us</h3>
                        <p><a href="mailto:support@breakdownassist.com">support@breakdownassist.com</a></p>
                    </div>
                    <div className="contact-info">
                        <h3>Call Us</h3>
                        <p><a href="tel:+1234567890">+1 234 567 890</a></p>
                    </div>
                    <div className="contact-info">
                        <h3>Visit Us</h3>
                        <p>123 Breakdown Street, City, Country</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;