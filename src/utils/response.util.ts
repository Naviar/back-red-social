import { ResponseApi } from "../dtos/web/response/ResponseApi";

export default class UtilResponse {
    
    static buildResponse(message: string, data?: any){
        const resBuild = new ResponseApi<any>();
        resBuild.message = message;
        resBuild.data = data;
        return resBuild;
    }
} 
