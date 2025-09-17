const { type, name } = $arguments
const compatible_outbound = {
  type: 'selector',
  tag: '🔄 COMPATIBLE',
  outbounds: ['🔀 BDGW'],
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
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-(rfc|jinx|ctc|dmit|bage|enos|misaka|sharon|fx|yxvm|isif|claw|bwg)/i))
  }
  if (['🇭🇰 香港-HKT', '🇭🇰 香港-HKT【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-(hkt)/i))
  }
  if (['🇭🇰 香港-HGC', '🇭🇰 香港-HGC【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-(hgc)/i))
  }
  if (['🇼🇸 台湾-HiNet', '🇼🇸 台湾-HiNet【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇼🇸\s+(台湾|tw)-(hinet)/i))
  }
  if (['🇸🇬 新加坡', '🇸🇬 新加坡【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇸🇬\s+(新加坡|sg)-(rfc|dmit|enos|misaka|sharon|fx|yxvm|isif|claw|bwg)/i))
  }
  if (['🇯🇵 日本', '🇯🇵 日本【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇯🇵\s+(日本|jp)-(rfc|dmit|enos|misaka|sharon|fx|yxvm|isif|claw|bwg)/i))
  }
  if (['🇺🇸 美国', '🇺🇸 美国【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇺🇸\s+(美国|us)-(rfc|dmit|enos|misaka)/i))
  }
  if (['🇩🇪 德国', '🇩🇪 德国【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇺🇸\s+(德国|us)-(rfc|dmit|enos|misaka)/i))
  }
  // original
  if (['🇼🇸 台湾原生', '🇼🇸 台湾原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇼🇸\s+(台湾|tw)-(orig|bage|akari|bytevirt)/i))
  }
  if (['🇸🇬 新加坡原生', '🇸🇬 新加坡原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇸🇬\s+(新加坡|sg)-(orig|bage|halo)/i))
  }
  if (['🇲🇾 马来西亚原生', '🇲🇾 马来西亚原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇲🇾\s+(马来西亚|my)-(orig|bage|terabix)/i))
  }
  if (['🇦🇺 澳大利亚原生', '🇦🇺 澳大利亚原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇦🇺\s+(澳大利亚|au)-(orig|bage|wepc)/i))
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

  // home boardband
  if (['🇺🇳 全球家宽', '🇺🇳 全球家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^[^\s]+\s(\w+)-(aio)-/i))
  }
  if (['🇺🇸 美国家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇺🇸\s+(美国|us)-(aio)-/i))
  }
  if (['🇨🇦 加拿大家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇨🇦\s+(加拿大|ca)-(aio)-/i))
  }
  if (['🇷🇺 俄罗斯家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇷🇺\s+(俄罗斯|ru)-(aio)-/i))
  }
  if (['🇲🇾 马来西亚家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇲🇾\s+(马来西亚|my)-(aio)-/i))
  }
  if (['🇮🇩 印度尼西亚家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇮🇩\s+(印度尼西亚|id)-(aio)-/i))
  }
  if (['🇸🇬 新加坡家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇸🇬\s+(新加坡|sg)-(aio)-/i))
  }
  if (['🇹🇭 泰国家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇹🇭\s+(泰国|th)-(aio)-/i))
  }
  if (['🇯🇵 日本家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇯🇵\s+(日本|jp)-(aio)-/i))
  }
  if (['🇭🇰 香港家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-(aio)-/i))
  }
  if (['🇲🇴 澳门家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇲🇴\s+(澳门|mo)-(aio)-/i))
  }
  if (['🇼🇸 台湾家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇼🇸\s+(台湾|tw)-(aio)-/i))
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
