import axios from "axios";
import React, { useEffect, useState } from "react";
import { ServerURL } from "../utils/Server";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loader from "../components/Loader";
import ErrorComponent from "../components/ErrorComponent";
import CoinCard from "../components/CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  // Symbol taney Condition
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  // console.log("currency", currency);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${ServerURL}/coins/markets?vs_currency=${currency}&page=${page}`
        );

        // console.log("data", data);
        setCoins(data);
        setLoading(false);

        //
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        // console.log(error);
      }
    };
    // Call the function
    fetchCoins();
  }, [currency, page]);

  // Error Catch
  //todo: if error is true, return the ErrorComponent
  if (error) return <ErrorComponent message={"Error While Fetching Coins"} />;

  // Change Page
  const changePage = (index) => {
    setPage(index);
    setLoading(true);
  };

  const nextPage = () => {
    setPage(page + 1);
    setLoading(true);
  };

  const backPage = () => {
    setPage(page - 1);
    setLoading(true);
  };

  //

  //if we have too much page
  const btn = Array(132).fill(1);

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack justifyContent={"center"} p={7}>
            <RadioGroup
              defaultValue="inr"
              onChange={setCurrency}
              value={currency}
            >
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </RadioGroup>
          </HStack>
          {/*  */}
          <HStack wrap={"wrap"} justifyContent={"center"}>
            {coins.map((i) => (
              <CoinCard
                key={i.id}
                id={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                price={i.current_price}
                url={i.url}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          {/*  */}
          <HStack justifyContent={"center"}>
            <HStack justifyContent={"center"}>
              <Button
                onClick={backPage}
                disabled={page === 1 ? true : false}
                colorScheme={"blue"}
              >
                Back
              </Button>
              <Button onClick={nextPage} colorScheme={"blue"}>
                Next
              </Button>
            </HStack>
            {/*  */}
          </HStack>
          {/*  */}
          <HStack w={"full"} overflowX={"scroll"} p={8}>
            {btn.map((item, index) => (
              <Button
                key={index}
                onClick={() => changePage(index + 1)}
                colorScheme={"blue"}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
