import {getCollection} from 'astro:content';

export const getCollectionSortedByOrder = async (name: any) => {
  return (await getCollection(name)).sort((a, b) => a.data.order - b.data.order);
};

export const getNonHiddenSortedByOrder = async (name: any) => {
  return (await getCollectionSortedByOrder(name)).filter(a => !a.data.hide);
};
