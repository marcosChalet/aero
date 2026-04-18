import type { IServiceStrategy } from "../models/strategy.types";
import { LatamAccountService } from "./implementations/latamAccount.strategy";
import { MAASService } from "./implementations/maas.strategy";
import { NameCorrectionService } from "./implementations/nameCorrection.strategy";
import { PetService } from "./implementations/pet.strategy";
import { RebookingService } from "./implementations/rebooking.strategy";
import { RefundService } from "./implementations/refund.strategy";
import { ServiceAnimalService } from "./implementations/serviceAnimal.strategy";
import { UMNRService } from "./implementations/umnr.strategy";
import { WheelchairService } from "./implementations/wheelchair.strategy";

export const ServiceStrategies: Record<string, IServiceStrategy> = {
  REBOOKING: RebookingService,
  MAAS: MAASService,
  UMNR: UMNRService,
  REFUND: RefundService,
  PET: PetService,
  SERVICE_ANIMAL: ServiceAnimalService,
  WHEELCHAIR: WheelchairService,
  NAME_CORRECTION: NameCorrectionService,
  LATAM_ACCOUNT: LatamAccountService,
};
