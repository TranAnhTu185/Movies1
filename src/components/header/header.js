import React, {useEffect, useRef} from 'react';
import './Header.scss';
import logo from '../../assets/img/logo_net.png';
import {Link, useLocation } from "react-router-dom";

const headerNav = [
    {
        diplay: 'Home',
        path:'/'
    },
    {
        diplay: 'Movies',
        path:'/movie'
    },
    {
        diplay: 'TV series',
        path:'/tv'
    }
];

function Header() {
    const { pathname } = useLocation();
    const headerRef = useRef(null);

    const active = headerNav.findIndex((e => e.path ===pathname));

    useEffect(() => {
        const shrinkHeader = () => {
            if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }

        }
        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        }
    }, [])

    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <ul className="header__nav">
                    {
                        headerNav.map((e,i) => (
                            <li key={i} className={`${i === active ? 'active': ''}`}>
                                <Link to={e.path}>{e.diplay}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Header;