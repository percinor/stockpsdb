import express,{Application,Request,Response,NextFunction} from 'express';
import {Mainswit} from './mains';


const server: Application = express();

const add = (a:number ,b:number): number => a + b ;
server.get('/',(req:Request,resp:Response,next:NextFunction) =>{
    console.log ( add(9 ,5) );
    resp.send('hello ');
});

const mswit = new Mainswit();
server.get('/api/:para',(req:Request,resp:Response,next:NextFunction) =>{
    mswit.mainswit(req.params.para);    
    resp.send('hello api  ' + req.params.para);
});

server.get('/user/:id',(req:Request,resp:Response,next:NextFunction) =>{    
    resp.send('user  ' + req.params.id );
    console.log(req.params);
});


server.listen(5000,()=> {
    console.log('server running');
 })