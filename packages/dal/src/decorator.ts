import { Prisma } from "@prisma/client";
import { ServerError, serverStatus } from "@caw/types";

export function dalErrorCatcher<T extends { new (...args: any[]): any }>(
  target: T,
  _context: any // // FIXME give a correct type ClassMethodDecoratorContext
) {
  /* Get all class methods */
  const methods = Object.getOwnPropertyNames(target.prototype).filter(
    (prop) =>
      typeof target.prototype[prop] === "function" && prop !== "constructor"
  );

  methods.forEach((methodName) => {
    const originalMethod = target.prototype[methodName];
    target.prototype[methodName] = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          switch (error.code) {
            case "P2002" /* Unique constraint failed on the {constraint} */:
              console.error(`Error occurred in method ${methodName}: `, error);
              break;
            case "P2025":
              throw new ServerError(
                serverStatus.notExist,
                "Query does not exist"
              );
            default:
              throw error;
          }
        }
        throw error;
      }
    };
  });
}
