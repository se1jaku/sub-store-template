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
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-([a-z]+-)?(hkt)-/i))
  }
  if (['🇭🇰 香港-HGC', '🇭🇰 香港-HGC【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-([a-z]+-)?(hgc)-/i))
  }
  if (['🇼🇸 台湾-HiNet', '🇼🇸 台湾-HiNet【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇼🇸\s+(台湾|tw)-([a-z]+-)?(hinet)-/i))
  }
  if (['🇳🇱 荷兰-DCMA', '🇳🇱 荷兰-DCMA【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇳🇱\s+(荷兰|nl)-([a-z]+-)?(dcma)-/i))
  }

  // NOTE: global major, following country code order
  if (['🇺🇸 美国', '🇺🇸 美国【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇺🇸\s+(美国|us)-([a-z]+-)?(misaka|enos|dmit|rfc)-/i))
  }
  if (['🇷🇺 俄罗斯', '🇷🇺 俄罗斯【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇷🇺\s+(俄罗斯|ru)-([a-z]+-)?(misaka|enos|dmit|rfc)-/i))
  }
  if (['🇩🇪 德国', '🇩🇪 德国【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇺🇸\s+(德国|us)-([a-z]+-)?(misaka|enos|dmit|rfc|bage)-/i))
  }
  if (['🇸🇬 新加坡', '🇸🇬 新加坡【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇸🇬\s+(新加坡|sg)-([a-z]+-)?(misaka|enos|dmit|rfc|bage|sharon|gomami|fx|yxvm|isif|claw|bwg)-/i))
  }
  if (['🇯🇵 日本', '🇯🇵 日本【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇯🇵\s+(日本|jp)-([a-z]+-)?(misaka|enos|dmit|rfc|bage|sharon|gomami|fx|yxvm|isif|claw|bwg)-/i))
  }
  if (['🇰🇷 韩国', '🇰🇷 韩国【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇰🇷\s+(韩国|kr)-([a-z]+-)?(misaka|enos|dmit|rfc|bage|sharon|gomami|fx|yxvm|isif|claw|bwg)-/i))
  }
  if (['🇭🇰 香港', '🇭🇰 香港【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-([a-z]+-)?(misaka|enos|dmit|rfc|bage|sharon|gomami|fx|yxvm|isif|claw|bwg|jinx|ctc)-/i))
  }

  // NOTE: global original, following country code order
  if (['🇺🇳 全球原生', '🇺🇳 全球原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^[^\s]+\s(\w+)-([a-z]+-)?(orig|bage|akari)-/i))
  }
  if (['🇺🇸 美国原生', '🇺🇸 美国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇺🇸\s+(美国|us)-([a-z]+-)?(orig|misaka|bage)-/i))
  }
  if (['🇨🇦 加拿大原生', '🇨🇦 加拿大原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇨🇦\s+(加拿大|ca)-([a-z]+-)?(orig|bage)-/i))
  }
  if (['🇷🇺 俄罗斯原生', '🇷🇺 俄罗斯原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇷🇺\s+(俄罗斯|ru)-([a-z]+-)?(orig|bage)-/i))
  }
  if (['🇳🇱 荷兰原生', '🇳🇱 荷兰原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇳🇱\s+(荷兰|nl)-([a-z]+-)?(orig|bage)-/i))
  }
  if (['🇫🇷 法国原生', '🇫🇷 法国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇫🇷\s+(法国|fr)-([a-z]+-)?(orig|bage)-/i))
  }
  if (['🇬🇧 英国原生', '🇬🇧 英国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇬🇧\s+(英国|uk)-([a-z]+-)?(orig|bage)-/i))
  }
  if (['🇩🇪 德国原生', '🇩🇪 德国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇩🇪\s+(德国|de)-([a-z]+-)?(orig|bage)-/i))
  }
  if (['🇦🇺 澳大利亚原生', '🇦🇺 澳大利亚原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇦🇺\s+(澳大利亚|au)-([a-z]+-)?(orig|bage)-/i))
  }
  if (['🇸🇬 新加坡原生', '🇸🇬 新加坡原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇸🇬\s+(新加坡|sg)-([a-z]+-)?(orig|bage)-/i))
  }
  if (['🇯🇵 日本原生', '🇯🇵 日本原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇯🇵\s+(日本|jp)-([a-z]+-)?(orig|akari|bage)--/i))
  }
  if (['🇰🇷 韩国原生', '🇰🇷 韩国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇰🇷\s+(韩国|kr)-([a-z]+-)?(orig|bage)-/i))
  }
  if (['🇭🇰 香港原生', '🇭🇰 香港原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-([a-z]+-)?(orig|bage)-/i))
  }
  if (['🇲🇴 澳门原生', '🇲🇴 澳门原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇲🇴\s+(澳门|mo)-([a-z]+-)?(orig|bage)-/i))
  }
  if (['🇼🇸 台湾原生', '🇼🇸 台湾原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇼🇸\s+(台湾|tw)-([a-z]+-)?(orig|akari|bage)-/i))
  }

  // NOTE: global home boardband, following country code order
  if (['🇺🇳 全球家宽', '🇺🇳 全球家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^[^\s]+\s(\w+)-([a-z]+-)?(aio)-/i))
  }
  if (['🇺🇸 美国家宽', '🇺🇸 美国家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇺🇸\s+(美国|us)-([a-z]+-)?(aio)-/i))
  }
  if (['🇨🇦 加拿大家宽', '🇨🇦 加拿大家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇨🇦\s+(加拿大|ca)-([a-z]+-)?(aio)-/i))
  }
  if (['🇷🇺 俄罗斯家宽', '🇷🇺 俄罗斯家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇷🇺\s+(俄罗斯|ru)-([a-z]+-)?(aio)-/i))
  }
  if (['🇳🇱 荷兰家宽', '🇳🇱 荷兰家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇳🇱\s+(荷兰|nl)-([a-z]+-)?(aio)-/i))
  }
  if (['🇫🇷 法国家宽', '🇫🇷 法国家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇫🇷\s+(法国|fr)-([a-z]+-)?(aio)-/i))
  }
  if (['🇬🇧 英国家宽', '🇬🇧 英国家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇬🇧\s+(英国|uk)-([a-z]+-)?(aio)-/i))
  }
  if (['🇩🇪 德国家宽', '🇩🇪 德国家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇩🇪\s+(德国|de)-([a-z]+-)?(aio)-/i))
  }
  if (['🇦🇺 澳大利亚家宽', '🇦🇺 澳大利亚家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇦🇺\s+(澳大利亚|au)-([a-z]+-)?(aio)-/i))
  }
  if (['🇸🇬 新加坡家宽', '🇸🇬 新加坡家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇸🇬\s+(新加坡|sg)-([a-z]+-)?(aio)-/i))
  }
  if (['🇯🇵 日本家宽', '🇯🇵 日本家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇯🇵\s+(日本|jp)-([a-z]+-)?(aio)-/i))
  }
  if (['🇰🇷 韩国家宽', '🇰🇷 韩国家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇰🇷\s+(韩国|kr)-([a-z]+-)?(aio)-/i))
  }
  if (['🇭🇰 香港家宽', '🇭🇰 香港家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-([a-z]+-)?(aio)-/i))
  }
  if (['🇲🇴 澳门家宽', '🇲🇴 澳门家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇲🇴\s+(澳门|mo)-([a-z]+-)?(aio)-/i))
  }
  if (['🇼🇸 台湾家宽', '🇼🇸 台湾家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇼🇸\s+(台湾|tw)-([a-z]+-)?(aio)-/i))
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
