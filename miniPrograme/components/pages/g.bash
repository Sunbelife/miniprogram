#!/bin/bash

#  适用小程序
#  拷贝模板文件 ，修改名字为一致的
#   ./g.bash pTpl p2

src=$1
name=$2

cp  -r ./${src}  ${name}

mv ./${name}/${src}.js  ./${name}/${name}.js
mv ./${name}/${src}.json  ./${name}/${name}.json
mv ./${name}/${src}.wxml  ./${name}/${name}.wxml
mv ./${name}/${src}.wxss  ./${name}/${name}.wxss
