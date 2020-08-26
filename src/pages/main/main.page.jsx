import React from 'react';

import './main.style.css'

const MainPage = ({history})=> {
    return(<div className='mainContainer'>
    <h1>MainPage</h1>
    <h2 className='link2' onClick={()=>{history.push('/roulette');}}>Roulette</h2>
    </div>);
};

export default MainPage;