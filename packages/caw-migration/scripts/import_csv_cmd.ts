import { dumpPath } from "../utils/common";

interface ImportCommandParams {
  filename: string;
  table: string;
}

function importCsvCommandFor(
  { filename, table }: { filename: string; table: string },
) {
  const csvPath = `${dumpPath}/${filename}.csv`;

  return `\\copy "${table}" FROM '${csvPath}' DELIMITER ',' CSV HEADER;`;
}

const params: ImportCommandParams[] = [
  { filename: "roles", table: "Role" },
  { filename: "users", table: "User" },
  { filename: "plans", table: "Plan" },
  { filename: "prices", table: "Prices" },
  { filename: "models", table: "Model" },
  { filename: "limits", table: "Limits" },
  { filename: "orders", table: "Order" },
  { filename: "invitationCodes", table: "InvitationCode" },
  { filename: "invitationRecords", table: "InvitationRecord" },
  { filename: "redeems", table: "Redeem" },
  { filename: "subscriptions", table: "Subscription" },
];

params.map(importCsvCommandFor)
  .forEach((cmd) => console.log(cmd));
