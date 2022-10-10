function Validator(formSelector) {

  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement
      }
      element = element.parentElement
    }
  }

  var formRules = {}
  /**
   * Quy ước tạo rule:
   * - Nếu có lỗi thì return `error message`
   * - Nếu không có lỗi thì return `undefined`
   */
  var validatorRules = {
    required(value) {
      return value ? undefined : 'Vui lòng nhập trương này'
    },
    email(value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : 'Trường này phải là email.';
    },
    min(min) {
      return (value) => value.length >= min ? undefined : `Vui lòng nhập ${min} ký tự`
    },
    max(max) {
      return (value) => value.length <= max ? undefined : `Vui lòng nhập ${max} ký tự`
    },
  }

  // Lấy ra form element trong DOM theo `formSelector`

  var formElement = document.querySelector(formSelector)

  // chỉ xử lý khi có element trong DOM 
  if (formSelector) {
    var inputs = formElement.querySelectorAll('[name][rules]')
    for (var input of inputs) {

      var rules = input.getAttribute('rules').split('|')
      for (var rule of rules) {
        var ruleInfo
        var isRuleHasValue = rule.includes(':')

        if (isRuleHasValue) {
          ruleInfo = rule.split(':')
          rule = ruleInfo[0]
        }
        var ruleFunc = validatorRules[rule]

        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfo[1])
        }

        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc)
        } else {
          formRules[input.name] = [ruleFunc]
        }
      }

      // Lắng nghe sự kiện để validate (blue, change, ...)
      input.onblur = handleValidate
      input.oninput = handleClearError
    }

    //Hàm thực hiện validate 
    function handleValidate(event) {
      var rules = formRules[event.target.name]
      var errorMessage

      for (var rule of rules) {
        errorMessage = rule(event.target.value)
        if (errorMessage) break
      }

      // Nếu có lỗi thì hiễn thị lỗi ra UI
      if (errorMessage) {
        var formGroup = getParent(event.target, '.form-group')
        if (formGroup) {
          formGroup.classList.add('invalid')
          var formMessage = formGroup.querySelector('.form-message')
          if (formMessage) {
            formMessage.innerText = errorMessage

          }
        }
      }
      return !errorMessage
    }

    // Hàm clear errorMessage
    function handleClearError(event) {
      var formGroup = getParent(event.target, '.form-group')
      if (formGroup.classList.contains('invalid')) {
        formGroup.classList.remove('invalid')
        var formMessage = formGroup.querySelector('.form-message')
        if (formMessage) {
          formMessage.innerText = ''

        }
      }
    }
  }

  // Xử lý hành vi submit form
  formElement.onsubmit = (event) => {
    event.preventDefault()

    var isValid = true
    var inputs = formElement.querySelectorAll('[name][rules]')
    for (var input of inputs) {
      if (!handleValidate({
          target: input
        })) {
        isValid = false
      }
    }

    // Khi không có lỗi thì submit form
    if (isValid) {
      if (typeof this.onSubmit === 'function') {
        var enableInputs = formElement.querySelectorAll('[name]');
        var formValues = Array.from(enableInputs).reduce((values, input) => {

          switch (input.type) {
            case 'radio':
              values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
              break;
            case 'checkbox':
              if (!input.matches(':checked')) {
                values[input.name] = '';
                return values;
              }
              if (!Array.isArray(values[input.name])) {
                values[input.name] = [];
              }
              values[input.name].push(input.value);
              break;
            case 'file':
              values[input.name] = input.files;
              break;
            default:
              values[input.name] = input.value;
          }

          return values;
        }, {});
        this.onSubmit(formValues)
      } else {
        formElement.submit()
      }
    }
  }
}