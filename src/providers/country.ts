import {Injectable} from '@angular/core';

@Injectable()
export class CountryProvider {
    public countries: any[];

    constructor() {
    }

    sortCountries(countries) {
        this.countries = countries;
        this.countries.sort((a, b) => {
            if (a.name.common < b.name.common) return -1;
            else if (a.name.common > b.name.common) return 1;
            else return 0;
        });
        return this.countries;
    }

}