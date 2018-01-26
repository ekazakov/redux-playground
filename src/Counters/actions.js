const types = {
    INC: '@app/INC',
    DEC: '@app/DEC',
};

export default types;

export const inc = () => ({ type: types.INC, });
export const dec = () => ({ type: types.DEC, });