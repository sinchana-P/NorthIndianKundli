import NorthIndianKundli from "./components/NorthIndianKundli";

const chart1 = [
  { houseNumber: 1, houseName: "Asc", planets: [{ id: "1", label: "Su" }] },
  { houseNumber: 4, planets: [{ id: "2", label: "Ma" }] },
  { houseNumber: 5, planets: [{ id: "3", label: "Me" }] },
  { houseNumber: 7, planets: [{ id: "4", label: "Ve" }] },
  { houseNumber: 8, planets: [{ id: "5", label: "Mo" }] },
];

export default function App() {
  return (
    <div className="App">
      <NorthIndianKundli houses={chart1} />
    </div>
  );
}
