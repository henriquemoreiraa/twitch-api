import styles from '../../styles/Languages.module.css'

type Props = {
    setLanguage: (e: string) => void
}

export const Languages = ({setLanguage}: Props) => {
    return (
        <div className={styles.language}>
        <h3>Filter by language</h3>
        <button onClick={() => setLanguage('')}>All languages</button>
        <button onClick={() => setLanguage('language=en')}>English</button>
        <button onClick={() => setLanguage('language=pt')}> Portuguese</button>
      </div>  
    )
}