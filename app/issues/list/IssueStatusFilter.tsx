"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: Status.OPEN },
  { label: "In progress", value: Status.IN_PROGRESS },
  { label: "Closed", value: Status.CLOSED },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderBy = searchParams.get("orderBy");
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();

        if (status) {
          params.append("status", status);
        }
        if (orderBy) {
          params.append("orderBy", orderBy);
        }
        const paramsString = params.toString();
        const query = paramsString ? `?${paramsString}` : "";
        router.push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger placeholder='Filter by status..' />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || ""}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
