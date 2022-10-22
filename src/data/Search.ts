const data = {
  coins: [
    {
      item: {
        id: 'aptos',
        coinId: 26455,
        name: 'Aptos',
        symbol: 'APT',
        rank: 54,
        thumb:
          'https://assets.coingecko.com/coins/images/26455/thumb/Aptos_mark_BLK.png?1658118095',
        small:
          'https://assets.coingecko.com/coins/images/26455/small/Aptos_mark_BLK.png?1658118095',
        imageUrl:
          'https://assets.coingecko.com/coins/images/26455/large/Aptos_mark_BLK.png?1658118095',
        slug: 'aptos',
        price: 0.00038828175744812373,
        score: 0,
      },
    },
    {
      item: {
        id: 'dogechain',
        coinId: 26828,
        name: 'Dogechain',
        symbol: 'DC',
        rank: 662,
        thumb:
          'https://assets.coingecko.com/coins/images/26828/thumb/dogechain.jpeg?1660292741',
        small:
          'https://assets.coingecko.com/coins/images/26828/small/dogechain.jpeg?1660292741',
        imageUrl:
          'https://assets.coingecko.com/coins/images/26828/large/dogechain.jpeg?1660292741',
        slug: 'dogechain',
        price: 3.556337742795979e-8,
        score: 1,
      },
    },
    {
      item: {
        id: 'chain-2',
        coinId: 24210,
        name: 'Chain',
        symbol: 'XCN',
        rank: 42,
        thumb:
          'https://assets.coingecko.com/coins/images/24210/thumb/Chain_icon_200x200.png?1646895054',
        small:
          'https://assets.coingecko.com/coins/images/24210/small/Chain_icon_200x200.png?1646895054',
        imageUrl:
          'https://assets.coingecko.com/coins/images/24210/large/Chain_icon_200x200.png?1646895054',
        slug: 'chain',
        price: 3.2616444345106375e-6,
        score: 2,
      },
    },
    {
      item: {
        id: 'stargate-finance',
        coinId: 24413,
        name: 'Stargate Finance',
        symbol: 'STG',
        rank: 353,
        thumb:
          'https://assets.coingecko.com/coins/images/24413/thumb/STG_LOGO.png?1647654518',
        small:
          'https://assets.coingecko.com/coins/images/24413/small/STG_LOGO.png?1647654518',
        imageUrl:
          'https://assets.coingecko.com/coins/images/24413/large/STG_LOGO.png?1647654518',
        slug: 'stargate-finance',
        price: 2.2753316999397276e-5,
        score: 3,
      },
    },
    {
      item: {
        id: 'evmos',
        coinId: 24023,
        name: 'Evmos',
        symbol: 'EVMOS',
        rank: 72,
        thumb:
          'https://assets.coingecko.com/coins/images/24023/thumb/evmos.png?1653958927',
        small:
          'https://assets.coingecko.com/coins/images/24023/small/evmos.png?1653958927',
        imageUrl:
          'https://assets.coingecko.com/coins/images/24023/large/evmos.png?1653958927',
        slug: 'evmos',
        price: 9.775550884162643e-5,
        score: 4,
      },
    },
    {
      item: {
        id: 'juventus-fan-token',
        coinId: 10060,
        name: 'Juventus Fan Token',
        symbol: 'JUV',
        rank: 800,
        thumb:
          'https://assets.coingecko.com/coins/images/10060/thumb/Juve-10.png?1604737154',
        small:
          'https://assets.coingecko.com/coins/images/10060/small/Juve-10.png?1604737154',
        imageUrl:
          'https://assets.coingecko.com/coins/images/10060/large/Juve-10.png?1604737154',
        slug: 'juventus-fan-token',
        price: 0.00019003332970810708,
        score: 5,
      },
    },
    {
      item: {
        id: 'polkadot',
        coinId: 12171,
        name: 'Polkadot',
        symbol: 'DOT',
        rank: 11,
        thumb:
          'https://assets.coingecko.com/coins/images/12171/thumb/polkadot.png?1639712644',
        small:
          'https://assets.coingecko.com/coins/images/12171/small/polkadot.png?1639712644',
        imageUrl:
          'https://assets.coingecko.com/coins/images/12171/large/polkadot.png?1639712644',
        slug: 'polkadot',
        price: 0.00030221759199421436,
        score: 6,
      },
    },
  ],
  exchanges: [],
};
const coins = data.coins.map((coin) => coin.item);
export const trendings = { ...data, coins };

export const searchData = {
  coins: [
    {
      id: 'polkadot',
      name: 'Polkadot',
      api_symbol: 'polkadot',
      symbol: 'DOT',
      rank: 11,
      thumb:
        'https://assets.coingecko.com/coins/images/12171/thumb/polkadot.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
    },
    {
      id: 'polkastarter',
      name: 'Polkastarter',
      api_symbol: 'polkastarter',
      symbol: 'POLS',
      rank: 447,
      thumb:
        'https://assets.coingecko.com/coins/images/12648/thumb/polkastarter.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/12648/large/polkastarter.png',
    },
    {
      id: 'polkadex',
      name: 'Polkadex',
      api_symbol: 'polkadex',
      symbol: 'PDEX',
      rank: 855,
      thumb:
        'https://assets.coingecko.com/coins/images/14833/thumb/dIze5Ztl_400x400.jpg',
      imageUrl:
        'https://assets.coingecko.com/coins/images/14833/large/dIze5Ztl_400x400.jpg',
    },
    {
      id: 'polkamarkets',
      name: 'Polkamarkets',
      api_symbol: 'polkamarkets',
      symbol: 'POLK',
      rank: 1123,
      thumb:
        'https://assets.coingecko.com/coins/images/14084/thumb/polkamarkets.jpg',
      imageUrl:
        'https://assets.coingecko.com/coins/images/14084/large/polkamarkets.jpg',
    },
    {
      id: 'polkafoundry',
      name: 'PolkaFoundry',
      api_symbol: 'polkafoundry',
      symbol: 'PKF',
      rank: 1162,
      thumb:
        'https://assets.coingecko.com/coins/images/14422/thumb/M7vmFGbV_400x400.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/14422/large/M7vmFGbV_400x400.png',
    },
    {
      id: 'polkabridge',
      name: 'PolkaBridge',
      api_symbol: 'polkabridge',
      symbol: 'PBR',
      rank: 1186,
      thumb:
        'https://assets.coingecko.com/coins/images/13744/thumb/symbol-whitebg200x200.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/13744/large/symbol-whitebg200x200.png',
    },
    {
      id: 'polkaswap',
      name: 'Polkaswap',
      api_symbol: 'polkaswap',
      symbol: 'PSWAP',
      rank: 1243,
      thumb:
        'https://assets.coingecko.com/coins/images/15475/thumb/pswap-token-logomark-ticker-icon-200px-transparent-optimized.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/15475/large/pswap-token-logomark-ticker-icon-200px-transparent-optimized.png',
    },
    {
      id: 'polka-city',
      name: 'Polkacity',
      api_symbol: 'polka-city',
      symbol: 'POLC',
      rank: 1540,
      thumb:
        'https://assets.coingecko.com/coins/images/14066/thumb/vykih1Nq_400x400.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/14066/large/vykih1Nq_400x400.png',
    },
    {
      id: 'polkawar',
      name: 'PolkaWar',
      api_symbol: 'polkawar',
      symbol: 'PWAR',
      rank: 2321,
      thumb:
        'https://assets.coingecko.com/coins/images/16776/thumb/polkawar.PNG',
      imageUrl:
        'https://assets.coingecko.com/coins/images/16776/large/polkawar.PNG',
    },
    {
      id: 'polkarare',
      name: 'Polkarare',
      api_symbol: 'polkarare',
      symbol: 'PRARE',
      rank: 2701,
      thumb:
        'https://assets.coingecko.com/coins/images/15388/thumb/Image_from_iOS.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/15388/large/Image_from_iOS.png',
    },
    {
      id: 'polkadomain',
      name: 'PolkaDomain',
      api_symbol: 'polkadomain',
      symbol: 'NAME',
      rank: 3048,
      thumb: 'https://assets.coingecko.com/coins/images/14832/thumb/name.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/14832/large/name.png',
    },
    {
      id: 'the-corgi-of-polkabridge',
      name: 'The Corgi of PolkaBridge',
      api_symbol: 'the-corgi-of-polkabridge',
      symbol: 'CORGIB',
      rank: 3091,
      thumb: 'https://assets.coingecko.com/coins/images/16069/thumb/corbi.PNG',
      imageUrl:
        'https://assets.coingecko.com/coins/images/16069/large/corbi.PNG',
    },
    {
      id: 'polkaex',
      name: 'PolkaEx',
      api_symbol: 'polkaex',
      symbol: 'PKEX',
      rank: 3673,
      thumb:
        'https://assets.coingecko.com/coins/images/18616/thumb/1024-1024-02.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/18616/large/1024-1024-02.png',
    },
    {
      id: 'polkainsure-finance',
      name: 'Polkainsure Finance',
      api_symbol: 'polkainsure-finance',
      symbol: 'PIS',
      rank: 3705,
      thumb:
        'https://assets.coingecko.com/coins/images/13544/thumb/Logo_Polkainsure___Final-200x200-01.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/13544/large/Logo_Polkainsure___Final-200x200-01.png',
    },
    {
      id: 'polkadog-v2-0',
      name: 'Polkadog V2.0',
      api_symbol: 'polkadog-v2-0',
      symbol: 'EINSTEIN',
      rank: 3763,
      thumb:
        'https://assets.coingecko.com/coins/images/19360/thumb/einstein-200x200.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/19360/large/einstein-200x200.png',
    },
    {
      id: 'polkaparty',
      name: 'PolkaParty',
      api_symbol: 'polkaparty',
      symbol: 'POLP',
      rank: 3816,
      thumb:
        'https://assets.coingecko.com/coins/images/17867/thumb/polp_logo.jpg',
      imageUrl:
        'https://assets.coingecko.com/coins/images/17867/large/polp_logo.jpg',
    },
    {
      id: 'polkago',
      name: 'Polkago',
      api_symbol: 'polkago',
      symbol: '$PLKG',
      rank: null,
      thumb:
        'https://assets.coingecko.com/coins/images/21199/thumb/Polkago.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/21199/large/Polkago.png',
    },
    {
      id: 'polkastation',
      name: 'PolkaStation',
      api_symbol: 'polkastation',
      symbol: 'POLKAS',
      rank: null,
      thumb:
        'https://assets.coingecko.com/coins/images/27444/thumb/200x200_logo.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/27444/large/200x200_logo.png',
    },
    {
      id: 'polkafantasy',
      name: 'PolkaFantasy',
      api_symbol: 'polkafantasy',
      symbol: 'XP',
      rank: null,
      thumb:
        'https://assets.coingecko.com/coins/images/18299/thumb/XP_Token_Icon.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/18299/large/XP_Token_Icon.png',
    },
    {
      id: 'polka-classic',
      name: 'Polka Classic',
      api_symbol: 'polka-classic',
      symbol: 'DOTC',
      rank: null,
      thumb:
        'https://assets.coingecko.com/coins/images/22307/thumb/Polka-Classic.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/22307/large/Polka-Classic.png',
    },
    {
      id: 'polkapet-world',
      name: 'PolkaPet World',
      api_symbol: 'polkapet-world',
      symbol: 'PETS',
      rank: null,
      thumb:
        'https://assets.coingecko.com/coins/images/19409/thumb/pets_polka.PNG',
      imageUrl:
        'https://assets.coingecko.com/coins/images/19409/large/pets_polka.PNG',
    },
    {
      id: 'polka-ventures',
      name: 'Polka Ventures',
      api_symbol: 'polka-ventures',
      symbol: 'POLVEN',
      rank: null,
      thumb: 'https://assets.coingecko.com/coins/images/14613/thumb/polven.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/14613/large/polven.png',
    },
    {
      id: 'huobi-polkadot',
      name: 'Huobi Polkadot',
      api_symbol: 'huobi-polkadot',
      symbol: 'HDOT',
      rank: null,
      thumb: 'https://assets.coingecko.com/coins/images/14107/thumb/hdot.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/14107/large/hdot.png',
    },
    {
      id: 'polkasocial-network',
      name: 'Polkasocial Network',
      api_symbol: 'polkasocial-network',
      symbol: 'PSN',
      rank: null,
      thumb: 'https://assets.coingecko.com/coins/images/18906/thumb/polka.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/18906/large/polka.png',
    },
    {
      id: 'lido-staked-polkadot',
      name: 'Lido Staked Polkadot',
      api_symbol: 'lido-staked-polkadot',
      symbol: 'STDOT',
      rank: null,
      thumb: 'https://assets.coingecko.com/coins/images/27791/thumb/stDOT.png',
      imageUrl:
        'https://assets.coingecko.com/coins/images/27791/large/stDOT.png',
    },
  ],
  exchanges: [
    {
      id: 'polkaswap',
      name: 'Polkaswap',
      marketType: 'spot',
      thumb: 'https://assets.coingecko.com/markets/images/715/thumb/PSWAP.png',
      imageUrl:
        'https://assets.coingecko.com/markets/images/715/large/PSWAP.png',
    },
    {
      id: 'polkaex_shiden',
      name: 'PolkaEx (Shiden)',
      marketType: 'spot',
      thumb:
        'https://assets.coingecko.com/markets/images/816/thumb/Polkaex.jpeg',
      imageUrl:
        'https://assets.coingecko.com/markets/images/816/large/Polkaex.jpeg',
    },
  ],
  icos: [],
};
