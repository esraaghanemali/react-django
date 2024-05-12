import React from "react";
import ElectricityCreate from "./ui/Components/Electricity/ElectricityCreate";
import ElectricityList from "./ui/Components/Electricity/ElectricityList";

type Routes = {
  path: string;
  component: React.FC;
}[];

export const routes: Routes = [
  { path: "/", component: ElectricityList },
  { path: "/add", component: ElectricityCreate },
];
