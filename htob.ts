const { STR_HEX } = process.env;

const htob = () => {
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

  let src = STR_HEX || 'deadbeef';
  src = src.toLowerCase();
  let res = '';

  for (let i = 0; i < src.length; i++) {
    if (!map[src[i]]) throw new Error(`Shits fucked: '${src[i]}' not valid hex?`)
    res += map[src[i]];
  }

  console.log(res);
};

htob();

// HTB{s3cr3t_sh4r1ng_w1th_x0r_15_l4m3}
