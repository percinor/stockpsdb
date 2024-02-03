import *  as pg from 'pg';
export class  Spgdb  {
  public config = {
    host: '***',
    user: '***',
    password: "***",
    database: "***",
    port: 5432,
    max: 50,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 1000,
  };


pool = new pg.Pool(this.config);
async poolexe(pa02:string) {
  let client =await this.pool.connect();
  let result =  await client.query(pa02); 
  client.release();
  return  result;  
}

client = new pg.Client(this.config);
async pgcli(pa02:string){
  await this.client.connect();   
  return await this.client.query(pa02);  
}

}


