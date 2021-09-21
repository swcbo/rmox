import { useRef } from 'react';
const useInit = (fun: () => void) => {
  const isInit = useRef(true);
  if (isInit) {
    fun();
    isInit.current = false;
  }
};

export default useInit;
