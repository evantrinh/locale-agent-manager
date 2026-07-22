export type LocaleOption = {
  code: string;
  name: string;
  flag: string;
};

const localeCodes = [
  'af-ZA', 'am-ET', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY',
  'ar-MA', 'ar-OM', 'ar-QA', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE',
  'az-AZ', 'be-BY', 'bg-BG', 'bn-BD', 'bn-IN', 'bs-BA',
  'ca-ES', 'cs-CZ', 'cy-GB',
  'da-DK', 'de-AT', 'de-CH', 'de-DE',
  'el-GR', 'en-AU', 'en-CA', 'en-GB', 'en-HK', 'en-IE', 'en-IN', 'en-NZ', 'en-PH', 'en-SG', 'en-US', 'en-ZA',
  'es-AR', 'es-BO', 'es-CL', 'es-CO', 'es-CR', 'es-DO', 'es-EC', 'es-ES', 'es-GT', 'es-HN', 'es-MX', 'es-NI',
  'es-PA', 'es-PE', 'es-PR', 'es-PY', 'es-SV', 'es-UY', 'es-VE',
  'et-EE', 'eu-ES', 'fa-IR', 'fi-FI', 'fil-PH', 'fr-BE', 'fr-CA', 'fr-CH', 'fr-FR',
  'ga-IE', 'gl-ES', 'gu-IN',
  'he-IL', 'hi-IN', 'hr-HR', 'hu-HU', 'hy-AM',
  'id-ID', 'is-IS', 'it-CH', 'it-IT',
  'ja-JP', 'ka-GE', 'kk-KZ', 'km-KH', 'kn-IN', 'ko-KR', 'ky-KG',
  'lo-LA', 'lt-LT', 'lv-LV', 'mk-MK', 'ml-IN', 'mn-MN', 'mr-IN', 'ms-MY', 'mt-MT',
  'nb-NO', 'ne-NP', 'nl-BE', 'nl-NL',
  'pa-IN', 'pl-PL', 'pt-BR', 'pt-PT',
  'ro-RO', 'ru-RU', 'si-LK', 'sk-SK', 'sl-SI', 'sq-AL', 'sr-RS', 'sv-SE', 'sw-KE',
  'ta-IN', 'te-IN', 'th-TH', 'tr-TR',
  'uk-UA', 'ur-PK', 'uz-UZ', 'vi-VN',
  'zh-CN', 'zh-HK', 'zh-MO', 'zh-SG', 'zh-TW', 'zu-ZA'
];

const localeNameByCode: Record<string, string> = {
  'af-ZA': 'Afrikaans (South Africa)',
  'am-ET': 'Amharic (Ethiopia)',
  'ar-AE': 'Arabic (United Arab Emirates)',
  'ar-BH': 'Arabic (Bahrain)',
  'ar-DZ': 'Arabic (Algeria)',
  'ar-EG': 'Arabic (Egypt)',
  'ar-IQ': 'Arabic (Iraq)',
  'ar-JO': 'Arabic (Jordan)',
  'ar-KW': 'Arabic (Kuwait)',
  'ar-LB': 'Arabic (Lebanon)',
  'ar-LY': 'Arabic (Libya)',
  'ar-MA': 'Arabic (Morocco)',
  'ar-OM': 'Arabic (Oman)',
  'ar-QA': 'Arabic (Qatar)',
  'ar-SA': 'Arabic (Saudi Arabia)',
  'ar-SD': 'Arabic (Sudan)',
  'ar-SY': 'Arabic (Syria)',
  'ar-TN': 'Arabic (Tunisia)',
  'ar-YE': 'Arabic (Yemen)',
  'az-AZ': 'Azerbaijani (Azerbaijan)',
  'be-BY': 'Belarusian (Belarus)',
  'bg-BG': 'Bulgarian (Bulgaria)',
  'bn-BD': 'Bengali (Bangladesh)',
  'bn-IN': 'Bengali (India)',
  'bs-BA': 'Bosnian (Bosnia and Herzegovina)',
  'ca-ES': 'Catalan (Spain)',
  'cs-CZ': 'Czech (Czech Republic)',
  'cy-GB': 'Welsh (United Kingdom)',
  'da-DK': 'Danish (Denmark)',
  'de-AT': 'German (Austria)',
  'de-CH': 'German (Switzerland)',
  'de-DE': 'German (Germany)',
  'el-GR': 'Greek (Greece)',
  'en-AU': 'English (Australia)',
  'en-CA': 'English (Canada)',
  'en-GB': 'English (United Kingdom)',
  'en-HK': 'English (Hong Kong)',
  'en-IE': 'English (Ireland)',
  'en-IN': 'English (India)',
  'en-NZ': 'English (New Zealand)',
  'en-PH': 'English (Philippines)',
  'en-SG': 'English (Singapore)',
  'en-US': 'English (United States)',
  'en-ZA': 'English (South Africa)',
  'es-AR': 'Spanish (Argentina)',
  'es-BO': 'Spanish (Bolivia)',
  'es-CL': 'Spanish (Chile)',
  'es-CO': 'Spanish (Colombia)',
  'es-CR': 'Spanish (Costa Rica)',
  'es-DO': 'Spanish (Dominican Republic)',
  'es-EC': 'Spanish (Ecuador)',
  'es-ES': 'Spanish (Spain)',
  'es-GT': 'Spanish (Guatemala)',
  'es-HN': 'Spanish (Honduras)',
  'es-MX': 'Spanish (Mexico)',
  'es-NI': 'Spanish (Nicaragua)',
  'es-PA': 'Spanish (Panama)',
  'es-PE': 'Spanish (Peru)',
  'es-PR': 'Spanish (Puerto Rico)',
  'es-PY': 'Spanish (Paraguay)',
  'es-SV': 'Spanish (El Salvador)',
  'es-UY': 'Spanish (Uruguay)',
  'es-VE': 'Spanish (Venezuela)',
  'et-EE': 'Estonian (Estonia)',
  'eu-ES': 'Basque (Spain)',
  'fa-IR': 'Persian (Iran)',
  'fi-FI': 'Finnish (Finland)',
  'fil-PH': 'Filipino (Philippines)',
  'fr-BE': 'French (Belgium)',
  'fr-CA': 'French (Canada)',
  'fr-CH': 'French (Switzerland)',
  'fr-FR': 'French (France)',
  'ga-IE': 'Irish (Ireland)',
  'gl-ES': 'Galician (Spain)',
  'gu-IN': 'Gujarati (India)',
  'he-IL': 'Hebrew (Israel)',
  'hi-IN': 'Hindi (India)',
  'hr-HR': 'Croatian (Croatia)',
  'hu-HU': 'Hungarian (Hungary)',
  'hy-AM': 'Armenian (Armenia)',
  'id-ID': 'Indonesian (Indonesia)',
  'is-IS': 'Icelandic (Iceland)',
  'it-CH': 'Italian (Switzerland)',
  'it-IT': 'Italian (Italy)',
  'ja-JP': 'Japanese (Japan)',
  'ka-GE': 'Georgian (Georgia)',
  'kk-KZ': 'Kazakh (Kazakhstan)',
  'km-KH': 'Khmer (Cambodia)',
  'kn-IN': 'Kannada (India)',
  'ko-KR': 'Korean (South Korea)',
  'ky-KG': 'Kyrgyz (Kyrgyzstan)',
  'lo-LA': 'Lao (Laos)',
  'lt-LT': 'Lithuanian (Lithuania)',
  'lv-LV': 'Latvian (Latvia)',
  'mk-MK': 'Macedonian (North Macedonia)',
  'ml-IN': 'Malayalam (India)',
  'mn-MN': 'Mongolian (Mongolia)',
  'mr-IN': 'Marathi (India)',
  'ms-MY': 'Malay (Malaysia)',
  'mt-MT': 'Maltese (Malta)',
  'nb-NO': 'Norwegian Bokmål (Norway)',
  'ne-NP': 'Nepali (Nepal)',
  'nl-BE': 'Dutch (Belgium)',
  'nl-NL': 'Dutch (Netherlands)',
  'pa-IN': 'Punjabi (India)',
  'pl-PL': 'Polish (Poland)',
  'pt-BR': 'Portuguese (Brazil)',
  'pt-PT': 'Portuguese (Portugal)',
  'ro-RO': 'Romanian (Romania)',
  'ru-RU': 'Russian (Russia)',
  'si-LK': 'Sinhala (Sri Lanka)',
  'sk-SK': 'Slovak (Slovakia)',
  'sl-SI': 'Slovenian (Slovenia)',
  'sq-AL': 'Albanian (Albania)',
  'sr-RS': 'Serbian (Serbia)',
  'sv-SE': 'Swedish (Sweden)',
  'sw-KE': 'Swahili (Kenya)',
  'ta-IN': 'Tamil (India)',
  'te-IN': 'Telugu (India)',
  'th-TH': 'Thai (Thailand)',
  'tr-TR': 'Turkish (Türkiye)',
  'uk-UA': 'Ukrainian (Ukraine)',
  'ur-PK': 'Urdu (Pakistan)',
  'uz-UZ': 'Uzbek (Uzbekistan)',
  'vi-VN': 'Vietnamese (Vietnam)',
  'zh-CN': 'Chinese (China)',
  'zh-HK': 'Chinese (Hong Kong)',
  'zh-MO': 'Chinese (Macao)',
  'zh-SG': 'Chinese (Singapore)',
  'zh-TW': 'Chinese (Taiwan)',
  'zu-ZA': 'Zulu (South Africa)'
};

function regionToFlag(region: string): string {
  if (!/^[A-Z]{2}$/.test(region)) {
    return '🏳️';
  }

  return String.fromCodePoint(...[...region].map((char) => 127397 + char.charCodeAt(0)));
}

export const localeOptions: LocaleOption[] = localeCodes.map((code) => {
  const [, region = ''] = code.split('-');
  return {
    code,
    name: localeNameByCode[code] ?? code,
    flag: regionToFlag(region)
  };
});

export function getLocaleLabel(code: string): string {
  const locale = localeOptions.find((option) => option.code === code.trim());
  if (!locale) {
    return code.trim();
  }

  return `${locale.flag} ${locale.code} - ${locale.name}`;
}

export const agentOptionSets = {
  userAgent: [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:141.0) Gecko/20100101 Firefox/141.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14.6; rv:141.0) Gecko/20100101 Firefox/141.0',
    'Mozilla/5.0 (X11; Linux x86_64; rv:141.0) Gecko/20100101 Firefox/141.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edg/138.0.0.0 Chrome/138.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 15; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 15; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/141.0 Mobile Safari/537.36'
  ],
  platform: ['Win32', 'MacIntel', 'Linux x86_64', 'iPhone', 'iPad', 'Android'],
  appVersion: [
    '5.0 (Windows)',
    '5.0 (Macintosh)',
    '5.0 (X11)',
    '5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)',
    '5.0 (iPad; CPU OS 18_0 like Mac OS X)',
    '5.0 (Linux; Android 15; Pixel 8)'
  ],
  secChUa: [
    '"Not/A)Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
    '"Not/A)Brand";v="8", "Chromium";v="138", "Microsoft Edge";v="138"'
  ],
  secChUaMobile: ['?0', '?1'],
  secChUaPlatform: ['"Windows"', '"macOS"', '"Linux"', '"Android"', '"iOS"', '"Chrome OS"']
};
