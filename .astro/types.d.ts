declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"articles": {
"astro_remote_apps.md": {
	id: "astro_remote_apps.md";
  slug: "astro_remote_apps";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"automatic1111-automation.md": {
	id: "automatic1111-automation.md";
  slug: "automatic1111-automation";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"browser-storage.md": {
	id: "browser-storage.md";
  slug: "browser-storage";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"chainlink-functions.md": {
	id: "chainlink-functions.md";
  slug: "chainlink-functions";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"click-blocker.md": {
	id: "click-blocker.md";
  slug: "click-blocker";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"code-formatting-linting.md": {
	id: "code-formatting-linting.md";
  slug: "code-formatting-linting";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"i18n.md": {
	id: "i18n.md";
  slug: "i18n";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"javascript-interviews.md": {
	id: "javascript-interviews.md";
  slug: "javascript-interviews";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"merge-repos.md": {
	id: "merge-repos.md";
  slug: "merge-repos";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"module-federation-advanced.md": {
	id: "module-federation-advanced.md";
  slug: "module-federation-advanced";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"npm-yarn-pnpm.md": {
	id: "npm-yarn-pnpm.md";
  slug: "npm-yarn-pnpm";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"theme-rotations.mdx": {
	id: "theme-rotations.mdx";
  slug: "theme-rotations";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"vercel-tips.mdx": {
	id: "vercel-tips.mdx";
  slug: "vercel-tips";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
};
"number-localization": {
"formatting.mdx": {
	id: "formatting.mdx";
  slug: "formatting";
  body: string;
  collection: "number-localization";
  data: InferEntrySchema<"number-localization">
} & { render(): Render[".mdx"] };
"intro.mdx": {
	id: "intro.mdx";
  slug: "intro";
  body: string;
  collection: "number-localization";
  data: InferEntrySchema<"number-localization">
} & { render(): Render[".mdx"] };
"locale-list.mdx": {
	id: "locale-list.mdx";
  slug: "locale-list";
  body: string;
  collection: "number-localization";
  data: InferEntrySchema<"number-localization">
} & { render(): Render[".mdx"] };
"numbering-systems.mdx": {
	id: "numbering-systems.mdx";
  slug: "numbering-systems";
  body: string;
  collection: "number-localization";
  data: InferEntrySchema<"number-localization">
} & { render(): Render[".mdx"] };
"parsing.mdx": {
	id: "parsing.mdx";
  slug: "parsing";
  body: string;
  collection: "number-localization";
  data: InferEntrySchema<"number-localization">
} & { render(): Render[".mdx"] };
};
"snippets": {
"text-in-text-mask.mdx": {
	id: "text-in-text-mask.mdx";
  slug: "text-in-text-mask";
  body: string;
  collection: "snippets";
  data: any
} & { render(): Render[".mdx"] };
};
"stable-diffusion": {
"all-params.mdx": {
	id: "all-params.mdx";
  slug: "all-params";
  body: string;
  collection: "stable-diffusion";
  data: InferEntrySchema<"stable-diffusion">
} & { render(): Render[".mdx"] };
"api.mdx": {
	id: "api.mdx";
  slug: "api";
  body: string;
  collection: "stable-diffusion";
  data: InferEntrySchema<"stable-diffusion">
} & { render(): Render[".mdx"] };
"aws.md": {
	id: "aws.md";
  slug: "aws";
  body: string;
  collection: "stable-diffusion";
  data: InferEntrySchema<"stable-diffusion">
} & { render(): Render[".md"] };
"controlnet-api.mdx": {
	id: "controlnet-api.mdx";
  slug: "controlnet-api";
  body: string;
  collection: "stable-diffusion";
  data: InferEntrySchema<"stable-diffusion">
} & { render(): Render[".mdx"] };
"google-cloud.md": {
	id: "google-cloud.md";
  slug: "google-cloud";
  body: string;
  collection: "stable-diffusion";
  data: InferEntrySchema<"stable-diffusion">
} & { render(): Render[".md"] };
"intro.md": {
	id: "intro.md";
  slug: "intro";
  body: string;
  collection: "stable-diffusion";
  data: InferEntrySchema<"stable-diffusion">
} & { render(): Render[".md"] };
"txt2img.mdx": {
	id: "txt2img.mdx";
  slug: "txt2img";
  body: string;
  collection: "stable-diffusion";
  data: InferEntrySchema<"stable-diffusion">
} & { render(): Render[".mdx"] };
};
"standard-notes": {
"component-relay.md": {
	id: "component-relay.md";
  slug: "component-relay";
  body: string;
  collection: "standard-notes";
  data: InferEntrySchema<"standard-notes">
} & { render(): Render[".md"] };
"creating-extensions.md": {
	id: "creating-extensions.md";
  slug: "creating-extensions";
  body: string;
  collection: "standard-notes";
  data: InferEntrySchema<"standard-notes">
} & { render(): Render[".md"] };
"extensions-list.md": {
	id: "extensions-list.md";
  slug: "extensions-list";
  body: string;
  collection: "standard-notes";
  data: InferEntrySchema<"standard-notes">
} & { render(): Render[".md"] };
"installing-extensions.md": {
	id: "installing-extensions.md";
  slug: "installing-extensions";
  body: string;
  collection: "standard-notes";
  data: InferEntrySchema<"standard-notes">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
