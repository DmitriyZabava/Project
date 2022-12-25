export default function createModelObj(modelId, newPrice) {
    return {
        modelId,
        quantity: 1,
        cost: newPrice,
    };

};