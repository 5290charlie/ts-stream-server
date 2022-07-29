const { SRC_BIN, KEY_BIN } = process.env;

const bxor = () => {
  const b1 = SRC_BIN || '0010';
  const b2 = KEY_BIN || '1011';
  let xres: number[] = [];

  for (let i = 0; i < b1.length; i++) {
    const n1 = parseInt(b1[i]);
    const n2 = parseInt(b2[i]);
    const tt = n1 + n2;
    const rr = tt % 2;
    xres.push(rr);
  }

  console.log(xres.join(''));
}

bxor();
