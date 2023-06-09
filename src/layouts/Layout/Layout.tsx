import { ReactNode } from "react";
import Header from "../Header/Header";
import Sidebar from "layouts/Sidebar/Sidebar";

import styles from "./Layout.module.scss"

type LayoutProps = {
  children: ReactNode
};

function Layout({children}:  LayoutProps) {
  return (
    <div>
      <Header />
      <Sidebar />
      <main id={styles['content']}>{children}</main>
      
    </div>
  );
}

export default Layout;
