import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";

function Sidebar() {
  return (
    <div>
      <div
        id={styles["sidebar"]}
        className="d-flex flex-column flex-shrink-0 p-3 bg-light fixed-top"
      >
        <ul className="nav nav-pills flex-column mb-auto">
          <li>
            <NavLink to="/reader" className="nav-link link-dark">
              Độc giả
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/book" className="nav-link link-dark" aria-current="page">
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
                  <NavLink to="/ticket/book-loan" className="link-dark nav-link rounded">
                    Phiếu mượn sách
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ticket/book-return" className="link-dark nav-link rounded">
                    Phiếu trả sách
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ticket/collect-fines" className="link-dark nav-link rounded">
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
                  <NavLink to="/statistic/book-loan-by-genre" className="link-dark nav-link rounded">
                    Thống kê mượn sách
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/statistic/book-return-late" className="link-dark nav-link rounded">
                    Thống kế trả trễ
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <NavLink to="/regulation" className="nav-link link-dark">
              Quy định
            </NavLink>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
}

export default Sidebar;
