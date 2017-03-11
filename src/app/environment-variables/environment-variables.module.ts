import { NgModule } from '@angular/core';
import { EnvVariables } from './environment-variables.token';
import { devVariables } from './development';
import { prodVariables } from './production';

declare const process: any; // Typescript compiler will complain without this

@NgModule({
    providers: [
        {
            provide: EnvVariables,
            useValue: process.env.IONIC_ENV === 'prod' ? prodVariables : devVariables
        }
    ]
})
export class EnvironmentsModule {}