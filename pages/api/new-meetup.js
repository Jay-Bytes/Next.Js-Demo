import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const data = req.body;

      const client = await MongoClient.connect('mongodb+srv://Jay:eRVobBS5tDKCAVWU@cluster0.asjuthr.mongodb.net/meetups?retryWrites=true&w=majority');
      const db = client.db();
      const meetupCollections = db.collection('meetups');

      const result = await meetupCollections.insertOne(data);

      console.log(result);

      client.close();

      res.status(201).json({ message: 'Meetup added successfully!' });
    } catch (error) {
      res.status(500).send({ error });
    }
  }
};

export default handler;
