import { useEffect, useRef, useState } from "react";

type ComponentMap = Record<string, any[]>;
type paramChangeMethod = (path: string, value: any) => void;
interface ValueOut {
  register: paramChangeMethod;
  paramChangeByDSP: paramChangeMethod;
}

const useFaust = (paramChangeIn?: paramChangeMethod): ValueOut => {
  const [componentMap, setComponentMap] = useState<ComponentMap>({});
  const hostWindow = useRef<MessageEventSource | null>(null);

  const messageHandler = (e: MessageEvent<any>) => {
    const { data, source } = e;
    hostWindow.current = source;
    const { type } = data;
    if (!type) return;
    const { path, value } = data;
    paramChangeByDSP(path, value);
  };

  useEffect(() => {
    window.addEventListener("message", messageHandler);
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  const paramChangeByDSP = (path: string, value: any) => {
    if (componentMap[path])
      componentMap[path].forEach((item: any) => item.setState({ value }));
  };

  const paramChangeByUI = paramChangeIn
    ? paramChangeIn
    : (path: string, value: any) => {
        if (!hostWindow.current) return;
        hostWindow.current.postMessage({ path, value, type: "param" }); //,"*"
      };

  /**
   * This method should be called by components to register itself to map.
   */
  const register = (path: string, item: any) => {
    const newCompMap = { ...componentMap };
    if (componentMap[path]) {
      newCompMap[path].push(item);
    } else {
      newCompMap[path] = [item];
    }
    setComponentMap(newCompMap);
  };

  return { register, paramChangeByDSP };
};

export default useFaust;
