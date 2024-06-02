import { useEffect, useRef, useState } from "react";
import runFaust from "./faust";
import { FaustAudioWorkletNode } from "@/dsp/faust-wasm";
import inputList, { OSC_ONE_ON } from "./inputList";

type ComponentMap = Record<string, any[]>;
type paramChangeMethod = (path: string, value: any) => void;
interface ValueOut {
  register: paramChangeMethod;
  paramChangeByDSP: paramChangeMethod;
  paramChangeByUI: paramChangeMethod;
  paramState: Record<string, number>;
  toggleParam: (param: string) => void;
  startNote: (freq: number) => void;
  stopNote: () => void;
}

const useFaust = (): ValueOut => {
  const [componentMap, setComponentMap] = useState<ComponentMap>({});
  const [paramState, setParamState] = useState<Record<string, number>>({});
  const [isStarted, setIsStarted] = useState(false);
  const hostWindow = useRef<MessageEventSource | null>(null);
  const faustNodeRef = useRef<FaustAudioWorkletNode<false>>();
  const audioCtxRef = useRef<AudioContext>();

  const messageHandler = (e: MessageEvent<any>) => {
    const { data, source } = e;
    hostWindow.current = source;
    const { type } = data;
    if (!type) return;
    const { path, value } = data;
    paramChangeByDSP(path, value);
  };

  useEffect(() => {
    // @ts-ignore - my computer doesn't like webkitAudioContext
    const AudioCtx = window?.AudioContext || window?.webkitAudioContext;
    const audioContext = new AudioCtx({
      latencyHint: 0.00001,
      // echoCancellation: false,
      // autoGainControl: false,
      // noiseSuppression: false,
    });
    audioCtxRef.current = audioContext;

    const runEffect = async () => {
      const faustNode = await runFaust(audioContext);
      faustNode.setParamValue(OSC_ONE_ON, 1.0);
      faustNodeRef.current = faustNode;
      const paramList: Record<string, number> = {};
      faustNode.getDescriptors().forEach((param) => {
        if (param.address == OSC_ONE_ON) {
          paramList[param.address] = 1.0;
        } else {
          paramList[param.address] = param.init ?? 0.0;
        }
      });
      setParamState(paramList);
    };

    runEffect();

    return () => {
      faustNodeRef.current?.stop();
      audioContext.close();
    };
  }, []);

  useEffect(() => {
    window.addEventListener("message", messageHandler);
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  const paramChangeByDSP = (param: string, value: any) => {
    console.log("param change by DSP");
    if (componentMap[param])
      componentMap[param].forEach((item: any) => item.props.param({ value }));
    const newState = { ...paramState };
    newState[param] = value;
    setParamState(newState);
  };

  const paramChangeByUI = (param: string, value: any) => {
    console.log("param change " + param + " - " + value);
    if (faustNodeRef.current) {
      const newState = { ...paramState };
      newState[param] = value;
      setParamState(newState);
      faustNodeRef.current.setParamValue(param, value);
      return;
    } else if (hostWindow.current) {
      //fallback
      const newState = { ...paramState };
      newState[param] = value;
      setParamState(newState);
      hostWindow.current.postMessage({ param, value, type: "param" }); //,"*"
    }
  };

  const toggleParam = (param: string) => {
    paramChangeByUI(param, paramState[param] == 1 ? 0 : 1);
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

  const start = () => {
    if (!audioCtxRef.current) {
      return;
    }
    setIsStarted(true);

    audioCtxRef.current.resume();
  };

  const stop = () => {
    if (!audioCtxRef.current) {
      return;
    }
    setIsStarted(false);
    audioCtxRef.current.suspend();
    paramChangeByUI(inputList.GATE, 0.0);
    paramChangeByUI(inputList.OSC_ONE_ON, 0.0);
  };

  const startNote = (freq: number) => {
    if (!isStarted) {
      console.log("starting synth for first time");
      start();
    }
    console.log("starting note with freq " + freq);
    paramChangeByUI(inputList.GATE, 1.0);

    // no glide for right now
    paramChangeByUI(inputList.PREV_FREQ, freq);
    paramChangeByUI(inputList.FREQ, freq);
  };

  const stopNote = () => {
    paramChangeByUI(inputList.GATE, 0.0);
  };

  return {
    register,
    paramChangeByDSP,
    paramChangeByUI,
    paramState,
    toggleParam,
    startNote,
    stopNote,
  };
};

export default useFaust;
