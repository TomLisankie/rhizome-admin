import React, {useState} from 'react';
import './App.css';

function App() {
    let [productName, setProductName] = useState("Rhizome Pub");
    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Rhizome Pub
                </p>
                <a
                    className="App-link"
                    href="https://roaman.pub/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Current: {productName}
                </a>
            </header>
        </div>
    );
}

export default App;
