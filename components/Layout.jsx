import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'STAR WARS'
export const siteTitle = 'Star wars'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="starwares"
          content="StarWars"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <Image
          priority
          src="/images/logo.png"
          className={utilStyles.borderCircle}
          height={144}
          width={144}
          alt={name}
        />
        <nav>
          <Link href="/">
            <a className={utilStyles.headingNav}>Inicio | </a>
          </Link>
          <Link href="/films">
            <a className={utilStyles.headingNav}>Peliculas | </a>
          </Link>
          <Link href="/characters">
            <a className={utilStyles.headingNav}>Personajes | </a>
          </Link>
          <Link href="/test1">
            <a className={utilStyles.headingNav}>Prueba logica 1 | </a>
          </Link>
          <Link href="/test2">
            <a className={utilStyles.headingNav}>Prueba logica 2 | </a>
          </Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>
            Prueba de Jonathan Andres Coronado Cespedes
            <span className={styles.logo}>
              <Image src="/images/ico.png" alt="Logo star wars" width={20} height={20} />
            </span>
        </footer>
    </div>
  )
}