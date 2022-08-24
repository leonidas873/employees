import Link from 'next/link'
import styles from './Header.module.css';
import Image from 'next/image'

const Header = () => {
    return <div className={styles.headerWrapper}><div className={styles.header}>
        <div className={styles.nav}>
            <ul>
                <li><Link href="/">home</Link></li>
                <li><Link href="/employees">employees</Link></li>
                <li><Link href="/feedback">feedback</Link></li>
            </ul>
        </div>
        <div className={styles.logo}>
        <Image
      src="/logo.webp"
      alt="logo"
      width={100}
      height={49}
    />
        </div>
    </div>
    </div>
}

export default Header;