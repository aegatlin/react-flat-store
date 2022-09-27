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
exports.createContextReducerStore = void 0;
const react_1 = __importStar(require("react"));
function createContextReducerStore(reducer, initialState) {
    const Context = (0, react_1.createContext)({ state: initialState, dispatch: () => undefined });
    const internalReducer = (state, action) => {
        switch (action.type) {
            case '_set': {
                return action.data.state;
            }
            case '_update': {
                return Object.assign(Object.assign({}, state), { [action.data.key]: action.data.value });
            }
            default: {
                return reducer(state, action);
            }
        }
    };
    const action = {
        set: (state) => ({ type: '_set', data: { state } }),
        update: (key, value) => ({ type: '_update', data: { key, value } }),
    };
    return {
        Store({ children }) {
            const [state, dispatch] = (0, react_1.useReducer)(internalReducer, initialState);
            return (react_1.default.createElement(Context.Provider, { value: { state, dispatch } }, children));
        },
        useStore() {
            const { state, dispatch } = (0, react_1.useContext)(Context);
            return {
                state,
                set: (state) => dispatch(action.set(state)),
                update: (key, value) => dispatch(action.update(key, value)),
            };
        },
        useKey(key) {
            const { state, dispatch } = (0, react_1.useContext)(Context);
            return {
                key,
                value: state[key],
                update: (value) => dispatch(action.update(key, value)),
            };
        },
        useDispatch() {
            const { dispatch } = (0, react_1.useContext)(Context);
            return dispatch;
        },
    };
}
exports.createContextReducerStore = createContextReducerStore;
