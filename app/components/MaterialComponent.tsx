import React from "react";
import MaterialTable from "material-table";
/*  */
import { tableIcons } from "@/utils/icons";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
/*  */

interface Props {
  columns: any[];
  title: string;
  rows: any[];
  selectionBoolean: boolean;
  handleDelete: (any) => void;
}

const TableOrder = ({
  columns,
  title,
  rows,
  selectionBoolean,
  handleDelete,
}: Props) => {
  return (
    <React.Fragment>
      <MaterialTable
        icons={tableIcons}
        title={title}
        data={rows}
        columns={columns}
        options={{
          selection: selectionBoolean,
          exportButton: { csv: true, pdf: true },
          exportAllData: true,
        }}
        actions={[
          {
            tooltip: "ลบข้อมูลที่เลือกทั้งหมด",
            icon: () => <DeleteOutline />,
            onClick: (evt, data) => handleDelete(data),
          },
        ]}
      />
    </React.Fragment>
  );
};

export default TableOrder;
