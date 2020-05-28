import { useState, useEffect, useRef, useCallback } from "react";

function useUpgradeState(init, initFlag) {
  const [state, setState] = useState(init);
  const flag = useRef(initFlag);

  useEffect(() => () => (flag.current = false), []);

  const setUpState = useCallback(
    (newState) => flag.current && setState(newState),
    [setState]
  );

  return [state, setUpState];
}

export default useUpgradeState;
