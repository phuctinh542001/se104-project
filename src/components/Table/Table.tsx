import ContextMenu from "components/ContextMenu/ContextMenu";

type TableProps = {
  tableHead: string[];
  tableData: any[][];
  actionHandle: any[];
};

function Table({ tableHead, tableData, actionHandle }: TableProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          {tableHead.map((head, index) => (
            <th
              key={index}
              style={{ backgroundColor: "#3d8dbe", color: "#fff" }}
              scope="col"
            >
              {head}
            </th>
          ))}
          <th
            style={{ backgroundColor: "#3d8dbe", color: "#fff" }}
            scope="col"
          ></th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((rows, key) => {
          return (
            <tr key={key}>
              {rows.map((row, index) => {
                if (index === rows.length - 1)
                  return (
                    <td key={index}>
                      <ContextMenu>
                        {actionHandle.map((action, index) => {
                          if (action.modal)
                            return (
                              <li key={index}>
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target={action.modal}
                                  onClick={() => {
                                    action.handleClick(row);
                                  }}
                                >
                                  {action.title}
                                </button>
                              </li>
                            );
                          else
                            return (
                              <li key={index}>
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  onClick={() => action.handleClick(row)}
                                >
                                  {action.title}
                                </button>
                              </li>
                            );
                        })}
                      </ContextMenu>
                    </td>
                  );
                return <td key={index}>{row}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
