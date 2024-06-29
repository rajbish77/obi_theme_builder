export interface PublishersResponse {
    username: string;
    sessionid: string;
    status: number;
    statusMessage: string;
    severity: number;
    data: {
        themes: Publish[];
    };
}

export type Publish = {
    affiliateid: number;
    distributorid: string;
    distributorname: string;
    entryby: string;
    name: string;
}
