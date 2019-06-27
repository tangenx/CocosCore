import { ICommandParams } from '../typings/params';
import { MessageContext } from 'vk-io';

export default class Command {
    constructor(params: ICommandParams);

    private searchSubCommand(context: MessageContext): this;
}
