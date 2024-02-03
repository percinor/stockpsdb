import axios from 'axios';
const skurl: string = 'http://10.10.10.10:8080/api/public/';
export class Axiosapi{    
    async axurl(pa01:string,surl:string){
        return await  axios.get(skurl + surl )
            //.then(res => console.log(res) )
            //.catch((error) => console.log('axios error'+ surl));
    };   
      
}