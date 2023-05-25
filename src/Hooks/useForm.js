import { useState } from 'react';

const types = {
  email: {
    regex: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
    message: 'Preencha um E-mail válido',
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:'A senha precisa ter 1 caractere maiúsculo, 1 caractere minúsculo e 1 dígito.com no mínimo 8 caracteres'
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize apenas números'
  }
};

const useForm = (type) => {
  const[value, setValue] = useState('');
  const[error, setError] = useState(null);

  function validate(value) {
    if(type === false) return true;
    if(value.length === 0) {
      setError('Preencha um valor')
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if(error) validate(target.value)
    setValue(target.value)
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  }
}

export default useForm