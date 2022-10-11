"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContextStore = exports.useStore = void 0;
const react_1 = __importStar(require("react"));
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
        set: (state) => setState((prev) => Object.assign({}, prev, state)),
        update: (key, value) => setState(Object.assign(Object.assign({}, state), { [key]: value })),
    };
}
exports.useStore = useStore;
/**
 * createContextStore is a React Context based API.
 * @param {State} initialState - The initial state. Can also be provided via the returned `Store` component
 * @returns An object containing a Store component, a useStore hook, and a useKey hook
 */
function createContextStore(initialState) {
    const Context = (0, react_1.createContext)({
        state: initialState,
        setState: () => { },
    });
    return {
        Store({ state, children }) {
            const [s, setS] = (0, react_1.useState)(state || initialState);
            return (react_1.default.createElement(Context.Provider, { value: { state: s, setState: setS } }, children));
        },
        useStore() {
            const { state, setState } = (0, react_1.useContext)(Context);
            return {
                state,
                set: (state) => setState((prev) => Object.assign({}, prev, state)),
                update: (key, value) => setState(Object.assign(Object.assign({}, state), { [key]: value })),
            };
        },
        useKey(key) {
            const { state, setState } = (0, react_1.useContext)(Context);
            return {
                key,
                value: state[key],
                update: (value) => setState(Object.assign(Object.assign({}, state), { [key]: value })),
            };
        },
    };
}
exports.createContextStore = createContextStore;
