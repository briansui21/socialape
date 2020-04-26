const db = {
  screams: [
    {
      userHandle: 'user',
      body: 'this is the scream body',
      createdAt: '2020-04-19T23:08:08.786Z',
      likeCount: 5,
      commentCount: 2,
    },
  ],
  comments: [
    {
      body: 'Commenting',
      createdAt: '2020-04-26T03:37:19.707Z',
      screamId: 's8qekT9rxJV5j3H3CIGf',
      userHandle: 'user',
      userImage:
        'https://firebasestorage.googleapis.com/v0/b/socialape-1012f.appspot.com/o/7506349669.JPG?alt=media',
    },
  ],
  notifications: [
    {
      recipient: 'user',
      sender: 'john',
      read: 'true | false',
      screamId: 's8qekT9rxJV5j3H3CIGf',
      type: 'like | comment',
      createdAt: '2020-04-26T03:37:19.707Z'
    }
  ]
};

const userDetails = {
  // Redux data
  credentials: {
    userId: 'Abxi7Unte0cs1wsH09MFnl1DLPR2',
    email: 'user@email.com',
    handle: 'user',
    createdAt: '2020-04-25T21:16:34.652Z',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/socialape-1012f.appspot.com/o/4770541418.jpg?alt=media',
    bio: "Hello, I'm user",
    location: 'Los Angeles, CA',
    website: 'https://google.com',
  },
  likes: [
    {
      userHandle: 'user',
      screamId: '1VYOIj8qgd81krhD24lU',
    },
    {
      userHandle: 'user',
      screamId: '3CrqD2yAvJLNvKaIsTxC',
    },
  ],
};
