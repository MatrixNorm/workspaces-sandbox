import React from "react";
import { Machine, assign, interpret } from "xstate";
import { useService } from "@xstate/react";

function debounceMachineDefinition({
  machineId,
  debounceDuration,
  initialInputValue
}) {
  return {
    id: machineId,
    context: {
      inputValue: initialInputValue
    },
    initial: "idle",
    states: {
      idle: {
        on: {
          TYPING: {
            target: "typing",
            actions: ["updateInputValue", "onStartTyping"]
          },
          RESET: {
            actions: "updateInputValue"
          }
        }
      },
      typing: {
        on: {
          TYPING: {
            target: "typing",
            actions: "updateInputValue"
          }
        },
        after: {
          [debounceDuration]: {
            target: "idle",
            actions: "onFinishTyping"
          }
        }
      }
    }
  };
}

export function TextInputDebounced({ service }) {
  console.log("render: TextInputDebounced");
  const [current, send] = useService(service);
  return (
    <div>
      <input
        type="text"
        onChange={e => send({ type: "TYPING", value: e.target.value })}
        value={current.context.inputValue}
      />
      {current.matches("typing") && <i>typing...</i>}
    </div>
  );
}

export function createElement({
  debounceDuration = 500,
  initialInputValue = "",
  onStartTyping,
  onFinishTyping
}) {
  const defs = debounceMachineDefinition({
    machineId: "debounceMachine",
    debounceDuration,
    initialInputValue
  });
  const opts = {
    actions: {
      updateInputValue: assign({ inputValue: (_ctx, evt) => evt.value }),
      onStartTyping: ctx => onStartTyping(ctx.inputValue),
      onFinishTyping: ctx => onFinishTyping(ctx.inputValue)
    }
  };
  const machine = Machine(defs, opts);
  const service = interpret(machine);
  service.start();
  return [
    React.createElement(TextInputDebounced, { service }),
    value => service.send({ type: "RESET", value })
  ];
}
