import Config from './config';

declare class CocosCore {
    public options: Config;
    
    public constructor(options: Config);

    private configure(): Promise<void>;

    public start(): Promise<void>;
}

export default CocosCore;