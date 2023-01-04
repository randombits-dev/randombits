import React from "react";
import {importRemote} from "utils/import-remote";

interface Params {
  appName: string;
  params?: { [key: string]: string };
}

const RemoteApp = ({appName, params}: Params) => {
  importRemote(appName).catch((e) => {
    console.error(e);
  });
  const CustomElement = `randombits-${appName}`;
  return <CustomElement {...params}/>;
};

export default RemoteApp;
