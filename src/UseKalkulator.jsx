import { useSessionStorage } from './useSessionStorage';

export function useKalkulator() {
    const [historia, setHistoria] = useSessionStorage('kalkulator_historia', []);
    const [wynik, setWynik] = useSessionStorage('kalkulator_wynik', null);

    const aktualizujHistorie = (operation, wynikOperacji, a, b) => {
        const nowyWpis = { 
            a: a, 
            b: b, 
            operation: operation, 
            wynik: wynikOperacji 
        };
        
        setHistoria(prevHistoria => [...prevHistoria, nowyWpis]);
        setWynik(wynikOperacji);
    };

    function dodaj(a, b) { if (a !== null && b !== null) aktualizujHistorie('+', a + b, a, b); }
    function odejmij(a, b) { if (a !== null && b !== null) aktualizujHistorie('-', a - b, a, b); }
    function pomnoz(a, b) { if (a !== null && b !== null) aktualizujHistorie('*', a * b, a, b); }
    function podziel(a, b) { if (a !== null && b !== null && b !== 0) aktualizujHistorie('/', a / b, a, b); }

    return {
        wynik,
        setWynik,
        historia,
        setHistoria,
        dodaj,
        odejmij,
        pomnoz,
        podziel
    };
}