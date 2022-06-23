import React, { useState } from 'react';
import moment from 'moment';

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
//
const Counter = (props) => {
  console.log(props);
  const { value, decOne, addOne } = props;
  return (
    <div>
      <button onClick={decOne}>-</button>
      <span>{value}</span>
      <button onClick={addOne}>+</button>
    </div>
  );
};
function withLogger(Component) {
  return class extends React.Component {
    render() {
      console.log(this.props);
      return <Component {...this.props} />;
    }
  };
}

const LoggedComponent = withLogger(Counter);
//
//
//
function DateTime(props) {
  return <p className="date">{props.date}</p>;
}

function DateTimePretty(isValid, Datetime) {
  return function (...args) {
    if (!args.every(isValid)) {
      throw new Error('Передан некорректный аргумент');
    }
    return Datetime.apply(this, args);
  };
}

function Video(props) {
  return (
    <div className="video">
      <iframe
        src={props.url}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
      <DateTime date={props.date} />
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
      date: '2017-07-31 13:24:00',
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 12:10:00',
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-02-03 23:16:00',
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00',
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-01 16:17:00',
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00',
    },
  ]);

  return (
    <>
      <VideoList list={list} />
      <LoggedComponent
        value={this.state.value}
        addOne={() => this.setState(({ value }) => ({ value: value + 1 }))}
        decOne={() => this.setState(({ value }) => ({ value: value - 1 }))}
      />
    </>
  );
}
