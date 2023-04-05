import {Model} from "./typing";
import {redis} from "src/redis/client";

export class AnnouncementsDAL {
  constructor(private key: Model.AnnouncementDate) {}

  static async listKeys(pattern='*'): Promise<Model.AnnouncementDate[]> {
    const keys = await redis.keys('announcement:'+ pattern)
    return keys.map(k => k.split(':')[1]) as Model.AnnouncementDate[]
  }

  getContent(): Promise<Model.Announcement | null> {
    return redis.get<Model.Announcement>(`announcement:${this.key}`)
  }
}
