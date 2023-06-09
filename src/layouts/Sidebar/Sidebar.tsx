import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";

function Sidebar() {
  return (
    <section
      id={styles["sidebar"]}
      className="d-flex flex-column flex-shrink-0 p-3 bg-light fixed-top"
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <NavLink
            to="/reader"
            className={({ isActive }) => {
              return `${styles["sidebar-link"]} ${
                isActive ? styles["active"] : ""
              }`;
            }}
          >
            Thẻ Độc giả
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/book"
            className={({ isActive }) => {
              return `${styles["sidebar-link"]} ${
                isActive ? styles["active"] : ""
              }`;
            }}
            aria-current="page"
          >
            Sách
          </NavLink>
        </li>
        <li>
          <button
            className={`btn ${styles["btn-toggle"]} nav-link align-items-center rounded collapsed`}
            data-bs-toggle="collapse"
            data-bs-target="#ticket-collapse"
            aria-expanded="true"
          >
            Phiếu
          </button>
          <div className="collapse show" id="ticket-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <NavLink
                  to="/ticket/book-loan"
                  className={({ isActive }) => {
                    return `${styles["sidebar-link"]} ${
                      isActive ? styles["active"] : ""
                    }`;
                  }}
                >
                  Phiếu mượn sách
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ticket/book-return"
                  className={({ isActive }) => {
                    return `${styles["sidebar-link"]} ${
                      isActive ? styles["active"] : ""
                    }`;
                  }}
                >
                  Phiếu trả sách
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ticket/collect-fines"
                  className={({ isActive }) => {
                    return `${styles["sidebar-link"]} ${
                      isActive ? styles["active"] : ""
                    }`;
                  }}
                >
                  Phiếu thu tiền phạt
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <button
            className={`btn ${styles["btn-toggle"]} nav-link align-items-center rounded collapsed`}
            data-bs-toggle="collapse"
            data-bs-target="#statistic-collapse"
            aria-expanded="true"
          >
            Thống kê
          </button>
          <div className="collapse show" id="statistic-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <NavLink
                  to="/statistic/book-loan-by-genre"
                  className={({ isActive }) => {
                    return `${styles["sidebar-link"]} ${
                      isActive ? styles["active"] : ""
                    }`;
                  }}
                >
                  Thống kê mượn sách
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/statistic/book-return-late"
                  className={({ isActive }) => {
                    return `${styles["sidebar-link"]} ${
                      isActive ? styles["active"] : ""
                    }`;
                  }}
                >
                  Thống kế trả trễ
                </NavLink>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <NavLink
            to="/regulation"
            className={({ isActive }) => {
              return `${styles["sidebar-link"]} ${
                isActive ? styles["active"] : ""
              }`;
            }}
          >
            Quy định
          </NavLink>
        </li>
      </ul>
      <hr />
    </section>
  );
}

export default Sidebar;
