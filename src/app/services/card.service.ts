import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);
const db = new PouchDB('trello-app-card');

export class PouchdbCardService {
 private db: any;

  constructor() {
    if (!this.db) this.db = db;
    this.createIndexes();
  }


  public async createIndexes() {
    try {
      await this.db.createIndex({ index: { fields: ['listIndex'] } });
    } catch (err) {
      console.error(err);
    }
  }


  public getAll(): Promise<any> {
    return this.db.allDocs({ include_docs: true });
  }


  public query(query: any, limit: number = 1): Promise<any> {
    return this.db.find({
      selector: { ...query, listIndex: {'$gte': 0} },
      limit,
      sort: [{ 'listIndex': 'asc' }]
    });
  }


  public getOne(id: string): Promise<any> {
    return this.db.get(id);
  }


  public async putOne(id: string, document: any): Promise<any> {
    let doc = null;

    if(!id) return this.db.post({ ...document, lastUpdate: new Date() });

    try {
      doc = await this.getOne(id);
    } catch (e) {
      if (e.status !== 404) throw new Error(e);
    }

    if (doc) {
      return this.db.put({ ...document, _id: id, _rev: doc._rev, lastUpdate: new Date() });
    }
  }


  public async removeOne(id: string): Promise<any> {
    let doc = null;

    try {
      doc = await this.getOne(id);
    } catch (e) {
      throw new Error(e);
    }

    return this.db.remove(doc);
  }
}
