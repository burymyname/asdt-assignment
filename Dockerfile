# basic image
FROM node:10
# author
MAINTAINER zinc 20210240241@fudan.edu.cn
# add files
WORKDIR /ts/src
COPY NumericalDiff.spec.ts /ts/src
COPY utils.ts /ts/src
COPY jest.config.js /ts
# command for environment
RUN cd /ts \
	&& npm init -y \
	&& npm i -g typescript \
	&& tsc --init \
	&& npm install -D ts-node \
	&& npm install -D ramda \
	&& npm install -D @types/ramda \
	&& npm install -D jest \
	&& npm install -D ts-jest \
	&& npm install typescript \
	&& sed -i '7c "test": "jest"' package.json
# test cmd
CMD ["npm", "run", "test"]