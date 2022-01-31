import React from "react";
import {Field, Form, Formik} from "formik";
import {FilterType} from "../../Redux/support_reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../Redux/user_selectors";

const usersSearchFormValidate = (values: any) => {
    const errors = {};
}
type UsersSearchFormPropsType = {
    onFilterChanged:(filter:FilterType) => void
}
type formType ={
    term:string,
    friend: string
}
const UsersSearchForm:React.FC<UsersSearchFormPropsType> = React.memo((props) => {
    const filter = useSelector(getUsersFilter)
    const submit = (values:formType, {setSubmitting}:{setSubmitting:(a:boolean) => void}) => {
        const filter:FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : (values.friend === "true" ? true : false)
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }
    return<div>
        <Formik
            enableReinitialize={true}
            initialValues={{term: filter.term, friend: String(filter.friend)}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>

})

export default UsersSearchForm