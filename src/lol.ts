/**
 * USAGE: npx ts-node xor.ts
 */

// Cipher Text #1
const ct1 = 'fd034c32294bfa6ab44a28892e75c4f24d8e71b41cfb9a81a634b90e6238443a813a3d34';
// Cipher Text #2
const ct2 = '6b65813f4fe991efe2042f79988a3b2f2559d358e55f2fa373e53b1965b5bb2b175cf039';
// Cipher Text Key
const key = 'de328f76159108f7653a5883decb8dec06b0fd9bc8d0dd7dade1f04836b8a07da20bfe70';

// Convert hex to binary (strings)
const hex2bin = (hex: string): string => {
  hex = hex.toLowerCase();
  let res = '';
  const map: { [hex: string]: string } = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'a': '1010',
    'b': '1011',
    'c': '1100',
    'd': '1101',
    'e': '1110',
    'f': '1111'
  };

  for (let i = 0; i < hex.length; i++) {
    if (!map[hex[i]]) throw new Error(`Shits fucked: '${hex[i]}' not valid hex?`)
    res += map[hex[i]];
  }

  return res;
};

// Convert binary to hex (strings)
const bin2hex = (binary: string) => {
  let res = '';
  const map: { [bin: string]: string } = {
    '0000': '0',
    '0001': '1',
    '0010': '2',
    '0011': '3',
    '0100': '4',
    '0101': '5',
    '0110': '6',
    '0111': '7',
    '1000': '8',
    '1001': '9',
    '1010': 'a',
    '1011': 'b',
    '1100': 'c',
    '1101': 'd',
    '1110': 'e',
    '1111': 'f',
  };

  for (let i = 0; i < binary.length; i+=4) {
    const bstr = binary.substring(i, i+4);
    if (!map[bstr]) throw new Error(`Shits fucked: '${bstr}' not valid binary?`)
    res += map[bstr];
  }

  return res;
};

// Convert hex to ascii
const hex2ascii = (hex: string) => {
  let res = '';
  for (let i = 0; i < hex.length; i += 2)
    res += String.fromCharCode(parseInt(hex.substring(i, i+2), 16));
  return res;
};

// Execute "xor" against two binary strings
const xor = (b1: string, b2: string): string => {
  let xres: number[] = [];

  for (let i = 0; i < b1.length; i++) {
    xres.push((parseInt(b1[i]) + parseInt(b2[i])) % 2);
  }

  return xres.join('');
};

// Log initial values
console.log('[ct1] Cipher Text  #1', ct1);
console.log('[ct2] Cipher Text  #2', ct2);
console.log('[key] Cipher Text Key', key);

// Convert hex to binary strings
const bin1 = hex2bin(ct1);
console.log('[bin1] Binary of {ct1}', bin1);
const bin2 = hex2bin(ct2);
console.log('[bin2] Binary of {ct2}', bin2);
const bink = hex2bin(key);
console.log('[bink] Binary of {key}', bink);

// Do xor's on binary strings
const xor1 = xor(bin1, bin2);
console.log('[xor1] {bin1} ^ {bin2}', xor1);
const xor2 = xor(xor1, bink);
console.log('[xor2] {xor1} ^ {bink}', xor2);

// Back to hex from result xor binary
const result = bin2hex(xor2);
console.log('Result (hex)', result);

// And from hex -> ascii for flag!
const flag = hex2ascii(result);
console.log('Flag (ascii)', hex2ascii(result));
