// Subscriptions
// Add underlying proxy information to the subscription proxies

const POTENTIAL_TRANSFER_TYPES = new Set(['vless', 'vmess', 'trojan']);
const POTENTIAL_END_NODE_TYPES = new Set(['ss', 'socks', 'http']);

function operator(proxies, targetPlatform, context) {

  const transferMap = {};
  const modifiedProxies = [];

  // generate transfer map
  proxies.forEach(p => {
    if (POTENTIAL_TRANSFER_TYPES.has(p.type)) {
      const key = p.name
        .replace(/\p{Extended_Pictographic}/gu, '')
        .replace(/[\u{1F1E6}-\u{1F1FF}]{2}/gu, '')
        .trim()
      transferMap[key] = p
    }
  });
  // console.log(JSON.stringify(transferMap, null, 2));

  // generate chaining proxies
  proxies.forEach(p => {
    const underlyingRegex = /<\(([^()]+)\)$/;
    if (POTENTIAL_END_NODE_TYPES.has(p.type)) {
      const match = p.name.match(underlyingRegex);
      if (match) {
        // remove brackets
        p.name = p.name.replace(underlyingRegex, '<$1');
        // console.log(p.name);
        p['underlying-proxy'] = match[1] in transferMap ? transferMap[match[1]].name : null;
      }
    }
    modifiedProxies.push(p);
  });

  return modifiedProxies;
}