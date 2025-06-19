export default class CommonResponse {
    code: number;
    message: string;
    data: object | null;
    errors: object | null;
    constructor(code: number, message: string, data: any | null, errors: object | null);
    static success(code?: number, data?: object | null, message?: string): CommonResponse;
    static error(code?: number, message?: string, errors?: object | null): CommonResponse;
}
export interface CommonResponseInter {
    code: number;
    message: string;
    data: object | null;
    errors: object | null;
}
