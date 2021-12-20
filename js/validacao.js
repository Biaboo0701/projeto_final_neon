const fields = document.querySelectorAll('[required]')

function validateField(field) {
  // logica para verificar se existe erros
  function verifyErrors() {
    let foundError = false

    for (let error in field.validity) {
      // se não for custom error então verifica se tem erro
      if (field.validity[error] && !field.validity.valid) {
        foundError = error
      }
    }

    console.log(foundError)
    return foundError
  }

  //Trocar a menssagem de erro
  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: 'Por favor, preencha este campo',
        patternMismatch: 'Por favor preencha uma data válida'
      },
      email: {
        valueMissing: 'Email é obrigatório',
        typeMismatch: 'Por favor use um email válido',
        patternMismatch: 'Por favor use um email válido'
      },
      password: {
        valueMissing: 'Senha é obrigatório',
        typeMismatch: 'Por favor use uma senha válida'
      },
      date: {
        valueMissing: 'preencha com uma data, por favor',
        typeMismatch: 'Por favor use uma data válida'
      },
      number: {
        valueMissing: 'Por favor, preencha este campo'
      }
    }
    return messages[field.type][typeError]
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector('span.error')
    if (message) {
      spanError.classList.add('active')
      spanError.innerHTML = message
    } else {
      spanError.classList.remove('active')
      spanError.innerHTML = ''
    }
  }

  return function () {
    const error = verifyErrors()
    if (verifyErrors()) {
      const message = customMessage(error)
      field.style.borderColor = 'red'
      setCustomMessage(message)
    } else {
      field.style.borderColor = 'green'
      setCustomMessage()
    }
  }
}

function customValidation(event) {
  const field = event.target
  const validation = validateField(field)
  validation()
}

for (field of fields) {
  field.addEventListener('invalid', event => {
    //Eliminar o bubble
    event.preventDefault()
    customValidation(event)
  })
  field.addEventListener('blur', customValidation)
}