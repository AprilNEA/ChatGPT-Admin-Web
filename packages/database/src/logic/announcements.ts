import { Announcement, AnnouncementDate } from "../types";
import { redis } from "src/redis/client";

export class AnnouncementsDAL {
  constructor(private key: AnnouncementDate) {}

  static async listKeys(pattern = "*"): Promise<AnnouncementDate[]> {
    const keys = await redis.keys("announcement:" + pattern);
    return keys.map((k) => k.split(":")[1]) as AnnouncementDate[];
  }

  getContent(): Promise<Announcement | null> {
    return redis.get<Announcement>(`announcement:${this.key}`);
  }
}
