export const FilterPrice = [
  {
    id: 1,
    price: 1000,
    maxPrice: 1000,
    text: "Below",
    value: "1000",
  },
  {
    id: 2,
    minPrice: 1000,
    maxPrice: 2000,
    value: "0-200",
  },
  {
    id: 3,
    minPrice: 1000,
    maxPrice: 3000,
    value: "200-400",
  },
  {
    id: 4,
    minPrice: 1000,
    maxPrice: 5000,
    value: "400-600",
  },
  {
    id: 5,
    minPrice: 1000,
    maxPrice: 10000,
    value: "600-800",
  },
  {
    id: 6,
    minPrice: 1000,
    maxPrice: 15000,
    value: "800-1000",
  },
  // {
  //   id: 7,
  //   price: 15000,
  //   text: "Above",
  //   value: "1000",
  // },
];

export const FilterSortData = [
  // {
  //   value: "asc",
  //   label: "Ascending Order",
  // },
  // {
  //   value: "desc",
  //   label: "Descending Order",
  // },
  {
    value: "LowTohigh",
    label: "Low High Price",
  },
  {
    value: "HighToLow",
    label: "High Low Price",
  },
  {
    value: "A-Z",
    label: "Alphabetically, A-Z",
  },
  {
    value: "Z-A",
    label: "Alphabetically, Z-A ",
  },
  {
    value: "NewToOld",
    label: "Date, New To Old",
  },
  {
    value: "OldToNew",
    label: "Date, Old To New",
  },
];
export const FilterPaginateData = [
  {
    value: 10,
    label: "10 Products",
  },
  {
    value: 25,
    label: "25 Products",
  },
  {
    value: 50,
    label: "50 Products",
  },
  {
    value: 100,
    label: "100 Products",
  },
];
