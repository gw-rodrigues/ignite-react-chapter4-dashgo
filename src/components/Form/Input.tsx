export function Input(){
    return(
        <FormLabel htmlFor="email">E-mail</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              focusBorderColor="pink.500"
              bgColor="gray.900"
              variant="filled"
              _hover={{ bgColor: "gray.900" }}
              size="lg"
            />
          </FormControl>
    )
}