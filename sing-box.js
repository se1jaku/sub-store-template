const { type, name } = $arguments
const compatible_outbound = {
  tag: 'COMPATIBLE',
  type: 'direct',
}

let compatible
let config = JSON.parse($files[0])
let proxies = await produceArtifact({
  name,
  type: /^1$|col/i.test(type) ? 'collection' : 'subscription',
  platform: 'sing-box',
  produceType: 'internal',
})

config.outbounds.push(...proxies)

config.outbounds.map(i => {
  if (['🇭🇰 香港', '🇭🇰 香港【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /[-.](香港|hk)[-.]/i))
  }
  if (['🇼🇸 台湾', '🇼🇸 台湾【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /[-.](台湾|tw)[-.]/i))
  }
  if (['🇸🇬 新加坡', '🇸🇬 新加坡【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /[-.](新加坡|sg)[-.]/i))
  }
  if (['🇯🇵 日本', '🇯🇵 日本【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /[-.](日本|jp)[-.]/i))
  }
  if (['🇺🇸 美国', '🇺🇸 美国【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /[-.](美国|us)[-.]/i))
  }
  if (['🇩🇪 德国', '🇩🇪 德国【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /[-.](德国|de)[-.]/i))
  }
  if (['🇲🇾 马来西亚', '🇲🇾 马来西亚【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /[-.](马来西亚|my)[-.]/i))
  }
  if (['🇦🇺 澳大利亚', '🇦🇺 澳大利亚【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /[-.](澳大利亚|au)[-.]/i))
  }
  if (['🇬🇧 英国', '🇬🇧 英国【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /[-.](英国|uk)[-.]/i))
  }
  if (['🇳🇱 荷兰', '🇳🇱 荷兰【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /[-.](荷兰|nl)[-.]/i))
  }
})

config.outbounds = config.outbounds.filter(outbound => {
  if (Array.isArray(outbound.outbounds) && outbound.outbounds.length === 0) {
    return false;
  }
  return true;
});

$content = JSON.stringify(config, null, 2)

function getTags(proxies, regex) {
  return (regex ? proxies.filter(p => regex.test(p.tag)) : proxies).map(p => p.tag)
}
