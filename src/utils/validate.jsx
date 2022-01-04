const Validate = (values) => {
  const errors = {};
  let count = 0;
  const requiredFields = ['name', 'email', 'telephone', 'joinedDate', 'route'];
  const emailReg = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    } else {
      errors[field] = 'Filled';
    }
  });

  if (values.email && !emailReg.test(String(values.email).toLowerCase())) {
    errors.email = 'Invalid email address';
  }
  if (
    values.telephone &&
    !(values.telephone.length === 10 && /^\d+$/.test(values.telephone))
  ) {
    errors.telephone = 'Invalid Phone Number';
  }
  Object.values(errors).forEach((value) => {
    if (value === 'Filled') {
      count += 1;
    }
  });
  return { errors, count };
};

export default Validate;
