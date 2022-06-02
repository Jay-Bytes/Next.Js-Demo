import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

const MeetingById = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetUpById.title}</title>
        <meta title='description' content={props.meetUpById.description} />
      </Head>
      <div>
        <img src={props.meetUpById.image} alt={props.meetUpById.title} />
        <h1>{props.meetUpById.title}</h1>
        <address>{props.meetUpById.address}</address>
        <p>{props.meetUpById.description}</p>
      </div>
    </>
  );
};

export const getStaticPaths = async ({ params }) => {
  const client = await MongoClient.connect('mongodb+srv://Jay:eRVobBS5tDKCAVWU@cluster0.asjuthr.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupCollections = db.collection('meetups');

  const meetups = await meetupCollections.find({}, { _id: params }).toArray();

  client.close();

  return {
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const meetupId = params.meetupId;

  const client = await MongoClient.connect('mongodb+srv://Jay:eRVobBS5tDKCAVWU@cluster0.asjuthr.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupCollections = db.collection('meetups');

  const selectedMeetup = await meetupCollections.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetUpById: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
};

export default MeetingById;
