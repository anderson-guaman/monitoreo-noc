import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase{
    execute( url : string) : Promise<boolean>;
}

type SuccessCallBack = (() => void | undefined);
type ErrorCallBack = ((error:string) => void | undefined);




export class CheckService implements CheckService{

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallBack: SuccessCallBack,
        private readonly errorCallBack: ErrorCallBack
    ){}




    async execute( url: string) : Promise<boolean>{
    
        try {
            const req = await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service ${url}`);
            }

            const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low);
            this.logRepository.saveLog(log);
            this.successCallBack && this.successCallBack();
            return true;
        } catch (error) {
            const errorMessage = `${error}`;
            const log = new LogEntity(errorMessage, LogSeverityLevel.high);
            this.logRepository.saveLog(log);
            this.errorCallBack && this.errorCallBack(`${error}`);
            return false;
        }
    }
}