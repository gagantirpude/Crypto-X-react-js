import axios from "axios";
import React, { useEffect, useState } from "react";
import { ServerURL } from "../utils/Server";
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "../components/Loader";
import ErrorComponent from "../components/ErrorComponent";

const Exchanges = () => {
  const [Exchange, setExchange] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //page
  const [page, setPage] = useState(1);

  // Change Page
  const nextPage = () => {
    setPage(page + 1);
    setLoading(true);
  };

  const backPage = () => {
    setPage(page - 1);
    setLoading(true);
  };

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(
          `${ServerURL}/exchanges?per_page=50&page=${page}`
        );
        // exchanges?per_page=50&page=1

        setExchange(data);
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
    fetchExchanges();
  }, [page]);

  // Error Catch
  //todo: if error is true, return the ErrorComponent
  if (error) return <ErrorComponent message={"Error is Coming"} />;

  return (
    <Container maxW={"container.xl"}>
      {Loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"center"}>
            {Exchange.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
          {/*  */}
          <HStack justifyContent={"center"}>
            <Button
              disabled={page === 1 ? true : false}
              onClick={backPage}
              colorScheme={"blue"}
            >
              Back
            </Button>
            <Button onClick={nextPage} colorScheme={"blue"}>
              Next
            </Button>
          </HStack>
          {/*  */}

          {/*  */}
        </>
      )}
    </Container>
  );
};

export default Exchanges;

const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target={"blank"}>
      <VStack
        w={52}
        shadow={"lg"}
        p={8}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={4}
        css={{
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "xl",
          },
        }}
      >
        <Image
          src={img}
          w={"10"}
          h={"10"}
          objectFit={"contain"}
          alt="Exchange Logo"
        />
        <Heading size={"md"} noOfLines={1}>
          {name}
        </Heading>
        <Text noOfLines={1}>Rank: {rank}</Text>
      </VStack>
    </a>
  );
};
