import { Link } from "react-router-dom";
import "../styles/components/HeroBanner.css";
import heroImg from "../assets/model.png";

export default function HeroBanner() {
    return (
        <div className="hero-banner">
            <div className="hero-content">
                <h1>Summer Collection <span>2026</span></h1>
                <p>
                    Discover the latest trends in fashion. Upgrade your wardrobe with our
                    premium selection of summer essentials. Limited time offer!
                </p>
                <Link to="/products" className="hero-btn">
                    Shop Now
                </Link>
            </div>

            <div className="hero-image">
                {/* Using a placeholder image or a nice illustration */}
                 <img src={heroImg} alt="Shopping Illustration" className="hero-img"/>
            </div>

        </div>
    );
}
