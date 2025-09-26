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
  // special
  if (['🇭🇰 香港-HKT', '🇭🇰 香港-HKT【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-(hkt)-/i))
  }
  if (['🇭🇰 香港-HGC', '🇭🇰 香港-HGC【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-(hgc)-/i))
  }
  if (['🇼🇸 台湾-HiNet', '🇼🇸 台湾-HiNet【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇼🇸\s+(台湾|tw)-(hinet)-/i))
  }
  if (['🇳🇱 荷兰-DCMA', '🇳🇱 荷兰-DCMA【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇳🇱\s+(荷兰|nl)-(dcma)-/i))
  }

  // NOTE: global major, following country code order
  if (['🇺🇸 美国', '🇺🇸 美国【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇺🇸\s+(美国|us)-(misaka|enos|dmit|rfc)-/i))
  }
  if (['🇷🇺 俄罗斯', '🇷🇺 俄罗斯【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇷🇺\s+(俄罗斯|ru)-(misaka|enos|dmit|rfc)-/i))
  }
  if (['🇩🇪 德国', '🇩🇪 德国【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇺🇸\s+(德国|us)-(misaka|enos|dmit|rfc|bage)-/i))
  }
  if (['🇸🇬 新加坡', '🇸🇬 新加坡【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇸🇬\s+(新加坡|sg)-(misaka|enos|dmit|rfc|bage|sharon|gomami|fx|yxvm|isif|claw|bwg)-/i))
  }
  if (['🇯🇵 日本', '🇯🇵 日本【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇯🇵\s+(日本|jp)-(misaka|enos|dmit|rfc|bage|sharon|gomami|fx|yxvm|isif|claw|bwg)-/i))
  }
  if (['🇰🇷 韩国', '🇰🇷 韩国【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇰🇷\s+(韩国|kr)-(misaka|enos|dmit|rfc|bage|sharon|gomami|fx|yxvm|isif|claw|bwg)-/i))
  }
  if (['🇭🇰 香港', '🇭🇰 香港【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-(misaka|enos|dmit|rfc|bage|sharon|gomami|fx|yxvm|isif|claw|bwg|jinx|ctc)-/i))
  }

  // NOTE: global original, following country code order
  if (['🇺🇳 全球原生', '🇺🇳 全球原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^[^\s]+\s(\w+)-([a-z]+-)?(orig|bage|akari)-/i))
  }
  if (['🇺🇸 美国原生', '🇺🇸 美国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇺🇸\s+(美国|us)-([a-z]+-)?(orig|misaka|bage)-/i))
  }
  if (['🇨🇦 加拿大原生', '🇨🇦 加拿大原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇨🇦\s+(加拿大|ca)-(orig|bage)-/i))
  }
  if (['🇷🇺 俄罗斯原生', '🇷🇺 俄罗斯原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇷🇺\s+(俄罗斯|ru)-(orig|bage)-/i))
  }
  if (['🇳🇱 荷兰原生', '🇳🇱 荷兰原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇳🇱\s+(荷兰|nl)-(orig|bage)-/i))
  }
  if (['🇫🇷 法国原生', '🇫🇷 法国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇫🇷\s+(法国|fr)-(orig|bage)-/i))
  }
  if (['🇬🇧 英国原生', '🇬🇧 英国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇬🇧\s+(英国|uk)-(orig|bage)-/i))
  }
  if (['🇩🇪 德国原生', '🇩🇪 德国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇩🇪\s+(德国|de)-(orig|bage)-/i))
  }
  if (['🇦🇺 澳大利亚原生', '🇦🇺 澳大利亚原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇦🇺\s+(澳大利亚|au)-(orig|bage)-/i))
  }
  if (['🇸🇬 新加坡原生', '🇸🇬 新加坡原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇸🇬\s+(新加坡|sg)-(orig|bage)-/i))
  }
  if (['🇯🇵 日本原生', '🇯🇵 日本原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇯🇵\s+(日本|jp)-(orig|akari|bage)--/i))
  }
  if (['🇰🇷 韩国原生', '🇰🇷 韩国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇰🇷\s+(韩国|kr)-(orig|bage)-/i))
  }
  if (['🇭🇰 香港原生', '🇭🇰 香港原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-(orig|bage)-/i))
  }
  if (['🇲🇴 澳门原生', '🇲🇴 澳门原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇲🇴\s+(澳门|mo)-(orig|bage)-/i))
  }
  if (['🇼🇸 台湾原生', '🇼🇸 台湾原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇼🇸\s+(台湾|tw)-(orig|akari|bage)-/i))
  }

  // NOTE: global home boardband, following country code order
  if (['🇺🇳 全球家宽', '🇺🇳 全球家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^[^\s]+\s(\w+)-([a-z]+-)?(aio)-/i))
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
  if (['🇳🇱 荷兰家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇳🇱\s+(荷兰|nl)-(aio)-/i))
  }
  if (['🇫🇷 法国家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇫🇷\s+(法国|fr)-(aio)-/i))
  }
  if (['🇬🇧 英国家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇬🇧\s+(英国|uk)-(aio)-/i))
  }
  if (['🇩🇪 德国家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇩🇪\s+(德国|de)-(aio)-/i))
  }
  if (['🇦🇺 澳大利亚家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇦🇺\s+(澳大利亚|au)-(aio)-/i))
  }
  if (['🇸🇬 新加坡家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇸🇬\s+(新加坡|sg)-(aio)-/i))
  }
  if (['🇯🇵 日本家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇯🇵\s+(日本|jp)-(aio)-/i))
  }
  if (['🇰🇷 韩国家宽'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇰🇷\s+(韩国|kr)-(aio)-/i))
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
