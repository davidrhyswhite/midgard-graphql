import { Context } from '../types/context';
import { Stats } from '../types/midgard/stats';
export const stats = (_: void, __: void, { dataSources }: Context): Promise<Stats> => dataSources.midgardAPI.getStats();
