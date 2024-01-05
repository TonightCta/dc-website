

export const PlianContractAddress721Main: string = "0xa2822ac2662fe0cbf470d5721e24f8508ec43d33";
export const PlianContractAddress721Test: string = "0x6B2793D4024bC3A9505133c0649e194488be1a47";

export const calsAddress = (_address: string) => {
    return _address.substring(0, 6) + '...' + _address.substring(_address.length - 4, _address.length)
}

//Date conversion
export const DateConvert = (_time: number): string => {
    const date = new Date(_time * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    const day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
    const hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
    const min = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
    return `${year}/${month}/${day} ${hour}:${min}`
};