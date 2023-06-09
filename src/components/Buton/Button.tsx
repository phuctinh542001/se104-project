import { useState, ReactNode } from "react";

import styles from "./Button.module.scss";

type ButtonProps = {
  children: ReactNode;
  handleClick?: (...props: any) => void;
};

function Button({ children, handleClick }: ButtonProps) {
  const [status, setStatus] = useState("normal");

  return (
    <div
      className={`${styles["button"]} ${styles[status]}`}
      onClick={() => {
        if (handleClick) {
          handleClick();
        } else return;
      }}
      onMouseEnter={() => setStatus("hover")}
      onMouseLeave={() => setStatus("normal")}
    >
      {children}
    </div>
  );
}

export default Button;
