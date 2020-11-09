const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const csv = require('fast-csv');
// const lockfile = require('proper-lockfile');

const headers = ['id', 'title', 'location', 'date', 'time', 'deleted'];
const availableFieldsForFiltering = ['id', 'title', 'location', 'date', 'time'];
const filterBy = (filterFields) => (row) => {
  if (Boolean(+row.deleted)) {
    return false;
  }
  return filterFields.every(([field, value]) => {
    if (!availableFieldsForFiltering.includes(field)) {
      return true;
    }
    return row[field] === value;
  });
};

class EventsService {
  filePath = path.resolve(__dirname, '..', 'storage', 'events.csv');
  formatOptions = { headers, writeHeaders: true, includeEndRowDelimiter: true };
  lockQueue = [Promise.resolve()];

  async findAll(filterFields = []) {
    const events = await this.read();
    return events.filter(filterBy(filterFields)).map(this.DTO);
  }

  async findById(id) {
    const event = (await this.findAll([['id', id]]))[0];
    return event;
  }

  async deleteById(id) {
    const events = await this.read();
    const event = events.find((row) => row.id === id);

    if (!event || Boolean(+event.deleted)) return false;

    event.deleted = 1;

    await this.write(fs.createWriteStream(this.filePath), events, this.formatOptions);

    return true;
  }

  async create({ title, location, date, time }) {
    const event = {
      id: uuidv4(),
      title,
      location,
      date,
      time,
      deleted: 0,
    };

    await this.write(fs.createWriteStream(this.filePath, { flags: 'a' }), [event], {
      ...this.formatOptions,
      writeHeaders: false,
    });

    return event;
  }

  async update(id, { title, location, date, time }) {
    const events = await this.read();
    const event = events.find((row) => row.id === id);

    if (!event || Boolean(+event.deleted)) return null;

    Object.assign(event, { title, location, date, time });

    await this.write(fs.createWriteStream(this.filePath), events, this.formatOptions);

    return event;
  }

  DTO({ id, title, location, date, time }) {
    return {
      id,
      title,
      location,
      date,
      time,
    };
  }

  getReadableStream() {
    return fs.createReadStream(this.filePath);
  }

  read() {
    return new Promise((resolve, reject) => {
      const res = [];
      fs.createReadStream(this.filePath)
        .pipe(csv.parse({ headers: true }))
        .on('error', reject)
        .on('data', (row) => res.push(row))
        .on('end', () => resolve(res));
    });
  }

  write(filestream, rows, options) {
    return new Promise((res, rej) => {
      csv
        .writeToStream(filestream, rows, options)
        .on('error', (err) => rej(err))
        .on('finish', () => res());
    });
  }
}

module.exports = new EventsService();
