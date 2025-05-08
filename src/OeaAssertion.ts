enum ContainsValue {
    STRING = 'string',
    NUMBER = 'number',
  }
  
  // To hold assertion errors temporarily
  let assertionErrors: { message: string }[] = [];
  /**
   * oeaAssertion - A class for performing soft assertions.
   *
   * This class provides methods to perform soft assertions, which do not throw errors immediately
   * but instead collect them and throw them all at once when `softAssertAll` is called.
   *
   * @class
   */
  export default class OeaAssertion {
    /**
     * assert - Check if the actual value is strictly equal to the expected value.
     *
     * ---
     * @param actual {any} - The value for the assertion
     * @param expected {any} - The value to be asserted
     * @param message {object} - The message object containing details about the assertion
     *
     * ---
     * To know more about the strick equality works, please refer to the following link: [Strict equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)
     */
    assert = (
      actual: any,
      expected: any,
      message: { page?: string; errorMsg: string }
    ) => {
      if (actual !== expected) {
        assertionErrors.push({
          message: `🔪${message}\n🙅🏼 Actual: ${actual}\n💁🏼 Expected: ${expected}`,
        });
      }
    };
  
    /**
     * contains - Check if the actual value includes the expected value.
     *
     * ---
     * @param actual {string | number} - The actual value to be checked.
     * @param expected {string | number} - The expected value to check for.
     * @param message {string} - The message to be displayed if the assertion fails.
     *
     * ---
     * To know more how includes works, please refer to the following link: [includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
     */
    contains = (
      actual: ContainsValue,
      expected: ContainsValue,
      message: string
    ) => {
      if (!String(actual).includes(String(expected))) {
        assertionErrors.push({
          message: `${message}\n💁🏼 Actual: "${actual}" does not contain "${expected}"`,
        });
      }
    };
  
    /**
     * isTrue - Check if the value is strictly true.
     *
     * @param value {boolean} - The value for the assertion
     * @param message {string} - The message to be displayed if the assertion fails
     */
    isTrue = (value: boolean, message: string) => {
      if (!value) {
        assertionErrors.push({
          message: `${message}\n💁🏼 Expected: true, but got: ${value}`,
        });
      }
    };
  
    /**
     * isFalse - Check if the value is strictly false.
     *
     * @param value {boolean} - The value for the assertion
     * @param message {string} - The message to be displayed if the assertion fails
     */
    isFalse = (value: boolean, message: string) => {
      if (value) {
        assertionErrors.push({
          message: `${message}\n💁🏼 Expected: false, but got: ${value}`,
        });
      }
    };
  
    /**
     * isNotEqual - Check if the actual value is not equal to the expected value.
     *
     * @param actual {any} - The actual value to be compared.
     * @param expected {any} - The expected value to compare against.
     * @param message {string} - The message to be displayed if the assertion fails.
     */
    isNotEqual = (actual: any, expected: any, message: string) => {
      if (actual === expected) {
        assertionErrors.push({
          message: `${message}\n💁🏼 Values were not supposed to be the same. Got: ${actual}`,
        });
      }
    };
  
    /**
     * isGreaterThan - Check if the actual value is greater than the expected value.
     *
     * @param actual {number} - The actual value to be compared.
     * @param expected {number} - The expected value to compare against.
     * @param message {string} - The message to be displayed if the assertion fails.
     */
    isGreaterThan = (actual: number, expected: number, message: string) => {
      if (actual <= expected) {
        assertionErrors.push({
          message: `${message}\n💁🏼 ${actual} is not greater than ${expected}`,
        });
      }
    };
  
    /**
     * isLessThan - Check if the actual value is less than the expected value.
     *
     * @param actual {number} - The actual value to be compared.
     * @param expected {number} - The expected value to compare against.
     * @param message {string} - The message to be displayed if the assertion fails.
     */
    isLessThan = (actual: number, expected: number, message: string) => {
      if (actual >= expected) {
        assertionErrors.push({
          message: `${message}\n💁🏼 ${actual} is not less than ${expected}`,
        });
      }
    };
  
    /**
     * isNotNull - Check if the value is not null or undefined.
     *
     * @param value {any} - The value to be checked.
     * @param message {string} - The message to be displayed if the assertion fails.
     */
    isNotNull = (value: any, message: string) => {
      if (value === null || value === undefined) {
        assertionErrors.push({
          message: `${message}\n💁🏼 Received value is: ${value}. It should not be null or undefined`,
        });
      }
    };
  
    /**
     * Throw error(if any) for all assertions
     */
    assertAll = () => {
      console.log('running', assertionErrors);
      if (assertionErrors.length > 0) {
        this.printResults();
        assertionErrors = [];
      }
    };
  
    /**
     * printResults - A private method to format and throw all collected assertion errors.
     *
     * @private
     * @throws {Error} - Throws an error containing all assertion error messages.
     */
    private printResults = () => {
      const errorMessages = assertionErrors
        .map(
          ({ message }: { message: string }, index: number) =>
            `❌ [Assertion ${index + 1}]: \n${message}\n`
        )
        .join('\n');
      throw new Error(
        `Assertion Errors(click to expand Allure report):\n${errorMessages}`
      );
    };
  }
  