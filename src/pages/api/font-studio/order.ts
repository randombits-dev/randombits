import type {APIContext} from 'astro';
// import crypto from 'node:crypto';

export const prerender = false;

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
    if (data?.attributes?.first_order_item?.product_name !== 'FontStudio Premium') {
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

//
// export async function GET(api: APIContext) {
//   const userId = api.url.searchParams.get('user_id');
//   if (userId && userId.length > 10) {
//     try {
//       // api-cors-anywhere
//       const result = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/vnd.api+json',
//           'Content-Type': 'application/vnd.api+json',
//           'Authorization': `Bearer ${api.locals.runtime.env.LEMON_API}`
//         },
//         body: JSON.stringify({
//           data: {
//             type: 'checkouts',
//             attributes: {
//               user_id: api.params.id,
//               checkout_data: {
//                 custom: {
//                   user_id: api.params.id
//                 }
//               }
//             }
//           }
//         })
//       }).then(res => res.json());
//
//       console.log(result);
//       console.log(result.links.self);
//     } catch (error) {
//       console.error('Failed to check order:', error);
//     }
//   }
//   return new Response(null, {status: 500});
// }

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
