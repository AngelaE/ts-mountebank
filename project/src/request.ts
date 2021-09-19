export interface IRequest {
    requestFrom?: string;
    method?: string;
    path?: string;
    query?: any;
    headers?: any;
    body?: any;
    timestamp: string; 
}