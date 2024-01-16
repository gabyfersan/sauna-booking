import { Button } from "@radix-ui/themes";
import Link from "next/link";

import { Pencil2Icon } from "@radix-ui/react-icons";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/edit/${issueId}`}>Redigera Ärende</Link>
    </Button>
  );
};

export default EditIssueButton;
