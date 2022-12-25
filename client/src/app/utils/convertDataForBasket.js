export default function convertData(convertible) {
    return convertible.map((item) => {
        const {cost, quantity, _id: modelId} = item;
        return {cost, quantity, modelId};
    });
};