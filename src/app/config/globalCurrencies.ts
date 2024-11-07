// export const getCurrencies = () => {
//   let currencyKeys = Object.keys(CURRENCIES)
//   let currencyArray = currencyKeys.map((currencyKey) => ({
//     id: CURRENCIES[currencyKey],
//     name: CURRENCIES[currencyKey],
//   }))
//   let filterDuplication = currencyArray.filter(
//     (currencyItem, index, self) =>
//       self.findIndex((selfCurrencyItem) => selfCurrencyItem.id === currencyItem.id) === index
//   )
//   console.log(filterDuplication)
//   return filterDuplication
// }

export const convertCurrencyToSymbol = (currency: string) => {
  switch (currency) {
    case 'PKR':
      return 'Rs.'
    case 'USD':
      return '$'
    default:
      return ''
  }
}

export const CURRENCIES = [
  {
    id: 'EUR',
    name: 'EUR',
  },
  {
    id: 'AED',
    name: 'AED',
  },
  {
    id: 'AFN',
    name: 'AFN',
  },
  {
    id: 'XCD',
    name: 'XCD',
  },
  {
    id: 'ALL',
    name: 'ALL',
  },
  {
    id: 'AMD',
    name: 'AMD',
  },
  {
    id: 'ANG',
    name: 'ANG',
  },
  {
    id: 'AOA',
    name: 'AOA',
  },
  {
    id: 'ARS',
    name: 'ARS',
  },
  {
    id: 'USD',
    name: 'USD',
  },
  {
    id: 'AUD',
    name: 'AUD',
  },
  {
    id: 'AWG',
    name: 'AWG',
  },
  {
    id: 'AZN',
    name: 'AZN',
  },
  {
    id: 'BAM',
    name: 'BAM',
  },
  {
    id: 'BBD',
    name: 'BBD',
  },
  {
    id: 'BDT',
    name: 'BDT',
  },
  {
    id: 'XOF',
    name: 'XOF',
  },
  {
    id: 'BGN',
    name: 'BGN',
  },
  {
    id: 'BHD',
    name: 'BHD',
  },
  {
    id: 'BIF',
    name: 'BIF',
  },
  {
    id: 'BMD',
    name: 'BMD',
  },
  {
    id: 'BND',
    name: 'BND',
  },
  {
    id: 'BOB',
    name: 'BOB',
  },
  {
    id: 'BRL',
    name: 'BRL',
  },
  {
    id: 'BSD',
    name: 'BSD',
  },
  {
    id: 'BTN',
    name: 'BTN',
  },
  {
    id: 'NOK',
    name: 'NOK',
  },
  {
    id: 'BWP',
    name: 'BWP',
  },
  {
    id: 'BYR',
    name: 'BYR',
  },
  {
    id: 'BZD',
    name: 'BZD',
  },
  {
    id: 'CAD',
    name: 'CAD',
  },
  {
    id: 'CDF',
    name: 'CDF',
  },
  {
    id: 'XAF',
    name: 'XAF',
  },
  {
    id: 'CHF',
    name: 'CHF',
  },
  {
    id: 'NZD',
    name: 'NZD',
  },
  {
    id: 'CLP',
    name: 'CLP',
  },
  {
    id: 'CNY',
    name: 'CNY',
  },
  {
    id: 'COP',
    name: 'COP',
  },
  {
    id: 'CRC',
    name: 'CRC',
  },
  {
    id: 'CUP',
    name: 'CUP',
  },
  {
    id: 'CVE',
    name: 'CVE',
  },
  {
    id: 'CZK',
    name: 'CZK',
  },
  {
    id: 'DJF',
    name: 'DJF',
  },
  {
    id: 'DKK',
    name: 'DKK',
  },
  {
    id: 'DOP',
    name: 'DOP',
  },
  {
    id: 'DZD',
    name: 'DZD',
  },
  {
    id: 'EGP',
    name: 'EGP',
  },
  {
    id: 'MAD',
    name: 'MAD',
  },
  {
    id: 'ERN',
    name: 'ERN',
  },
  {
    id: 'ETB',
    name: 'ETB',
  },
  {
    id: 'FJD',
    name: 'FJD',
  },
  {
    id: 'FKP',
    name: 'FKP',
  },
  {
    id: 'GBP',
    name: 'GBP',
  },
  {
    id: 'GEL',
    name: 'GEL',
  },
  {
    id: 'GHS',
    name: 'GHS',
  },
  {
    id: 'GIP',
    name: 'GIP',
  },
  {
    id: 'GMD',
    name: 'GMD',
  },
  {
    id: 'GNF',
    name: 'GNF',
  },
  {
    id: 'GTQ',
    name: 'GTQ',
  },
  {
    id: 'GYD',
    name: 'GYD',
  },
  {
    id: 'HKD',
    name: 'HKD',
  },
  {
    id: 'HNL',
    name: 'HNL',
  },
  {
    id: 'HRK',
    name: 'HRK',
  },
  {
    id: 'HTG',
    name: 'HTG',
  },
  {
    id: 'HUF',
    name: 'HUF',
  },
  {
    id: 'IDR',
    name: 'IDR',
  },
  {
    id: 'ILS',
    name: 'ILS',
  },
  {
    id: 'INR',
    name: 'INR',
  },
  {
    id: 'IQD',
    name: 'IQD',
  },
  {
    id: 'IRR',
    name: 'IRR',
  },
  {
    id: 'ISK',
    name: 'ISK',
  },
  {
    id: 'JMD',
    name: 'JMD',
  },
  {
    id: 'JOD',
    name: 'JOD',
  },
  {
    id: 'JPY',
    name: 'JPY',
  },
  {
    id: 'KES',
    name: 'KES',
  },
  {
    id: 'KGS',
    name: 'KGS',
  },
  {
    id: 'KHR',
    name: 'KHR',
  },
  {
    id: 'KMF',
    name: 'KMF',
  },
  {
    id: 'KPW',
    name: 'KPW',
  },
  {
    id: 'KRW',
    name: 'KRW',
  },
  {
    id: 'KWD',
    name: 'KWD',
  },
  {
    id: 'KYD',
    name: 'KYD',
  },
  {
    id: 'KZT',
    name: 'KZT',
  },
  {
    id: 'LAK',
    name: 'LAK',
  },
  {
    id: 'LBP',
    name: 'LBP',
  },
  {
    id: 'LKR',
    name: 'LKR',
  },
  {
    id: 'LRD',
    name: 'LRD',
  },
  {
    id: 'LSL',
    name: 'LSL',
  },
  {
    id: 'LTL',
    name: 'LTL',
  },
  {
    id: 'LVL',
    name: 'LVL',
  },
  {
    id: 'LYD',
    name: 'LYD',
  },
  {
    id: 'MDL',
    name: 'MDL',
  },
  {
    id: 'MGA',
    name: 'MGA',
  },
  {
    id: 'MKD',
    name: 'MKD',
  },
  {
    id: 'MMK',
    name: 'MMK',
  },
  {
    id: 'MNT',
    name: 'MNT',
  },
  {
    id: 'MOP',
    name: 'MOP',
  },
  {
    id: 'MRO',
    name: 'MRO',
  },
  {
    id: 'MUR',
    name: 'MUR',
  },
  {
    id: 'MVR',
    name: 'MVR',
  },
  {
    id: 'MWK',
    name: 'MWK',
  },
  {
    id: 'MXN',
    name: 'MXN',
  },
  {
    id: 'MYR',
    name: 'MYR',
  },
  {
    id: 'MZN',
    name: 'MZN',
  },
  {
    id: 'NAD',
    name: 'NAD',
  },
  {
    id: 'XPF',
    name: 'XPF',
  },
  {
    id: 'NGN',
    name: 'NGN',
  },
  {
    id: 'NIO',
    name: 'NIO',
  },
  {
    id: 'NPR',
    name: 'NPR',
  },
  {
    id: 'OMR',
    name: 'OMR',
  },
  {
    id: 'PAB',
    name: 'PAB',
  },
  {
    id: 'PEN',
    name: 'PEN',
  },
  {
    id: 'PGK',
    name: 'PGK',
  },
  {
    id: 'PHP',
    name: 'PHP',
  },
  {
    id: 'PKR',
    name: 'PKR',
  },
  {
    id: 'PLN',
    name: 'PLN',
  },
  {
    id: 'PYG',
    name: 'PYG',
  },
  {
    id: 'QAR',
    name: 'QAR',
  },
  {
    id: 'RON',
    name: 'RON',
  },
  {
    id: 'RSD',
    name: 'RSD',
  },
  {
    id: 'RUB',
    name: 'RUB',
  },
  {
    id: 'RWF',
    name: 'RWF',
  },
  {
    id: 'SAR',
    name: 'SAR',
  },
  {
    id: 'SBD',
    name: 'SBD',
  },
  {
    id: 'SCR',
    name: 'SCR',
  },
  {
    id: 'SDG',
    name: 'SDG',
  },
  {
    id: 'SEK',
    name: 'SEK',
  },
  {
    id: 'SGD',
    name: 'SGD',
  },
  {
    id: 'SHP',
    name: 'SHP',
  },
  {
    id: 'SLL',
    name: 'SLL',
  },
  {
    id: 'SOS',
    name: 'SOS',
  },
  {
    id: 'SRD',
    name: 'SRD',
  },
  {
    id: 'STD',
    name: 'STD',
  },
  {
    id: 'SVC',
    name: 'SVC',
  },
  {
    id: 'SYP',
    name: 'SYP',
  },
  {
    id: 'SZL',
    name: 'SZL',
  },
  {
    id: 'THB',
    name: 'THB',
  },
  {
    id: 'TJS',
    name: 'TJS',
  },
  {
    id: 'TMT',
    name: 'TMT',
  },
  {
    id: 'TND',
    name: 'TND',
  },
  {
    id: 'TOP',
    name: 'TOP',
  },
  {
    id: 'TRY',
    name: 'TRY',
  },
  {
    id: 'TTD',
    name: 'TTD',
  },
  {
    id: 'TWD',
    name: 'TWD',
  },
  {
    id: 'TZS',
    name: 'TZS',
  },
  {
    id: 'UAH',
    name: 'UAH',
  },
  {
    id: 'UGX',
    name: 'UGX',
  },
  {
    id: 'UYU',
    name: 'UYU',
  },
  {
    id: 'UZS',
    name: 'UZS',
  },
  {
    id: 'VEF',
    name: 'VEF',
  },
  {
    id: 'VND',
    name: 'VND',
  },
  {
    id: 'VUV',
    name: 'VUV',
  },
  {
    id: 'WST',
    name: 'WST',
  },
  {
    id: 'YER',
    name: 'YER',
  },
  {
    id: 'ZAR',
    name: 'ZAR',
  },
  {
    id: 'ZMK',
    name: 'ZMK',
  },
  {
    id: 'ZWL',
    name: 'ZWL',
  },
]
