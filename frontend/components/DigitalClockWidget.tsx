'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeZoneClock {
  name: string;
  timezone: string;
  time: string;
  date: string;
  offset: string;
}

export default function DigitalClockWidget() {
  const [clocks, setClocks] = useState<TimeZoneClock[]>([]);
  const [is24Hour, setIs24Hour] = useState(true);

  const timeZones = [
    { name: 'Jakarta (WIB)', timezone: 'Asia/Jakarta' },
    { name: 'Bangkok (ICT)', timezone: 'Asia/Bangkok' },
    { name: 'Singapore (SGT)', timezone: 'Asia/Singapore' },
    { name: 'Manila (PHT)', timezone: 'Asia/Manila' },
    { name: 'Tokyo (JST)', timezone: 'Asia/Tokyo' },
    { name: 'Hong Kong (HKT)', timezone: 'Asia/Hong_Kong' },
    { name: 'New York (EST)', timezone: 'America/New_York' },
    { name: 'London (GMT)', timezone: 'Europe/London' },
    { name: 'Dubai (GST)', timezone: 'Asia/Dubai' },
    { name: 'Sydney (AEDT)', timezone: 'Australia/Sydney' },
    { name: 'Los Angeles (PST)', timezone: 'America/Los_Angeles' },
    { name: 'São Paulo (BRT)', timezone: 'America/Sao_Paulo' },
  ];

  useEffect(() => {
    const updateClocks = () => {
      const updatedClocks = timeZones.map((tz) => {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.timezone,
          hour: is24Hour ? '2-digit' : '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: !is24Hour,
        });

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.timezone,
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          weekday: 'short',
        });

        const now = new Date();
        const timeString = formatter.format(now);
        const dateString = dateFormatter.format(now);

        // Calculate offset
        const utcTime = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
        const tzTime = new Date(now.toLocaleString('en-US', { timeZone: tz.timezone }));
        const offset = (tzTime.getTime() - utcTime.getTime()) / (1000 * 60 * 60);
        const offsetStr = `UTC${offset >= 0 ? '+' : ''}${offset.toFixed(1)}`;

        return {
          name: tz.name,
          timezone: tz.timezone,
          time: timeString,
          date: dateString,
          offset: offsetStr,
        };
      });

      setClocks(updatedClocks);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);

    return () => clearInterval(interval);
  }, [is24Hour]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Global Time Zones
              </h1>
              <p className="text-gray-600">
                Sumber Sandang Store - Real-time Clock Monitor
              </p>
            </div>
          </div>

          {/* Toggle Format */}
          <button
            onClick={() => setIs24Hour(!is24Hour)}
            className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition font-semibold"
          >
            {is24Hour ? '24 Hour' : '12 Hour'} Format
          </button>
        </div>

        {/* Current Time */}
        <div className="mb-12 p-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl shadow-lg text-white">
          <p className="text-sm opacity-90 mb-2">Your Local Time</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold font-mono">
              {new Date().toLocaleTimeString('en-US', {
                hour: is24Hour ? '2-digit' : '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: !is24Hour,
              })}
            </span>
            <span className="text-lg opacity-90">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Clocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clocks.map((clock) => (
            <div
              key={clock.timezone}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-pink-100"
            >
              {/* Header */}
              <div className="mb-4">
                <h3 className="font-bold text-gray-900 text-lg">
                  {clock.name}
                </h3>
                <p className="text-sm text-pink-600 font-semibold">
                  {clock.offset}
                </p>
              </div>

              {/* Time Display */}
              <div className="mb-3 p-4 bg-gray-50 rounded-lg">
                <p className="text-4xl font-mono font-bold text-gray-900 text-center">
                  {clock.time}
                </p>
              </div>

              {/* Date Display */}
              <p className="text-sm text-gray-600 text-center">
                {clock.date}
              </p>

              {/* Timezone Label */}
              <div className="mt-4 pt-3 border-t border-pink-100">
                <p className="text-xs text-gray-500 text-center font-mono">
                  {clock.timezone}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            💡 Tip: Using Global Time Zones
          </h3>
          <p className="text-blue-800 text-sm">
            This digital clock helps Sumber Sandang Store coordinate with customers
            and suppliers across different time zones. Perfect for managing orders,
            shipments, and customer support globally.
          </p>
        </div>
      </div>
    </div>
  );
}
