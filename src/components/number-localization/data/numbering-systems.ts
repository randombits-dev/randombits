export const NUMBER_SYSTEMS_DEFAULT = ['latn', 'arab', 'arabext', 'beng', 'deva'];
export const NUMBER_SYSTEMS_UNICODE = ['adlm', 'ahom', 'arab', 'arabext', 'bali', 'beng', 'brah', 'cakm', 'cham', 'deva', 'fullwide', 'gonm', 'gujr', 'guru', 'hanidec', 'hmnp', 'java', 'kali', 'khmr', 'knda', 'laoo', 'latn', 'lepc', 'limb', 'mathbold', 'mathdbl', 'mathmono', 'mathsanb', 'mathsans', 'mlym', 'modi', 'mong', 'mroo', 'mtei', 'mymr', 'mymrshan', 'mymrtlng', 'nkoo', 'olck', 'orya', 'osma', 'rohg', 'saur', 'shrd', 'sind', 'sinh', 'sora', 'sund', 'takr', 'talu', 'tamldec', 'telu', 'thai', 'tibt', 'tirh', 'vaii', 'wara', 'wcho'];

export const NUMBER_SYSTEMS_UNCOMMON = ['bhks', 'diak', 'gong', 'hmng', 'kawi', 'lana', 'lanatham', 'nagm', 'newa', 'segment', 'tnsa'];

export const NUMBER_SYSTEMS_ALGO = ['armn', 'armnlow', 'cyrl', 'ethi', 'geor', 'grek', 'greklow', 'hanidays', 'hans', 'hansfin', 'hant', 'hantfin', 'hebr', 'jpan', 'jpanfin', 'jpanyear', 'roman', 'romanlow', 'taml'];

export const NUMBER_SYSTEM_NAMES = {
    "adlm": "Adlam",
    "ahom": "Ahom",
    "arab": "Arabic-Indic",
    "arabext": "Extended Arabic-Indic",
    "arabext-alt-short": "X Arabic-Indic",
    "armn": "Armenian",
    "armnlow": "Armenian Lowercase",
    "bali": "Balinese",
    "beng": "Bangla",
    "bhks": "Bhaiksuki",
    "brah": "Brahmi",
    "cakm": "Chakma",
    "cham": "Cham",
    "cyrl": "Cyrillic",
    "deva": "Devanagari",
    "diak": "Dives Akuru",
    "ethi": "Ethiopic",
    "finance": "Financial",
    "fullwide": "Full-Width",
    "geor": "Georgian",
    "gong": "Gunjala Gondi",
    "gonm": "Masaram Gondi",
    "grek": "Greek",
    "greklow": "Greek Lowercase",
    "gujr": "Gujarati",
    "guru": "Gurmukhi",
    "hanidays": "Chinese Calendar Day-of-Month",
    "hanidec": "Chinese Decimal",
    "hans": "Simplified Chinese",
    "hansfin": "Simplified Chinese Financial",
    "hant": "Traditional Chinese",
    "hantfin": "Traditional Chinese Financial",
    "hebr": "Hebrew",
    "hmng": "Pahawh Hmong",
    "hmnp": "Nyiakeng Puachue Hmong",
    "java": "Javanese",
    "jpan": "Japanese",
    "jpanfin": "Japanese Financial",
    "jpanyear": "Japanese Calendar Gannen Year",
    "kali": "Kayah Li",
    "kawi": "Kawi",
    "khmr": "Khmer",
    "knda": "Kannada",
    "lana": "Tai Tham Hora",
    "lanatham": "Tai Tham Tham",
    "laoo": "Lao",
    "latn": "Western",
    "lepc": "Lepcha",
    "limb": "Limbu",
    "mathbold": "Mathematical Bold",
    "mathdbl": "Mathematical Double-Struck",
    "mathmono": "Mathematical Monospace",
    "mathsanb": "Mathematical Sans-Serif Bold",
    "mathsans": "Mathematical Sans-Serif",
    "mlym": "Malayalam",
    "modi": "Modi",
    "mong": "Mongolian",
    "mroo": "Mro",
    "mtei": "Meetei Mayek",
    "mymr": "Myanmar",
    "mymrshan": "Myanmar Shan",
    "mymrtlng": "Myanmar Tai Laing",
    "nagm": "Nag Mundari",
    "native": "Native",
    "newa": "Newa",
    "nkoo": "N’Ko",
    "olck": "Ol Chiki",
    "orya": "Odia",
    "osma": "Osmanya",
    "rohg": "Hanifi Rohingya",
    "roman": "Roman",
    "romanlow": "Roman Lowercase",
    "saur": "Saurashtra",
    "segment": "Segmented",
    "shrd": "Sharada",
    "sind": "Khudawadi",
    "sinh": "Sinhala Lith",
    "sora": "Sora Sompeng",
    "sund": "Sundanese",
    "takr": "Takri",
    "talu": "New Tai Lue",
    "taml": "Traditional Tamil",
    "tamldec": "Tamil",
    "telu": "Telugu",
    "thai": "Thai",
    "tibt": "Tibetan",
    "tirh": "Tirhuta",
    "tnsa": "Tangsa",
    "traditional": "Traditional",
    "vaii": "Vai",
    "wara": "Warang Citi",
    "wcho": "Wancho"
};

export const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const lists = [NUMBER_SYSTEMS_DEFAULT, NUMBER_SYSTEMS_UNICODE, NUMBER_SYSTEMS_UNCOMMON, NUMBER_SYSTEMS_ALGO];

export const getNumerals = (list: number) => {
    const results = [];
    lists[list].forEach(system => {
        const formatter = Intl.NumberFormat(`en-US-u-nu-${system}`);
        results.push({
            id: system,
            name: NUMBER_SYSTEM_NAMES[system],
            digits: NUMBERS.map(num => formatter.format(num))
        });
    });
    return results;
};