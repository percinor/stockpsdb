import { Axiosapi } from './axioapi';
import { Washer } from './washer';
import { Trans } from './trans';
import { Spgdb } from './spgdb';
import { Slog } from './slog';
import { Batcher } from './batcher';
import urlsuf from './res/urlsuf.json';
import pgsql from './res/pgsql.json';
export class Mainswit {
    axio = new Axiosapi();
    washer = new Washer();
    trans = new Trans();
    spgdb = new Spgdb();
    slog = new Slog();
    batcher = new Batcher();
    mainswit(pa01: string) {  // 从server中 拿到req.params        
        switch (pa01) {
            case 'or00': //creat新增到证券代码表
            // console.log(pgsql.orin[4].sqlst);
            this.expg('once', pgsql.orin[4].sqlst + pgsql.orin[5].sqlst);
            //this.mainswit('orin');
            //this.mainswit('or01');
            break;
            case 'or10': //insert拿到证券代码信息到新增到证券代码表
                this.urlsql(pa01,urlsuf.orin[0].surl,pgsql.orin[0].sqlst);
                break;
            case 'or01': //新增每只股票表
                //this.expg(pa01, pgsql[1].sqlst);
                this.expg(pa01, pgsql.orin[1].sqlst);
                break;
            case 'or03':// insert 历史数据
                 this.expg(pa01, pgsql.test[0].sqlst);
                //this.expg(pa01, pgsql.orin[1].sqlst);
                //this.expg(pa01,'select scode from stcode where scode = \'603361\' or scode = \'301459\' ');
                break;
            case 'ev00': //拿到季报后inser 季报表
                this.urlsql(pa01,urlsuf.eve[0].surl +'20230930',pgsql.eve[0].sqlst);
                break;
            case 'ev01'://每日交易
                break;
            case 'ba01'://公告和基础数据交易
                break;
            case 'teurl':
                let arrpro = (this.axio.axurl(pa01, 'stock_zh_a_hist?symbol=301301&start_date=20231101'));
                arrpro.then(response => console.log(response))
                    .catch((error) => console.log(error));
                break;
            case 'tedb':
                break;
            default:
                console.log(pa01 + 'default Mainswit');
        }
    }

    expg(pa01: string, pa02: string) {
        let arr = this.spgdb.poolexe(pa02);        
        arr.then((result: { rows: any[]; }) =>
        //console.log(result.rows)
        {
            if (pa01 == 'end' || pa01 == 'once') {
                console.log(pa01,'main expg sucess')
            }else{
                console.log(pa01,'resuswit begin');
                this.resuswit(pa01, result.rows)
            }
        }
        )
            .catch((e: { stack: any; }) => 
            {
                console.log(pa02);
                console.error(e.stack);
            }
            
            );                       
    }
    resuswit(pa01: string, pa02: any) {
        switch (pa01) {
            case 'or01':
                pa01 = 'end';
                this.batcher.batchsql(pa01, pa02);
                break;
            case 'or03':
                this.batcher.bach(pa01, pa02);
                break;
            case 'end':
                break;
            default:
                console.log(pa01 + 'default resuswit');
        }
    }
    urlsql(pa01: string,pa02:string,pa03:string) {
        this.axio.axurl(pa01, pa02)
            .then(res => {
                res.data = this.washer.wajn(pa01, res.data);
                //console.log(this.trans.transray(res.data));
               this.expg('once', pa03 + this.trans.transray(res.data) +' ;');
            })
            .catch((error) => console.log(pa01, 'axio get error'));
    }

    //
}