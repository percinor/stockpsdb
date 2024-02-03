# stockpsdb
stock  data to postgresql

1 Stock data source install: 
install docker
docker pull registry.cn-shanghai.aliyuncs.com/akfamily/aktools:1.8.95
docker run -d -p 8080:8080 registry.cn-shanghai.aliyuncs.com/akfamily/aktools:1.8.95

2 postsql install:
creata database stockdb

3 git clone and npm install

4 modify axioapi to your stock data source
  modify spgdb to ur postgresql database username and pwd.
