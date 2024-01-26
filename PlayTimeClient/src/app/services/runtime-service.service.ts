import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from 'src/app/models/message.interface';

@Injectable({
    providedIn: 'root'
})
export class RuntimeServiceService {
    private mobileModeSubject: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{ [key: string]: any }>({ "MobileUser": false, "MobileMode": false });

    mobileModeSubjectValue$: Observable<{ [key: string]: any }> = this.mobileModeSubject.asObservable();
    tempMobileMode: { [key: string]: any } = { "MobileUser": false, "MobileMode": false };

    setMobileMode(value: boolean) {
        this.tempMobileMode["MobileMode"] = value;
        this.mobileModeSubject.next(this.tempMobileMode);
    }

    setMobileUserType(value: boolean) {
        this.tempMobileMode["MobileUser"] = value;
        this.mobileModeSubject.next(this.tempMobileMode);
    }

    checkForCopyMessage(value: Message, whole: Message[]) {
        const length = whole.length - 1;
        if (whole.length == 0) {
            whole.push(value);
        } else if (whole[length].message == value.message && whole[length].type == value.type && whole[length].from == value.from) {
            if (value.datetimeTimestamp != undefined) {
                whole[length].datetimeTimestamp = value.datetimeTimestamp;
            }
            whole[length].amount++;
        } else {
            whole.push(value);
        }
        return whole;
    }
}
