import axios, {AxiosResponse} from "axios";
import {ReqChat, ReqText, ResChat, ResText} from './@types';

const rest = axios.create({
    baseURL: 'https://us-central1-aiplatform.googleapis.com/v1/projects/fourth-vehicle-389807/locations/us-central1/publishers/google/models',
})

class API {
    static setToken(token: string) {
        rest.defaults.headers.common.Authorization = token;
    }
    static text(req: ReqText): Promise<AxiosResponse<ResText>> {
        return rest.post<ResText>(`/text-bison@001:predict`, req);
    }

    static chat(req: ReqChat): Promise<AxiosResponse<ResChat>> {
        return rest.post<ResChat>('/chat-bison@001:predict', req);
    }
}


export default API;
