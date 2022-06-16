import Link from 'next/link';
import styles from '../../styles/Navbar.module.css'
// import
import { Twitch, User, Search } from '../../public/svgs/svgs';
import { useState } from 'react';

export const Navbar = () => {
    const [userName, setUserName] = useState('')

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <div className={styles.start}>
                    <Link href='/'>
                        <div className={styles.twitch}>
                            <Twitch />
                        </div>
                    </Link>
                    <Link href='/Browse'>
                        <p className={styles.browse}>Browse</p>
                    </Link>
                </div>
                <div className={styles.search}>
                    <input onChange={(e) => setUserName(e.target.value)} className={styles.input} type="text" placeholder='Search' />
                    <a href={`/search/${userName}`}>
                        <button className={styles.button}><Search /></button>
                    </a>
                </div>

                <span className={styles.user}>
                    <User />
                </span>
            </div>
        </div>
    )
}