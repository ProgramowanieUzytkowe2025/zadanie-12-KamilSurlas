import './AppCalculator.css';
import { useState, useEffect } from 'react';
import { AppButton } from './AppButton';
import { AppCalculationHistory } from './AppCalculationHistory';
import { useKalkulator } from './UseKalkulator';
import { useSessionStorage } from './useSessionStorage';

export function AppCalculator() {
    const [liczbaA, setLiczbaA] = useSessionStorage('kalkulator_liczbaA', null);
    const [liczbaB, setLiczbaB] = useSessionStorage('kalkulator_liczbaB', null);
    const [porownanie, setPorownanie] = useState('');
    const [ostatniaCzynnosc, setOstatniaCzynnosc] = useState('Brak');
    
    const { 
        wynik, 
        historia, 
        setHistoria, 
        setWynik, 
        dodaj, 
        odejmij, 
        pomnoz, 
        podziel 
    } = useKalkulator();

    function liczbaAOnChange(value) {
        setLiczbaA(parsujLiczbe(value));
        setOstatniaCzynnosc('Zmodyfikowano wartość liczby A');
    }

    function parsujLiczbe(value) {
        const sparsowanaLiczba = parseFloat(value);
        if(isNaN(sparsowanaLiczba)) {
            return null;
        } else {
            return sparsowanaLiczba;
        } 
    }

    function liczbaBOnChange(value) {
        setLiczbaB(parsujLiczbe(value));
        setOstatniaCzynnosc('Zmodyfikowano wartość liczby B');
    }

    useEffect(() => {
        if (liczbaA !== null && liczbaB !== null) {
            if (liczbaA === liczbaB) {
                setPorownanie('Liczba A jest równa liczbie B.');
            } else if (liczbaA > liczbaB) {
                setPorownanie('Liczba A jest większa od liczby B.');
            } else {
                setPorownanie('Liczba B jest większa od liczby A.');
            }
        } else {
            setPorownanie('');
        }
    }, [liczbaA, liczbaB]);

    function onAppCalculationHistoryClick(index) {
        const wpis = historia[index];
        const nowaHistoria = historia.slice(0, index + 1);
        
        setHistoria(nowaHistoria);
        setWynik(wpis.wynik);
        
        setLiczbaA(wpis.a);
        setLiczbaB(wpis.b);

        setOstatniaCzynnosc('Przywrócono historyczny stan');
    }

    const wykonajDzialanie = (akcja) => {
        akcja(liczbaA, liczbaB);
        setOstatniaCzynnosc('Wykonano obliczenia');
    }

    let zablokujPrzyciski = liczbaA == null || liczbaB == null;
    let zablokujDzielenie = zablokujPrzyciski || liczbaB === 0;

    return (
    <div className='app-calculator'>
        <div className='app-calculator-pole'>
            <label>Wynik: </label>
            <span>{wynik}</span>
        </div>

        <hr />

        <div className='app-calculator-pole'>
            <label>Ostatnia czynność: </label>
            <span>{ostatniaCzynnosc}</span>
        </div>

        <div className='app-calculator-pole'>
            <label>Dynamiczne porównanie liczb: </label>
            <span>{porownanie}</span>
        </div>

        <hr />

        <div className='app-calculator-pole'>
            <label htmlFor="liczba1">Liczba 1</label>
            <input id="liczba1" type="number" value={liczbaA} onChange={(e) => liczbaAOnChange(e.target.value)} name="liczba1" />
        </div>
        <div className='app-calculator-pole'>
            <label htmlFor="liczba2">Liczba 2</label>
            <input id="liczba2" type="number" value={liczbaB} onChange={(e) => liczbaBOnChange(e.target.value)} name="liczba2" />
        </div>

        <hr />

       <div className='app-calculator-przyciski'>
            <AppButton 
                disabled={zablokujPrzyciski} 
                title="+" 
                onClick={() => wykonajDzialanie(dodaj)}
            />
            <AppButton 
                disabled={zablokujPrzyciski} 
                title="-" 
                onClick={() => wykonajDzialanie(odejmij)}
            />
            <AppButton 
                disabled={zablokujPrzyciski} 
                title="*" 
                onClick={() => wykonajDzialanie(pomnoz)}
            />
            <AppButton 
                disabled={zablokujDzielenie} 
                title="/" 
                onClick={() => wykonajDzialanie(podziel)}
            />
        </div>

        <hr />
        
        <div className='app-calculator-historia'>
            <AppCalculationHistory historia={historia} onClick={(index) => onAppCalculationHistoryClick(index)}/>
        </div>
    </div>)
}