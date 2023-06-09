import BannerImg from "assets/images/banner2.jpg"
import styles from "./Banner.module.scss"

type BannerProps = {
  title: string
}

function Banner({title}: BannerProps) {
  return (
    <div className="card text-bg-dark">
      <img src={BannerImg} className={`card-img ${styles['banner-img']}`} alt="..." />
      <div className="card-img-overlay d-flex flex-column justify-content-end">
        <h1 className={`card-title ${styles['banner-title']}`}>{title}</h1>
      </div>
    </div>
  );
}

export default Banner;
