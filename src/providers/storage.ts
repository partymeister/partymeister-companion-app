import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {

    constructor(
        private storage: Storage) {
    }

    set(key, value) {
        this.storage.ready().then(() => {
            this.storage.set(key, value);
        });
    }

    get(key) {
        return this.storage.ready().then(() => {
            return this.storage.get(key).then(res => {
                return res;
            });
        });
    }

    remove(key) {
        return this.storage.ready().then(() => {
            return this.storage.remove(key);
        });
    }
}