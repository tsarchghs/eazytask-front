import { v4 as uuidv4 } from "uuid";

export const getCustomItems = (items,payload) => {
    let customItems = [];
    for (let item of items) {
        let inside = false;
        for (let payload_item of payload){
            if (item === payload_item.name) {
                inside = true;
                break;
            }
        }
        if (!inside) customItems.push({
            id: uuidv4(),
            name: item
        });
    }
    return customItems.reverse();
} 