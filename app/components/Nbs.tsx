"use client";
import { Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";



const Nbs = () => {
  const router = useRouter();
  return (
    <Flex className='justify-center'>
      <img src='/nbs.jpeg' onClick={() => router.push("/api/auth/signin")} />
    </Flex>
  );
};

export default Nbs;
