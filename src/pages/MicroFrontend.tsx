import RemoteApp from "components/RemoteApp";
import APP_LIST from '../utils/remote-definitions.json';
import styled from "styled-components";

const AppTable = styled.table`
  font-size: 14px;
  border-collapse: collapse;

  td, th {
    border: 1px solid #ccc;
    padding: 3px 10px;
  }
`;

const MicroFrontend = () => {

  return (
    <div>
      <RemoteApp appName="markdown" params={{page: 'micro-frontend'}}/>
      <h2>Full list of apps that are pulled in:</h2>
      <AppTable>
        <tr>
          <th>Name</th>
          <th>Desc</th>
          <th>Repo</th>
          <th>Libraries</th>
          <th>Remote URL</th>
        </tr>

        {
          Object.entries(APP_LIST).map(([key, value]) => {
            const remoteUrl = RANDOMBITS_CONFIG[`RANDOMBITS_REMOTE_${key.toUpperCase()}`]
            return <tr>
              <td>{value.name}</td>
              <td>{value.desc}</td>
              <td><a href={value.repo}>{value.repo}</a></td>
              <td>{value.libraries}</td>
              <td><a href={remoteUrl}>{remoteUrl}</a></td>
            </tr>;
          })
        }
      </AppTable>
    </div>
  );
}

export default MicroFrontend
