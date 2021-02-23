import { Node } from 'prosemirror-model';
import { Command } from 'prosemirror-commands';

/**
 * Raw Command
 */
export type RawCommand = (p: any) => Command;

export type HandledCommand = (...p: any) => void;

export type HandledCommandRecord = Record<string, Record<string, HandledCommand>>;

/**
 * 序列化函数
 */
export type Serializer = (doc: Node) => any;

/**
 * 解析函数
 */
export type Parser = (data: any) => (schema: any) => Node;
