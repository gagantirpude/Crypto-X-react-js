import { Box, Spinner, VStack } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <VStack h={"90vh"} justifyContent={"center"}>
      <Box h={"100px"} w={"auto"} transform={"scale(3)"}>
        <Spinner size="xl" color="black.500" thickness="4px" speed="0.65s" />
      </Box>
    </VStack>
  );
};

export default Loader;
