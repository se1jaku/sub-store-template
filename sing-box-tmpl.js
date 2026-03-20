// input arguments
let { type, name } = $arguments;
let compatibleFlag = false;
type = /^1$|col|组合/i.test(type) ? 'collection' : 'subscription';

const POTENTIAL_TRANSFER_TYPES = new Set(['vless', 'vmess', 'trojan']);
const POTENTIAL_END_NODE_TYPES = new Set(['shadowsocks', 'socks', 'http']);
const COMPATIBLE_OUTBOUND = {
  type: 'selector',
  tag: '🔄 COMPATIBLE',
  outbounds: ['🔀 BDGW'],
};

const config = JSON.parse($files[0]);
const artifacts = await produceArtifact({
  name,
  type,
  platform: 'sing-box',
  produceType: 'internal',
});

const proxies = [];
const transfers = {};

// generate transfer map
artifacts.forEach(p => {
  if (POTENTIAL_TRANSFER_TYPES.has(p.type)) {
    const key = p.tag
      .replace(/\p{Extended_Pictographic}/gu, '')
      .replace(/[\u{1F1E6}-\u{1F1FF}]{2}/gu, '')
      .trim()
    transfers[key] = p
  }
});

// generate chaining proxies
artifacts.forEach(p => {
  if (POTENTIAL_END_NODE_TYPES.has(p.type)) {
    const regex = /<\(([^()]+)\)$/;
    const match = p.tag.match(regex);
    if (match) {
      p.tag = p.tag.replace(regex, '<$1');
      p.detour = match[1] in transfers ? transfers[match[1]].tag : null;
    }
  }
  proxies.push(p);
});

// outbounds group
const specialOutbounds = [];
const generalOutbounds = [];

function getTags(proxies, regex) {
  return (regex ? proxies.filter(p => regex.test(p.tag)) : proxies).map(p => p.tag)
}

config.outbounds.map(i => {
  // special
  if (['🇭🇰 香港-HKT', '🇭🇰 香港-HKT【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-([a-z]+-)?(hkt)(-|<)/i))
    specialOutbounds.push(i)
  }
  if (['🇭🇰 香港-HGC', '🇭🇰 香港-HGC【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-([a-z]+-)?(hgc)(-|<)/i))
    specialOutbounds.push(i)
  }
  if (['🇼🇸 台湾-HiNet', '🇼🇸 台湾-HiNet【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇼🇸\s+(台湾|tw)-([a-z]+-)?(hinet)(-|<)/i))
    specialOutbounds.push(i)
  }
  if (['🇯🇵 日本-SoftBank', '🇯🇵 日本-SoftBank【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇯🇵\s+(日本|jp)-([a-z]+-)?(softbank)(-|<)/i))
    specialOutbounds.push(i)
  }
  if (['🇳🇱 荷兰-DCMA', '🇳🇱 荷兰-DCMA【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇳🇱\s+(荷兰|nl)-([a-z]+-)?(dcma)(-|<)/i))
    specialOutbounds.push(i)
  }

  // NOTE: global major, following country code order
  if (['🇺🇸 美国', '🇺🇸 美国【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇺🇸\s+(美国|us)-([a-z]+-)?(misaka|enos|dmit|rfc|hh)(-|\[[a-z]+\])/i))
    generalOutbounds.push(i)
  }
  if (['🇷🇺 俄罗斯', '🇷🇺 俄罗斯【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇷🇺\s+(俄罗斯|ru)-([a-z]+-)?(misaka|enos|dmit|rfc|hh)(-|\[[a-z]+\])/i))
    generalOutbounds.push(i)
  }
  if (['🇩🇪 德国', '🇩🇪 德国【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇩🇪\s+(德国|de)-([a-z]+-)?(misaka|enos|dmit|rfc|hh|bage)(-|\[[a-z]+\])/i))
    generalOutbounds.push(i)
  }
  if (['🇸🇬 新加坡', '🇸🇬 新加坡【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇸🇬\s+(新加坡|sg)-([a-z]+-)?(misaka|enos|dmit|rfc|hh|sharon|gomami|neburst|fx|yxvm|isif|claw|bwg)(-|\[[a-z]+\])/i))
    generalOutbounds.push(i)
  }
  if (['🇯🇵 日本', '🇯🇵 日本【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇯🇵\s+(日本|jp)-([a-z]+-)?(misaka|enos|dmit|rfc|hh|sharon|gomami|neburst|fx|yxvm|isif|claw|bwg)(-|\[[a-z]+\])/i))
    generalOutbounds.push(i)
  }
  if (['🇰🇷 韩国', '🇰🇷 韩国【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇰🇷\s+(韩国|kr)-([a-z]+-)?(misaka|enos|dmit|rfc|hh|sharon|gomami|neburst|fx|yxvm|isif|claw|bwg)(-|\[[a-z]+\])/i))
    generalOutbounds.push(i)
  }
  if (['🇭🇰 香港', '🇭🇰 香港【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-([a-z]+-)?(misaka|enos|dmit|rfc|hh|sharon|gomami|neburst|fx|yxvm|isif|claw|bwg|jinx|ctc)(-|\[[a-z]+\])/i))
    generalOutbounds.push(i)
  }

  // NOTE: global original, following country code order
  if (['🇺🇳 全球原生', '🇺🇳 全球原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^[^\s]+\s(\w+)-([a-z]+-)?(orig|bage|akari)(-|<)/i))
  }
  if (['🇺🇸 美国原生', '🇺🇸 美国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇺🇸\s+(美国|us)-([a-z]+-)?(orig|misaka|bage)(-|<)/i))
  }
  if (['🇨🇦 加拿大原生', '🇨🇦 加拿大原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇨🇦\s+(加拿大|ca)-([a-z]+-)?(orig|misaka|bage)(-|<)/i))
  }
  if (['🇷🇺 俄罗斯原生', '🇷🇺 俄罗斯原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇷🇺\s+(俄罗斯|ru)-([a-z]+-)?(orig|misaka|bage)(-|<)/i))
  }
  if (['🇳🇱 荷兰原生', '🇳🇱 荷兰原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇳🇱\s+(荷兰|nl)-([a-z]+-)?(orig|misaka|bage)(-|<)/i))
  }
  if (['🇫🇷 法国原生', '🇫🇷 法国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇫🇷\s+(法国|fr)-([a-z]+-)?(orig|misaka|bage)(-|<)/i))
  }
  if (['🇬🇧 英国原生', '🇬🇧 英国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇬🇧\s+(英国|uk)-([a-z]+-)?(orig|misaka|bage)(-|<)/i))
  }
  if (['🇩🇪 德国原生', '🇩🇪 德国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇩🇪\s+(德国|de)-([a-z]+-)?(orig|misaka|bage)(-|<)/i))
  }
  if (['🇦🇺 澳大利亚原生', '🇦🇺 澳大利亚原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇦🇺\s+(澳大利亚|au)-([a-z]+-)?(orig|misaka|bage)(-|<)/i))
  }
  if (['🇸🇬 新加坡原生', '🇸🇬 新加坡原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇸🇬\s+(新加坡|sg)-([a-z]+-)?(orig|misaka|akari|bage)(-|<)/i))
  }
  if (['🇸🇽 马来原生', '🇸🇽 马来原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇸🇬\s+(马来|my)-([a-z]+-)?(orig|misaka|bage)(-|<)/i))
  }
  if (['🇯🇵 日本原生', '🇯🇵 日本原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇯🇵\s+(日本|jp)-([a-z]+-)?(orig|misaka|akari|bage|ddps)(-|<)/i))
  }
  if (['🇰🇷 韩国原生', '🇰🇷 韩国原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇰🇷\s+(韩国|kr)-([a-z]+-)?(orig|misaka|bage)(-|<)/i))
  }
  if (['🇭🇰 香港原生', '🇭🇰 香港原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇭🇰\s+(香港|hk)-([a-z]+-)?(orig|misaka|bage)(-|<)/i))
  }
  if (['🇲🇴 澳门原生', '🇲🇴 澳门原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇲🇴\s+(澳门|mo)-([a-z]+-)?(orig|misaka|bage)(-|<)/i))
  }
  if (['🇼🇸 台湾原生', '🇼🇸 台湾原生【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇼🇸\s+(台湾|tw)-([a-z]+-)?(orig|misaka|akari|bage|simple)(-|<)/i))
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
  if (['🇧🇷 巴西家宽', '🇧🇷 巴西家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇧🇷\s+(巴西|br)-([a-z]+-)?(aio)-/i))
  }
  if (['🇦🇺 澳大利亚家宽', '🇦🇺 澳大利亚家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇦🇺\s+(澳大利亚|au)-([a-z]+-)?(aio)-/i))
  }
  if (['🇮🇩 印尼家宽', '🇮🇩 印尼家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇮🇩\s+(印尼|id)-([a-z]+-)?(aio)-/i))
  }
  if (['🇸🇬 新加坡家宽', '🇸🇬 新加坡家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇸🇬\s+(新加坡|sg)-([a-z]+-)?(aio)-/i))
  }
  if (['🇹🇭 泰国家宽', '🇹🇭 泰国家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇹🇭\s+(泰国|th)-([a-z]+-)?(aio)-/i))
  }
  if (['🇸🇽 马来家宽', '🇸🇽 马来家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇸🇽\s+(马来|my)-([a-z]+-)?(aio)-/i))
  }
  if (['🇪🇪 爱沙尼亚家宽', '🇪🇪 爱沙尼亚家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇪🇪\s+(爱沙尼亚|ee)-([a-z]+-)?(aio)-/i))
  }
  if (['🇷🇺 俄罗斯家宽', '🇷🇺 俄罗斯家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇷🇺\s+(俄罗斯|ru)-([a-z]+-)?(aio)-/i))
  }
  if (['🇺🇦 乌克兰家宽', '🇺🇦 乌克兰家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇺🇦\s+(乌克兰|ua)-([a-z]+-)?(aio)-/i))
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
  if (['🇦🇪 阿联酋家宽', '🇦🇪 阿联酋家宽【自动】'].includes(i.tag)) {
    i.outbounds.push(...getTags(proxies, /^🇦🇪\s+(阿联酋|ae)-([a-z]+-)?(aio)-/i))
  }
})

// set auto group as the first of correspoding group
config.outbounds.forEach(outbound => {
  if (outbound.tag.endsWith('【自动】')) {
    const baseTag = outbound.tag.replace('【自动】', '');
    const baseOutbound = config.outbounds.find(item => item.tag === baseTag);

    if (baseOutbound) {
      baseOutbound.outbounds.unshift(outbound.tag);
    }
  }
});

// fill original with corresponding homeboard
config.outbounds.forEach(outbound => {
  if (outbound.tag.includes('原生')) {
    const targetTag = outbound.tag.replace('原生', '家宽');
    const matched = config.outbounds.find(item => item.tag === targetTag);

    if (matched) {
      outbound.outbounds.push(matched.tag);
    }
  }
});

// fill empty outbounds with compatible
config.outbounds.forEach(outbound => {
  if (Array.isArray(outbound.outbounds) && outbound.outbounds.length === 0) {
    if (!compatibleFlag) {
      config.outbounds.push(COMPATIBLE_OUTBOUND)
      compatibleFlag = true
    }
    outbound.outbounds.push(COMPATIBLE_OUTBOUND.tag);
  }
});

// fill proxies
config.outbounds.push(...proxies)

$content = JSON.stringify(config, null, 2)
