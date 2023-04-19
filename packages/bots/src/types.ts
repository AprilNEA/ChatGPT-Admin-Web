export enum ChatEventType {
  NEW_TOKEN,
  ERROR,
  DONE
}

export type ChatEvent ={
  type: ChatEventType.DONE
} | {
  type: ChatEventType.NEW_TOKEN,
  token: string
} | {
  type: ChatEventType.ERROR
  error: Error
}
