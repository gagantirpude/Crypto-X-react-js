import React from "react";
import { useColorMode, Button } from "@chakra-ui/react";

function ColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      {/* <p>
        This is some text that will be styled differently depending on the color
        mode.
      </p> */}
    </div>
  );
}

export default ColorMode;
