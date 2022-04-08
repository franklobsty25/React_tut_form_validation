import { useState, useReducer } from "react";

/**
 *  ===================== CUSTOM HOOK ======================
 */

// For useState

// const useInput = (validateValue) => {

//     const [enteredValue, setEnteredValue] = useState('');
//     const [isTouched, setIsTouched] = useState(false);

//     const valueIsValid = validateValue(enteredValue);
//     const hasError = !valueIsValid && isTouched;

//     const valueChangeHandler = (event) => {
//         setEnteredValue(event.target.value);
//     };

//     const inputBlurHandler = () => {
//         setIsTouched(true);
//     };

//     const reset = () => {
//         setEnteredValue('');
//         setIsTouched(false);
//     };

//     return {
//         value: enteredValue,
//         isValid: valueIsValid,
//         hasError,
//         valueChangeHandler,
//         inputBlurHandler,
//         reset,
//     };
// };

// export default useInput;

// =============================================================================================== //

// For useReducer

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }

  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }

  return initialInputState;
};

const useInput = (validateValue) => {
  const [inputState, dispatchAction] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatchAction({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatchAction({ type: "BLUR" });
  };

  const reset = () => {
    dispatchAction({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
