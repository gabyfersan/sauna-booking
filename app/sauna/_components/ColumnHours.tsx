import { Flex, Text } from "@radix-ui/themes";
const ColumnHours = ({ allHours }: { allHours: string[] }) => {
  return (
    <Flex
      direction='column'
      className=' sticky left-0  bg-white'
      style={{
        zIndex: 10,
      }}
    >
      {allHours.map((a, i) =>
        i === 0 ? (
          <div
            key='jjj'
            style={{
              width: "4.5em",
              height: "3em",
              margin: "2px 2px 2px 0",
            }}
          ></div>
        ) : (
          <div
            key={a}
            style={{
              width: "4.5em",
              height: "3em",
              margin: "2px 2px 2px 0",
              borderRadius: "5px",
              // backgroundColor: "#ffd8a8",
              backgroundColor: "#80b08c",
              overflow: "clip",
              zIndex: 99,
            }}
            id={
              parseInt(a.split(":")[0]) - new Date().getHours() === 0
                ? "scroll-into-view"
                : ""
            }
            className={`flex items-center justify-center sticky left-0 `}
          >
            <Text size='4'>{a}</Text>
          </div>
        )
      )}
    </Flex>
  );
};

export default ColumnHours;
