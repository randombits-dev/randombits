import {getCollection} from 'astro:content';

export const getCollectionSortedByOrder = async (name: any) => {
  return (await getCollection(name)).filter(a => !a.data.hide).sort((a, b) => a.data.order - b.data.order);
};
