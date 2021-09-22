import { useState } from 'react';
import { createModel } from '../../../src/index';
import useMoneyModel from './useMoneyModel';

const useTestModel = () => {
  const { addAge } = useMoneyModel();
  const [test, setTest] = useState(0);
  const addTest = () => setTest((test) => test + 1);
  return { addTest, addAge, test };
};
export default createModel(useTestModel, true);
