function objectLength(data: Object) {
    let length = 0;
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            length++;
        }
    }

    return length;

}

export { objectLength }