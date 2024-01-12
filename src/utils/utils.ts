export const isSSR = () => {
  // @ts-ignore
  return import.meta.env.SSR || false;
};

export const removeTrailingSlash = (url: string | URL) => {
  return url.toString().replace(/\/+$/, '').replace(/(\.html)$/, '');
};

export const getPathEnd = (url: string | URL) => {
  return removeTrailingSlash(url).split('/').pop();
};
