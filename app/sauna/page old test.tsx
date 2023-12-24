import "./test.css";
const bookinHours = [];

const getAllBookinHours = () => {
  const allBookinHours = [];

  for (let i = 1; i < 25; i++) {
    allBookinHours.push(i === 1 ? { label: "23 juni" } : {});
  }
  return allBookinHours;
};
const getAll = (addNumbersOfDays: number) => {
  //.toISOString().slice(0, 10);
  const dateNow = new Date();
  return dateNow.setDate(dateNow.getDate() + addNumbersOfDays);
};

const getAllHours = () => {
  const hours = [];
  const currentDate = new Date();
  currentDate.setHours(0);
  currentDate.setMinutes(0);

  for (let i = 1; i < 25; i++) {
    currentDate.setHours(currentDate.getHours() + 1);
    hours.push(currentDate.toISOString().slice(11, 16));
  }
  return hours;
};

let div = {
  height: "3em",
  width: "5em",
  border: "2px solid #ffa94d",
  "border-radius": "5px",
  "background-color": "#ffd8a8",

  color: "#d9480f",
  "text-align": "center",
  overflow: "clip",
};

let div2 = {
  height: "3em",
  width: "8em",
  border: "2px solid #ffa94d",
  "border-radius": "5px",
  "background-color": "green",

  color: "#d9480f",
  "text-align": "center",
};

let g = {
  "grid-template-columns": "1fr 1fr 1fr 1fr",
  //  "position": "fixed"
  contain: "paint",
};

const Sauna = () => {
  const allHours = getAllHours();
  console.log();
  return (
    <div>
      <table>
        <thead>
          <tr>
            {allHours.map((a) => (
              <th>23 juli</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allHours.map((a) => (
            <tr>
              <td className='test'>{a}</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>7</td>
              <td>7</td>
              <td>7</td><td>7</td>
              <td>7</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sauna;
