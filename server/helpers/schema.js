/* eslint no-restricted-syntax: 0 */

const schema = (args, obj) => {
  // check if the property is defined
  for (const arg in args) {
    if (!obj[arg] === undefined) {
      return {
        passed: false,
        message: `The ${arg} attribute is required `
      };
    }
  }

  return {
    passed: true,
    obj
  };
};

export default schema;
