import { Link, NavLink } from "react-router-dom";
import Logo from "assets/logo-brand.png";
import IconUser from "assets/images/icon-user.jpg"

import styles from "./Header.module.scss";

function Header() {
  return (
    <header id={styles['header']} className="fixed-top">
      <nav id={styles['navbar']} className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="Digital Library Logo" width="160" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0  mx-auto my-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link mx-lg-3"
                  to="/"
                  aria-current="page"
                >
                  TRANG CHỦ
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-lg-3" to="/about">
                  GIỚI THIỆU
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link mx-lg-3" to="/team">
                  TEAM
                </NavLink>
              </li>
            </ul>
            <div className={styles["navbar-account"]}>
              <div className="account-icon">
                <img src={IconUser} alt="" width="40" height="40" />
              </div>
              <div className="account-name">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Thủ thư 1
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item" type="button">
                        Hồ sơ
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" type="button">
                        Cài đặt
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" type="button">
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
