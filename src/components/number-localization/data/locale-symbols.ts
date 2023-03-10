export const SYMBOLS: { [key: string]: [string, string] } = {
    '44': ['002C', 'Comma'],
    '46': ['002E', 'Period'],
    '160': ['00A0', 'No-Break Space'],
    '1643': ['066B', 'Arabic Decimal Separator'],
    '1644': ['066C', 'Arabic Thousands Separator'],
    '8217': ['2019', 'Right Single Quotation Mark'],
    '8239': ['202F', 'Narrow No-Break Space'],
    '45': ['002D', 'Hyphen-Minus'],
    '8722': ['2212', 'Minus Sign'],
    'none': ['', 'None'],
    // 'any': ['', 'Any']
};

export const getUnicode = (code: string): string => 'U+' + SYMBOLS[code][0];