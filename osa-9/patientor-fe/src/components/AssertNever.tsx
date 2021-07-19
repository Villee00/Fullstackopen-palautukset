import { Entry } from "../types";

const assertNever = (value: Entry): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default assertNever;