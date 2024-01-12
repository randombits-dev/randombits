import txt2Img from "./data/txt2img.json";
import controlnet from "./data/controlnet.json";

const getJSONData = (type) => {
  switch (type) {
    case "txt2img":
      return txt2Img;
    case "controlnet":
      return controlnet;
    default:
      return {};
  }
};

function ParamTable({type}) {

  function renderTitle(value) {
    return (
      <>
        {value.title}
        {value.values && <> Possible values:
          <br/>
          <ul class="tight">

          {value.values.map(val => (
                <li>{val}</li>
            ))}
          </ul>

        </>
        }
      </>
    );
  }
  function renderRow(key: string, value: any) {
    return (
      <tr>
        <td>{key}</td>
        <td>{renderTitle(value)}</td>
        <td>{value.type}</td>
        <td>{value.default}</td>
      </tr>
    );
  }

  const jsonData = getJSONData(type);


  return (
      <table class="table-narrow break-word">
        {/*<colgroup>*/}
        {/*  <col style="width: 250px; word-wrap: break-word; text-overflow: wrap;" />*/}
        {/*  <col style="width: 99%" />*/}
        {/*  <col style="width: 240px" />*/}
        {/*  <col style="width: 150px" />*/}
        {/*</colgroup>*/}
        <thead>

          <tr>
            <th>Key</th>
            <th>Description</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>{Object.entries(jsonData).map(([key, value]) => renderRow(key as string, value))}</tbody>
      </table>
  );
}

export default ParamTable;
