// Keep aliases and every consumer-specific brand field in this one definition list.
// vendorNames overrides names only when news matching intentionally differs.
const BRAND_DEFINITIONS = [
  { names: ['OpenAI'] },
  { names: ['Anthropic', 'Claude'] },
  { names: ['Google', 'Gemini'] },
  { names: ['Meta'] },
  { names: ['Mistral'] },
  { names: ['Microsoft'] },
  { names: ['xAI'] },
  { names: ['Perplexity'] },
  { names: ['Hugging Face'] },
  {
    id: 'deepseek',
    label: 'DeepSeek',
    names: ['DeepSeek'],
    iconUrl: '/assets/icons/brands/reference-deepseek.png',
    planOrder: 2
  },
  {
    id: 'bailian',
    label: '阿里云',
    names: ['阿里云', '阿里云百炼', '通义千问', '通义'],
    vendorNames: ['阿里云', '通义千问', '通义'],
    iconUrl: '/assets/icons/brands/reference-bailian.png',
    planOrder: 5
  },
  {
    id: 'volcano-agentplan',
    label: '火山引擎',
    names: ['火山方舟', '火山引擎', '豆包'],
    iconUrl: '/assets/icons/brands/reference-volcano-agentplan.png',
    planOrder: 1
  },
  {
    id: 'zhipu-glm',
    label: '智谱',
    names: ['智谱 GLM', '智谱'],
    iconUrl: '/assets/icons/brands/reference-zhipu-glm.png',
    planOrder: 3
  },
  {
    id: 'zhipu-glm-en',
    label: 'Z.ai',
    names: ['Z.ai'],
    iconUrl: '/assets/icons/brands/reference-zhipu-glm-en.png',
    planOrder: 4
  },
  {
    id: 'minimax',
    label: 'MiniMax',
    names: ['MiniMax'],
    iconUrl: '/assets/icons/brands/reference-minimax.png',
    planOrder: 6
  },
  {
    id: 'baidu-qianfan',
    label: '百度千帆',
    names: ['百度千帆', '百度'],
    iconUrl: '/assets/icons/brands/baidu-qianfan.ico',
    planOrder: 7
  },
  {
    id: 'tencent-hunyuan',
    label: '腾讯混元',
    names: ['腾讯混元', '腾讯'],
    iconUrl: '/assets/icons/brands/tencent-hunyuan.svg',
    planOrder: 8
  },
  {
    id: 'siliconflow',
    label: '硅基流动',
    names: ['硅基流动'],
    iconUrl: '/assets/icons/brands/siliconflow.ico',
    planOrder: 9
  },
  {
    id: 'stepfun',
    label: '阶跃星辰',
    names: ['阶跃星辰'],
    iconUrl: '/assets/icons/brands/stepfun.svg',
    planOrder: 10
  },
  {
    id: 'qoder',
    label: 'Qoder',
    names: ['Qoder'],
    iconUrl: '/assets/icons/brands/qoder.svg',
    planOrder: 12
  },
  {
    id: 'opencode',
    label: 'OpenCode',
    names: ['OpenCode'],
    iconUrl: '',
    planOrder: 15
  },
  {
    id: 'byteplus',
    label: 'BytePlus',
    names: ['BytePlus'],
    iconUrl: '/assets/icons/brands/volcengine.svg',
    planOrder: 14
  },
  {
    id: 'trae',
    label: 'Trae',
    names: ['Trae'],
    vendorNames: [],
    iconUrl: '/assets/icons/brands/trae.png',
    planOrder: 11
  },
  {
    id: 'qoder-cn',
    label: 'Qoder CN',
    names: ['Qoder CN'],
    vendorNames: [],
    iconUrl: '/assets/icons/brands/qoder-cn.svg',
    planOrder: 13
  },
  {
    id: 'codebuddy',
    label: 'CodeBuddy',
    names: ['CodeBuddy'],
    iconUrl: 'https://download.codebuddy.cn/web/website/9359723b811dbf8c3ea231c13426b9d14e013567/assets/logo.svg',
    planOrder: 16
  }
];

export const BRANDS = BRAND_DEFINITIONS
  .filter(brand => Number.isInteger(brand.planOrder))
  .sort((a, b) => a.planOrder - b.planOrder)
  .map(brand => ({
    id: brand.id,
    label: brand.label,
    providers: brand.names,
    iconUrl: brand.iconUrl
  }));

export const PROVIDER_NAME_MAP = Object.fromEntries(
  BRANDS.flatMap(brand => brand.providers.map(provider => [provider, brand.label]))
);

export function brandForProvider(provider) {
  const providerName = String(provider ?? '').trim();
  if (!providerName) return undefined;

  const exactMatch = BRANDS.find(brand => brand.providers.includes(providerName));
  if (exactMatch) return exactMatch;

  let bestMatch;
  let bestAliasLength = -1;
  for (const brand of BRANDS) {
    for (const alias of brand.providers) {
      if (providerName.includes(alias) && alias.length > bestAliasLength) {
        bestMatch = brand;
        bestAliasLength = alias.length;
      }
    }
  }
  return bestMatch;
}

export const VENDOR_NAMES = BRAND_DEFINITIONS.flatMap(brand => brand.vendorNames ?? brand.names);
