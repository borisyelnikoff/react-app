import _ from 'lodash';

export default function paginate(items, pageNumber, pageSize) {
    let startIndex = pageSize * (pageNumber - 1);
    if (startIndex >= items.length) startIndex = 0;
    
    return _(items)
        .slice(startIndex)
        .take(pageSize)
        .value();
};