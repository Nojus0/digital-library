import { registerEnumType } from "type-graphql";
import { Role } from "../entity/User";

registerEnumType(Role, { name: "Role" });
