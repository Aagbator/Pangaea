import React from 'react';
import AppContext from '../../AppContext';
import sprite from '../../assets/icomoon/sprite.svg';

const ThemeSwitcher = () => (
    <AppContext.Consumer>
        {context => (
            <>
                {
                    <div className="theme__switcher" onClick={() => context.toggleTheme()}>
                        <span 
                        className="theme__switcher-btn"
                        >
                            <svg className={`icon ${context.currentTheme === 'light' ? 'icon-moon' : 'icon-light-up'}`}>
                                <use href={sprite + `${context.currentTheme ==='light' ? '#icon-moon' : '#icon-light-up'}`}></use>
                            </svg>
                        </span>
                    </div>
                }
            </>
        )}
    </AppContext.Consumer>
);

 export default ThemeSwitcher;


