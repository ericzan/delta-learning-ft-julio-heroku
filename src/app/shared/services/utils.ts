import * as moment from "moment";

export function dateTimeFormat(){
    return moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
}