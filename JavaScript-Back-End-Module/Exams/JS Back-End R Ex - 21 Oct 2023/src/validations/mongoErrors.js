const extractMongoError = (error) => {

  const errorMessages = [];

  for (const field in error.errors) {
    if (error.errors.hasOwnProperty(field)) {
      errorMessages.push(error.errors[field].message);
    }
  }

  return errorMessages;

}

module.exports = extractMongoError