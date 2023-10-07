import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import btcSrc from "../assets/btc.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"90vh"}>
      <motion.div
        style={{
          height: "80vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
        }}
      >
        <Image
          w={"full"}
          h={"full"}
          objectFit={"contain"}
          src={btcSrc}
          filter={"grayscale(1)"}
        />
      </motion.div>

      <Text
        fontSize={"6x1"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        marginTop={-10}
      >
        Crypto Tracker
      </Text>
    </Box>
  );
};

export default Home;
