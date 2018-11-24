#!/bin/bash

#  适用小程序
#  拷贝模板文件 ，修改名字为一致的
#   ./g.bash pTpl p2

#src=pTpl
src=p2

for ((i=1; i<=70; i ++))
do
	echo $i
	name="p${i}"
	# 不存在才创建
    if [ ! -d "./${name}/" ];then
        cp  -r ./${src}  ${name}

        mv ./${name}/${src}.js  ./${name}/${name}.js
        mv ./${name}/${src}.json  ./${name}/${name}.json
        mv ./${name}/${src}.wxml  ./${name}/${name}.wxml
        mv ./${name}/${src}.wxss  ./${name}/${name}.wxss
    fi
done


