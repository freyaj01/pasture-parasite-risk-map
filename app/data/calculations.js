export function getParasiteCals(temp, recentRain, humidity) {
  return [
    {
      name: "Nematodes (Roundworm)",
      level:
        temp >= 12 && recentRain >= 1100 && humidity >= 82
          ? "Very High"
          : temp >= 10 && recentRain >= 800 && humidity >= 78
            ? "High"
            : temp >= 9 && recentRain >= 650 && humidity >= 75
              ? "Moderate"
              : "Low",
      reason:
        temp >= 12 && recentRain >= 1100 && humidity >= 82
          ? "Optimal warm, wet and humid conditions — high larval survival and rapid development on pasture."
          : temp >= 10 && recentRain >= 800 && humidity >= 78
            ? "Warm, wet and humid conditions allow eggs to hatch and larvae to survive on pasture."
            : temp >= 9 && recentRain >= 650 && humidity >= 75
              ? "Mild conditions support some larval development — monitor pasture contamination."
              : "Current conditions are less favourable for egg hatching and larval survival.",
    },
    {
      name: "Fasciola hepatica (Liver Fluke)",
      level:
        temp >= 11 && recentRain >= 1200 && humidity >= 83
          ? "Very High"
          : temp >= 10 && recentRain >= 900 && humidity >= 80
            ? "High"
            : recentRain >= 700 && humidity >= 78
              ? "Moderate"
              : "Low",
      reason:
        temp >= 11 && recentRain >= 1200 && humidity >= 83
          ? "Ideal conditions for mud snail proliferation and fluke transmission — high risk across wet pasture."
          : temp >= 10 && recentRain >= 900 && humidity >= 80
            ? "Sustained rainfall and warm temperatures support mud snail populations, increasing fluke risk."
            : recentRain >= 700 && humidity >= 78
              ? "Some rainfall present — monitor low-lying or poorly drained fields."
              : "Lower rainfall limits snail habitat, reducing liver fluke transmission.",
    },
    {
      name: "Dictyocaulus viviparus (Lungworm)",
      level:
        temp >= 11 && recentRain >= 1100 && humidity >= 83
          ? "Very High"
          : temp >= 10 && recentRain >= 800 && humidity >= 80
            ? "High"
            : recentRain >= 650 && humidity >= 76
              ? "Moderate"
              : "Low",
      reason:
        temp >= 11 && recentRain >= 1100 && humidity >= 83
          ? "Warm, persistently wet conditions — high larval survival and significant lungworm spread risk."
          : temp >= 10 && recentRain >= 800 && humidity >= 80
            ? "Warm, moist pasture conditions allow lungworm larvae to survive and spread."
            : recentRain >= 650 && humidity >= 76
              ? "Some moisture present — larvae may persist, particularly on grazed pasture."
              : "Cooler or drier conditions reduce larval survival on pasture.",
    },
    {
      name: "Blowfly Strike",
      level:
        temp >= 11 && humidity >= 83
          ? "Very High"
          : temp >= 10 && humidity >= 80
            ? "High"
            : temp >= 9 && humidity >= 75
              ? "Moderate"
              : "Low",
      reason:
        temp >= 11 && humidity >= 83
          ? "Warm, humid conditions — peak blowfly activity, fleece soiling greatly increases strike risk."
          : temp >= 10 && humidity >= 80
            ? "Warm, humid conditions accelerate egg development and keep fleece moist, attracting blowflies."
            : temp >= 9 && humidity >= 75
              ? "Mild conditions may support some blowfly activity, especially in sheltered areas."
              : "Cooler or drier conditions reduce blowfly activity.",
    },
    {
      name: "Coccidia",
      level:
        recentRain >= 1100 && humidity >= 83
          ? "Very High"
          : recentRain >= 800 && humidity >= 80
            ? "High"
            : recentRain >= 650 && humidity >= 76
              ? "Moderate"
              : "Low",
      reason:
        recentRain >= 1100 && humidity >= 83
          ? "Persistently wet and humid conditions increase oocyst survival and transmission risk among youngstock."
          : recentRain >= 800 && humidity >= 80
            ? "Wet conditions favour oocyst build-up and oral transmission, particularly in youngstock."
            : recentRain >= 650 && humidity >= 76
              ? "Moderate moisture levels present some coccidial risk, especially for animals under 6 months."
              : "Current conditions present a lower risk of coccidial transmission.",
    },
    {
      name: "Ectoparasites (Lice, Mites, Ticks)",
      level:
        temp >= 10 && humidity >= 83
          ? "Very High"
          : temp >= 9 && humidity >= 80
            ? "High"
            : temp >= 9 || humidity >= 76
              ? "Moderate"
              : "Low",
      reason:
        temp >= 10 && humidity >= 83
          ? "Warm, humid conditions — high risk of tick activity and ectoparasite spread across pasture."
          : temp >= 9 && humidity >= 80
            ? "Mild, humid conditions are favourable for tick activity and ectoparasite spread."
            : temp < 9
              ? "Cold conditions reduce tick activity, though lice risk remains in housed animals."
              : "Conditions present a low to moderate risk of ectoparasite activity.",
    },
    {
      name: "Cestodes (Tapeworms)",
      level:
        recentRain >= 1100 && humidity >= 83
          ? "Very High"
          : recentRain >= 800 && humidity >= 80
            ? "High"
            : recentRain >= 650 && humidity >= 76
              ? "Moderate"
              : "Low",
      reason:
        recentRain >= 1100 && humidity >= 83
          ? "Very wet conditions increase pasture contamination and oribatid mite activity — the intermediate host for tapeworms."
          : recentRain >= 800 && humidity >= 80
            ? "Pasture conditions increase exposure to oribatid mites, the intermediate host for Moniezia tapeworms."
            : recentRain >= 650 && humidity >= 76
              ? "Some risk of tapeworm exposure, particularly for young animals grazing contaminated pasture."
              : "Current pasture conditions present a low risk of tapeworm transmission.",
    },
  ];
}
