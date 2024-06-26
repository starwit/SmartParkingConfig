import {produce} from "immer";

function handleChange(event, setData) {
    const target = event.target;
    let value = target?.type === "checkbox" ? target?.checked : target?.value;
    const name = target.name;
    setData(draft => {
        draft[name] = value;
    });
}

function handleDateTime(isoString, fieldName, setData) {
    setData(draft => {
        draft[fieldName] = isoString;
    });
}

function handleSelect(event, setData) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setData(draft => {
        draft[name] = {id: value};
    });
}

function handleMultiSelect(event, fields, setFields) {
    const value = event.target.value;
    const toSave = produce(fields, draft => {
        draft?.map(field => {
            field.selectedIds = value;
        });
    });
    setFields(toSave);
}

function inputType(fieldType) {
    if (isNumber(fieldType)) {
        return "number";
    } else if (fieldType == "boolean") {
        return "checkbox";
    } else if (fieldType == "date") {
        return "date";
    } else if (fieldType == "time") {
        return "time";
    } else if (fieldType == "timestamp") {
        return "datetime-local";
    } else if (fieldType == "password") {
        return "password"
    } else {
        return "text";
    }
}

function isValid(fields, data) {
    let isValid = true;
    fields.forEach(element => {
        if (!!element.regex && !element.regex.test(data[element.name])) {
            isValid = false;
        }
        if (element.notNull && (!data[element.name] || data[element.name] === "")) {
            isValid = false;
        }
        if (isNumber(element.type) && !!element.min && data[element.name] !== "" && data[element.name] < element.min) {
            isValid = false;
        }
        if (isNumber(element.type) && !!element.max && data[element.name] !== "" && data[element.name] > element.max) {
            isValid = false;
        }
        if (isString(element.type) && !!element.max && data[element.name] !== "" && data[element.name]?.length < element.min) {
            isValid = false
        }
        if (isString(element.type) && !!element.max && data[element.name] !== "" && data[element.name]?.length > element.max) {
            isValid = false
        }
    })
    return isValid;
}

function isEnum(fieldType) {
    return fieldType === "enum";
}

function isSelect(fieldType) {
    return fieldType === "OneToOne" || fieldType === "ManyToOne";
}

function isMultiSelect(fieldType) {
    return fieldType === "ManyToMany" || fieldType === "OneToMany";
}

function isString(fieldType) {
    return fieldType === "string";
}

function isInput(fieldType) {
    return fieldType === "string" ||
        fieldType === "password" ||
        fieldType === "integer" ||
        fieldType === "bigdecimal" ||
        fieldType === "float" ||
        fieldType === "double" ||
        fieldType === "boolean" ||
        fieldType === "long";
}

function isNumber(fieldType) {
    return fieldType === "integer" ||
        fieldType === "bigdecimal" ||
        fieldType === "float" ||
        fieldType === "double" ||
        fieldType === "long";
}

function isDate(fieldType) {
    return fieldType === "date"
}

function isTime(fieldType) {
    return fieldType === "time"
}

function isDateTime(fieldType) {
    return fieldType === "timestamp"
}

function addSelectLists(entity, fields, setFields, selects) {
    const toSave = produce(fields, draft => {
        draft?.map(field => {
            if (isSelect(field.type) || isMultiSelect(field.type)) {
                field.selectList = selects.find(list => list.name === field.name).data;
            }
            if (isMultiSelect(field.type) && entity[field.name]) {
                field.selectedIds = [];
                entity[field.name].map(item => {
                    field.selectedIds.push(item.id);
                });
            }
        });
    });
    setFields(toSave);
}

function prepareForSave(entity, fields) {
    return produce(entity, draft => {
        fields?.map(field => {
            if (isSelect(field.type)) {
                if (draft[field.name]?.id === -1 || draft[field.name] === "") {
                    draft[field.name] = null;
                }
            } else if (isMultiSelect(field.type)) {
                const selectedEntity = [];
                field.selectedIds.map(selectedId => {
                    selectedEntity.push({id: selectedId});
                });
                draft[field.name] = selectedEntity;
            } else if (isEnum(field.type)) {
                if (draft[field.name] === "") {
                    draft[field.name] = null;
                }
            }
        });
    });
}

export {
    handleChange,
    handleSelect,
    handleMultiSelect,
    prepareForSave,
    isValid,
    addSelectLists,
    isInput,
    inputType,
    isEnum,
    isSelect,
    isMultiSelect,
    isDate,
    isTime,
    isDateTime,
    isNumber,
    handleDateTime
};
