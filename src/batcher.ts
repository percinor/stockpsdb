import { Spgdb } from './spgdb';
import { Slog } from './slog';
import { Axiosapi } from './axioapi';
import { Washer } from './washer';
import { Trans } from './trans';
import urlsuf from './res/urlsuf.json';
import pgsql from './res/pgsql.json';
export class Batcher {
    axio = new Axiosapi();
    spgdb = new Spgdb();
    slog = new Slog();
    washer = new Washer();
    trans = new Trans();
    
    batchsql(pa01: string, pa02: any) {
        let batchsize = 700;
        let batchcount = Math.ceil(pa02.length / batchsize);
        let sqltxt = '';
        //console.log('sum',pa02.length,'batchcount',batchcount);
        for (let i = 0; i < batchcount; i++) {
            let startiex = i * batchsize;
            let endiex = startiex + batchsize - 1;
            if (endiex < pa02.length) {
                for (startiex; startiex < endiex; startiex++) {
                    sqltxt += pgsql.orin[2].sqlst + pa02[startiex].scode + pgsql.orin[2].sql02;
                    // sqltxt += pa02[startiex].scode + ' /'
                    //console.log('star' , startiex ,'code',pa02[startiex].scode)
                    //console.log('end',endiex );
                }
            } else {
                for (startiex; startiex < pa02.length; startiex++) {
                    sqltxt += pgsql.orin[2].sqlst + pa02[startiex].scode + pgsql.orin[2].sql02;
                    //sqltxt += pa02[startiex].scode + ' /'
                    //console.log('star' , startiex ,'code',pa02[startiex].scode);
                    //console.log('end',pa02.length-1 );
                }
                this.expg(pa01, sqltxt);
            }
        }
    }
    bach(pa01: string, pa02: any) {
        let batchsize = 3;
        let batchcount = Math.ceil(pa02.length / batchsize);
        //let sqltxt = '';
        for (let i = 0; i < batchcount; i++) {
            let startiex = i * batchsize;
            let endiex = startiex + batchsize - 1;
            //console.log(startiex,'end',endiex); 
            let tmp = {sql:'',count:0,start:0,end:0,length:0};
            tmp.length = pa02.length;
            if (endiex < pa02.length) {
                for (startiex; startiex <= endiex; startiex++) {                    
                    //tmp.sql += ' start' + startiex + ' ,code' + pa02[startiex].scode;
                    tmp.start = startiex; tmp.end = endiex;
                    console.log(tmp.start,' '+tmp.end)
                    //this.exurl(pa01,pa02[startiex].scode,tmp);
                    if (startiex == endiex) {
                        //console.log(tmp.sql);
                        //tmp.sql= '';                        
                    }
                }
            } else {
                for (startiex; startiex < pa02.length; startiex++) {
                    //tmp.sql += 'start' + startiex + ' code' + pa02[startiex].scode;
                    tmp.start = startiex; 
                    console.log(tmp.start)
                    //this.exurl(pa01,pa02[startiex].scode,tmp);
                    if (startiex + 1 == pa02.length) {
                        //console.log(tmp.sql);
                        //tmp.sql= '';
                    }
                }
            }
        }
    }
    exurl(pa01: string, pa02: string,tmp:any) {
        this.axio.axurl(pa01, urlsuf.orin[1].surl + pa02)
        .then(res => {
            if (res.data.length) {
                //console.log(res.data);
                tmp.count++;
                //res.data = this.washer.wajn(pa01, res.data, pa02);
                //tmp.sql += pgsql.orin[3].sqlst + pa02 + pgsql.orin[3].sql02 + this.trans.transray(res.data) + ' ;';
                console.log(pa02);
                tmp.sql+=pa02;
                console.log('tmp'+tmp.sql);
                //console.log(tmp.count ,'  '+tmp.start); 
                if (tmp.start == tmp.endiex || tmp.start === tmp.length) {    
                //console.log(tmp.sql);                        
                }                           
            } else {
                console.log(pa02, 'axio get no data');
            }
        }).
        catch((error) => console.log('axios  error' + pa02))
    }
    expg(pa01: string, pa02: string) {
        let arr = this.spgdb.poolexe(pa02);
        arr.then((result: { rows: any[]; }) =>
            //console.log(result.rows)
            console.log(pa01, 'batcher expg success')
        )
            .catch((e: { stack: any; }) => console.error(e.stack)
            );

    }
}