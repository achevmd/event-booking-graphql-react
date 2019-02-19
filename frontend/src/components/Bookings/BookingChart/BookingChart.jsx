import React from 'react';
import { Bar as Chart } from 'react-chartjs';
import './BookingChart.css';

const BOOKING_BUCKETS = {
  'Cheap': {
    min: 0,
    max: 50
  },
  'Normal': {
    min: 50,
    max: 150
  },
  'Expensive': {
    min: 150,
    max: 999999999
  }
};

const BookingChart = (props) => {
  const chartData = { labels: [], datasets: [] };
  let values = [];
  for (const bucket in BOOKING_BUCKETS) {
    const filteredBookingsCount = props.bookings.reduce((prev, current) => {
      if (
        current.event.price < BOOKING_BUCKETS[bucket].max &&
        current.event.price > BOOKING_BUCKETS[bucket].min
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);
    chartData.labels.push(bucket);
    values.push(filteredBookingsCount);
  }
  chartData.datasets.push({
    fillColor: "rgba(220,220,220,0.7)",
    strokeColor: "rgba(220,220,220,0.8)",
    highlightFill: "rgba(220,220,220,0.75)",
    highlightStroke: "rgba(220,220,220,1)",
    data: values
  });
  return (
    <div style={{ textAlign: 'center' }}>
    <h2>Booked Events</h2>
      <Chart data={chartData} />
    </div>
  )
};

export default BookingChart;