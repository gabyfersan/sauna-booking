import { Button } from "@radix-ui/themes";

import { Pencil2Icon } from "@radix-ui/react-icons";

const EditSaunaButton = ({
  setShowDialog,
}: {
  setShowDialog: (a: boolean) => void;
}) => {
  return (
    <Button onClick={() => setShowDialog(true)}>
      <Pencil2Icon />
      Ändra bokning
    </Button>
  );
};

export default EditSaunaButton;
