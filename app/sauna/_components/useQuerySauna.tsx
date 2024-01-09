import {
  QueryObserverResult,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { saunaDateBaseSchema } from "../../validationSchemas";
type SaunaDateBaseType = z.infer<typeof saunaDateBaseSchema>;

const useQueryGetSaunaBooking = (
  saunaId: string
): [
  SaunaDateBaseType | undefined,
  Error | null,
  boolean,
  () => Promise<QueryObserverResult<SaunaDateBaseType, Error>>,
  boolean
] => {
  //type UseSaunaBookingResult = UseQueryResult<SaunaDateBaseType>;
  const useSaunaBooking = (): UseQueryResult<SaunaDateBaseType, Error> =>
    useQuery({
      queryKey: ["sauna_booked"],
      queryFn: (): Promise<SaunaDateBaseType> =>
        axios
          .get(`/api/sauna-bookings/${parseInt(saunaId)}`)
          .then(({ data }) => data),
      staleTime: 60 * 1000,
      retry: 3,
    });
  const {
    data: saunaBooking,
    error,
    isLoading,
    refetch,
    isSuccess,
  } = useSaunaBooking();

  return [saunaBooking, error, isLoading, refetch, isSuccess];
};

export default useQueryGetSaunaBooking;
