export const environmentFactors = [
  {
    factor: "Rainfall",
    summary:
      "Wet conditions let larvae survive longer on pasture and support mud snail populations. The wetter parts of the UK — North West, Wales, South West — tend to see higher fluke and nematode pressure because of this. Shearer & Ezenwa (2020) found rainfall to be one of the strongest predictors of parasite burden.",
    stat: "Liver fluke risk rises sharply when autumn rainfall exceeds 30mm in a month.",
    refs: [1, 3, 8, 12],
  },
  {
    factor: "Temperature",
    summary:
      "Most parasites need temperatures above 8–10°C to develop, which gives the UK a spring and autumn risk window. Mild winters are pushing this window wider. Below 5°C egg development pauses, but larvae already on pasture don't die — they just wait.",
    stat: "Nematode larvae develop fastest at 18–20°C. Development stalls below 5°C and above 35°C.",
    refs: [2, 6, 7, 13, 17],
  },
  {
    factor: "Humidity",
    summary:
      "Many larvae are sensitive to drying out and won't survive long without moisture. Combine warm temperatures with high humidity and you get peak conditions. In the UK, humidity tends to stay high from September through April, which keeps larval survival elevated through winter.",
    stat: "Larval survival on pasture drops sharply when relative humidity falls below 60%.",
    refs: [1, 4, 14],
  },
];

export const parasites = [
  {
    name: "Ectoparasites (Lice, Mites, Ticks)",
    tempRange: "=> 7°C",
    humidityRange: "=> 70%",
    rainfallRange: "Any",
    description:
      "Ectoparasites like lice, mites and ticks can affect animals year-round but often flare up in colder months when animals are housed together. They cause irritation, skin damage and can transmit diseases. Ticks are more active in spring and autumn and can carry Lyme disease.",
    riskFactors: [
      "Close confinement during winter",
      "Poor hygiene in pasture",
      "Grazing in tick-infested areas",
      "Lack of regular parasite control",
    ],
    vetNote:
      "Regular inspection and treatment with appropriate insecticides or acaricides is key. For ticks, prompt removal is important to reduce disease risk.",
    refs: [2, 5, 11],
  },
  {
    name: "Blowfly Strike",
    tempRange: "=> 2°C",
    humidityRange: "=> 70%",
    rainfallRange: "Any",
    description:
      "Blowfly strike happens when flies lay eggs in wounds or soiled wool. Larvae hatch fast in warm, humid weather and start feeding on tissue within hours. Sheep are most at risk from April through October. Left untreated it can be fatal within days, so spotting it early is essential.",
    riskFactors: [
      "Warm, humid weather above 12°C",
      "Wet or manure-stained wool",
      "Skin wounds or footrot",
      "Dense sheep populations in humid areas",
      "Delayed shearing",
    ],
    vetNote:
      "SCOPS recommends applying licensed insect growth regulators (dicyclanil or cyromazine) before peak fly season. Daily checks during high-risk periods and prompt treatment of any strike are both important.",
    refs: [4, 6],
  },
  {
    name: "Dictyocaulus viviparus (Lungworm)",
    tempRange: "=> 10°C",
    humidityRange: "=> 65%",
    rainfallRange: "=> 15mm / month",
    description:
      "Lungworm larvae are spread through coughing and survive well on moist pasture. Outbreaks tend to come in late summer and autumn after a build-up of infective larvae over the season. First-year grazers are most at risk as they haven't built up immunity yet. The fungus Pilobolus can spread larvae rapidly across a field.",
    riskFactors: [
      "Late summer and autumn grazing",
      "First-season animals",
      "Moist pasture after rain",
      "Warm nights above 10°C",
    ],
    vetNote:
      "Elanco's lungworm map tracks UK cases from vet reports. An oral larvated vaccine is available for cattle and is worth considering before the grazing season starts.",
    refs: [2, 9, 10, 13, 17],
  },
  {
    name: "Nematodes (Roundworm)",
    tempRange: "8–25°C",
    humidityRange: "=> 70%",
    rainfallRange: "=> 20mm / month",
    description:
      "Nematodes like Ostertagia, Cooperia and Haemonchus develop well in warm, moist conditions. Eggs hatch once temperatures pass 8°C, and larvae can sit on pasture for months through cool wet weather. High animal density speeds up transmission. Spring and autumn are the main risk periods in the UK, with young stock taking the worst of it.",
    riskFactors: [
      "Warm, wet summers and autumns",
      "High animal density",
      "Overgrazed or contaminated pasture",
      "Young animals",
    ],
    vetNote:
      "SCOPS and NADIS recommend using faecal egg counts (FECs) to guide treatment rather than treating routinely. Targeted selective treatment (TST) — treating only animals that need it — is now standard practice for sheep and helps slow resistance.",
    refs: [2, 4, 6, 13, 14, 17],
  },
  {
    name: "Cestodes (Tapeworms)",
    tempRange: "8–20°C",
    humidityRange: ">70%",
    rainfallRange: ">= 40mm / month",
    description:
      "Tapeworms like Moniezia affect the young by attaching to the small intestine. Adults rarely show symptoms but heavy burdens in lambs and calves can cause poor growth, diarrhoea and occasionally intestinal blockage. The lifecycle depends on mites as intermediate hosts, so risk is tied more to pasture mite populations than weather conditions.",
    riskFactors: [
      "Grazing on pasture with high mite populations (for Moniezia)",
      "Lack of regular deworming",
      "Young animals with less immunity",
    ],
    vetNote:
      "Tapeworm infections are diagnosed by finding segments in faeces or around the anus. Praziquantel is effective for treatment. Regular deworming and controlling intermediate hosts can help reduce risk.",
    refs: [2, 6, 16],
  },
  {
    name: "Protozoa (Coccidia)",
    tempRange: "5–37°C",
    humidityRange: "Any",
    rainfallRange: "Any",
    description:
      "Coccidia can persist in the environment for months and spreads mainly through oral contact with contaminated material. Risk is driven more by hygiene and stocking density than weather. Lambs and calves in their first weeks are most vulnerable, particularly if they're stressed, overcrowded or on a poor diet.",
    riskFactors: [
      "High stocking density indoors or at pasture",
      "Poor pen hygiene or dirty water sources",
      "Animals under 6 months",
      "Nutritional stress or sudden diet changes",
    ],
    vetNote:
      "Diagnosis is by faecal oocyst count and species ID. Toltrazuril or diclazuril are effective when timed correctly. Preventative treatment in high-risk groups is common practice.",
    refs: [2, 7, 15],
  },
  {
    name: "Fasciola hepatica (Liver Fluke)",
    tempRange: "10–25°C",
    humidityRange: ">= 75%",
    rainfallRange: ">= 30mm / month",
    description:
      "Liver fluke needs the mud snail (Galba truncatula) to complete its lifecycle. Snails do best in warm, waterlogged ground — ditches, field margins, poorly drained corners. Autumn and winter are peak transmission in the UK, and the North West, Wales and South West are consistently the highest risk areas due to their wetter climates.",
    riskFactors: [
      "Wet, boggy or poorly drained ground",
      "Mild autumn temperatures above 10°C",
      "Grazing near water or field margins",
      "High summer rainfall expanding snail habitat",
      "Cattle and sheep sharing the same pasture",
    ],
    vetNote:
      "NADIS publishes monthly liver fluke risk maps for the UK. Timing matters — triclabendazole works on early immature flukes, while most other flukicides only cover adults. Always test before treating.",
    refs: [1, 3, 4, 8, 12],
  },
];
