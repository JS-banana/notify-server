export interface IReqToken {
  id: string;
  secret: string;
}

interface MsgData {
  msgtype: string;
  [key: string]: any;
}

export interface IReqNoticeWork<T = MsgData> {
  id: string;
  secret: string;
  agentId: string;
  touser?: string;
  msgData: T;
}

interface PostMsgOption {
  accessToken: string;
  agentid: string;
  touser?: string;
}

export type FnReqPostMsg<T = any> = (
  msgData: MsgData,
  options: PostMsgOption
) => Promise<T>;
