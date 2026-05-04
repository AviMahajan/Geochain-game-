
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { gameLevels, aliasMap, allCountries } from './gameLogic';
import { MapComponent } from './components/Map';

export default function App() {
  const [levelIndex, setLevelIndex] = useState(0);
  const currentLevel = gameLevels[levelIndex];

  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameState, setGameState] = useState<'PLAYING' | 'WIN' | 'LOSE'>('PLAYING');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { width, height } = useWindowSize();

  const normalizeName = (name: string) => aliasMap[name.toLowerCase()] || name;

  const themeClasses = isDarkMode 
    ? "bg-gray-900 text-gray-100" 
    : "bg-gray-50 text-gray-900";
  const cardClasses = isDarkMode 
    ? "bg-gray-800 border-gray-700" 
    : "bg-white border-gray-200";
  const inputClasses = isDarkMode 
    ? "bg-gray-900 border-gray-700 text-white" 
    : "bg-gray-50 border-gray-300 text-gray-900";

  const filteredCountries = currentGuess.length > 0 
    ? allCountries.filter(c => c.toLowerCase().includes(currentGuess.toLowerCase()))
    : [];

  const handleGuess = (guessToUse?: string) => {
    if (gameState !== 'PLAYING') return;
    const guess = (guessToUse || currentGuess).trim();
    if (!guess) return;

    const normalizedGuess = normalizeName(guess);

    if (correctGuesses.includes(normalizedGuess) || wrongGuesses.includes(normalizedGuess)) return;

    // Check if guess matches any in the path
    const isCorrect = currentLevel.path.some(p => normalizeName(p).toLowerCase() === normalizedGuess.toLowerCase());

    if (isCorrect) {
      const newCorrect = [...correctGuesses, normalizedGuess];
      setCorrectGuesses(newCorrect);
    } else {
      const newWrong = [...wrongGuesses, normalizedGuess];
      setWrongGuesses(newWrong);
      if (newWrong.length >= 5) {
        setGameState('LOSE');
      }
    }
    setCurrentGuess("");
  };

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const hasWon = currentLevel.path.every(country => 
      correctGuesses.some(guess => guess.toLowerCase() === normalizeName(country).toLowerCase())
    );

    if (hasWon && currentLevel.path.length > 0) {
      setGameState('WIN');
    }
  }, [correctGuesses, currentLevel.path, gameState, levelIndex]);

  const nextLevel = () => {
    setLevelIndex((prev) => (prev + 1) % gameLevels.length);
    setCorrectGuesses([]);
    setWrongGuesses([]);
    setGameState('PLAYING');
  };

  const remainingAttempts = 5 - wrongGuesses.length;

  return (
    <div className={`min-h-screen ${themeClasses} p-4 font-sans transition-colors duration-300`}>
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
        <header className="flex flex-row items-center justify-between w-full pb-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            GeoChain 🌍
          </h1>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button 
                onClick={() => setIsInstructionsOpen(true)}
                className="px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full shadow-md transition-all transform hover:scale-105 whitespace-nowrap"
            >
                How to Play
            </button>
            <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} transition-all`}
            >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 shadow-xl mb-6 text-center">
          <p className="flex items-center justify-center gap-4 text-xl sm:text-2xl md:text-3xl font-extrabold">
             <span className='text-[#d3869b]'>{currentLevel.start}</span> 
             <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
             <span className='text-[#83a598]'>{currentLevel.end}</span>
          </p>
          <p className="text-gray-300 mt-2 font-medium">Wrong guesses allowed: {remainingAttempts}</p>
        </div>

        <MapComponent 
            startCountry={currentLevel.start} 
            endCountry={currentLevel.end}
            correctGuesses={correctGuesses}
            wrongGuesses={wrongGuesses}
            isDarkMode={isDarkMode}
        />

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-grow relative">
            <input
              value={currentGuess}
              onChange={(e) => {
                setCurrentGuess(e.target.value);
                setIsDropdownVisible(true);
              }}
              placeholder="Enter a country name..."
              className="w-full py-4 px-6 text-lg rounded-xl bg-gray-800 border-2 border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-white placeholder-gray-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    setIsDropdownVisible(false);
                    handleGuess();
                }
              }}
            />
            {filteredCountries.length > 0 && isDropdownVisible && (
              <ul className={`absolute z-50 w-full ${cardClasses} border rounded mt-1 max-h-48 overflow-y-auto shadow-xl`}>
                {filteredCountries.map(country => (
                  <li 
                    key={country}
                    onClick={() => {
                        setCurrentGuess(country);
                        setIsDropdownVisible(false);
                    }}
                    className="p-3 hover:bg-gray-600/20 cursor-pointer"
                  >
                    {country}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={() => handleGuess()}
            disabled={remainingAttempts <= 0 || gameState !== 'PLAYING'}
            className="w-full sm:w-auto py-4 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-xl shadow-lg transform hover:-translate-y-1 transition-all disabled:opacity-50"
          >
            Guess
          </button>
        </div>

        <div className="bg-gray-800/50 rounded-2xl p-4">
            <h3 className="font-semibold mb-2 text-gray-300">Correct Countries:</h3>
            <div className="flex flex-wrap gap-2">
                {correctGuesses.map(country => (
                    <span key={country} className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded-full px-4 py-1 text-sm font-semibold shadow-sm">
                        {country}
                    </span>
                ))}
            </div>
            
            <h3 className="font-semibold mt-4 mb-2 text-gray-300">Wrong Guesses:</h3>
            <div className="flex flex-wrap gap-2">
                {wrongGuesses.map(country => (
                    <span key={country} className="bg-red-500/20 text-red-400 border border-red-500/50 rounded-full px-4 py-1 text-sm font-semibold shadow-sm">
                        {country}
                    </span>
                ))}
            </div>
        </div>
        <AnimatePresence>
          {isInstructionsOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setIsInstructionsOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className={`${cardClasses} p-6 rounded-lg max-w-md w-full`}
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-4">How to Play GeoChain</h2>
                <ul className="list-disc list-inside space-y-2 mb-6">
                  <li>Connect the Start country to the End country by guessing the countries in between.</li>
                  <li>You are allowed 5 wrong guesses per level.</li>
                  <li>Only land borders count!</li>
                </ul>
                <button 
                  onClick={() => setIsInstructionsOpen(false)}
                  className="w-full bg-[#83a598] py-2 rounded text-white font-bold"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {(gameState === 'WIN' || gameState === 'LOSE') && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
            {gameState === 'WIN' && <Confetti width={width} height={height} gravity={0.3} initialVelocityY={20} />}
            <div className={`${cardClasses} p-8 rounded-lg text-center shadow-2xl border`}>
              <h2 className={`text-3xl font-bold mb-4 ${gameState === 'WIN' ? 'text-[#b8bb26]' : 'text-red-500'}`}>
                  {gameState === 'WIN' ? 'Level Cleared!' : 'Game Over'}
              </h2>
              {gameState === 'WIN' && (
                  <p className="mb-6">
                    {levelIndex === gameLevels.length - 1 
                      ? 'Congratulations on beating all the levels! Come back tomorrow for new challenges.'
                      : 'Congratulations! You found the path.'}
                  </p>
              )}
              {!(gameState === 'WIN' && levelIndex === gameLevels.length - 1) && (
                <button 
                    onClick={gameState === 'WIN' ? nextLevel : () => {
                      setCorrectGuesses([]);
                      setWrongGuesses([]);
                      setGameState('PLAYING');
                    }}
                    className="bg-[#83a598] px-6 py-2 rounded text-white font-bold"
                >
                    {gameState === 'WIN' ? 'Next Level' : 'Try Again'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
