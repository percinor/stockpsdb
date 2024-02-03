//修改原来的json文件 ，删除无用的数据
export class Washer { 
     wajn(pa01:string,jdata:any,pa03?:string){
        for (let i in jdata) {
            this.wash(pa01,jdata[i],pa03);

        }
        return jdata;
        
     }
    wash(pa01:string,jdata:any,pa03?:string){
        let jkey = Object.keys(jdata);
        switch(pa01)        {
            case 'or10': // stock_zh_a_spot_em  实时行情数据-东财  沪深京 A 股 只取证券编号和名称
                for(let i in jdata){
                    delete jdata.日期 ;delete jdata.换手率 ;delete jdata.最新价 ;delete jdata.涨跌幅 ;delete jdata.涨跌额 ;delete jdata.成交量 ;
                    delete jdata.成交额;delete jdata.振幅;delete jdata.最高;delete jdata.最低;delete jdata.今开;delete jdata.昨收;
                    delete jdata.量比;delete jdata.换手率;delete jdata.市净率;delete jdata.总市值;delete jdata.流通市值;delete jdata.涨速;
                    delete jdata.年初至今涨跌幅;delete jdata['市盈率-动态'];delete jdata['5分钟涨跌'];delete jdata['60日涨跌幅'];
                }
                break;
            case 'or03': //加入股票代码
                for(let i in jdata){
                    jdata.scode = pa03;
                }
                break;
            case 'ev00': //将季报数据的null改为0
            for (let i in jdata ){
                   if(jdata[i] ===null || jdata[i]===undefined){
                    jdata[i] = '0';
                   };
                }
                break;
            default:
                //console.log('wash default switch')
                break;
                
        }
     }

}
