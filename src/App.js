import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { useEffect, useState } from 'react';
import { dataMap } from './helpers';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { fetchChartData } from './API';

registerLocale('ru', ru)
setDefaultLocale('ru')

function App() {
  const [data, setData] = useState(null)
  const [startDate, setStartDate] = useState(new Date(new Date().getTime() - 86400000 * 90));
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    fetchChartData(startDate, endDate)
      .then(response => setData(dataMap(response)))
  }, []) // eslint-disable-line

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      fetchChartData(start, end)
        .then(response => setData(dataMap(response)))
    }
  };

  return (
    <div>
      {/*<div className="date-select-container">*/}
        <div className="date-select">
          <label className="date-select__label">Дата</label>
          <DatePicker
            selected={startDate}
            startDate={startDate}
            onChange={onDateChange}
            dateFormat="dd.MM.yyyy"
            endDate={endDate}
            selectsRange
            maxDate={new Date()}
            showMonthDropdown
          />
        </div>
      {/*</div>*/}
      <Chart
        lineComponent={<>
          <Line type="linear" dataKey="EUR" stroke="#443DDB" />
          <Line type="linear" dataKey="USD" stroke="#39DB7D" />
        </>}
        data={data}
      />
      <Chart lineComponent={<Line type="linear" dataKey="CNY" stroke="#DB281A" />} data={data} />
      <Chart lineComponent={<Line type="linear" dataKey="JPY" stroke="#DBBC28" />} data={data} />
    </div>
  );
}

function Chart({ lineComponent, data }) {
  return (
    <div className="chart-container">
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit={'\xa0р'} domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            {lineComponent}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default App;
