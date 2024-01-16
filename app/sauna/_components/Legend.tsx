import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";

export const LegendSauna = () => {
  return (
    <Flex className='flex-col md:flex-row gap-x-5 mb-3'>
      <Flex className='items-center gap-x-3'>
        <div className='rounded-full bg-yellow-300 w-4 h-4'></div>
        <Text>Bokad, gäster accepteras</Text>
      </Flex>
      <Flex className='items-center gap-x-3'>
        <div className='rounded-full bg-red-500 w-4 h-4'></div>
        <Text>Bokad, inga gäster</Text>
      </Flex>
      <Flex className='items-center gap-x-3'>
        <div className='border-2 border-rose-950 border-solid w-4 h-4'></div>
        <Text>Egna bokningar</Text>
      </Flex>
      <Flex className='items-center gap-x-3'>
        <EnvelopeOpenIcon />
        <Text>Meddelande</Text>
      </Flex>
    </Flex>
  );
};

export default LegendSauna;
