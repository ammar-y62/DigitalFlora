import '../App.css';
import React from "react";
import 'firebase/firestore';

class NewsAndAbout extends React.Component {
    render() {
        return(
            <div style = {{textAlign: "center"}}>
                <h1>
                    Welcome to Digital Flora!
                </h1>
                <p>
                    A safe place to grow plants and interact with others
                </p>
                <h3>
                    HOW TO PLAY
                </h3>
                <p>
                    1. Using gold, buy a seedling (you will start with one).<br/>
                    2. You can purchase and take care of up to three plants.<br/>
                    3. You can water your plants every 2 hours, and you will earn gold. <br/>
                    4. If a plant isn't watered in more than 72 hours it will die. <br/>
                    5. Use the Discussion Board to talk with other users and make posts.<br/>
                </p>
            </div>
        )
    }
}

export default NewsAndAbout;