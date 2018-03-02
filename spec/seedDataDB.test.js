const db = require('../db/dbHelpers');

describe('database helpers - save and find', () => {
  beforeAll(() => db.mongoose.connect('mongodb://localhost/fecproject'));
  afterAll(() => db.mongoose.disconnect());

  it('should save all data items to test database', (done) => {
    expect.assertions(1);
    db.find({ query: '{}' }, (err, docs) => {
      if (err) { throw err; }
      expect(docs.length).toBe(119);
      done();
    });
  });

  it('should not save duplicate restaurants', async (done) => {
    expect.assertions(2);
    db.find({ id: 89104 }, (err, docs) => {
      if (err) { throw err; }
      expect(docs.length).toBe(1);
      expect(docs[0].id).toBe(89104);
      done();
    });
  });

  it('should return specified data fields only', (done) => {
    expect.assertions(4);
    db.find({ query: 'id menu.dinner' }, (err, docs) => {
      if (err) { throw err; }
      const docsObj = docs[0].toObject();
      expect(docs.length).toBe(1);
      expect(docs[0].id).toBe(90976);
      expect(Object.keys(docsObj)).toEqual(expect.arrayContaining(['menu', 'id', '_id']));
      expect(Object.keys(docsObj.menu)).toEqual(expect.arrayContaining(['dinner']));
      done();
    });
  });
});
