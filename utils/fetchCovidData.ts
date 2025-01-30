import Papa from 'papaparse'

export interface CovidData {
  date: string
  region: string
  confirmed: number
  cured: number
  deaths: number
  active_cases: number
}

const generate2023Data = (state: string): CovidData[] => {
  // Sample 2023 data (you can replace this with real API data)
  const baseData = {
    Maharashtra: {
      confirmed: 450,
      cured: 430,
      deaths: 15,
      active_cases: 5
    },
    Goa: {
      confirmed: 120,
      cured: 115,
      deaths: 3,
      active_cases: 2
    }
  };

  return Array.from({ length: 12 }, (_, i) => ({
    date: `2023-${String(i + 1).padStart(2, '0')}-01`,
    region: state,
    confirmed: baseData[state as keyof typeof baseData].confirmed,
    cured: baseData[state as keyof typeof baseData].cured,
    deaths: baseData[state as keyof typeof baseData].deaths,
    active_cases: baseData[state as keyof typeof baseData].active_cases
  }));
};

const generateFutureData = (state: string, year: string): CovidData[] => {
  return Array.from({ length: 12 }, (_, i) => ({
    date: `${year}-${String(i + 1).padStart(2, '0')}-01`,
    region: state,
    confirmed: 0,
    cured: 0,
    deaths: 0,
    active_cases: 0
  }));
};

export async function fetchCovidData(state: string): Promise<CovidData[]> {
  const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cleaned_covid_data-wP1QTm9nhkc5Ucouhs1kV420qMGFpc.csv');
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      complete: (results) => {
        const historicalData = (results.data as CovidData[])
          .filter(row => row.region === state)
          .map(row => ({
            ...row,
            date: row.date,
            confirmed: parseInt(row.confirmed.toString()),
            cured: parseInt(row.cured.toString()),
            deaths: parseInt(row.deaths.toString()),
            active_cases: parseInt(row.active_cases.toString())
          }))
          .filter(row => {
            const year = new Date(row.date).getFullYear();
            return year >= 2020 && year <= 2022;
          })
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        // Add 2023 data
        const data2023 = generate2023Data(state);
        
        // Add 2024 and 2025 data (zero cases)
        const data2024 = generateFutureData(state, '2024');
        const data2025 = generateFutureData(state, '2025');

        // Combine all data
        const allData = [
          ...historicalData,
          ...data2023,
          ...data2024,
          ...data2025
        ];

        resolve(allData);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}

