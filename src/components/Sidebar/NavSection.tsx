import { Box, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavSectionProps {
  title: string;
  children: ReactNode;
}
export function NavSection({ title, children }: NavSectionProps) {
  return (
    <Box>
      <text fontWeight="bold" color="gray.400" fontSize="small">
        {title}
      </text>
      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}
