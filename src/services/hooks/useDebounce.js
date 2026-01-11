import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  console.log(value);
  console.log(delay);
  

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
