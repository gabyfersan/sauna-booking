import { Grid } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import Skeleton from "react-loading-skeleton";
let styleForGrid = {
  gridTemplateColumns: "1fr 1fr 1fr 1fr  1fr  1fr  1fr 1fr 1fr  1fr  1fr  1fr",
  // height: "2000px",
  // width: "100%",
  overflow: "auto",
};



const LoadingSaunaPage = () => {
  return (
    // Method 1: Use the wrapper prop

    // <Grid columns='10' rows='25' width='auto' gap='1'>
    //   {Array.from(Array(240).keys()).map((i) => (
    //     // <Skeleton key={i} width='6.5rem' height='3rem' />
    //     // <Skeleton key={i} width='105px' height='52px' />
    //     // <Skeleton style={{ width: "105px", height: "54px" }} />
    //     <div style={{ width: "119px", height: "54px", margin: "25px" }}>
    //       <Skeleton />
    //     </div>
    //   ))}
    // </Grid>
    <Grid style={styleForGrid} gap="2">
      {/* <Skeleton  count={250} /> */}
      {Array.from(Array(240).keys()).map((i) => (
        <Skeleton key={i} width='6.2rem' height='2.9rem' />
        // <Box key={i} height='7'>
        //   <Skeleton height='100%' width='100%' />
        // </Box>
      ))}
      {/* <Flex direction='column' gap='3'>
        <Box grow='1'>
          <Skeleton height='100%' />
        </Box>
        <Box height='6'>
          <Skeleton height='100%' />
        </Box>
      </Flex> */}
    </Grid>
  );
};

// const MatrixOfSkeletons = () => {
//   const columns = Array.from({ length: 10 }, (_, index) => (
//     <Grid.Item
//       key={index}
//       style={{ width: "105px", height: "52px", margin: "2.5px" }}
//     >
//       <Skeleton />
//     </Grid.Item>
//   ));

//   const rows = Array.from({ length: 25 }, (_, index) => (
//     <Grid.Row key={index}>{columns}</Grid.Row>
//   ));

//   return <Grid>{rows}</Grid>;
// };

export default LoadingSaunaPage;
