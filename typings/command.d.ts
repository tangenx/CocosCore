import { MessageContext } from 'vk-io';
import { ICommandParams } from '../typings/params';

export default class Command {
    constructor(params: ICommandParams);

    private searchSubCommand(context: MessageContext): this;
}
