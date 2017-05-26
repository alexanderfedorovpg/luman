import React from 'react'
import FormSelect from 'components/Form/Select'

const Select = ({ input, meta: { touched, invalid, valid, error }, showError, ...props }) => {

    return (
        <FormSelect
            {...props}
            value={input.value}
            onChange={option => {
                input.onChange(option)
            }}
            labelKey="name"
            clearable={false}
            placeholder="Выберите редактора"
            labelRenderer={value => (
                value.name
            )}
            optionRenderer={option => (
                option.name
            )} />
    )
}

export default Select
