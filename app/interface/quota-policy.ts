//Use Fixed, Percentage, and Refular bus assignment
import { Fixed } from "./fixed";
import { Percentage } from "./percentage";
import { RegularBusAssignment } from "./regular-bus-assignment";

//Quota policy Interface
export interface Quota_Policy {
    QuotaPolicyID: string;
    StartDate: Date;
    EndDate: Date;
    Fixed?: Fixed;
    Percentage?: Percentage;
    RegularBusAssignments: RegularBusAssignment[];
  }