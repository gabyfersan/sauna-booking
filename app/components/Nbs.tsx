"use client";
import { Flex, Link } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
const Nbs = () => {
  const router = useRouter();
  return (
    <Flex className='flex flex-col'>
      <Flex className='flex justify-center'>
        <img src='/nbs.jpeg' onClick={() => router.push("/api/auth/signin")} />
      </Flex>
      <Flex className='flex justify-center'>
        <Link href='/api/auth/signin'>Logga in</Link>
      </Flex>
      <Flex className='flex justify-center' gap="2">
        Ny användare:{" "}
        <Link href='/users/register'>Registrera ett nytt konto</Link>
      </Flex>
    </Flex>
  );
};

export default Nbs;
