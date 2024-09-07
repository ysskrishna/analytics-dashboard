import React, { useEffect, useState } from 'react'
import Table from '../../components/Table';
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';
import Card from '../../components/Card';
import { 
  allData, 
  uniqueValues, 
  getSystemWithMaxDurationAlarm, 
  getMaxDurationAlarmTime, 
  getTotalCountOfAlarms, 
  getTotalAlarmDuration,
  getTop10ErrorCodesByFrequency,
  getTop10ErrorCodesByTotalDuration,
  getAlarmTotalDurationByErrorCategory,
  getAlarmFrequencyByErrorCategory
} from './utils';
import Logo from '../../assets/logo.png';


const Dashboard = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [pageData, setPageData] = useState(allData);
  const [filters, setFilters] = useState({
    system: '',
    channel: '',
    error_code: '',
    start_date: '',
    end_date: ''
  });

  useEffect(()=> {
    setSelectedLocation('New York')
  },[]);

  useEffect(() => {
    const updatePageData = !!selectedLocation ? allData.filter(item => item.location === selectedLocation) : allData;
    setPageData(updatePageData);
  }, [selectedLocation]);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredData = pageData.filter(item => {
    const itemDate = new Date(item.created_at);
    const startDate = filters.start_date ? new Date(filters.start_date) : null;
    const endDate = filters.end_date ? new Date(filters.end_date) : null;

    return (
      (!filters.system || item.system === filters.system) &&
      (!filters.channel || item.channel === filters.channel) &&
      (!filters.error_code || item.error_code.toString() === filters.error_code) &&
      (!startDate || itemDate >= startDate) &&
      (!endDate || itemDate <= endDate)
    );
  });

  const top10AlarmsByTotalDuration =  getTop10ErrorCodesByTotalDuration(filteredData);
  const top10AlarmsByFrequency =  getTop10ErrorCodesByFrequency(filteredData);
  const alarmTotalDurationByErrorCategory =  getAlarmTotalDurationByErrorCategory(filteredData);
  const alarmFrequencyByErrorCategory =  getAlarmFrequencyByErrorCategory(filteredData);

  // console.log("pageData", pageData);

  return (
    <div className="container mx-auto self-center w-4/5 max-w-[1500px] max-md:self-center max-md:w-[90%] max-sm:w-[90%]">

      <div className='flex flex-col md:flex-row pt-2 md:items-center'>
        <img src={Logo} alt="MetricFlow" className="h-10 w-[200px]" />
        <div className="my-4 min-w-[200px]">
          <select
            value={selectedLocation}
            onChange={handleLocationChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">All</option>
            {uniqueValues(allData, 'location').map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className='bg-white rounded-lg mb-4 px-3'>
        <div class="divide-y divide-gray-100">
          <details class="group">
            <summary
              class="flex cursor-pointer list-none items-center py-4 text-lg font-medium text-secondary-900 group-open:text-primary-500">
              Filters
              <div className='mx-5'>
                <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0 block group-open:hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                </svg>
                <svg data-accordion-icon class="w-3 h-3 rotate-0 shrink-0 hidden group-open:block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                </svg>
              </div>
            </summary>
            <div className='flex flex-col md:flex-row gap-2'>
              <div className="mb-4 min-w-[200px]">
                <label className="block mb-2 text-sm font-medium text-gray-700">System</label>
                <select
                  name="system"
                  value={filters.system}
                  onChange={handleFilterChange}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">All</option>
                  {uniqueValues(pageData, 'system').map((name, index) => (
                    <option key={index} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4 min-w-[200px]">
                <label className="block mb-2 text-sm font-medium text-gray-700">Error Code</label>
                <select
                  name="error_code"
                  value={filters.error_code}
                  onChange={handleFilterChange}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">All</option>
                  {uniqueValues(pageData, 'error_code').map((error_code, index) => (
                    <option key={index} value={error_code}>{error_code}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4 min-w-[200px]">
                <label className="block mb-2 text-sm font-medium text-gray-700">Channel</label>
                <select
                  name="channel"
                  value={filters.channel}
                  onChange={handleFilterChange}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">All</option>
                  {uniqueValues(pageData, 'channel').map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4 min-w-[200px]">
                <label className="block mb-2 text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={filters.start_date}
                  onChange={handleFilterChange}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4 min-w-[200px]">
                <label className="block mb-2 text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  name="end_date"
                  value={filters.end_date}
                  onChange={handleFilterChange}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </details>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 '>
        <Card
          title={getTotalAlarmDuration(filteredData) || '-'}
          subtitle="Total Alarm Duration"
        />
        <Card
          title={getTotalCountOfAlarms(filteredData) || '-'}
          subtitle="Total Count Of Alarms"
        />
        <Card
          title={getSystemWithMaxDurationAlarm(filteredData) || '-'}
          subtitle="Device With Max Duration Alarm"
        />
        <Card
          title={getMaxDurationAlarmTime(filteredData) || '-'}
          subtitle="Max Duration Alarm Time"
        />
      </div>

      <div className='flex flex-col bg-white rounded-lg my-4 p-4'>
        <div className='flex flex-row flex-wrap'>
          <BarChart
            x={top10AlarmsByTotalDuration.map(entry => entry[0])}
            y={top10AlarmsByTotalDuration.map(entry => entry[1])}
            layout={{
              title: 'Top 10 Error Codes by Duration',
              xaxis: {
                title: 'Error Code'
              },
              yaxis: {
                title: 'Total Duration (seconds)'
              }
            }}
          />
          <BarChart
            x={top10AlarmsByFrequency.map(entry => entry[0])}
            y={top10AlarmsByFrequency.map(entry => entry[1])}
            layout={{
              "title": 'Top 10 Error Codes by Frequency',
              "xaxis": {
                "title": 'Error Code'
              },
              "yaxis": {
                "title": 'Frequency'
              }
            }}
          />
        </div>
        <div className='flex flex-row flex-wrap'>
          <PieChart
            labels={alarmTotalDurationByErrorCategory['labels']}
            values={alarmTotalDurationByErrorCategory['values']}
            layout={{
              "title": 'Total Error Duration by Error Category'
            }}
          />
          <PieChart
            labels={alarmFrequencyByErrorCategory['labels']}
            values={alarmFrequencyByErrorCategory['values']}
            layout={{
              "title": 'Alarm Frequency by Error Category'
            }}
          />
        </div>
      </div>

      <Table data={filteredData} />
    
    </div>
  )
}

export default Dashboard;