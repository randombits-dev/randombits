declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"articles": {
"astro_remote_apps.md": {
  id: "astro_remote_apps.md",
  slug: "astro_remote_apps",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"browser-storage.md": {
  id: "browser-storage.md",
  slug: "browser-storage",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"click-blocker.md": {
  id: "click-blocker.md",
  slug: "click-blocker",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"i18n.md": {
  id: "i18n.md",
  slug: "i18n",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"merge-repos.md": {
  id: "merge-repos.md",
  slug: "merge-repos",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"module-federation-advanced.md": {
  id: "module-federation-advanced.md",
  slug: "module-federation-advanced",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"number-localization/formatting.mdx": {
  id: "number-localization/formatting.mdx",
  slug: "number-localization/formatting",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"number-localization/intro.mdx": {
  id: "number-localization/intro.mdx",
  slug: "number-localization/intro",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"number-localization/locale-list.mdx": {
  id: "number-localization/locale-list.mdx",
  slug: "number-localization/locale-list",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"number-localization/numbering-systems.mdx": {
  id: "number-localization/numbering-systems.mdx",
  slug: "number-localization/numbering-systems",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"number-localization/parsing.mdx": {
  id: "number-localization/parsing.mdx",
  slug: "number-localization/parsing",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"react-blog.mdx": {
  id: "react-blog.mdx",
  slug: "react-blog",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"theme-rotations.mdx": {
  id: "theme-rotations.mdx",
  slug: "theme-rotations",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"vercel-tips.mdx": {
  id: "vercel-tips.mdx",
  slug: "vercel-tips",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
"yarn-2.md": {
  id: "yarn-2.md",
  slug: "yarn-2",
  body: string,
  collection: "articles",
  data: InferEntrySchema<"articles">
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
