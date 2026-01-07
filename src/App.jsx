import './App.css';
import { AppCalculator } from './AppCalculator';
import { AppHeader } from './AppHeader';
import { useContext } from 'react';
import { FontProvider, FontContext } from './FontContext';

function AppContent() {
  const { czcionka } = useContext(FontContext);

  return (
    <div className="app" style={{ fontSize: czcionka }}>
      <div>
        {}
        <AppHeader imie={'Imię'} nazwisko={'Nazwisko'} />
      </div>
      <div>
        <AppCalculator />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <FontProvider>
      <AppContent />
    </FontProvider>
  );
}