import MidgardAPI from '../datasources/midgard';

export type DataSources = {
  midgardAPI: MidgardAPI;
};

export interface Context {
  dataSources: DataSources;
}
