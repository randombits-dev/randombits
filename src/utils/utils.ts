export const isSSR = () => {
    // @ts-ignore
    return import.meta.env.SSR || false;
}