#!/bin/bash

ct=$1
ck=$2


ctb=$(STR_HEX=$ct ts-node htob.ts)
ckb=$(STR_HEX=$ck ts-node htob.ts)

echo "CTH = $ct"
echo "CKH = $ck"

echo "CTB = $ctb"
echo "CKB = $ckb"

xor=$(SRC_BIN=$ctb KEY_BIN=$ckb ts-node xor.ts)

echo "XOR = $xor"

res=$(STR_BIN=$xor ts-node btoh.ts)

echo "RES = $res"