const tableColumns = () => {
  const tableHeaders = [
    "Model",
    "Displacement ccm",
    "Power HP",
    "Torque Nm",
    "Category",
    "Engine type",
    "Clutch",
    "Fuel capacity liters",
    "Transmission type,final drive",
    "Valves per cylinder",
    "Year",
    "Fuel consumption km/liter",
    "Fuel consumption liters/100 km",
    "Gearbox",
    "Ground clearance mm",
    "Light",
    "Lubrication system",
    "Color options",
    "Diameter mm",
    "Factory warranty",
    "Rear brakes",
    "Rear tyre",
    "Weight incl. oil, gas, etc kg",
    "Wheelbase mm",
  ];
  const tableHeadersWidth = {
    Clutch: 400,
    "Rear brakes": 400,
    "Engine type": 200,
    Light: 400,
    "Displacement ccm": 80,
    "Power HP": 80,
    "Torque Nm": 80,
    "Fuel capacity liters": 100,
  };

  const tableHeadersTitle = {
    "Displacement ccm": "CC",
    "Power HP": "HP",
    "Torque Nm": "Torque",
    "Fuel capacity liters": "Fuel capacity",
  };
  const tableHeadersDefinition = tableHeaders.map((e) => {
    return {
      title: tableHeadersTitle[e]
        ? tableHeadersTitle[e]
        : e.charAt(0).toUpperCase() + e.slice(1),
      dataIndex: e,
      key: e,
      width: tableHeadersWidth[e] ? tableHeadersWidth[e] : 150,
      ellipsis: tableHeadersWidth[e] ? true : false,
    };
  });

  return tableHeadersDefinition;
};

export { tableColumns };
