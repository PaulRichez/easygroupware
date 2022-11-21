import { Observable } from "rxjs";

export interface IFileQueue {
    type: 'download' | 'upload';
    file?: File;
    progress: number;
    data?: any;
    error?: string;
    request: Observable<any>;
}