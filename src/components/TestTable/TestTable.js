import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TestTable.scss";

export default function TestTable() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableHeaders, setTableHeaders] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/test`)
      .then((response) => {
        const { columnNames, rows } = response.data;
        setTableHeaders(columnNames);
        setTableData(rows);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="test-table">
      <table className="test-table__table">
        <thead className="test-table__header-row">
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index} className="test-table__header--lighter-text">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td className="test-table__row" key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
}
