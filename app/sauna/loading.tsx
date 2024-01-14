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
    <Grid style={styleForGrid} gap="2">
      {Array.from(Array(240).keys()).map((i) => (
        <Skeleton key={i} width='6.2rem' height='2.9rem' />
      ))}
   
    </Grid>
  );
};



export default LoadingSaunaPage;
