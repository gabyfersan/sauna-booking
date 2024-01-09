import { Link } from "@/app/components";
import { Sauna } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Separator, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { getADateFormated } from "../_components/helperFunctions";

export interface SaunaQuery {
  orderBy: keyof Sauna;
  page: string;
}

interface Props {
  searchParams: SaunaQuery;
  saunaBookings: Sauna[];
}

const SaunaTable = ({ searchParams, saunaBookings }: Props) => {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{ query: { ...searchParams, orderBy: column.value } }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon className='inline' />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {saunaBookings.map((saunaBooking) => {
          {
            console.log(
              saunaBooking.bookedAtDateAndTime.toISOString().slice(0, -1)
            );
            const formatDate = getADateFormated(
              new Date(),
              new Date(
                saunaBooking.bookedAtDateAndTime.toISOString().slice(0, -1)
              )
            ).dateFormated;
            return (
              <Table.Row key={saunaBooking.id}>
                <Table.Cell>
                  <Link href={`/sauna/${saunaBooking.id}`}>
                    {formatDate[0] +
                      " " +
                      formatDate[1] +
                      " " +
                      formatDate[2] +
                      " " +
                      formatDate[5] +
                      ":00"}
                  </Link>
                  <div className='block md:hidden'>
                    <Separator orientation='horizontal' size='3' />
                    {saunaBooking.message}
                  </div>
                  <div className='block md:hidden'>
                    <Separator orientation='horizontal' size='3' />
                    {saunaBooking.shareSauna ? "Dela bastu" : "Dela inte bastu"}
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  {getADateFormated(
                    new Date(),
                    new Date(saunaBooking.createdAt)
                  ).dateAndTimeNumerical || ""}
                </Table.Cell>
                <Table.Cell className=' hidden md:table-cell'>
                  {saunaBooking.message}
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  {saunaBooking.shareSauna ? "Dela bastu" : "Dela inte bastu"}
                </Table.Cell>
              </Table.Row>
            );
          }
        })}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value: keyof Sauna; className?: string }[] = [
  {
    label: "Bokad tid",
    value: "bookedAtDateAndTime",
    className: " w-1/6",
  },
  {
    label: "Bokad",
    value: "createdAt",
    className: "hidden md:table-cell w-1/6",
  },
  {
    label: "Meddelande",
    value: "message",
    className: " hidden md:table-cell w-1/2",
  },
  {
    label: "Dela",
    value: "shareSauna",
    className: " hidden md:table-cell w-1/6",
  },
];
export const columnName = columns.map((column) => column.value);
export default SaunaTable;
