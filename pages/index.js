import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetup</title>
        <meta name='description' content='Find a react meetup from all around the world ' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect('mongodb+srv://Jay:eRVobBS5tDKCAVWU@cluster0.asjuthr.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupCollections = db.collection('meetups');

  const meetups = await meetupCollections.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
};

export default HomePage;
