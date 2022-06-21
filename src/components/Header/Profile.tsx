import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Gleyson Rodrigues</Text>
          <Text color="gray.300" fontSize="small">
            rorigues.gw@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="Gleydson Rodrigues"
        src="https://github.com/gw-rodrigues.png"
      />
    </Flex>
  );
}
