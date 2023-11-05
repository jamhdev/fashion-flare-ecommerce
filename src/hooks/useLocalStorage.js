import React, { useEffect, useState } from "react";

export default function useLocalStorage(localStorageKey, initialArray = []) {
  const [localStorageArray, setLocalStorageArray] = useState(() => {
    if (localStorage.getItem(`${localStorageKey}`)) {
      return JSON.parse(localStorage.getItem(`${localStorageKey}`));
    } else {
      localStorage.setItem(`${localStorageKey}`, JSON.stringify(initialArray));
      return initialArray;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      `${localStorageKey}`,
      JSON.stringify(localStorageArray)
    );
  }, [localStorageArray, localStorageKey]);

  return [localStorageArray, setLocalStorageArray];
}
