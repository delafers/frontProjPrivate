export type ValidatorField = (value:string) => string | undefined

export const required:ValidatorField = (value) => {
    if (value) return undefined;
    return 'Field is required';
}

export const maxLengthCreator = (maxlength:number):ValidatorField => (value) =>{
    if (value.length > maxlength) return `Max length is ${maxlength} symbols`
}