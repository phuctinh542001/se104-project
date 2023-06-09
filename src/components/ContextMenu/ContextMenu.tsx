import { ReactNode } from "react";

type ContextMenuProps = {
  children: ReactNode;
};

function ContextMenu({ children }: ContextMenuProps) {
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{padding: "4px 8px"}}
      ></button>
      <ul className="dropdown-menu dropdown-menu-end">{children}</ul>
    </div>
  );
}

export default ContextMenu;
