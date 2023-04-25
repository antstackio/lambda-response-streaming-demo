const tableColumns = () => {
  const tableHeaders = [
    "Model",
    "Displacement ccm",
    "Power HP",
    "Torque Nm",
    "Fuel capacity liters",
    "Category",
    "Engine type",
    "Clutch",
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
    "Engine type": 400,
    Light: 400,
  };

  const tableHeadersDefinition = tableHeaders.map((e) => {
    return {
      title: e.charAt(0).toUpperCase() + e.slice(1),
      dataIndex: e,
      key: e,
      width: tableHeadersWidth[e] ? tableHeadersWidth[e] : 150,
      ellipsis: tableHeadersWidth[e] ? true : false,
    };
  });

  return tableHeadersDefinition;
};

export { tableColumns };
