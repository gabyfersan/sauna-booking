import { Box, Grid } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

const LoadingSaunaPage = () => {
  return (
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
    <Grid columns='10' rows=' 25' gap='3'>
      {Array.from(Array(240).keys()).map((i) => (
        <Box key={i} height='7'>
          <Skeleton height='100%' width='100%' />
        </Box>
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
