import { formAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(formAnatomy.keys);

const baseStyle = definePartsStyle({
  requiredIndicator: { color: "tertiary.medium" },
});

export const formTheme = defineMultiStyleConfig({ baseStyle });
