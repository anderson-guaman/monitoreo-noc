
import { CheckService } from "../domain/use-case/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl";
import { CronService } from "./cron-service";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)




export class Server{
    static start(){
        console.log('Server started....');

       CronService.createJob(
        '*/5 *   * * * *',
        () =>{
            // const date = new Date;
            // console.log('5 seconds ', date);

            const url = 'https://googe.com'
            new CheckService(
                fileSystemLogRepository,
                () => {console.log(`this url: ${url} is ok, succes`)},
                (error) => {console.log(error)}
            )
            .execute(url);
            // new CheckService().execute('8.8.8.8');// no vale mandar direcciones ip para ping 
        }
       ); 
    }
}