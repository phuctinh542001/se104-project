import styles from "./TitleSection.module.scss"

type TitleSectionProps = {
    title: string
}

function TitleSection({title}: TitleSectionProps) {
    return ( 
        <h2 className={styles['title']}>{title}</h2>
     );
}

export default TitleSection;