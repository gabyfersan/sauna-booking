"use client";
import { Skeleton } from "@/app/components";
import { CaretDownIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
const saunaLinks = [
  { label: "Boka bastu", href: "/sauna" },
  { label: "Mina bokningar", href: "/sauna/list" },
];
const issueLinks = [
  { label: "Registrera felanmälan", href: "/issues/new" },
  { label: "All felanmälningar", href: "/issues/list" },
];
const userLinks = [
  { label: "Logga in", href: "/api/auth/signin" },
  { label: "Registrera ny användare", href: "/users/register" },
];
const NavBar = () => {
  return (
    <nav className=' border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'>
              <AiFillBug />
            </Link>
            <NavLinks />
            <DropdownLinks title='Felanmälan' links={issueLinks} />
            <DropdownLinks title='Bastu' links={saunaLinks} />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [{ label: "Dashboard", href: "/" }];

  return (
    <ul className='flex space-x-6'>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") {
    return <Skeleton width='3rem' />;
  }
  if (status === "unauthenticated") {
    return (
      // <Link className='nav-link' href='/api/auth/signin'>
      //   Login
      // </Link>
      <DropdownLinks title='Användare' links={userLinks} />
    );
  }
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Text>
            <Avatar
              src={session!.user!.image!}
              fallback='?'
              size='2'
              radius='full'
              className='cursor-pointer'
              referrerPolicy='no-referrer'
            />
          </Text>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size='2'>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href='/api/auth/signout'>Log out</Link>
          </DropdownMenu.Item>
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

export default NavBar;
