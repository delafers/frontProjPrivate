import React from "react";
import {Field, WrappedFieldProps} from "redux-form";
import s from "./FormsControls.module.css"
import {ValidatorField} from "../../../utils/validators/validator";

type FormsControlParamsType = {
    children: React.ReactNode,
    meta:{
        touched:boolean,
        error:string
    }
}

type FormsControlsType = (params:FormsControlParamsType) => React.ReactNode

export const FormControl:FormsControlsType = ({children, meta: {touched, error}}) => {
    const hasError = touched && error
    return(
        <div>
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    return(
        <div className={s.formControl + " " + s.error}>
            <textarea {...input} {...props}/>
        </div>
    )
}
export const Input: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasErrorZeroLength = meta.touched && meta.error
    return(
        <div className={s.formControl + " " + (hasErrorZeroLength ? s.error : "")}>
            <input {...input} {...props}/>
            {hasErrorZeroLength && <span>{meta.error}</span>}
        </div>
    )
}


export function createField<FormTypesKeys extends string> (placeholder:string | undefined, name:FormTypesKeys,
                            validators:Array<ValidatorField>, component:React.FC<WrappedFieldProps>,
                            type ={}, props={}, text="") {
    return <span>
        <Field placeholder={placeholder} name={name}
               validate={validators} component={component} type={type} {...props}/>{text}
    </span>
}

export type GetStringKeys<T> = Extract<T, string>