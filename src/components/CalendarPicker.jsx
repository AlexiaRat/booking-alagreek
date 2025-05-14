import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Stiluri de bază
import "react-date-range/dist/theme/default.css"; // Tema default
import { addDays } from "date-fns";

function CalendarPicker({ onSelect }) {
  const today = new Date(); // Obținem data de azi

  const [state, setState] = useState([
    {
      startDate: today,
      endDate: addDays(today, 7), // Inițial, 7 zile
      key: "selection",
    },
  ]);

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      <DateRange
        editableDateInputs={true}
        minDate={today} // NU permite selecția datelor din trecut
        onChange={(item) => {
          setState([item.selection]);
          onSelect(item.selection);
        }}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
    </div>
  );
}

export default CalendarPicker;
