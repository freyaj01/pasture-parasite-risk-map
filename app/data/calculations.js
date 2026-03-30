export function getParasiteCals(temp, recentRain14d, humidity) {
  return [
    {
      name: "Nematodes (Roundworm)",
      level:
        temp >= 12 && recentRain14d >= 50 && humidity >= 70
          ? "Very High"
          : temp >= 10 && recentRain14d >= 30 && humidity >= 65
            ? "High"
            : temp >= 9 && recentRain14d >= 15 && humidity >= 60
              ? "Moderate"
              : "Low",
      reason:
        temp >= 12 && recentRain14d >= 50 && humidity >= 70
          ? "Optimal warm, wet and humid conditions — high larval survival and rapid development on pasture."
          : temp >= 10 && recentRain14d >= 30 && humidity >= 65
            ? "Warm, wet and humid conditions allow eggs to hatch and larvae to survive on pasture."
            : temp >= 9 && recentRain14d >= 15 && humidity >= 60
              ? "Mild conditions support some larval development — monitor pasture contamination."
              : "Current conditions are less favourable for egg hatching and larval survival.",
    },
    {
      name: "Fasciola hepatica (Liver Fluke)",
      level:
        temp >= 11 && recentRain14d >= 60 && humidity >= 75
          ? "Very High"
          : temp >= 10 && recentRain14d >= 40 && humidity >= 70
            ? "High"
            : recentRain14d >= 20 && humidity >= 65
              ? "Moderate"
              : "Low",
      reason:
        temp >= 11 && recentRain14d >= 60 && humidity >= 75
          ? "Ideal conditions for mud snail proliferation and fluke transmission — high risk across wet pasture."
          : temp >= 10 && recentRain14d >= 40 && humidity >= 70
            ? "Sustained rainfall and warm temperatures support mud snail populations, increasing fluke risk."
            : recentRain14d >= 20 && humidity >= 65
              ? "Some rainfall present — monitor low-lying or poorly drained fields."
              : "Lower rainfall limits snail habitat, reducing liver fluke transmission.",
    },
    {
      name: "Dictyocaulus viviparus (Lungworm)",
      level:
        temp >= 11 && recentRain14d >= 50 && humidity >= 72
          ? "Very High"
          : temp >= 10 && recentRain14d >= 30 && humidity >= 68
            ? "High"
            : recentRain14d >= 15 && humidity >= 63
              ? "Moderate"
              : "Low",
      reason:
        temp >= 11 && recentRain14d >= 50 && humidity >= 72
          ? "Warm, persistently wet conditions — high larval survival and significant lungworm spread risk."
          : temp >= 10 && recentRain14d >= 30 && humidity >= 68
            ? "Warm, moist pasture conditions allow lungworm larvae to survive and spread."
            : recentRain14d >= 15 && humidity >= 63
              ? "Some moisture present — larvae may persist, particularly on grazed pasture."
              : "Cooler or drier conditions reduce larval survival on pasture.",
    },
    {
      name: "Blowfly Strike",
      level:
        temp >= 11 && humidity >= 75
          ? "Very High"
          : temp >= 10 && humidity >= 70
            ? "High"
            : temp >= 9 && humidity >= 65
              ? "Moderate"
              : "Low",
      reason:
        temp >= 11 && humidity >= 75
          ? "Warm, humid conditions — peak blowfly activity, fleece soiling greatly increases strike risk."
          : temp >= 10 && humidity >= 70
            ? "Warm, humid conditions accelerate egg development and keep fleece moist, attracting blowflies."
            : temp >= 9 && humidity >= 65
              ? "Mild conditions may support some blowfly activity, especially in sheltered areas."
              : "Cooler or drier conditions reduce blowfly activity.",
    },
    {
      name: "Coccidia",
      level:
        recentRain14d >= 50 && humidity >= 75
          ? "Very High"
          : recentRain14d >= 30 && humidity >= 70
            ? "High"
            : recentRain14d >= 15 && humidity >= 65
              ? "Moderate"
              : "Low",
      reason:
        recentRain14d >= 50 && humidity >= 75
          ? "Persistently wet and humid conditions increase oocyst survival and transmission risk among youngstock."
          : recentRain14d >= 30 && humidity >= 70
            ? "Wet conditions favour oocyst build-up and oral transmission, particularly in youngstock."
            : recentRain14d >= 15 && humidity >= 65
              ? "Moderate moisture levels present some coccidial risk, especially for animals under 6 months."
              : "Current conditions present a lower risk of coccidial transmission.",
    },
    {
      name: "Ectoparasites (Lice, Mites, Ticks)",
      level:
        temp >= 10 && humidity >= 75
          ? "Very High"
          : temp >= 9 && humidity >= 70
            ? "High"
            : temp >= 9 || humidity >= 65
              ? "Moderate"
              : "Low",
      reason:
        temp >= 10 && humidity >= 75
          ? "Warm, humid conditions — high risk of tick activity and ectoparasite spread across pasture."
          : temp >= 9 && humidity >= 70
            ? "Mild, humid conditions are favourable for tick activity and ectoparasite spread."
            : temp < 9
              ? "Cold conditions reduce tick activity, though lice risk remains in housed animals."
              : "Conditions present a low to moderate risk of ectoparasite activity.",
    },
    {
      name: "Cestodes (Tapeworms)",
      level:
        recentRain14d >= 50 && humidity >= 75
          ? "Very High"
          : recentRain14d >= 30 && humidity >= 70
            ? "High"
            : recentRain14d >= 15 && humidity >= 65
              ? "Moderate"
              : "Low",
      reason:
        recentRain14d >= 50 && humidity >= 75
          ? "Very wet conditions increase pasture contamination and oribatid mite activity — the intermediate host for tapeworms."
          : recentRain14d >= 30 && humidity >= 70
            ? "Pasture conditions increase exposure to oribatid mites, the intermediate host for Moniezia tapeworms."
            : recentRain14d >= 15 && humidity >= 65
              ? "Some risk of tapeworm exposure, particularly for young animals grazing contaminated pasture."
              : "Current pasture conditions present a low risk of tapeworm transmission.",
    },
  ];
}