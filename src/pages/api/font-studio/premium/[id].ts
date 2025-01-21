import type {APIContext} from 'astro';

export const prerender = false;

export async function GET(api: APIContext) {
  if (api.params.id && api.params.id.length > 10) {
    const value = await kv(api).get(api.params.id);
    if (value) {
      return new Response(null, {status: 204});
    }
  }
  return new Response(null, {status: 404});
}

// export async function POST(api: APIContext) {
//   console.log('POST', api.params.id);
//   if (api.params.id && api.params.id.length > 10) {
//     await kv(api).put(api.params.id, new Date().getTime());
//     return new Response(null, {status: 204});
//   }
//   return new Response(null, {status: 404});
// }

const kv = (api: APIContext) => {
  return api.locals.runtime.env.KV;
};
