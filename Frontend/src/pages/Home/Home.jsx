import React from 'react';
import aboutImage from "../../assets/aboutImg.jpg";
import "./styles.css";
const Home = () => {
    return (
        <section id="home" className='aboutSection'>
            <div className='container'>
                <div className='content'>
                    <h2>About Us</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pretium blandit massa, sed vehicula tellus rhoncus non.
                    </p>
                    <button className='loginButton'>Join Up</button>
                </div>
                <div className='imageWrapper'>
                    <img src={aboutImage} alt="About Illustration" className='aboutImage' />
                </div>
            </div>
        </section>
    )
}

export default Home