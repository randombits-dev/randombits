import {SYMBOLS} from "./data/locale-symbols";
import UNIQUE_DATA from "./data/unique.json";

const patterns = Object.keys(UNIQUE_DATA.pattern)
  .map((pattern) => {
    return [...pattern.split("|"), UNIQUE_DATA.pattern[pattern]];
  })
  .sort((a, b) => b[3].length - a[3].length);

const getSymbol = (code) => {
  const symbol = SYMBOLS[code];
  if (!symbol) throw "No symbol for " + code;
  return symbol[1];
};

const showExample = (values) => {
  return new Intl.NumberFormat(values[3][0] + "-u-nu-latn").format(1000000.22);
};

function UniquePatterns() {
  return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Grouping Pattern</th>
            <th>Grouping Symbol</th>
            <th>Decimal Symbol</th>
            <th>Used By</th>
          </tr>
        </thead>
        <tbody>
          {patterns.map((values) => {
            return (
              <tr>
                <td style="font-size: 24px">{showExample(values)}</td>
                <td>{values[0]} digit</td>
                <td>{getSymbol(values[1])}</td>
                <td>{getSymbol(values[2])}</td>
                <td>{values[3].length} locales</td>
              </tr>
            );
          })}
        </tbody>
      </table>
  );
}

export default UniquePatterns;
