"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types/types");
const toTypedPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'occupation' in object && 'gender' in object
        && 'ssn' in object && 'dateOfBirth' in object) {
        const newPatient = {
            name: parseString(object.name, "name"),
            occupation: parseString(object.occupation, "occupation"),
            gender: parseGender(object.gender),
            ssn: parseSSN(object.ssn),
            dateOfBirth: parseDate(object.dateOfBirth),
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing');
};
const parseString = (str, fieldName) => {
    if (!str || !isString(str)) {
        throw new Error('Incorrect or missing entry');
    }
    //allow letter & spaces only
    const validCharsRegex = /^[a-zA-Z\s]+$/;
    if (!validCharsRegex.test(str)) {
        throw new Error(`Invalid characters in ${fieldName} . Use letters and spaces only`);
    }
    return str;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect date format or missing date: ' + date);
    }
    return date;
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender format');
    }
    return gender;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(val => val.toString()).includes(param);
};
const isSSN = (ssn) => {
    const ssnRegex = /^\d{6}-\d{2,4}[A-Z]?$/;
    return ssnRegex.test(ssn);
};
const parseSSN = (ssn) => {
    if (!ssn || !isString(ssn) || !isSSN(ssn)) {
        throw new Error('Invalid or missing SSN ' + ssn);
    }
    return ssn;
};
exports.default = toTypedPatient;
