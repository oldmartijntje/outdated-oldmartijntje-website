interface DataLookupResponse {
    mainKey: string;
    subKey: string;
    foundMainKey: boolean;
    foundSubKey: boolean;
}

export interface QueueItem {
    data: any;
    subKey: string;
    mainKeyOverride?: string;
    date: Date;
    type: QueueEditOptions;
}

export enum QueueEditOptions {
    ADD = 'add',
    REMOVE = 'remove',
}

export interface HandlerRespone {
    success: boolean;
    message: string;
    data?: any;
}

export class LocalStorageHandler {
    private localStorage: Storage;
    private defualtKey: string;

    /**
     * Creates a new instance of the LocalStorageHandler.
     * @param defaultKey The key under which the data is stored in the local storage.
     * @param localStorage The storage to use. Default is `window.localStorage`.
     */
    constructor(defaultKey: string, localStorage: Storage = window.localStorage) {
        this.defualtKey = defaultKey;
        this.localStorage = localStorage;
    }

    /**
     * Saves the data in the local storage.
     * @param data Your data to save.
     * @param subKey The subkey in the localstorage stringified object.
     * @param mainKeyOverride The key under which it is stored in localstorage. If not provided, the default key is used. 
     * @returns `HandlerRespone` - returns an object with the success, message and data properties.
     */
    saveData(data: any, subKey: string, mainKeyOverride: string = this.defualtKey): HandlerRespone {
        return LocalStorageHandler.staticSaveData(data, mainKeyOverride, subKey, this.localStorage);
    }

    /**
     * Loads data from the local storage.
     * @param subKey The subkey in the localstorage stringified object.
     * @param mainKeyOverride The key under which it is stored in localstorage. If not provided, the default key is used.
     * @returns `HandlerRespone` - returns an object with the success, message and data properties.
     */
    loadData(subKey: string, mainKeyOverride: string = this.defualtKey): HandlerRespone {
        return LocalStorageHandler.staticLoadData(mainKeyOverride, subKey, this.localStorage);
    }

    /**
     * Removes data from the local storage.
     * @param subKey The subkey in the localstorage stringified object.
     * @param mainKeyOverride The key under which it is stored in localstorage. If not provided, the default key is used.
     * @returns `HandlerRespone` - returns an object with the success, message and data properties.
     */
    removeData(subKey: string, mainKeyOverride: string = this.defualtKey): HandlerRespone {
        return LocalStorageHandler.staticRemoveData(mainKeyOverride, subKey, this.localStorage);
    }

    /**
     * Checks if the data exists in the local storage.
     * @param subKey The subkey in the localstorage stringified object.
     * @param mainKeyOverride The key under which it is stored in localstorage. If not provided, the default key is used.
     * @returns `DataLookupResponse` - returns an object with the mainKey, subKey, foundMainKey and foundSubKey properties.
     */
    doesDataExist(subKey: string, mainKeyOverride: string = this.defualtKey): DataLookupResponse {
        return LocalStorageHandler.staticDoesDataExist(mainKeyOverride, subKey, this.localStorage);
    }

    /** 
     * Gets the data from the local storage.
     * Do multiple requests at once.
     * Does Edit and Delete requests in a queue.
     * @param queue The queue of requests.
     * @param mainKey The key under which it is stored in localstorage.
     * */
    editSnapshotQueue(queue: QueueItem[], mainKey: string = this.defualtKey): HandlerRespone {
        var currentData = this.localStorage.getItem(mainKey);
        if (!currentData) {
            currentData = '{}';
        }
        try {
            var parsedData = JSON.parse(currentData);
            for (var item of queue) {
                if (item.type === QueueEditOptions.ADD) {
                    const subKeys = item.subKey.split('.');
                    let target = parsedData;
                    for (let i = 0; i < subKeys.length - 1; i++) {
                        const key = subKeys[i];
                        if (!target.hasOwnProperty(key)) {
                            target[key] = {};
                        }
                        target = target[key];
                    }
                    target[subKeys[subKeys.length - 1]] = item.data;
                } else if (item.type === QueueEditOptions.REMOVE) {
                    const subKeys = item.subKey.split('.');
                    let target = parsedData;
                    for (let i = 0; i < subKeys.length - 1; i++) {
                        const key = subKeys[i];
                        if (!target.hasOwnProperty(key)) {
                            continue;
                        }
                        target = target[key];
                    }
                    delete target[subKeys[subKeys.length - 1]];
                }
            }
            this.localStorage.setItem(mainKey, JSON.stringify(parsedData));
            return { success: true, message: 'Data edited.', data: parsedData };
        } catch (e) {
            return { success: false, message: 'Error editing data.', data: e };
        }
    }


    /**
     * Creates a new key in the local storage with the given data.
     * @param data The data to save.
     * @param mainKey The key under which it is stored in localstorage.
     * @param subKey The subkey in the localstorage stringified object.
     * @param localStorage The storage to use. Default is `window.localStorage`.
     * @returns `HandlerRespone` - returns an object with the success, message and data properties.
     */
    static staticSaveData(data: any, mainKey: string, subKey: string, localStorage: Storage = window.localStorage): HandlerRespone {
        const currentData = localStorage.getItem(mainKey);
        if (currentData) {
            try {
                const parsedData = JSON.parse(currentData);
                const subKeys = subKey.split('.');
                let target = parsedData;
                for (let i = 0; i < subKeys.length - 1; i++) {
                    const key = subKeys[i];
                    if (!target.hasOwnProperty(key)) {
                        target[key] = {};
                    }
                    target = target[key];
                }
                target[subKeys[subKeys.length - 1]] = data;
                localStorage.setItem(mainKey, JSON.stringify(parsedData));
                return { success: true, message: 'Data saved.' };
            } catch (e) {
                return { success: false, message: 'Error saving data.', data: e };
            }
        }
        localStorage.setItem(mainKey, JSON.stringify({ [subKey]: data }));
        return { success: true, message: 'Data saved as new.' };
    }

    /**
     * Loads data from the local storage.
     * @param mainKey The key under which it is stored in localstorage.
     * @param subKey The subkey in the localstorage stringified object.
     * @param localStorage The storage to use. Default is `window.localStorage`.
     * @returns `HandlerRespone` - returns an object with the success, message and data properties.
     */
    static staticLoadData(mainKey: string, subKey: string, localStorage: Storage = window.localStorage): HandlerRespone {
        const data = localStorage.getItem(mainKey);
        if (data) {
            try {
                const parsedData = JSON.parse(data);
                const subKeys = subKey.split('.');
                let result = parsedData;
                for (const key of subKeys) {
                    if (result.hasOwnProperty(key)) {
                        result = result[key];
                    } else {
                        return { success: false, message: `Subkey "${subKey}" not found.` };
                    }
                }
                return { success: true, message: 'Data loaded.', data: result };
            } catch (e) {
                return { success: false, message: 'Error loading data.', data: e };
            }
        }
        return { success: false, message: 'MainKey Data not found.' };
    }

    /**
     * Checks if the data exists in the local storage.
     * @param mainKey The key under which it is stored in localstorage.
     * @param subKey The subkey in the localstorage stringified object.
     * @param localStorage The storage to use. Default is `window.localStorage`.
     * @returns `DataLookupResponse` - returns an object with the mainKey, subKey, foundMainKey and foundSubKey properties.
     */
    static staticDoesDataExist(mainKey: string, subKey: string, localStorage: Storage = window.localStorage): DataLookupResponse {
        const data = localStorage.getItem(mainKey);
        if (data) {
            try {
                const parsedData = JSON.parse(data);
                const subKeys = subKey.split('.');
                let target = parsedData;
                for (const key of subKeys) {
                    if (!target.hasOwnProperty(key)) {
                        return { mainKey, subKey, foundMainKey: true, foundSubKey: false };
                    }
                    target = target[key];
                }
                return { mainKey, subKey, foundMainKey: true, foundSubKey: true };
            } catch (e) {
                return { mainKey, subKey, foundMainKey: false, foundSubKey: false };
            }
        }
        return { mainKey, subKey, foundMainKey: false, foundSubKey: false };
    }

    /** 
     * Removes data from the local storage.
     * @param mainKey The key under which it is stored in localstorage.
     * @param subKey The subkey in the localstorage stringified object.
     * @param localStorage The storage to use. Default is `window.localStorage`.
     * @returns `HandlerRespone` - returns an object with the success, message and data properties.
     * */
    static staticRemoveData(mainKey: string, subKey: string, localStorage: Storage = window.localStorage): HandlerRespone {
        const data = localStorage.getItem(mainKey);
        if (data) {
            try {
                const parsedData = JSON.parse(data);
                const subKeys = subKey.split('.');
                let target = parsedData;
                for (let i = 0; i < subKeys.length - 1; i++) {
                    const key = subKeys[i];
                    if (!target.hasOwnProperty(key)) {
                        return { success: false, message: 'Error removing data.', data: `Subkey "${subKey}" not found.` };
                    }
                    target = target[key];
                }
                delete target[subKeys[subKeys.length - 1]];
                localStorage.setItem(mainKey, JSON.stringify(parsedData));
                return { success: true, message: 'Data removed.' };
            } catch (e) {
                return { success: false, message: 'Error removing data.', data: e };
            }
        }
        return { success: false, message: 'MainKey Data not found.' };
    }

    /**
     * 
     * @returns `string` - returns the default key.
     */
    getDefaultKey(): string {
        return this.defualtKey;
    }

    /**
     * Sets the default key.
     * @param key The key to set as default.
     */
    setDefaultKey(key: string): void {
        this.defualtKey = key;
    }

}