import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetup = () => {
  const addNewMeetupHandler = async (meetUpData) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetUpData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
  };

  return (
    <>
      <Head>
        <title>Add New React Meetup</title>
        <meta name='description' content='Add your own meetup' />
      </Head>
      <NewMeetupForm onAddMeetup={addNewMeetupHandler} />
    </>
  );
};

export default NewMeetup;
