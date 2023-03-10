import {getNumerals} from "./data/numbering-systems";

// latn 0030 - 0039
// NumeralSystems.tsx:26 arab 0660 - 0669
// NumeralSystems.tsx:26 bengali 09E6 - 09EF
// NumeralSystems.tsx:26 arabext 06F0 - 06F9
// NumeralSystems.tsx:26 devanagari 0966 - 096F

// const NUMERIC_UNICODE = [
//     {
//         name: 'Latin',
//         codes: ['0030', '0031', '0032', '0033', '0034', '0035', '0036', '0037', '0038', '0039']
//     },
//     {
//         name: 'Bengali',
//         codes: ['0660', '0661', '0662', '0663', '0664', '0665', '0666', '0667', '0668', '0669']
//     }
// ]

function NumeralSystems({list}) {

    const digits = getNumerals(list);

    return <table>
        <thead>
        <tr>
            <th>Key</th>
            <th>Name</th>
            {
                list < 2 && <>
                    <th>0</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                </>
            }

        </tr>
        </thead>
        <tbody>
        {
            digits.map(system => {
                return <tr>
                    <td>{system.id}</td>
                    <td>{system.name}</td>
                    {
                        list < 2 && system.digits.map(code => {
                            return <td class="digit">{code}</td>
                        })
                    }
                </tr>
            })
        }
        </tbody>
    </table>
}

export default NumeralSystems;
