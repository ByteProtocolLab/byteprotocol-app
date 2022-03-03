import React from 'react';
import style from './index.module.scss';

export default function Order() {
  return (
    <div className={style.wrapper}>
      <table>
        <thead>
          <tr>
            <th>Market</th>
            <th>Rate</th>
            <th>Filled</th>
            <th>Expires</th>
            <th>Created at</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Market</td>
            <td>Rate</td>
            <td>Filled</td>
            <td>Expires</td>
            <td>Created at</td>
            <td>Cancel</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
