import { redis } from 'src/redis/client';
import { Model } from './typing';

export class AuditDAL {
  private ip: string;
  private userEmail: string;

  constructor({ ip, userEmail }: Model.AuditLog) {
    this.ip = ip;
    this.userEmail = userEmail;
  }

  async addPaymentLog(
    tradeOrderId: string,
    log: Omit<Model.PaymentAuditLog, keyof Model.AuditLog>
  ): Promise<boolean> {
    const paymentLog: Model.PaymentAuditLog = {
      ip: this.ip,
      userEmail: this.userEmail,
      timestamp: Date.now(),
      ...log,
    };

    return (
      (await redis.hmset(`auditLog:payment:${tradeOrderId}`, paymentLog)) ===
      'OK'
    );
  }
}
