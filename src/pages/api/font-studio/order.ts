import type {APIContext} from 'astro';

export const prerender = false;

const FONTSTUDIO_VARIENTS = ['49806d97-023a-41d3-9f64-b31ed70cbb89', '33b018f0-b31a-46a2-bac0-b9e448a92cd5'];

export async function GET(api: APIContext) {
  const userId = api.url.searchParams.get('userId');
  const teamId = api.url.searchParams.get('teamId');

  if (userId && userId.length > 10) {
    const value = await kv(api).get(api.params.id);
    if (value) {
      return new Response(null, {status: 204});
    }
  }

  if (teamId && teamId.length > 10) {
    const value = await kv(api).get(api.params.id);
    if (value) {
      return new Response(null, {status: 204});
    }
  }

  return new Response(null, {status: 404});
}

export async function POST(api: APIContext) {
  try {
    const secret = api.locals.runtime.env.LEMON_SECRET;
    const text = await api.request.text();

    await verifySignature(secret, api.request.headers.get('X-Signature') || '', text);

    const {meta, data} = JSON.parse(text);
    const userId = meta?.custom_data?.user_id;
    if (!userId) {
      throw new Error('No user ID found in the request.');
    }
    if (!FONTSTUDIO_VARIENTS.includes(data?.attributes?.first_order_item?.variant_id)) {
      return new Response('Invalid product', {status: 400});
    }
    const orderId = data.attributes.order_number;

    if (meta.event_name === 'order_created') {
      await kv(api).put(userId, orderId);
      return new Response('', {status: 200});
    }
    if (meta.event_name === 'order_refunded') {
      await kv(api).delete(userId);
      return new Response('', {status: 200});
    }
    return new Response('Invalid event', {status: 400});
  } catch (error) {
    console.error('Failed to create order:', error);
    return new Response(null, {status: 500});
  }
}

const kv = (api: APIContext) => {
  return api.locals.runtime.env.KV;
};

const hexToBuffer = (hex: string) => {
  const matches = hex.match(/[\da-f]{2}/gi) ?? [];
  const typedArray = new Uint8Array(
    matches.map(function (h) {
      return parseInt(h, 16);
    })
  );
  return typedArray.buffer;
};

const verifySignature = async (secret: string, signature: string, body: string) => {
  // verify signature using hmac and subtle crypto
  const encoder = new TextEncoder();
  const algorithm = {name: 'HMAC', hash: 'SHA-256'};
  const secretKey = await crypto.subtle.importKey('raw', encoder.encode(secret), algorithm, true, ['verify']);
  const isValid = await crypto.subtle.verify(algorithm, secretKey,
    hexToBuffer(signature), encoder.encode(body));
  if (!isValid) {
    throw new Error('Invalid signature.');
  }
};
