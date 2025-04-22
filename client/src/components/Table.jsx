import React from 'react';

const Table = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Metric</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Visits</td>
          <td>1000</td>
        </tr>
        <tr>
          <td>Sales</td>
          <td>500</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
