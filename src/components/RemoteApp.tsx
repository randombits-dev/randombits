import React from "react";
import {importRemote} from "utils/import-remote";

interface Params {
  appName: string;
  params?: { [key: string]: string };
}

const RemoteApp = ({appName, params}: Params) => {
  importRemote(appName).catch(() => {
    alert('could not load: ' + appName);
  });
  const CustomElement = `randombits-${appName}`;
  return <CustomElement {...params}/>;
};

export default RemoteApp;
