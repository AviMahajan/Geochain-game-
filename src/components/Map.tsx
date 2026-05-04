
import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

interface MapMapProps {
  startCountry: string;
  endCountry: string;
  correctGuesses: string[];
  wrongGuesses: string[];
  isDarkMode: boolean;
}

export function MapComponent({ startCountry, endCountry, correctGuesses, wrongGuesses, isDarkMode }: MapMapProps) {
  const mapBg = isDarkMode ? "#111827" : "#F9FAFB";
  const defaultFill = isDarkMode ? "#374151" : "#D1D5DB";
  const stroke = isDarkMode ? "#4B5563" : "#9CA3AF";

  return (
    <div className="w-full h-[35vh] sm:h-[45vh] md:h-[55vh] rounded-2xl overflow-hidden border border-white/10 shadow-inner transition-colors duration-300" style={{ backgroundColor: mapBg, borderColor: stroke }}>
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 150 }}>
        <ZoomableGroup center={[0, 0]} zoom={1}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.name;
              let fill = defaultFill;
              
              if (name === startCountry) fill = "#d3869b"; // Start - Pink
              else if (name === endCountry) fill = "#83a598"; // End - Blue
              else if (correctGuesses.includes(name)) fill = "#b8bb26"; // Correct - Green

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke={stroke}
                  style={{
                    default: { fill, outline: 'none' },
                    hover: { fill: "#a89984", outline: 'none' },
                    pressed: { fill: "#a89984", outline: 'none' }
                  }}
                />
              );
            })
          }
        </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
