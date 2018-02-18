import {Injectable} from '@angular/core';

import { ENV } from '@app/env'

@Injectable()
export class SettingsProvider {
    public static variables: any = ENV;
}