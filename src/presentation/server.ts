import { CheckService } from "../domain/use-case/checks/check-service";
import { CronService } from "./cron-service";

export class Server{
    static start(){
        console.log('Server started....');

       CronService.createJob(
        '*/5 *   * * * *',
        () =>{
            // const date = new Date;
            // console.log('5 seconds ', date);

            const url = 'https://google.com'
            new CheckService(
                () => {console.log(`this url: ${url} is ok, succes`)},
                (error) => {console.log(error)}
            )
            .execute(url);
            // new CheckService().execute('8.8.8.8');// no vale mandar direcciones ip para ping 
        }
       ); 
    }
}