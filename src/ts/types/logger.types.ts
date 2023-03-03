import { ILogObj } from 'tslog';
import { ILogObjMeta } from 'tslog/dist/types/interfaces';

export type TLogCallback<TLogObj = unknown> = (log?: TLogObj & ILogObjMeta & ILogObj) => void;
