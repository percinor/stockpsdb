export class Trans {
    transray(jdata: any):string { // fetch json tran insert sql statement , 多个json [{...},{}]
        let fin = ''; 
        for (let i in jdata) { //jdata.length
        //for (let i=50 ;i<100; i++ ) { 
            if( Number(i) + 1  === jdata.length){ 
                fin += this.transjson(jdata[i])
            } else{
                fin += this.transjson(jdata[i]) + ',';
            }
        }
        // console.log(fin);
        return fin;        
    }
    transjson(jie: any):string { // fetch json tran insert sql statement , 单个json {...},replaceall 由于返回的总股本中有逗号字符
        let jkey = Object.keys(jie);
        let sbo = '(';
        for (let e in jie) {
            if (e === jkey[jkey.length - 1]) {
                // sbo += "'" + jie[e].toString().replaceAll(",","") + "' )" ;
                sbo += "'" + jie[e] + "' )" ;
            } else {
                sbo += "'"  +jie[e] + "'" + ',';
            }            
        }
        //console.log('fin'+ sbo );
        return sbo;
    }
}