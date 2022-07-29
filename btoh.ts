const { STR_BIN } = process.env;

const btoh = () => {
  const bmap: { [hex: string]: string } = {
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

  const bsrc = STR_BIN || '01101001';
  let hres = '';

  for (let i = 0; i < bsrc.length; i+=4) {
    const bstr = bsrc.substring(i, i+4);
    if (!bmap[bstr]) throw new Error(`Shits fucked: '${bstr}' not valid binary?`)
    hres += bmap[bstr];
  }

  console.log(hres.toUpperCase());
};

btoh();
