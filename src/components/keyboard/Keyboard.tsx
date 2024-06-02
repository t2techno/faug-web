"use client";

import styled from "styled-components";
import * as Toggle from "@radix-ui/react-toggle";
import React, { useEffect, useRef, useState } from "react";
import { FlatNames, SharpNames, freqMap, COLORS } from "./KeyboardConsts";

interface iKeyboardProps {
  startOctave: number;
  numOctaves: number;
  startNote: (freq: number) => void;
  stopNote: () => void;
}

const Keyboard: React.FC<iKeyboardProps> = ({
  startOctave,
  numOctaves,
  startNote,
  stopNote,
}) => {
  const [isFlatNames, setIsFlatNames] = useState(false);
  const [keysActive, setKeysActive] = useState(false);
  const [activeKeyIndex, setActiveKeyIndex] = useState(-1);
  const keyRefs = useRef<HTMLButtonElement[]>([]);
  const frequencyMap = useRef(freqMap(numOctaves, startOctave));

  const addRef = (el: HTMLButtonElement) => {
    if (el && !keyRefs.current.includes(el)) {
      keyRefs.current.push(el);
    }
  };

  const handleMouseEnter = (
    e: React.MouseEvent,
    keyIndex: number,
    noteName: string
  ) => {
    if (!keysActive) return;
    e.preventDefault();

    setActiveKeyIndex(keyIndex);
    startNote(frequencyMap.current[noteName]);
  };

  const handleMouseDown = (
    e: React.MouseEvent,
    keyIndex: number,
    noteName: string
  ) => {
    e.preventDefault();
    setKeysActive(true);
    setActiveKeyIndex(keyIndex);
    startNote(frequencyMap.current[noteName]);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setKeysActive(false);
    setActiveKeyIndex(-1);
    stopNote();
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!keysActive) return;
    e.preventDefault();

    setKeysActive(false);
    setActiveKeyIndex(-1);
    stopNote();
  };

  useEffect(() => {
    if (activeKeyIndex > 0) {
      keyRefs?.current[activeKeyIndex].focus();
    }
  }, [keysActive, activeKeyIndex]);

  const drawKeys = (
    startingOctave: number,
    numOctaves: number
  ): JSX.Element[] => {
    let keys: JSX.Element[] = [];
    let columnIndex = -1;

    for (let i = 0; i < numOctaves; i++) {
      const noteNames = isFlatNames ? FlatNames : SharpNames;
      keys = keys.concat(
        noteNames.map((noteName: string, index: number) => {
          let finalName = noteName + (startingOctave + i);
          const keyIndex = index + i * noteNames.length;
          columnIndex += noteName != "F" && noteName != "C" ? 1 : 2;

          if (noteName.includes("#") || noteName.includes("b")) {
            return (
              <BlackKey
                ref={addRef}
                key={finalName + "_key"}
                name={finalName}
                $columnstart={columnIndex}
                onMouseDown={(e) => {
                  handleMouseDown(e, keyIndex, finalName);
                }}
                onMouseEnter={(e) => {
                  handleMouseEnter(e, keyIndex, finalName);
                }}
                data-note={finalName}
                data-active={keyIndex == activeKeyIndex}
              >
                <Hint>{finalName}</Hint>
              </BlackKey>
            );
          }
          return (
            <WhiteKey
              ref={addRef}
              key={finalName + "_key"}
              name={finalName}
              $columnstart={columnIndex}
              onMouseDown={(e) => {
                handleMouseDown(e, keyIndex, finalName);
              }}
              onMouseEnter={(e) => {
                handleMouseEnter(e, keyIndex, finalName);
              }}
              data-note={finalName}
              data-active={keyIndex == activeKeyIndex}
            >
              <Hint>{finalName}</Hint>
            </WhiteKey>
          );
        })
      );
    }
    return keys;
  };
  return (
    <KeyboardWrapper>
      {/* <HintToggle
        aria-label="Note Names"
        onClick={() => setIsFlatNames((state) => !state)}
      >
        {isFlatNames ? "-> #" : "b <-"}
      </HintToggle> */}
      <KeysWrapper
        style={{ ["--num-col" as any]: 42 }}
        data-active={keysActive}
        onMouseUp={(e) => {
          handleMouseUp(e);
        }}
        onMouseLeave={(e) => {
          handleMouseLeave(e);
        }}
      >
        {drawKeys(startOctave, numOctaves)}
      </KeysWrapper>
    </KeyboardWrapper>
  );
};

const KeyboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 95%;
`;

const Hint = styled.span`
  opacity: 0;
  transition: opacity 0.3s ease-out;
  transition-delay: 250ms;
`;

const HintToggle = styled(Toggle.Root)`
  width: max-content;
  height: fit-content;
`;

const KeysWrapper = styled.div`
  display: grid;
  height: 100%;
  grid-auto-flow: column;
  grid-template-columns: repeat(var(--num-col), 1fr);
  grid-template-rows: 60% 40%;
  gap: 4px;
  height: min(350px, 100%);

  &:hover ${Hint} {
    opacity: 1;
  }
`;

const Key = styled.button<{ $columnstart: number }>`
  grid-column: ${(p) => p.$columnstart} / ${(p) => p.$columnstart + 2};
  border-radius: 2px 2px 8px 8px;
  outline-color: ${COLORS["--gold"]};

  box-shadow: 2px 0px 2px black;
  transition: transform 100ms;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  &:focus {
    border: 4px solid ${COLORS["--gold"]};
    transform: translateY(2px);
  }

  &:hover {
    border: 4px solid ${COLORS["--gold"]};
    transform: translateY(1px);
  }

  &:active {
    background: ${COLORS["--light-gray"]};
    box-shadow: none;
    transform: translateY(3px);
  }

  ${KeysWrapper}[data-active="true"] & {
    &:focus {
      background: ${COLORS["--light-gray"]};
      border: 4px solid ${COLORS["--gold"]};
      transform: translateY(3px);
    }
  }
`;

const WhiteKey = styled(Key)`
  background: ${COLORS["--white"]};
  color: ${COLORS["--black"]};
  grid-row: 1 / 3;
  border: 4px solid ${COLORS["--black"]};
`;

const BlackKey = styled(Key)`
  justify-self: center;
  grid-row: 1 / 2;
  z-index: 2;
  width: 1.5rem;

  color: #eee;
  background: ${COLORS["--black"]};
  &:active {
    background: ${COLORS["--dark-gray"]};
  }
`;
export default Keyboard;
