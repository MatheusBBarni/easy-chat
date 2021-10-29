import { useEffect, useState } from 'react'

const useLocalstorage = <T>(key: string, defaultValue: T): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    const localStorageItem = localStorage.getItem(key);
    if (!localStorageItem) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }
    setState((prevState) => {
      try {
        const localstorageItem = localStorage.getItem(key);
        if (localstorageItem) {
          return JSON.parse(localstorageItem)
        }
        return prevState;
      } catch (error) {
        console.log(error);
        return prevState;
      }
    })
  }, [key, defaultValue]);

  function setValue(value: T) {
    localStorage.setItem(key, JSON.stringify(value));
    setState(value);
  }

  return [state, setValue];

}

export default useLocalstorage;