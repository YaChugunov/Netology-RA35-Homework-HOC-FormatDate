import React, { useEffect, useState } from 'react';
import moment from 'moment';

import '../style.css';

import ItemList from '../ItemList/ItemList';
//import ItemClass from '../ItemClass/ItemClass';

export default function Main() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ inputName: '', inputHoursDiff: '' });

  const handleChange = (name, value) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    // console.log('>> ' + value);
  };

  const handleSubmit = () => {
    // Текущая дата
    var date = new Date();
    // Час локальный
    var hoursLocal = date.getHours();
    // Час в GMT 0
    var hoursGMT0 = date.getUTCHours();

    setRecords((prevRecords) => [
      ...prevRecords,
      new ItemClass(form.inputName, hoursGMT0, Number(form.inputHoursDiff)),
    ]);

    setForm({ inputName: '', inputHoursDiff: '' });
  };

  const handleRemove = (id) => {
    setRecords((prevRecords) => prevRecords.filter((obj) => obj.id !== id));
  };

  return (
    <>
      <div className="baseTimeGMT"></div>
      <ItemList isChanged={false} records={records} onRemove={handleRemove} />
    </>
  );
}
