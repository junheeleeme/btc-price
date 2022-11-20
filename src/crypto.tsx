import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiRipple } from "react-icons/si";

export interface cryptoProp {
  label: string;
  value: string;
  ticker: string;
  price: number;
  icon: JSX.Element;
  color: string;
}

export const cryptos: cryptoProp[] = [
  {
    label: "BTC(BitCoin)",
    value: "btc",
    ticker: "KRW-BTC",
    price: 0,
    icon: <FaBitcoin size="28" color="#f7931a" />,
    color: "#f7931a",
  },
  {
    label: "ETH(Ethereum)",
    value: "eth",
    ticker: "KRW-ETH",
    price: 0,
    icon: <FaEthereum size="28" color="#3c3c3d" />,
    color: "#3c3c3d",
  },
  {
    label: "XRP(Ripple)",
    value: "xrp",
    ticker: "KRW-XRP",
    price: 0,
    icon: <SiRipple size="28" color="#006097" />,
    color: "#006097",
  },
];
