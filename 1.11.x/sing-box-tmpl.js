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
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-(rfc|jinx|ctc|dmit|bage|enos)/i))
  }
  if (['🇭🇰 香港-HKT', '🇭🇰 香港-HKT【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-(hkt)/i))
  }
  if (['🇼🇸 台湾', '🇼🇸 台湾【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇼🇸\s+(台湾|tw)-(akari|bytevirt)/i))
  }
  if (['🇼🇸 台湾-HiNet', '🇼🇸 台湾-HiNet【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇼🇸\s+(台湾|tw)-(hinet)/i))
  }
  if (['🇸🇬 新加坡', '🇸🇬 新加坡【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇸🇬\s+(新加坡|sg)-(rfc|dmit|bage|enos)/i))
  }
  if (['🇯🇵 日本', '🇯🇵 日本【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇯🇵\s+(日本|jp)-(rfc|dmit|bage|enos)/i))
  }
  if (['🇺🇸 美国', '🇺🇸 美国【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇺🇸\s+(美国|us)-(rfc|dmit|bage|enos|misaka)/i))
  }
  if (['🇩🇪 德国', '🇩🇪 德国【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇺🇸\s+(德国|us)-(rfc|dmit|bage|enos|misaka)/i))
  }
  // original
  if (['🇸🇬 新加坡原生', '🇸🇬 新加坡原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇸🇬\s+(新加坡|sg)-(orig|halo)/i))
  }
  if (['🇲🇾 马来西亚原生', '🇲🇾 马来西亚原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇲🇾\s+(马来西亚|my)-(orig|terabix)/i))
  }
  if (['🇦🇺 澳大利亚原生', '🇦🇺 澳大利亚原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇦🇺\s+(澳大利亚|au)-(orig|wepc)/i))
  }
  if (['🇺🇸 美国原生', '🇺🇸 美国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇺🇸\s+(美国|us)-([a-z]+-)?(orig|bage)/i))
  }
  if (['🇩🇪 德国原生', '🇩🇪 德国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇩🇪\s+(德国|de)-(orig|bage)/i))
  }
  if (['🇬🇧 英国原生', '🇬🇧 英国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇬🇧\s+(英国|uk)-(orig|bage)/i))
  }
  if (['🇳🇱 荷兰DCMA', '🇳🇱 荷兰DCMA【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇳🇱\s+(荷兰|nl)-(orig|dcma)/i))
  }
})

config.outbounds.forEach(outbound => {
  if (Array.isArray(outbound.outbounds) && outbound.outbounds.length === 0) {
    if (!compatible) {
      config.outbounds.push(compatible_outbound)
      compatible = true
    }
    outbound.outbounds.push(compatible_outbound.tag);
  }
});

$content = JSON.stringify(config, null, 2)

function getTags(proxies, regex) {
  return (regex ? proxies.filter(p => regex.test(p.tag)) : proxies).map(p => p.tag)
}
