import { cryptos } from "../crypto";

const UPDATE = () => "UPDATE";
export const update = (data: cryptoTypes) => ({ type: UPDATE, data: data });

type updateAction = ReturnType<typeof update>;

export type cryptoTypes = {
  title: string;
  ticker: string;
  price: number;
};

const initialState: cryptoTypes[] = [];
cryptos.forEach((c) => {
  initialState.push({
    title: c.value,
    ticker: c.ticker,
    price: c.price,
  });
});

const crypto = (state: cryptoTypes[] = initialState, action: updateAction) => {
  switch (action.type) {
    case UPDATE:
      const idx = state.findIndex((s) => s.title === action.data.title);
      state.splice(idx, 1, action.data);
      return [...state];
    default:
      return state;
  }
};

export default crypto;
