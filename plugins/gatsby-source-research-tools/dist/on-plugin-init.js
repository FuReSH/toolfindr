"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onPluginInit = void 0;
const constants_1 = require("./constants");
const onPluginInit = ({ reporter }) => {
    reporter.setErrorMap({
        [constants_1.ERROR_CODES.ResearchToolsSourcing]: {
            text: (context) => `${context.sourceMessage} with ${context.apiErrorNum} Error(s):\n ${context.apiError}`,
            level: `ERROR`,
            category: `THIRD_PARTY`,
        },
    });
};
exports.onPluginInit = onPluginInit;
