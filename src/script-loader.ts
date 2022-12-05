export const loadScript = (id: string, url: string) => {
  const script = document.createElement('script');
  script.id = id;
  script.crossOrigin = '';
  script.src = url;
  document.head.appendChild(script);
};
