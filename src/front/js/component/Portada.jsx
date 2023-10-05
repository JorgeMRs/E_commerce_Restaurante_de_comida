import React from 'react';
import Portada from "../../img/Portada.png";
import "../../styles/Portada.css"
import MediaQuery from 'react-responsive'

export const Portada_portada = () => {
    // const { actions } = useContext(Context);

    // const isDesktopOrLaptop = useMediaQuery({
    //     query: '(min-width: 1224px)'
    // })


    // const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    return (
        <div className='Portada_Por'>
            <h1>Device Test!</h1>
            <MediaQuery minWidth={1028}>
                <p>You are a desktop or laptop</p>
            </MediaQuery>
            <MediaQuery maxWidth={900}>
                <p>You also have a huge screen</p>
            </MediaQuery>

        </div>
    );
};

export default Portada_portada;