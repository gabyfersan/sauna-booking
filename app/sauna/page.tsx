import { Flex, Grid, Text } from "@radix-ui/themes";

const bookinHours = [];

const getAllBookinHours = (index: number) => {
  const allBookinHours = [];
  console.log(getAll(index - 1));
  for (let i = 1; i <= 25; i++) {
    allBookinHours.push(
      i === 1
        ? { label: getAll(index - 1).dateFormated }
        : {
            label: getAll(index - 1).dateNumerical + getAllHours()[i - 1],
            timeDate: getAll(index - 1).dateNumerical + getAllHours()[i - 1],
          }
    );
  }
  return allBookinHours;
};
const getAll = (addNumbersOfDays: number) => {
  //.toISOString().slice(0, 10);
  //   const dateNow = new Date();
  //   dateNow.setDate(dateNow.getDate() + addNumbersOfDays);

  //   //let time = new Date();
  // const options = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };
  // dateNow.toLocaleTimeString('sv-SE', options).split(" ");

  let date = new Date();
  date.setDate(date.getDate() + addNumbersOfDays);

  const dateFormated = new Intl.DateTimeFormat("sv-SE", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  })
    .format(date)
    .split(" ");

  date.setDate(date.getDate());
  //date.toISOString().slice(0, 11);
  const dateNumerical = date.toISOString().slice(0, 11);
  return { dateFormated, dateNumerical };
  // const options = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  // };
  // return date.toLocaleTimeString("sv-SE", options).split(" ");

  //return date.toISOString().slice(0, 10);
};

const getAllHours = () => {
  const hours = [""];
  const currentDate = new Date();
  currentDate.setHours(0);
  currentDate.setMinutes(0);

  for (let i = 1; i < 25; i++) {
    currentDate.setHours(currentDate.getHours() + 1);
    hours.push(currentDate.toISOString().slice(11, 16));
  }
  return hours;
};

let base = {
  height: "5em",
  border: "2px solid #ffa94d",
  "border-radius": "5px",
  color: "#d9480f",
  "text-align": "center",
};

let styleForTime = {
  ...base,
  width: "4.5em",
  "background-color": "#ffd8a8",
  margin: "2px 2px 2px 0",
  overflow: "clip",
};

let styleForBooking = {
  ...base,
  width: "6em",
  "background-color": "green",
  margin: "2px",
  //"z-index": "-1",
};

let styleForGrid = {
  "grid-template-columns":
    "1fr 1fr 1fr 1fr  1fr  1fr  1fr 1fr 1fr  1fr  1fr  1fr",
  //  "position": "fixed"
  //contain: "paint",
  height: "600px",
  width: "100%",
  overflow: "auto",
};

const Sauna = () => {
  const allHours = getAllHours();
  console.log();
  return (
    <Grid style={styleForGrid}>
      <Flex
        direction='column'
        // gap='0'
        className=' sticky left-0 z-10 bg-white'
      >
        {allHours.map((a, i) =>
          i === 0 ? (
            <div
              style={{ width: "4.5em", height: "5em", margin: "2px 2px 2px 0" }}
            ></div>
          ) : (
            <div
              key={a}
              style={styleForTime}
              className={`flex items-center justify-center sticky left-0`}
            >
              <Text size='6'>{a}</Text>
            </div>
          )
        )}
      </Flex>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <Flex direction='column' key={i}>
          {getAllBookinHours(i).map((a, ii) => (
            <div
              key={Array.isArray(a.label) ? a.label[1] : a.label}
              style={styleForBooking}
              className={`flex items-center justify-center   	flex-col ${
                ii === 0 ? " !bg-white sticky top-0" : ""
              }`}
            >
              {ii === 0 ? (
                <>
                  <Text size='3' className='block'>
                    {a?.label![0]}
                  </Text>

                  <Text size='3'> {a?.label![1] + " " + a?.label![2]}</Text>
                </>
              ) : (
                <Text size='1'>{a.label}</Text>
              )}
              <Text size='6'></Text>
            </div>
          ))}
        </Flex>
      ))}
    </Grid>
  );
};

export default Sauna;
