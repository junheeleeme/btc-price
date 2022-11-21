import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { FaWonSign } from "react-icons/fa";
import Spinner from "../../components/spinner";

// 하드코딩된 리스트
import { cryptos, cryptoProp } from "../../crypto";
import { cryptoTypes } from "../../store";

// 리덕스
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

// 소켓
import initSocket from "../../api/socket";

const Main = () => {
  // 시세 리스트
  const cryptoList = useSelector((store: RootState) => store.crypto);

  // State
  const [load, setLoad] = useState(false);
  const [standard, setStandard] = useState(false);
  const [select, setSelect] = useState<string | null>("btc");
  const [selectCrypto, setSelectCrypto] = useState<cryptoProp>(cryptos[0]);
  const [amount, setAmount] = useState("1");
  const [price, setPrice] = useState("0");

  // ref
  const chkRef = useRef<HTMLDivElement>(null);

  // Socket
  useEffect(() => {
    initSocket();
  }, []);

  // 선택한 코인 변경 시 계산 => 코인 개수를 기준으로 가격 변환
  useEffect(() => {
    if (!standard && amount !== "0") {
      // 개수 기준
      const calcPrice = (selectCrypto.price * Number(amount))
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setPrice(calcPrice);
    } else if (standard && price !== "0") {
      // 가격 기준
      const calcPrice = (
        Number(price.replace(/[^0-9]/g, "")) / selectCrypto.price
      ).toFixed(5);
      setAmount(calcPrice);
    }
  }, [selectCrypto]);

  useEffect(() => {
    // 기준 코인이 변경 됐을 때 초기화
    initCrypto(cryptoList);
  }, [select]);

  useEffect(() => {
    // 시세 변동 시 계산 => 코인 개수를 기준으로 가격 변환
    initCrypto(cryptoList);
    if (!load) {
      const isChk = cryptoList.find((c) => c.price === 0);
      isChk === undefined && setLoad(true);
    }
  }, [cryptoList]);

  // 크립토 변경
  // const handleCrypto = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const target = cryptos.find((c) => c.value === e.target.value);
  //   target && setSelectCrypto(target);
  // };

  // 크립토 변경
  const handleSelect = (e: React.MouseEvent<HTMLElement>, select: string) => {
    const target = cryptos.find((c) => c.value === select);
    target && setSelectCrypto(target);
    setSelect(select);
  };

  // 크립토 변경 할 때, 해당 가격 정보 초기화하기
  const initCrypto = (list: cryptoTypes[]) => {
    const current = list.find((c) => c.title === select);
    if (current) {
      setSelectCrypto((prev) => {
        return { ...prev, price: current.price };
      });
    }
  };

  // 크립토 개수 변경
  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!standard) {
      const txt = e.target.value;
      setAmount(txt);
      const total = (selectCrypto.price * Number(txt)).toFixed(0);
      setPrice(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
    // }
  };

  // 원화 금액 변경
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (standard) {
      const _price = e.target.value.replace(/(^0+)/, "").replace(/,/g, "");
      if (_price === "") {
        setPrice("0");
        setAmount("0");
      } else {
        if (isNaN(Number(_price))) {
          setPrice("0");
          setAmount("0");
        } else {
          setPrice(_price.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
          setAmount(
            (Number(_price) / selectCrypto.price).toFixed(5).toString()
          );
        }
      }
    }
  };

  const handlePriceKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!standard) {
      chkRef.current?.classList.add("done");
      setTimeout(() => {
        chkRef.current?.classList.remove("done");
      }, 1000);
    }
  };
  const handleAmountKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (standard) {
      chkRef.current?.classList.add("done");
      setTimeout(() => {
        chkRef.current?.classList.remove("done");
      }, 1000);
    }
  };

  const handleStandard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStandard(e.target.checked);
  };

  if (!load) return <Spinner />;

  return (
    <Container
      className="main"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          width: "400px",
        }}
      >
        {/* <TextField
          id="outlined-select-currency"
          select
          defaultValue={"btc"}
          label="Crypto"
          onChange={handleCrypto}
          sx={{ textAlign: "center" }}
        >
          {cryptos.map((c) => (
            <MenuItem key={c.value} value={c.value}>
              {c.label}
            </MenuItem>
          ))}
        </TextField> */}

        <ToggleButtonGroup
          exclusive
          aria-label="text alignment"
          value={select}
          onChange={handleSelect}
        >
          {cryptos.map((c) => (
            <ToggleButton key={c.value} value={c.value} sx={{ width: "100%" }}>
              {c.icon}
              <Typography ml={1.5} fontWeight="bold" fontSize="large">
                {c.value.toUpperCase()}
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "-20px 0 -5px",
          }}
        >
          <FormGroup ref={chkRef} sx={{ userSelect: "none" }}>
            <FormControlLabel
              control={
                <Checkbox checked={standard} onChange={handleStandard} />
              }
              label="가격 기준"
            />
          </FormGroup>
          <Typography align="right" component="h3" sx={{ fontWeight: "700" }}>
            {`1 ${selectCrypto.value.toUpperCase()} = ${selectCrypto.price.toLocaleString()} KRW`}
          </Typography>
        </Box>

        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Amount"
            className="crypto-input"
            readOnly={standard}
            value={amount}
            type="number"
            onChange={handleAmount}
            onKeyDown={handleAmountKeydown}
            startAdornment={
              <InputAdornment
                position="start"
                sx={{ color: selectCrypto.color }}
              >
                {selectCrypto.icon}
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            className="price-input"
            readOnly={!standard}
            value={price}
            onChange={handlePrice}
            onKeyDown={handlePriceKeydown}
            startAdornment={
              <InputAdornment position="start">
                <FaWonSign size="28" />
              </InputAdornment>
            }
            label="Amount"
          />
        </FormControl>
      </Box>
    </Container>
  );
};

export default Main;
