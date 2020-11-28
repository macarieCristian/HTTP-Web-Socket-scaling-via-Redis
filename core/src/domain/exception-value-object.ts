import {ExceptionCode} from "./enums/exception-code";

export class ExceptionValueObject {
    constructor(public code: ExceptionCode, public message: string) {
    }
}
