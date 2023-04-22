import { redis } from "src/redis/client";
import { AuditLog, PaymentAuditLog } from "../types";

export class AuditDAL {
  private ip: string;
  private userEmail: string;

  constructor({ ip, userEmail }: AuditLog) {
    this.ip = ip;
    this.userEmail = userEmail;
  }

  async addPaymentLog(
    tradeOrderId: string,
    log: Omit<PaymentAuditLog, keyof AuditLog>,
  ): Promise<boolean> {
    const paymentLog: PaymentAuditLog = {
      ip: this.ip,
      userEmail: this.userEmail,
      timestamp: Date.now(),
      ...log,
    };

    return (
      (await redis.hmset(`auditLog:payment:${tradeOrderId}`, paymentLog)) ===
        "OK"
    );
  }
}
