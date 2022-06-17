import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./styles.scss";

export function TesteLayoutEffectHook() {
  const [margin, setMargin] = useState(0);

  const setmarginFn = useCallback(() => {
    setMargin(10);
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("scroll", setmarginFn);

    return () => window.removeEventListener("scroll", setmarginFn);
  }, []);

  useLayoutEffect(() => {
    console.log(ref.current?.getBoundingClientRect());
    if (
      ref.current &&
      ref.current?.getBoundingClientRect().left <
        document.body.getBoundingClientRect().left
    ) {
      setMargin(20);
    }
  }, [margin]);

  return (
    <div
      ref={ref}
      className="TesteLayoutEffectHook"
      style={{ marginLeft: margin }}
    ></div>
  );
}
