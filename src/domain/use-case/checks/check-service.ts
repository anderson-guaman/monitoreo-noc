import { error } from 'console';


interface CheckServiceUseCase{
    execute( url : string) : Promise<boolean>;
}

type SuccessCallBack = () => void;
type ErrorCallBack = (error:string) => void;

export class CheckService implements CheckService{

    constructor(
        private readonly successCallBack: SuccessCallBack,
        private readonly errorCallBack: ErrorCallBack
    ){}


    async execute( url: string) : Promise<boolean>{
    
        try {
            const req = await fetch(url);
            if(!req.ok){
                throw new Error(`Error on check service ${url}`);
            }
            this.successCallBack();
            return true;
        } catch (error) {
            console.log(error)
            this.errorCallBack(`${error}`);
            return false;
        }
    }
}