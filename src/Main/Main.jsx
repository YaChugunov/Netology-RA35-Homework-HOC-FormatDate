import React, { useState } from 'react';
import moment from 'moment';
// --- --- --- --- --- --- --- --- --- ---
//
// Проверяем число на валидность
//
function isValidNumber(value) {
  return typeof value === 'number';
}
//
// Проверяем дату на валидность
//
function isValidDate(value) {
  let isValid = new Date(value);
  return (
    null !== isValid &&
    !isNaN(isValid) &&
    'undefined' !== typeof isValid.getDate
  );
}
//
//
function DateTime(props) {
  return <p className="date">{props.date}</p>;
}
//
// Обертка для функции DateTime
function DateTimePretty(Component) {
  return function (props, ...args) {
    let now = moment();
    let videoTimestamp = moment(props.date);
    let diffDays = now.diff(videoTimestamp, 'days');
    let diffHours = now.diff(videoTimestamp, 'hours');
    let relatedVideoTimestamp =
      diffDays > 10
        ? 'Очень давно'
        : diffDays > 1
        ? diffDays + ' дн. назад'
        : diffHours > 1
        ? '5 часов назад'
        : '12 минут назад';
    console.log(relatedVideoTimestamp);
    // return Component.apply(this, [props, ...args]);
    return Component.apply(this, [props, ...args]);
  };
}
const WrappedDatetime = DateTimePretty(DateTime);
//
//
function Video(props) {
  return (
    <div className="video">
      <iframe
        src={props.url}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
      <WrappedDatetime date={props.date} />
    </div>
  );
}

function VideoList(props) {
  return props.list.map((item) => <Video url={item.url} date={item.date} />);
}

export default function App() {
  const [list, setList] = useState([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2022-06-23 13:24:00',
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 12:10:00',
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2022-06-23 17:24:00',
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00',
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2022-06-21 11:11:00',
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00',
    },
  ]);

  return (
    <>
      <VideoList list={list} />
    </>
  );
}
