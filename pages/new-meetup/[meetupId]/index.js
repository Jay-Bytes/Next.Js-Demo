import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import classes from '../../../styles/meetupId.module.css';

const MeetingById = (props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{props.meetUpById.title}</title>
        <meta title='description' content={props.meetUpById.description} />
      </Head>
      <div className={classes.meetupDetails}>
        <img style={{ width: '100%' }} src={props.meetUpById.image} alt={props.meetUpById.title} />
        <h1>{props.meetUpById.title}</h1>
        <address>{props.meetUpById.address}</address>
        <p>{props.meetUpById.description}</p>

        <div style={{ display: 'flex', justifyContent: 'center' }} className={classes.actions}>
          <button onClick={() => router.push('/')}>Go Back</button>
        </div>
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
