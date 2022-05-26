import { useState, useEffect } from "react";
import validator from 'validator';

const useValidation = (value, validationRules) => {
    const [status, setStatus] = useState({
        isValid: true,
        errorText: ''
    });

    const setValid = () => {
        setStatus({
            isValid: true,
            errorText: ''
        })
    };

    const validateOnEmpty = () => {
        value
            ? setValid()
            : setStatus({
                isValid: false,
                errorText: 'Поле не может быть пустым'
            });

        return value;
    };

    const validateOnMinLength = (minLength) => {
        value.length < minLength
            ? setStatus({
                isValid: false,
                errorText: `Минимальное количество символов: ${minLength}`
            })
            : setValid();

        return value.length > minLength;
    };

    const validateOnMaxLength = (maxLength) => {
        value.length > maxLength
            ? setStatus({
                isValid: false,
                errorText: `Максимальное количество символов: ${maxLength}`
            })
            : setValid();
        return value.length < maxLength;
    };

    const validateEmail = () => {
        validator.isEmail(value)
            ? setValid()
            : setStatus({
                isValid: false,
                errorText: 'Некорректный адрес электронной почты'
            });

        return validator.isEmail(value);
    };

    const validateName = () => {
        // только латиница, кириллица, пробел или дефис
        const nameRegEx = /^[a-zA-Zа-яА-ЯёЁ -]+$/;

        nameRegEx.test(value)
            ? setValid()
            : setStatus({
                isValid: false,
                errorText: 'Имя может содержать только латиницу, кириллицу, пробел или дефис'
            });

        return nameRegEx.test(value);
    };

    useEffect(() => {
        rulesLoop: for (let rule in validationRules) {
            switch (rule) {
                case 'required':
                    if (!validateOnEmpty()) break rulesLoop;
                    break;
                case 'minLength':
                    if (!validateOnMinLength(validationRules[rule])) break rulesLoop;
                    break;
                case 'maxLength':
                    if (!validateOnMaxLength(validationRules[rule])) break rulesLoop;
                    break;
                case 'email':
                    if (!validateEmail()) break rulesLoop;
                    break;
                case 'name':
                    if (!validateName()) break rulesLoop;
                    break;
                default:
                    setValid();
            }
        }
    }, [value]);

    return {
        isValid: status.isValid,
        errorText: status.errorText
    }
};

const useInput = (initialValue, validationRules) => {
    const [value, setValue] = useState(initialValue);
    const validation = useValidation(value, validationRules);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    return {
        value,
        onChange,
        isValid: validation.isValid,
        errorText: validation.errorText
    };
};

export { useInput };