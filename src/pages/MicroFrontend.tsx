import RemoteApp from "components/RemoteApp";

const MicroFrontend = () => {
  // const apps = {};
  // Object.entries(RANDOMBITS_CONFIG).forEach(([key, value]) => {
  //   apps[key]
  // });

  return (
    <div>
      <RemoteApp appName="markdown" params={{page: 'micro-frontend'}}/>
      <h2>Full list of apps that are pulled in:</h2>
      <table>
        <tr>
          <td>Article Renderer</td>
          <td>Renders markdown</td>
          <td>{RANDOMBITS_CONFIG.RANDOMBITS_REMOTE_MARKDOWN}</td>
        </tr>
      </table>
      {/*{*/}
      {/*  Object.entries(RANDOMBITS_CONFIG).map(([key, value]) => {*/}
      {/*    return <div><span>{key}</span> - <a href={value as string}>{value as string}</a></div>;*/}
      {/*  })*/}
      {/*}*/}
    </div>
  );
}

export default MicroFrontend
