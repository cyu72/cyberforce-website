import React, { useState, useEffect } from 'react';
import { Wind, AlertCircle } from 'lucide-react';

const TurbineMonitor = () => {
  const [monitorData, setMonitorData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [turbineDirections, setTurbineDirections] = useState({
    turbine1: '30',
    turbine2: '92',
    turbine3: '140',
    turbine4: '140'
  });

  // Data fetch with default values and new data structure
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/index.json');
        const data = await response.json();
        
        // Merge the new data with default values
        setMonitorData({
          // Default values for existing monitoring
          windSpeed: 15,
          windDirection: 53,
          turbines: [
            { output: 1.15 },
            { output: 1.03 },
            { output: 0.95 },
            { output: 0.93 }
          ],
          transformer: {
            preVoltage: 690.00,
            preCurrent: 5.95,
            postVoltage: 34000.00,
            postCurrent: 0.12
          },
          totalGeneration: 4.10,
          // New data from API
          ...data
        });
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError('Failed to fetch monitoring data: ' + err.message);
        // Set default mock data
        setMonitorData({
          windSpeed: 15,
          windDirection: 53,
          turbines: [
            { output: 1.15 },
            { output: 1.03 },
            { output: 0.95 },
            { output: 0.93 }
          ],
          transformer: {
            preVoltage: 690.00,
            preCurrent: 5.95,
            postVoltage: 34000.00,
            postCurrent: 0.12
          },
          totalGeneration: 4.10,
          substation_state: "Operational",
          research_state: "Complete Blackout",
          data_center_state: "Complete Blackout",
          dc_battery_state: "Empty",
          dc_battery_charge: -5,
          residential_state: "Operational",
          turbine1_state: true,
          turbine2_state: true,
          turbine3_state: true,
          turbine4_state: true,
          time: 1640
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Polling interval
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDirectionChange = (turbineId, value) => {
    setTurbineDirections(prev => ({
      ...prev,
      [turbineId]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-400">Loading monitoring data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Turbine <span className="text-yellow-400">Monitor</span>
          </h1>
          <p className="text-gray-400">Real-time wind farm monitoring dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950 border border-red-500 rounded-lg text-red-500 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Wind Speed Gauge */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-gray-200">Wind Speed</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-24 overflow-hidden">
                <div className="absolute w-full h-full bg-gray-700 rounded-t-full"></div>
                <div 
                  className="absolute bottom-0 left-1/2 h-24 w-1 bg-yellow-400 origin-bottom transform -translate-x-1/2"
                  style={{ 
                    transform: `rotate(${(monitorData?.windSpeed || 0) * 1.8 - 90}deg)`
                  }}
                ></div>
                <div className="absolute bottom-0 left-0 w-full text-center">
                  <span className="text-2xl font-bold">{monitorData?.windSpeed || 0}</span>
                  <span className="text-gray-400 ml-1">m/s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wind Direction */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-gray-200">Wind Direction</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <Wind 
                  className="w-full h-full text-yellow-400"
                  style={{ 
                    transform: `rotate(${monitorData?.windDirection || 0}deg)`
                  }}
                />
                <div className="absolute bottom-0 w-full text-center">
                  <span className="text-xl">
                    North
                  </span>
                  <span className="text-gray-400 ml-1">
                    {monitorData?.windDirection || 0}°
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Turbine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((turbineNum) => (
            <div key={turbineNum} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex flex-col items-center mb-6">
                <h3 className="text-lg font-medium text-gray-200 mb-4">Turbine {turbineNum}</h3>
                <div className="relative w-20 h-20">
                  <img
                    src={require("./imgs/wind_turbine.png")}
                    alt={`Turbine ${turbineNum}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Add status indicator */}
                <div className={`mt-4 px-3 py-1 rounded-full text-sm ${
                  monitorData?.[`turbine${turbineNum}_state`] 
                    ? 'bg-green-400/20 text-green-400' 
                    : 'bg-red-400/20 text-red-400'
                }`}>
                  {monitorData?.[`turbine${turbineNum}_state`] ? 'Operational' : 'Offline'}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Direction</label>
                  <input
                    type="number"
                    value={turbineDirections[`turbine${turbineNum}`]}
                    onChange={(e) => handleDirectionChange(`turbine${turbineNum}`, e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Output</label>
                  <div className="bg-black rounded px-3 py-2 font-mono text-green-400">
                    {monitorData?.turbines?.[turbineNum - 1]?.output?.toFixed(2) || '0.00'} MW
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* System Status Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-200">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Substation</label>
                <div className={`px-3 py-2 rounded ${
                  monitorData?.substation_state === 'Operational' 
                    ? 'bg-green-400/20 text-green-400' 
                    : 'bg-red-400/20 text-red-400'
                }`}>
                  {monitorData?.substation_state || 'Unknown'}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Research Facility</label>
                <div className={`px-3 py-2 rounded ${
                  monitorData?.research_state === 'Operational' 
                    ? 'bg-green-400/20 text-green-400' 
                    : 'bg-red-400/20 text-red-400'
                }`}>
                  {monitorData?.research_state || 'Unknown'}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Data Center</label>
                <div className={`px-3 py-2 rounded ${
                  monitorData?.data_center_state === 'Operational' 
                    ? 'bg-green-400/20 text-green-400' 
                    : 'bg-red-400/20 text-red-400'
                }`}>
                  {monitorData?.data_center_state || 'Unknown'}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Residential Area</label>
                <div className={`px-3 py-2 rounded ${
                  monitorData?.residential_state === 'Operational' 
                    ? 'bg-green-400/20 text-green-400' 
                    : 'bg-red-400/20 text-red-400'
                }`}>
                  {monitorData?.residential_state || 'Unknown'}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">DC Battery Status</label>
                <div className={`px-3 py-2 rounded ${
                  monitorData?.dc_battery_state !== 'Empty' 
                    ? 'bg-green-400/20 text-green-400' 
                    : 'bg-red-400/20 text-red-400'
                }`}>
                  {monitorData?.dc_battery_state || 'Unknown'}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Battery Charge</label>
                <div className={`px-3 py-2 rounded ${
                  (monitorData?.dc_battery_charge || 0) > 0 
                    ? 'bg-green-400/20 text-green-400' 
                    : 'bg-red-400/20 text-red-400'
                }`}>
                  {monitorData?.dc_battery_charge || 0}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transformer Data */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-200">Transformer Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium mb-4">Pre-Transformer</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Voltage</label>
                  <div className="bg-black rounded px-3 py-2 font-mono text-green-400">
                    {monitorData?.transformer?.preVoltage.toFixed(2) || '0.00'} V
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Current</label>
                  <div className="bg-black rounded px-3 py-2 font-mono text-green-400">
                    {monitorData?.transformer?.preCurrent.toFixed(2) || '0.00'} A
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Post-Transformer</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Voltage</label>
                  <div className="bg-black rounded px-3 py-2 font-mono text-green-400">
                    {monitorData?.transformer?.postVoltage.toFixed(2) || '0.00'} V
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Current</label>
                  <div className="bg-black rounded px-3 py-2 font-mono text-green-400">
                    {monitorData?.transformer?.postCurrent.toFixed(2) || '0.00'} A
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Generation */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4 text-gray-200">Total Generation</h3>
          <div className="bg-black rounded px-4 py-3 font-mono text-green-400 text-2xl text-center">
            {monitorData?.totalGeneration.toFixed(2) || '0.00'} MW
          </div>
        </div>
      </div>
      </div>
  );
};

export default TurbineMonitor;