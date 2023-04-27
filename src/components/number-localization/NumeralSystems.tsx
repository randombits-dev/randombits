import { getNumerals } from "./data/numbering-systems";

function NumeralSystems({ list }) {
  const digits = getNumerals(list);

  return (
    <div class="card-table">
      <table class="table-narrow">
        <thead>
          <tr>
            <th>Key</th>
            <th>Name</th>
            {list < 2 && (
              <>
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
            )}
          </tr>
        </thead>
        <tbody>
          {digits.map((system) => {
            return (
              <tr>
                <td>{system.id}</td>
                <td>{system.name}</td>
                {list < 2 &&
                  system.digits.map((code) => {
                    return <td class="digit">{code}</td>;
                  })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default NumeralSystems;
