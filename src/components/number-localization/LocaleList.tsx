import {SYMBOLS} from "./data/locale-symbols";
import LOCALE_LIST from './data/list.json';

function LocaleList() {

    function renderRow(locale: any) {
        return <tr>
            <td>{locale.id}</td>
            <td>{locale.name}</td>
            <td>{locale.grouping} digit</td>
            <td>{SYMBOLS[locale.group][1]}</td>
            <td>{SYMBOLS[locale.decimal][1]}</td>
            <td>{locale.numberingSystem}</td>
        </tr>;
    }

    return <>
        <table>
            <thead>
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Grouping Pattern</th>
                <th>Grouping Symbol</th>
                <th>Decimal Symbol</th>
                <th>Numbering System</th>
            </tr>
            </thead>
            <tbody>
            {LOCALE_LIST.map(locale => renderRow(locale))}
            </tbody>
        </table>
    </>;
}

export default LocaleList;
