"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDataSource = void 0;
class BaseDataSource {
    constructor(endpoint, options = {}) {
        this.endpoint = endpoint;
        this.options = options;
    }
    handleError(error) {
        console.error(`Error fetching data: ${error.message}`);
        throw error;
    }
    logProgress(message) {
        console.log(`[BaseDataSource] ${message}`);
    }
}
exports.BaseDataSource = BaseDataSource;
