import { Flex, Text } from "@radix-ui/themes";
const ColumnHours = ({ allHours }: { allHours: string[] }) => {
  return (
    <Flex
      direction='column'
      className=' sticky left-0  bg-white'
      style={{ zIndex: 10 }}
    >
      {allHours.map((a, i) =>
        i === 0 ? (
          <div key='jjj' className={`w-20 h-12  my-1`}></div>
        ) : (
          <div
            key={a}
            style={{
              backgroundColor: "#ffd8a8",
              overflow: "clip",
              zIndex: 10,
            }}
            id={
              parseInt(a.split(":")[0]) - new Date().getHours() === 0
                ? "scroll-into-view"
                : ""
            }
            className={`flex items-center justify-center sticky left-0 w-20 h-12 my-1`}
          >
            <Text size='4'>{a}</Text>
          </div>
        )
      )}
    </Flex>
  );
};

export default ColumnHours;
