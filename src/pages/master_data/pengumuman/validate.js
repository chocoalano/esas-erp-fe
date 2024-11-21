import { reactive } from 'vue';

export function useValidate(initialErrors = {}) {
  const errors = reactive({ ...initialErrors });

  const validateField = (field, value, rules) => {
    let isValid = true;
    if (rules.required && !value) {
      errors[field] = 'Field ini wajib diisi.';
      isValid = false;
    } else if (rules.minLength && value.length < rules.minLength) {
      errors[field] = `Minimal ${rules.minLength} karakter.`;
      isValid = false;
    } else {
      errors[field] = '';
    }
    return isValid;
  };

  const resetErrors = () => {
    Object.keys(errors).forEach((key) => {
      errors[key] = '';
    });
  };

  return { validateField, errors, resetErrors };
}
