export const asPOJO = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

export const renameField = (record, from, to) => {
    record[to] = record[from];
    delete record[from];
    return record;
}

export const removeField = (record, field) => {
    delete record[field];
    return record;
}
