import React, {useState} from "react";
import './style.scss';

function Trello() {
    const [showMainTrello, setShowMainTrello] = useState<boolean>(true);

    return (
        <div className='container'>
            <button className={'button-trello'} onClick={() => setShowMainTrello(!showMainTrello)}>{showMainTrello ? 'Kliko per Trellon e Ndihmesit' : 'Kliko per Trellon e Keshillit'}</button>
            {showMainTrello ?
                <iframe src={'https://cheery-squirrel-89cc01.netlify.app/account/trello'}/>
                :
                <iframe src={'https://cheery-squirrel-89cc01.netlify.app/account/trello/ndihmesit'}/>
            }
        </div>
    );
}

export default Trello;