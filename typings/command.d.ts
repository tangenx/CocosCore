import { MessageContext } from 'vk-io';
import { ICommandParams } from '../typings/params';

export default class Command {
    public constructor(params: ICommandParams);

    private searchSubCommand(context: MessageContext): this;
}
