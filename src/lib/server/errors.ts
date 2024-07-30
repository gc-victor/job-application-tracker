export interface ResponseErrorMessage {
    message: string;
    status: number;
}

export class ResponseError extends Error {
    #error: ResponseErrorMessage;

    constructor(error: string) {
        super(error);
        this.#error = JSON.parse(error);
    }

    get cause(): ResponseErrorMessage {
        return this.#error;
    }
}

export class InternalError extends Error {}
