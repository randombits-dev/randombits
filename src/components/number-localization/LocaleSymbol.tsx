import {getUnicode, SYMBOLS} from "./data/locale-symbols";

interface LocaleSymbolProps {
    code: string;
    // desc: string;
    type: 'decimal' | 'thousand' | 'negative';
}

function LocaleSymbol({code, type}: LocaleSymbolProps) {

    function getSymbol() {
        const num = Number.parseInt(code);
        if (Number.isNaN(num)) return '';
        return String.fromCharCode(Number.parseInt(code));
    }

    function getExample() {
        if (type === 'decimal') {
            return `1${getSymbol()}0`;
        }
        if (type === 'thousand') {
            return `1${getSymbol()}000`;
        }
        if (type === 'negative') {
            return `${getSymbol()}1`;
        }
    }

    const renderSymbol = () => {
        if (code) {
            return <span class="locale-symbol-card__symbol">{getSymbol()}</span>;
        } else {
            return <span class="locale-symbol-card__symbol-blank">&nbsp;</span>;
        }
    };

    return <div class="locale-symbol-card">
        {renderSymbol()}
        <div class="locale-symbol-card__example">{getExample()}</div>
        <div class="locale-symbol-card__desc">{SYMBOLS[code][1]}</div>
        {
            code !== 'none' && <div class="locale-symbol-card__unicode">
                <a target="_blank" href={`https://www.compart.com/en/unicode/${getUnicode(code)}`}>{getUnicode(code)}</a>
            </div>
        }

    </div>;
}

export default LocaleSymbol;
