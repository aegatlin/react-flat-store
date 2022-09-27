"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStore = void 0;
const react_1 = require("react");
/**
 * `useStore` is a React hook.
 * @param {State} initialState - The initial state.
 * @returns `state`, the current state; `set`, a function that overwrites the
 * state; `update`, a function that updates a specific key.
 */
function useStore(initialState) {
    const [state, setState] = (0, react_1.useState)(initialState);
    return {
        state,
        set: (state) => setState(state),
        update: (key, value) => setState(Object.assign(Object.assign({}, state), { [key]: value })),
    };
}
exports.useStore = useStore;
