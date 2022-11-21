import { cryptos } from "../crypto";
import { store } from "../store/store";
import { update } from "../store";
import { toast } from "react-toastify";

const currency = [
  { ticket: "macjjuni" },
  { type: "ticker", codes: ["KRW-BTC", "KRW-ETH", "KRW-XRP"] },
  { format: "SIMPLE" },
];

cryptos.forEach((c) => {
  currency.forEach((cur) => {
    if (cur.type === "ticker") cur.codes.push(c.ticker);
  });
});

// 소켓 생성
const socket = new WebSocket("wss://api.upbit.com/websocket/v1");
socket.binaryType = "arraybuffer";

const initSocket = () => {
  socket.onopen = () => {
    socket.send(JSON.stringify(currency));
    toast.success("WebSocket 연결 성공!");
  };

  socket.onmessage = (evt) => {
    const enc = new TextDecoder("utf-8");
    const arr = new Uint8Array(evt.data);
    const data = JSON.parse(enc.decode(arr));

    const _data = {
      title: data.cd.split("-")[1].toLowerCase(),
      ticker: data.cd,
      price: data.tp,
    };
    // 리덕스: 스토어 정보 업데이트
    store.dispatch(update(_data));
  };

  socket.onerror = (evt) => {
    socket.close();
    toast.error("WebSocket Error!");
    console.error(evt);
  };
};

export default initSocket;
