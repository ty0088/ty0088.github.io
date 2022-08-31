import React from 'react';
import '../Style/style.css';

const Contact = () => {
    return (
        <div>
            <p>To contact our customer service team:</p>
            <br></br>
            <p>Email us: <a href="mailto:webmaster@example.com">cats-r-us@catsRusStore.cats</a></p>
            <br></br>
            <p>Call us: <a href="tel:012312341234">0123 1234 1234</a></p>
            <p>Our lines are open:</p>
            <p>Mon-Fri: 9am-5pm</p>
            <p>Sat-Sun: Closed</p> 
        </div>
    );
};

export default Contact;