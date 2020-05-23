import { useState, useCallback, ChangeEvent } from 'react';

// Work around the lint fail if inlined in the function definition:
// > Expected indentation of 4 spaces but found 2  @typescript-eslint/indent
export type UseInputValue = [
  string,
  (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
];

const useInput = (initialValue: string = ''): UseInputValue => {
  const [value, setValue] = useState(initialValue);
  const updateValue = useCallback(
    (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValue(evt.target.value),
    [setValue]
  );

  return [value, updateValue];
};

export default useInput;
