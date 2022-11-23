import React from 'react'
import { Form } from 'react-bootstrap';

function GlobalForm({ name, onChange, className, type, placeholder, required, autofocus, autocomplete, disabled }) {
    return (
        <Form.Control
            name={name}
            onChange={onChange}
            className={className}
            type={type}
            placeholder={placeholder}
            required={required}
            autoFocus={autofocus}
            autoComplete={autocomplete}
            disabled={disabled}
        />
    )
}

export default GlobalForm;