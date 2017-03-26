import {Injectable} from '@angular/core';

declare const ENV;

@Injectable()
export class SettingsProvider {
    public static variables: any = ENV;
}