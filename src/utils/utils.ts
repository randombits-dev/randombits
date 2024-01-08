export const isSSR = () => {
  // @ts-ignore
  return import.meta.env.SSR || false;
};

export const removeTrailingSlash = (url: string | URL) => {
  return url.toString().replace(/\/+$/, '').replace(/(\.html)$/, '');
};
