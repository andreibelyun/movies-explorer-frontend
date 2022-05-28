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

    const setInvalid = (errorText) => {
        setStatus({
            isValid: false,
            errorText
        })
    };

    const validate = (isValid, errorText) => {
        isValid ? setValid() : setInvalid(errorText);
    };

    const checkOnEmpty = () => {
        return value;
    };

    const checkOnMinLength = (minLength) => {
        return value.length >= minLength;
    };

    const checkOnMaxLength = (maxLength) => {
        return value.length <= maxLength
    };

    const checkEmail = () => {
        return validator.isEmail(value);
    };

    const checkName = () => {
        // только латиница, кириллица, пробел или дефис
        const nameRegEx = /^[a-zA-Zа-яА-ЯёЁ -]+$/;

        return nameRegEx.test(value);
    };

    useEffect(() => {
        rulesLoop: for (let rule in validationRules) {
            switch (rule) {
                case 'required':
                    validate(
                        checkOnEmpty(),
                        'Поле не может быть пустым'
                    );
                    if (!checkOnEmpty()) break rulesLoop;
                    break;
                case 'minLength':
                    const minLength = validationRules[rule];
                    validate(
                        checkOnMinLength(minLength),
                        `Минимальное количество символов: ${minLength}`
                    );
                    if (!checkOnMinLength(minLength)) break rulesLoop;
                    break;
                case 'maxLength':
                    const maxLength = validationRules[rule];
                    validate(
                        checkOnMaxLength(maxLength),
                        `Максимальное количество символов: ${maxLength}`
                    );
                    if (!checkOnMaxLength(maxLength)) break rulesLoop;
                    break;
                case 'email':
                    validate(
                        checkEmail(),
                        'Некорректный адрес электронной почты'
                    );
                    if (!checkEmail()) break rulesLoop;
                    break;
                case 'name':
                    validate(
                        checkName(),
                        'Имя может содержать только латиницу, кириллицу, пробел или дефис'
                    );
                    if (!checkName()) break rulesLoop;
                    break;
                default:
                    setValid();
            }
        }
    }, [value]);

    // при первой загрузке страницы не показываем ошибки - не юзерфрендли
    useEffect(() => {
        setValid();
    }, []);

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