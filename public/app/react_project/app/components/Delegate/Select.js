import React from 'react'
import FormSelect from 'components/Form/Select'

function Select(props) {

    return (
        <FormSelect
            {...props}
            labelKey="name"
            valueKey="id"
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
