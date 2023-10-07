import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { ServerURL } from "../utils/Server";
import axios from "axios";
import { useParams } from "react-router-dom";
import ErrorComponent from "../components/ErrorComponent";
import Chart from "../components/Chart";

const CoinDetails = () => {
  // useState
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  //* useParams
  const params = useParams();

  //* Symbol taney Condition
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  //* Button
  const btns = ["24h", "7d", "14d", "30d", "60d", "90d", "180d", "365d", "max"];

  //
  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;

      case "7d":
        setDays("7d");
        setLoading(true);
        break;

      case "14d":
        setDays("14d");
        setLoading(true);
        break;

      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;

      case "90d":
        setDays("90d");
        setLoading(true);
        break;

      case "180d":
        setDays("180d");
        setLoading(true);
        break;

      case "365d":
        setDays("365d");
        setLoading(true);
        break;

      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  //* useEffect
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${ServerURL}/coins/${params.id}`);

        // Data get for Chart
        const { data: ChartData } = await axios.get(
          `${ServerURL}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
        );

        setCoin(data);
        setChartArray(ChartData.prices);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    //* Call the function
    fetchCoins();
  }, [params.id, currency, days]);

  //! Error Catch it true
  if (error)
    return <ErrorComponent message={"Error While Fetching Coin Details"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box w={"full"} borderWidth={1}>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>
          {/* Button */}
          <HStack justifyContent={"center"} my={4} p={4} wrap={"wrap"}>
            {btns.map((i) => (
              <Button key={i} onClick={() => switchChartStats(i)}>
                {i}
              </Button>
            ))}
          </HStack>
          {/*  */}
          {/* Radio */}
          <HStack justifyContent={"center"}>
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
          <VStack spacing={4} p={16} alignItems={"center"}>
            <Text alignSelf={"center"} fontSize={"small"} opacity={0.7}>
              Last Update on{Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image src={coin.image.large} w={16} h={16} objectFit={"contain"} />
            {/* //Stat just like wrap tag */}
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />{" "}
                {coin.market_data.price_change_percentage_24h}%{" "}
              </StatHelpText>
            </Stat>
            {/*  */}
            <Badge fontSize={"2x1"} colorScheme={"green"}>
              {`#${coin.market_cap_rank}`}
            </Badge>
            {/*  */}
            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />
            {/*  */}
            <Box w={"full"} p={4}>
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

// CustomBar
const CustomBar = ({ low, high }) => {
  return (
    <VStack>
      <Progress value={50} colorScheme="teal" w={"full"} />
      <HStack w={"full"} justifyContent={"space-between"}>
        <Badge children={low} colorScheme="red" />
        <Text fontSize={"sm"}>24H range </Text>
        <Badge children={high} colorScheme="green" />
      </HStack>
    </VStack>
  );
};

// Item
const Item = ({ title, value }) => {
  return (
    <HStack w={"full"} justifyContent={"space-between"} my={4}>
      <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"} fontSize={"sm"}>
        {title}
      </Text>
      <Text fontSize={"sm"}>{value}</Text>
    </HStack>
  );
};

export default CoinDetails;
