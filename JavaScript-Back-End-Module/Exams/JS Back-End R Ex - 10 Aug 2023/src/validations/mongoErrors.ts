import { Error } from "mongoose";

const extractMongoError = (error:Error.ValidationError) => {

    const errorMessages = [];

    for (const field in error.errors) {
      if (error.errors.hasOwnProperty(field)) {
        errorMessages.push(error.errors[field].message);
      }
    }

    return errorMessages;

}

export default extractMongoError