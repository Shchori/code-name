import React from 'react';
import './App.css';
import {GameCard} from "./features/card/GameCard";
import {CardsGrid} from "./features/card/GameGrid";

function App() {
    return (
        <div className="App">
            <CardsGrid />
        </div>
    );
}

export default App;
