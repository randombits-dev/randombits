declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
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
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
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
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"articles": {
"android/fdroid.md": {
	id: "android/fdroid.md";
  slug: "android/fdroid";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"android/signing-with-cmd.md": {
	id: "android/signing-with-cmd.md";
  slug: "android/signing-with-cmd";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"android/signing-with-gradle.md": {
	id: "android/signing-with-gradle.md";
  slug: "android/signing-with-gradle";
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
"canva-text-frames.md": {
	id: "canva-text-frames.md";
  slug: "canva-text-frames";
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
"cloudflare-workers-cache.md": {
	id: "cloudflare-workers-cache.md";
  slug: "cloudflare-workers-cache";
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
"fill-text-with-image.mdx": {
	id: "fill-text-with-image.mdx";
  slug: "fill-text-with-image";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".mdx"] };
"google-font-picker.md": {
	id: "google-font-picker.md";
  slug: "google-font-picker";
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
"tips/cloudflare-pages-caching.md": {
	id: "tips/cloudflare-pages-caching.md";
  slug: "tips/cloudflare-pages-caching";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
"tips/forcing-footer-to-bottom.md": {
	id: "tips/forcing-footer-to-bottom.md";
  slug: "tips/forcing-footer-to-bottom";
  body: string;
  collection: "articles";
  data: InferEntrySchema<"articles">
} & { render(): Render[".md"] };
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

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
