"use client";
import { Skeleton } from "@/app/components";
import { CaretDownIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const saunaLinks = [
  { label: "Boka bastu", href: "/sauna" },
  { label: "Mina bokningar", href: "/sauna/list" },
];
const issueLinks = [
  { label: "Registrera felanmälan", href: "/issues/new" },
  { label: "Alla felanmälningar", href: "/issues/list" },
];
// const userLinks = [
//   { label: "Logga in", href: "/api/auth/signin" },
//   { label: "Registrera ny användare", href: "/users/register" },
// ];
const NavBar = () => {
  const { status, data: session } = useSession();
  return (
    <nav className='border-b px-5 py-3 '>
      <Container>
        <Flex justify='between' className=' items-center  h-8'>
          {status === "authenticated" ? (
            <Flex align='center' gap='3'>
              <Link href='/'>
                <AiFillBug />
              </Link>
              <DropdownLinks title='Felanmälan' links={issueLinks} />
              <DropdownLinks title='Bastu' links={saunaLinks} />
            </Flex>
          ) : (
            ""
          )}
          <SkeletonNavbar showSkeleton={status === "loading"} />

          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <Skeleton width='3rem' />;
  }
  // if (status === "unauthenticated") {
  //   return <DropdownLinks title='Användare' links={userLinks} />;
  // }
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Text>
            <Avatar
              src={session?.user ? session!.user!.image! : undefined}
              fallback={<HamburgerMenuIcon />}
              size='2'
              radius='full'
              className='cursor-pointer'
              referrerPolicy='no-referrer'
            />
          </Text>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {status === "unauthenticated" ? (
            <>
              <DropdownMenu.Item
                onSelect={() => router.push("/api/auth/signin")}
              >
                Logga in
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={() => router.push("/users/register")}
              >
                Registrera ny användare
              </DropdownMenu.Item>
            </>
          ) : (
            <>
              <DropdownMenu.Label>
                <Text size='2'>{session!.user!.email}</Text>
              </DropdownMenu.Label>
              <DropdownMenu.Item>
                <Link href='/api/auth/signout'>Logga ut</Link>
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const DropdownLinks = ({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) => {
  const router = useRouter();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className='ml-1'>
        <Button variant='ghost' color='gray'>
          {title}
          <CaretDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {links.map((link) => (
          <DropdownMenu.Item
            key={link.label}
            onSelect={() => router.push(`${link.href}`)}
          >
            {link.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

const SkeletonNavbar = ({ showSkeleton }: { showSkeleton: boolean }) => {
  return showSkeleton ? (
    <Flex align='center' gap='3' className='h-8'>
      <Link href='/'>
        <AiFillBug />
      </Link>
      <Skeleton width='6rem' className='ml-3 mr-2' />
      <Skeleton width='3rem' />
    </Flex>
  ) : (
    <span></span>
  );
};

export default NavBar;
