export interface Level {
  id: number;
  start: string;
  end: string;
  path: string[];
}

export const gameLevels: Level[] = [
  // 1 Step (North America)
  { id: 1, start: "Mexico", end: "Canada", path: ["United States of America"] },
  // 2 Steps (Western Europe)
  { id: 2, start: "Portugal", end: "Italy", path: ["Spain", "France"] },
  // 3 Steps (Middle East)
  { id: 3, start: "India", end: "Syria", path: ["Pakistan", "Iran", "Iraq"] },
  // 4 Steps (Eastern Europe)
  { id: 4, start: "Portugal", end: "Belarus", path: ["Spain", "France", "Germany", "Poland"] },
  // 4 Steps (Southeast Asia Funnel)
  { id: 5, start: "Papua New Guinea", end: "Bangladesh", path: ["Indonesia", "Malaysia", "Thailand", "Myanmar"] },
  // 5 Steps (Africa)
  { id: 6, start: "Egypt", end: "South Africa", path: ["Sudan", "Ethiopia", "Kenya", "Tanzania", "Mozambique"] },
  // 7 Steps (The Americas)
  { id: 7, start: "Canada", end: "Colombia", path: ["United States of America", "Mexico", "Guatemala", "Honduras", "Nicaragua", "Costa Rica", "Panama"] }
];

export const aliasMap: Record<string, string> = {
  "usa": "United States of America",
  "us": "United States of America",
  "united states": "United States of America",
  "america": "United States of America"
};

export const allCountries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];
