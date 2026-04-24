import React from 'react'
import Awards from './Awards';
import Hero from './Hero';
import Stats from './Stats';
import Pricing from './Pricing';
import Education from './Education';

import OpenAccount from '../OpenAccount';

function HomePage({ onOpenAuth }) {
    return(
        <> 
            <Hero onOpenAuth={onOpenAuth} />
            <Awards />
            <Stats />
            <Pricing />
            <Education />
            <OpenAccount onOpenAuth={onOpenAuth} />
        </>
    );
}

export default HomePage;
