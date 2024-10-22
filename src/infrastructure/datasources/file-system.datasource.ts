import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs';
import path from 'path';




export class FileSystemDatasource implements LogDatasource{

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/all-logs.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor(){
        this.createLogFiles();
    }

    private createLogFiles = ()=>{
        if(!fs.existsSync( this.logPath)){
            fs.mkdirSync(this.logPath);
        };


        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path =>{
            if(fs.existsSync(path)) return;
            fs.writeFileSync(path,'');
        })
    };

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(newLog)}\n`;

        fs.appendFileSync(this.allLogsPath,logAsJson);

        if(newLog.level === LogSeverityLevel.low) return;

        if(newLog.level === LogSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogsPath,logAsJson )
        }else{
            fs.appendFileSync(this.highLogsPath,logAsJson)
        }
    }


    private getLogFromFile =(path:string): LogEntity[] =>{
        const content = fs.readFileSync(path,'utf-8');
        const log = content.split('\n').map(LogEntity.fromJson
            // log => LogEntity.fromJson(log) // lo mismo de arriba por que un solo argumento 
        )
        return log;
    }


    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch(severityLevel){
            case LogSeverityLevel.low:
                return this.getLogFromFile(this.allLogsPath);

            case LogSeverityLevel.medium:
                return this.getLogFromFile(this.mediumLogsPath);

            case LogSeverityLevel.high:
                return this.getLogFromFile(this.highLogsPath);

            default:
                throw new Error(`${severityLevel } not implemented`)
        }
    }

}